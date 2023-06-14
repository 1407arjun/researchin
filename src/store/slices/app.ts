import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { App } from 'realm-web'

const initialState: { app: App | null } = { app: null }

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApp: (state, action) => {
      state.app = action.payload
    },
    extraReducers: {
      //@ts-ignore
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.app
        }
      }
    }
  }
})

export const { setApp } = appSlice.actions
export const getApp = (state) => state.app
export default appSlice.reducer
