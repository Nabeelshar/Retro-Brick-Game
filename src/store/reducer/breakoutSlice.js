import { createSlice } from '@reduxjs/toolkit'
import { createNewBreakout, initPaddleY, initX, initY } from '../../games/breakout/breakout'

const breakoutObj = createNewBreakout({ x: initX, y: initY, paddleY: initPaddleY })

const initialState = breakoutObj.toJsObj()

const breakoutSlice = createSlice({
  name: 'breakout',
  initialState,
  reducers: {
    setBreakout: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setBreakout } = breakoutSlice.actions
export default breakoutSlice.reducer
