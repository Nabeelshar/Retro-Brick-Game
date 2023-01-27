import { createSlice } from '@reduxjs/toolkit'

const initialState = true

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    toggle(state) {
      return !state
    }
  }
})

export const { toggle } = musicSlice.actions

export default musicSlice.reducer