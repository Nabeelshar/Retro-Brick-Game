import { createSlice } from '@reduxjs/toolkit'
import { createNewShooting } from '../../games/shooting/shooting'

const shootingObj = createNewShooting()

const initialState = shootingObj.toJsObj()

const shootingSlice = createSlice({
  name: 'shooting',
  initialState,
  reducers: {
    setShooting: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setShooting } = shootingSlice.actions
export default shootingSlice.reducer
