import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { prefSlice } from './slices/preferences'

const store = configureStore({
  reducer: {
    [prefSlice.name]: prefSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
})

export const wrapper = createWrapper(() => store)
export type Store = ReturnType<typeof store.getState>
