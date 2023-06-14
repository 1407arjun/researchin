import Auth, { AuthStatus } from '@/types/auth'
import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Store } from '../store'

const initialState: Auth = {
  status: AuthStatus.LOADING,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
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

export const { setStatus, setUser } = authSlice.actions
export const getAuth = (state: Store) => state.auth
export default authSlice.reducer
