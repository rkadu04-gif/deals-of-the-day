/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DealsPage from './pages/DealsPage';
import ComparePage from './pages/ComparePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ProductPage from './pages/ProductPage';
import AdminDashboard from './pages/AdminDashboard';
import TelegramJoinPage from './pages/TelegramJoinPage';
import { PrivacyPolicy, AffiliateDisclosure, TermsOfUse, AboutUs, ContactUs, RefundPolicy } from './pages/StaticPages';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="deals" element={<DealsPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="join" element={<TelegramJoinPage />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="affiliate-disclosure" element={<AffiliateDisclosure />} />
            <Route path="terms" element={<TermsOfUse />} />
            <Route path="refund-cancellation" element={<RefundPolicy />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
