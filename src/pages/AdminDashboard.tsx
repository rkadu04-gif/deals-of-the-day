import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
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
          <Route path="deals" element={<div>Manage Deals Coming Soon</div>} />
        </Routes>
      </div>
    </div>
  );
}
