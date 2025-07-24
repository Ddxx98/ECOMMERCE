import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products'
import {ProductContext} from './context/ProductContext'

function App() {

  return (
    <ProductContext.Provider>
      <Header></Header>
      <Products></Products>
      <Footer></Footer>
    </ProductContext.Provider>
  )
}

export default App
