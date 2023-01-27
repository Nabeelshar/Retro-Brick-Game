import { createSlice } from '@reduxjs/toolkit'

//0-未开始 1-开始 2-暂停
const initialState = 0

const pauseSlice = createSlice({
  name: 'pause',
  initialState,
  reducers: {
    setPause(state, action) {
      return action.payload
    }
  }
})

export const { setPause } = pauseSlice.actions

export default pauseSlice.reducer