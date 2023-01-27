import { createSlice } from '@reduxjs/toolkit'
import { createNewRacing } from '../../games/racing'

const racing = createNewRacing()

const initialState = racing.toJsObj()

const racingSlice = createSlice({
  name: 'racing',
  initialState,
  reducers: {
    setRacing: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setRacing } = racingSlice.actions
export default racingSlice.reducer
