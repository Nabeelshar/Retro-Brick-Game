import { createSlice } from '@reduxjs/toolkit'

const initialState = 1

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    incLevels: state => {
      if (state < 10) {
        return state + 1
      }
      return state
    },
    decLevels: state => {
      if (state > 1) {
        return state - 1
      }
      return state
    },
    setLevels: (state, action) => {
      return action.payload
    }
  }
})

export const { incLevels, decLevels, setLevels } = levelsSlice.actions
export default levelsSlice.reducer