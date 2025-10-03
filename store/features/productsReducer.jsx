import { createSlice } from '@reduxjs/toolkit'


export const productsReducer = createSlice({
  name: 'products',
  initialState : {
    products: [],
  },
  reducers: {
    addProducts: (state, action) => {
        state.products = action.payload;
    }}
})

export const { addProducts } = productsReducer.actions;

export default productsReducer.reducer;