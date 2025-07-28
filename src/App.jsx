import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AboutPage from './components/About/About';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import { CartProvider } from './context/CartContext';

import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import ContactUs from './pages/ContactUs';
import ProductDetails from './components/Products/ProductDetails';
import AuthPage from './pages/AuthPage';
import { useAuth } from './context/AuthContext';

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
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/store"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <Store />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute isAllowed={isLoggedIn}>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
