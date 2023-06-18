import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Store } from '../store'
import Preference from '@/types/preference'
import { APP_MAX_YEAR, APP_MIN_YEAR } from '@/constants/preferences'

const initialState: Preference = {
  topics: [],
  minYear: APP_MIN_YEAR,
  maxYear: APP_MAX_YEAR,
  pubIds: []
}

export const prefSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = [...action.payload]
    },
    addTopic: (state, action) => {
      state.topics = [...state.topics, action.payload]
    },
    removeTopic: (state, action) => {
      state.topics = state.topics.filter((t) => t !== action.payload)
    },
    setMinYear: (state, action) => {
      state.minYear = action.payload
    },
    setMaxYear: (state, action) => {
      state.maxYear = action.payload
    },
    setPubs: (state, action) => {
      state.pubIds = [...action.payload]
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

export const {
  setTopics,
  addTopic,
  removeTopic,
  setMinYear,
  setMaxYear,
  setPubs
} = prefSlice.actions
export const getPref = (state: Store) => state.preferences
export default prefSlice.reducer
