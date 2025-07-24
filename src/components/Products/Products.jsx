import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'

const Products = () => {
    const products = useContext(ProductContext)
    console.log(products)
    return (
        <div>
            {/* <h1>Products</h1>
            {
                products.map((product) => {
                    return (
                        <div key={product.title}>
                            <h2>{product.title}</h2>
                            <p>{product.price}</p>
                            <img src={product.imageUrl} alt={product.title} />
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default Products
