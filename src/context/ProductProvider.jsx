import React from 'react'
import { ProductContext } from './ProductContext'

const ProductProvider = ({children}) => {
  return (
    <ProductContext.Provider >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider;
