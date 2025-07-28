import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home'; // eagerly loaded

const Store = lazy(() => import('./pages/Store'));
const AboutPage = lazy(() => import('./components/About/About'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ProductDetails = lazy(() => import('./components/Products/ProductDetails'));
const AuthPage = lazy(() => import('./pages/AuthPage'));

function ProtectedRoute({ isAllowed, redirectTo = '/auth', children }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider theme={Theme}>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/auth"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AuthPage />
              </Suspense>
            }
          />

          <Route
            path="/store"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Store />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductDetails />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AboutPage />
              </Suspense>
            }
          />

          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ContactUs />
              </Suspense>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
