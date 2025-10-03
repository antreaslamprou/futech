import { createSlice } from '@reduxjs/toolkit'


export const currentUserReducer = createSlice({
  name: 'currentUser',
  initialState : {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = currentUserReducer.actions

export default currentUserReducer.reducer
