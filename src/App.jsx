import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import axios from 'axios';
import Home from './pages/Home';

import { useSelector, useDispatch } from 'react-redux';
import { setCart } from './store/Cart';

import LinearProgress from '@mui/material/LinearProgress';  // <-- Import MUI LinearProgress

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
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  // Step 1: loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const putCartData = async () => {
      setIsLoading(true);  // Start loading before request

      try {
        await axios.put(
          'https://ecommerce-916e4-default-rtdb.firebaseio.com/cart.json',
          { items, totalQuantity, totalPrice }
        );
      } catch (error) {
        console.error('Failed to sync cart:', error);
      } finally {
        setIsLoading(false);  // Stop loading after request
      }
    };

    putCartData();
  }, [items, totalQuantity, totalPrice]);

  useEffect(() => {
    const getCartData = async () => {
      setIsLoading(true);  

      try {
        const response = await axios.get(
          'https://ecommerce-916e4-default-rtdb.firebaseio.com/cart.json'
        );
        const data = response.data;

        dispatch(setCart(data || {}));
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      } finally {
        setIsLoading(false);  // Stop loading after request
      }
    };

    getCartData();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <CartProvider>
        <Header />
        {isLoading && <LinearProgress color="primary" />}
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
