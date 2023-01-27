import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const lockSlice = createSlice({
  name: 'lock',
  initialState,
  reducers: {
    setLock(state, action) {
      return action.payload
    },
    toggleLock(state) {
      return !state
    }
  }
})

export const { setLock, toggleLock } = lockSlice.actions

export default lockSlice.reducer