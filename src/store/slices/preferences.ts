import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Store } from '../store'
import Preference from '@/types/preference'
import { APP_MAX_YEAR, APP_MIN_YEAR } from '@/constants/preferences'

const initialState: Preference = {
  topics: [],
  minYear: APP_MIN_YEAR,
  maxYear: APP_MAX_YEAR,
  pubs: []
}

export const prefSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = [...action.payload]
    },
    setMinYear: (state, action) => {
      state.minYear = action.payload
    },
    setMaxYear: (state, action) => {
      state.maxYear = action.payload
    },
    setPubs: (state, action) => {
      state.pubs = [...action.payload]
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

export const { setTopics, setMinYear, setMaxYear, setPubs } = prefSlice.actions
export const getPref = (state: Store) => state.preferences
export default prefSlice.reducer
