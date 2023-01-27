import { toggle } from '../../store/reducer/musicSlice'
import { Music } from '../../utils/music'
import { setPause } from '../../store/reducer/pauseSlice'
import { setLock, toggleLock } from '../../store/reducer/lockSlice'
import store from '../../store'
import { setSpeed } from '../../store/reducer/speedSlice'
import { setLevels } from '../../store/reducer/levelsSlice'
import { addScore, setScore } from '../../store/reducer/gamesSlice'
import control from '..'
import Breakout from '../../games/breakout/breakout'
import { setBreakout } from '../../store/reducer/breakoutSlice'

export const run = () => {
  const { breakout, music, game } = store.getState()
  const breakoutObj = new Breakout(breakout)
  const res = breakoutObj.collisionDetection()
  if (res) {
    if (music && Music.clear) {
      Music.clear()
    }
    store.dispatch(addScore({ game, score:100 }))
  }
  breakoutObj.run()
  store.dispatch(setBreakout(breakoutObj.toJsObj()))
}

export const gameover = () => {
  store.dispatch(setLevels(1))
  store.dispatch(setSpeed(1))
  store.dispatch(setPause(0))
  const { game } = store.getState()
  store.dispatch(setScore({ game, score:0 }))
  store.dispatch(setLock(false))
}

// const setSpeedAndLevels = (score, levels) => {
//   const { speed } = store.getState()
//   let newSpeed = Math.ceil(score / 3000)
//   if (newSpeed > speed) {
//     store.dispatch(setSpeed(newSpeed))
//   }
//   store.dispatch(setLevels(levels))
// }

const left = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  const { breakout } = store.getState()
  const breakoutObj = new Breakout(breakout)
  breakoutObj.move('left')
  store.dispatch(setBreakout(breakoutObj.toJsObj()))
  control.eventLoop.left = setTimeout(left, 100)
}

const right = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  const { breakout } = store.getState()
  const breakoutObj = new Breakout(breakout)
  breakoutObj.move('right')
  store.dispatch(setBreakout(breakoutObj.toJsObj()))
  control.eventLoop.right = setTimeout(right, 100)
}

const up = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  control.eventLoop.up = setTimeout(up, 100)
}

const down = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  control.eventLoop.down = setTimeout(down, 100)
}

const rotate = () => {
  // const state = store.getState()
  // if (state.lock) return
  // if (state.music && Music.rotate) {
  //   Music.rotate()
  // }
}

const p = () => {
  const state = store.getState()
  if (state.lock && state.snake.death) return
  const newPause = state.pause === 1 ? 2 : 1
  store.dispatch(setPause(newPause))
  store.dispatch(toggleLock())
}

const s = () => {
  store.dispatch(toggle())
}

const r = () => {
  store.dispatch(setPause(0))
  store.dispatch(setSpeed(1))
  store.dispatch(setLevels(1))
  const { game } = store.getState()
  store.dispatch(setScore({ game, score:0 }))
}

export default {
  left,
  right,
  up,
  down,
  p,
  s,
  r,
  rotate
}

