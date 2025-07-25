import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products'
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <ThemeProvider theme={Theme}>
      <CartProvider>
        <Header />
        <Products />
        <Footer />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
