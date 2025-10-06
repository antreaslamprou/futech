import { createSlice } from '@reduxjs/toolkit'


export const basketReducer = createSlice({
  name: 'basket',
  initialState : {
    basket: [],
  },
  reducers: {
    addItem: (state, action) => {
        const existingItem = state.basket.find(item => item.id === action.payload.id);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice = existingItem.quantity * existingItem.price;
        } else {
            state.basket.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price  });
        }
    },
    changeQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.basket.find(item => item.id === id);
        if (item && quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = item.quantity * item.price;
        } else if (item && quantity === 1) {
            state.basket = state.basket.filter(item => item.id !== id);
        }
    },
    removeItem: (state, action) => {
        state.basket = state.basket.filter(item => item.id !== action.payload.id);
    },
    clearBasket: (state) => {
        state.basket = [];
    },
  },
})

export const { addItem, changeQuantity, removeItem, clearBasket} = basketReducer.actions;

export default basketReducer.reducer;