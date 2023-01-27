import { createSlice } from '@reduxjs/toolkit'

const initialState = 1

const speedSlice = createSlice({
  name: 'speed',
  initialState,
  reducers: {
    incSpeed: state => {
      if (state < 6) {
        return state + 1
      }
      return state
    },
    decSpeed: state => {
      if (state > 1) {
        return state - 1
      }
      return state
    },
    setSpeed: (state, action) => {
      let speed = action.payload
      if (speed > 6) {
        speed = 6
      }
      if (speed < 1) {
        speed = 1
      }
      return speed
    }
  }
})

export const { incSpeed, decSpeed, setSpeed } = speedSlice.actions
export default speedSlice.reducer