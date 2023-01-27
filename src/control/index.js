import todo from './todo'
import snake from './snake'
import tetris from './tetris'
import shooting from './shooting'
import breakout from './breakout'
import racing from './racing'
import tank from './tank'

//长按
const eventLoop = {}

const clearLoop = () => {
  Object.keys(eventLoop).forEach(key => {
    clearTimeout(eventLoop[key])
    eventLoop[key] = null
  })
}

export default {
  todo,
  snake,
  tetris,
  shooting,
  breakout,
  racing,
  tank,
  eventLoop,
  clearLoop
}