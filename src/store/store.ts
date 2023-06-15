import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { authSlice } from './slices/auth'

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
})

export const wrapper = createWrapper(() => store)
export type Store = ReturnType<typeof store.getState>
