import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, writeBatch, getDocs, deleteDoc } from 'firebase/firestore';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');
      const result = await signInWithPopup(auth, provider);
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        // Cache the token in session storage for the session
        sessionStorage.setItem('googleAccessToken', credential.accessToken);
      }

      const adminDoc = await getDoc(doc(db, 'admins', result.user.uid));
      if (!adminDoc.exists()) {
        setError('You are not authorized as an admin.');
        await auth.signOut();
      } else {
        onLogin();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-slate-900 shadow rounded-2xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button 
        onClick={handleLogin}
        className="w-full bg-brand text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  );
}

function ManageDeals() {
  const [sheetId, setSheetId] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dealsCount, setDealsCount] = useState(0);

  useEffect(() => {
    // Load existing deals count
    getDocs(collection(db, 'deals')).then(snap => {
      setDealsCount(snap.size);
    });
  }, []);

  const handleSyncSheets = async () => {
    if (!sheetId) {
      setMessage('Please enter a Google Sheet ID');
      return;
    }
    
    if (!window.confirm('This will wipe existing deals and replace them with the ones from the Google Sheet. Continue?')) {
      return;
    }

    setLoading(true);
    setMessage('Fetching from Google Sheets...');
    try {
      const token = sessionStorage.getItem('googleAccessToken');
      if (!token) throw new Error('Google Access Token missing. Please sign out and sign in again.');

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${process.env.VITE_GOOGLE_API_KEY || ''}`;
      
      const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Failed to fetch Google Sheet. Check Sheet ID and Permissions.');
      
      const data = await res.json();
      const rows = data.values;
      if (!rows || rows.length < 2) throw new Error('No data found in sheet.');

      const headers = rows[0].map((h: string) => h.toLowerCase().trim());
      const newDeals = rows.slice(1).map((row: any[], i: number) => {
        const deal: any = { id: `deal-${Date.now()}-${i}` };
        headers.forEach((header: string, index: number) => {
          deal[header] = row[index] || '';
        });
        return deal;
      });

      setMessage('Replacing deals in Firestore...');
      
      const dealsCol = collection(db, 'deals');
      const existing = await getDocs(dealsCol);
      const batch = writeBatch(db);
      
      // Delete existing
      existing.docs.forEach(d => batch.delete(d.ref));
      
      const standardHeaders = ['title', 'slug', 'store', 'originalprice', 'discountedprice', 'affiliatelink', 'imageurl', 'categoryid', 'category', 'id', 'description'];

      // Add new
      newDeals.forEach((deal: any) => {
        const ref = doc(dealsCol, deal.id);
        
        const specs: any = {};
        Object.keys(deal).forEach(key => {
          if (!standardHeaders.includes(key) && deal[key]) {
             // Try to map to explicit keys our UI expects, otherwise use as is
             let specKey = key;
             if (key === 'ramstorage' || key === 'ram') specKey = 'ramStorage';
             if (key === 'rearcamera' || key === 'camera') specKey = 'rearCamera';
             if (key === 'frontcamera') specKey = 'frontCamera';
             if (key === 'antutuscore') specKey = 'antutuScore';
             if (key === 'releasedate') specKey = 'releaseDate';
             if (key === 'specscore') specKey = 'specScore';
             specs[specKey] = deal[key];
          }
        });

        const parsedDeal = {
          title: deal.title || 'Unknown',
          slug: deal.slug || deal.title?.toLowerCase().replace(/\s+/g, '-') || 'unknown',
          store: deal.store || 'Unknown',
          originalPrice: parseFloat(deal.originalprice) || 0,
          discountedPrice: parseFloat(deal.discountedprice) || 0,
          affiliateLink: deal.affiliatelink || '#',
          imageUrl: deal.imageurl || '',
          categoryId: deal.categoryid || deal.category || 'all',
          description: deal.description || '',
          specs: Object.keys(specs).length > 0 ? specs : null,
          authorId: auth.currentUser?.uid,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        batch.set(ref, parsedDeal);
      });

      await batch.commit();
      setDealsCount(newDeals.length);
      setMessage(`Successfully synced ${newDeals.length} deals!`);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Deals (Google Sheets Sync)</h1>
      <p className="mb-6 text-gray-600">Currently, there are <strong>{dealsCount}</strong> deals in the database.</p>
      
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Sync Deals from Google Sheets</h2>
        <p className="mb-4 text-sm text-gray-500">
          Your Google Sheet should have standard headers (case-insensitive):
          <strong> title, slug, store, originalPrice, discountedPrice, affiliateLink, imageUrl, categoryId, description</strong>
          <br /><br />
          <em>Tip: Want to add features or specs (like CPU, Battery)? Just add new columns to the sheet (e.g., 'Processor').<br/>
          For Powerbanks deals, you can paste multiple links directly into the <strong>description</strong> column and they will be rendered as a list of links!</em>
        </p>
        
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-bold mb-1">Google Sheet ID</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded" 
              placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms" 
              value={sheetId} 
              onChange={e => setSheetId(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Sheet Name</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded" 
              placeholder="e.g. Sheet1" 
              value={sheetName} 
              onChange={e => setSheetName(e.target.value)} 
            />
          </div>
        </div>

        {message && (
          <div className={`p-3 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {message}
          </div>
        )}

        <button 
          onClick={handleSyncSheets} 
          disabled={loading}
          className="bg-brand text-white px-6 py-2 rounded font-bold hover:bg-brand-dark disabled:opacity-50"
        >
          {loading ? 'Syncing...' : 'Sync from Google Sheet'}
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to the Deals of the Day Admin Panel.</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const adminDoc = await getDoc(doc(db, 'admins', u.uid));
        if (adminDoc.exists()) {
           setIsAdmin(true);
        } else {
           setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (!user || !isAdmin) {
    return <AdminLogin onLogin={() => {}} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-300px)]">
      {/* Sidebar */}
      <div className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className="block p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 font-medium">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/deals" className="block p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 font-medium">Manage Deals</Link>
          </li>
          <li>
             <button onClick={() => auth.signOut()} className="block w-full text-left p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 font-medium text-red-500">
               Sign Out
             </button>
          </li>
        </ul>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes here, e.g. deals CRUDS */}
          <Route path="deals" element={<ManageDeals />} />
        </Routes>
      </div>
    </div>
  );
}
