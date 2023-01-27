/* eslint-disable no-unused-vars */
import { toggle } from '../../store/reducer/musicSlice'
import { Music } from '../../utils/music'
import { setPause } from '../../store/reducer/pauseSlice'
import { setLock, toggleLock } from '../../store/reducer/lockSlice'
import store from '../../store'
import { setSpeed } from '../../store/reducer/speedSlice'
import { setLevels } from '../../store/reducer/levelsSlice'
import { addScore, setScore } from '../../store/reducer/gamesSlice'
import control from '..'
import { setRacing } from '../../store/reducer/racingSlice'
import Racing from '../../games/racing'
import Tank from '../../games/tank/tank'
import { setTank } from '../../store/reducer/tankSlice'

export const run = () => {
  const { tank } = store.getState()
  const tankObj = new Tank(tank)
  tankObj.run()
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
}

export const enemyFire = () => {
  const { tank } = store.getState()
  const state = store.getState()
  const tankObj = new Tank(tank)
  tankObj.enemiesFire()
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
  store.dispatch(setScore({ game: state.game, score: tankObj.score }))
}

export const runEnemiesBullet = () => {
  const { tank } = store.getState()
  const tankObj = new Tank(tank)
  tankObj.runEnemiesBullet()
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
}

export const gameover = () => {
  store.dispatch(setLevels(1))
  store.dispatch(setSpeed(1))
  store.dispatch(setPause(0))
  const { game } = store.getState()
  store.dispatch(setScore({ game, score:0 }))
  store.dispatch(setLock(false))
}

const setSpeedAndLevels = (score, levels) => {
  const { speed } = store.getState()
  let newSpeed = Math.ceil(score / 3000)
  if (newSpeed > speed) {
    store.dispatch(setSpeed(newSpeed))
  }
  store.dispatch(setLevels(levels))
}

const left = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  const { tank } = state
  const tankObj = new Tank(tank)
  tankObj.move('left')
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
  control.eventLoop.left = setTimeout(left, 100)
}

const right = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  const { tank } = state
  const tankObj = new Tank(tank)
  tankObj.move('right')
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
  control.eventLoop.right = setTimeout(right, 100)
}

const up = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  const { tank } = state
  const tankObj = new Tank(tank)
  tankObj.move('up')
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
  control.eventLoop.up = setTimeout(up, 100)
}

const down = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  const { tank } = state
  const tankObj = new Tank(tank)
  tankObj.move('down')
  tankObj.draw()
  store.dispatch(setTank(tankObj.toJsObj()))
  control.eventLoop.down = setTimeout(down, 100)
}

const rotate = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.rotate) {
    Music.rotate()
  }
  const { tank } = state
  if (tank.bullet) return
  let timer = setInterval(() => {
    const state = store.getState()
    const tankObj = new Tank(state.tank)
    tankObj.fire()
    tankObj.draw()
    store.dispatch(setTank(tankObj.toJsObj()))
    store.dispatch(setScore({ game: state.game, score: tankObj.score }))
    if (tankObj.bullet === null) {
      clearInterval(timer)
    }
  }, 100)
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

