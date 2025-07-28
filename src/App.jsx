import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AboutPage from './components/About/About'
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme'
import { CartProvider } from './context/CartContext'

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Store from './pages/Store'
import ContactUs from './pages/ContactUs'
import ProductDetails from './components/Products/ProductDetails'
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
