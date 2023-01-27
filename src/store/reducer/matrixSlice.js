import { createSlice } from '@reduxjs/toolkit'
import { blankMatrix } from '../../games/tetris'

const initialState = blankMatrix

const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    setMatrix: (state, action) => {
      return action.payload
    },
  }
})

export const { setMatrix } = matrixSlice.actions
export default matrixSlice.reducer