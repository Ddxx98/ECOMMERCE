import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], 
    totalQuantity: 0, 
    totalPrice: 0, 
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.product.title === newItem.title);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product: newItem, quantity: 1});
            }

            state.totalQuantity += 1;
            state.totalPrice += newItem.price;
        },
        removeItem(state, action) {
            const productTitle = action.payload;
            const existingItem = state.items.find(item => item.product.title === productTitle);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.product.price * existingItem.quantity;
                state.items = state.items.filter(item => item.product.title !== productTitle);
            }
        },
        updateQuantity(state, action) {
            const { productTitle, quantity } = action.payload;
            const existingItem = state.items.find(item => item.product.title === productTitle);

            if (existingItem) {
                existingItem.quantity = quantity;
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        setCart(state, action) {
            state.items = action.payload.items || [];
            state.totalQuantity = action.payload.totalQuantity;
            state.totalPrice = action.payload.totalPrice;
        }   
    }
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;