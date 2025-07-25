import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Sample product shape assumed:
// { title, price, imageUrl }

const CartContext = createContext();

const initialState = {
  items: [], // array of { product, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload;
      // Check if product already in cart
      const existingIndex = state.items.findIndex(
        (item) => item.product.title === product.title
      );

      if (existingIndex >= 0) {
        // Update quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += 1;
        return { ...state, items: updatedItems };
      } else {
        // Add new item with quantity 1
        return { ...state, items: [...state.items, { product, quantity: 1 }] };
      }
    }

    case 'REMOVE_ITEM': {
      const { productTitle } = action.payload;
      // Remove item completely from cart
      const filteredItems = state.items.filter(
        (item) => item.product.title !== productTitle
      );
      return { ...state, items: filteredItems };
    }

    case 'UPDATE_QUANTITY': {
      const { productTitle, quantity } = action.payload;
      if (quantity < 1) {
        // Remove item if quantity less than 1
        return {
          ...state,
          items: state.items.filter((item) => item.product.title !== productTitle),
        };
      }
      const updatedItems = state.items.map((item) =>
        item.product.title === productTitle ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Compute total quantity and price
  const totalQuantity = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.items]);

  const totalPrice = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [state.items]);

  // Actions
  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: { product } });
  const removeItem = (productTitle) => dispatch({ type: 'REMOVE_ITEM', payload: { productTitle } });
  const updateQuantity = (productTitle, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productTitle, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = {
    items: state.items,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook for easy context usage
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
