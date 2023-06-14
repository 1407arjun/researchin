import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { authSlice } from './slices/auth'

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: true
  })

export const wrapper = createWrapper(makeStore)
