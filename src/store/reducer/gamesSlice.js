import { createSlice } from '@reduxjs/toolkit'
import { initGameData } from '../../utils/games'

const initialState = initGameData

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setScore: (state, action) => {
      const { game, score } = action.payload
      state[game].score = score
      if (state[game].highest < score) {
        state[game].highest = score
      }
    },
    addScore: (state, action) => {
      const { game, score } = action.payload
      state[game].score += score
      if (state[game].highest < state[game].score) {
        state[game].highest = state[game].score
      }
    }
  }
})

export const { setScore, addScore } = gamesSlice.actions

export default gamesSlice.reducer