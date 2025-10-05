import { createSlice } from '@reduxjs/toolkit'


export const countriesReducer = createSlice({
  name: 'countries',
  initialState : {},
  reducers: {
    addCountries: (state, action) => {
    const countryArray = action.payload;
    return countryArray.reduce((acc, country) => {
      acc[country.code] = country.name;
      return acc;
    }, {})}
  }
})

export const { addCountries } = countriesReducer.actions;

export default countriesReducer.reducer;