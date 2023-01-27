import { createSlice } from '@reduxjs/toolkit'
import { createNewSnake } from '../../games/snake/snake'

const snake = createNewSnake(1)

const initialState = snake.toJsObj()

const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    setSnake: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setSnake } = snakeSlice.actions
export default snakeSlice.reducer
