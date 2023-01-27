import { createSlice } from '@reduxjs/toolkit'
import { createNewTank } from '../../games/tank/tank'

const tank = createNewTank()

const initialState = tank.toJsObj()

const tankSlice = createSlice({
  name: 'tank',
  initialState,
  reducers: {
    setTank: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setTank } = tankSlice.actions
export default tankSlice.reducer
