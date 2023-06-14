import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  isLoggedIn: false,
  currentUser: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    extraReducers: {
      //@ts-ignore
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth
        }
      }
    }
  }
})

export const { setLoggedIn, setUser } = authSlice.actions
export const getAuthState = (state) => state.auth
export default authSlice.reducer
