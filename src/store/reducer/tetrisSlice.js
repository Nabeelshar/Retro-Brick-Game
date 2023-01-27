import { createSlice } from '@reduxjs/toolkit'
import Tetris, { createNewTetris } from '../../games/tetris/tetris'

const tetris = createNewTetris({ levels: 1 })

const initialState = {
  matrix: tetris.matrix,
  xy: tetris.xy,
  next: tetris.next,
  shape: tetris.shape,
  score: tetris.score,
  levels: tetris.levels
}

const tetrisSlice = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    setTetris: (state, action) => {
      return { ...state, ...action.payload }
    },
    setNext: (state) => {
      state.next = Tetris.getNextType()
    }
  },
})

export const { setTetris, setNext } = tetrisSlice.actions
export default tetrisSlice.reducer
