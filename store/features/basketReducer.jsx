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
        } else {
            state.basket.push({ ...action.payload, quantity: 1 });
        }
    },
    changeQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.basket.find(item => item.id === id);
        if (item && quantity > 1) {
            item.quantity = quantity - 1;
        } else if (item && quantity === 1) {
            state.basket = state.basket.filter(item => item.id !== id);
        }
    },
    removeItem: (state, action) => {
        state.basket = state.basket.filter(item => item.id !== action.payload.id);
    },
    clearBasket: (state) => {
        state.user = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, changeQuantity, removeItem, clearBasket} = basketReducer.actions

export default basketReducer.reducer