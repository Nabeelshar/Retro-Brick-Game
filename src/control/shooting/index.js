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
import Shooting from '../../games/shooting/shooting'
import { setShooting } from '../../store/reducer/shootingSlice'

export const controlShooting = (type) => {
  if (type==='') {return }
  const state = store.getState()
  const { shooting, games, game, levels, music } = state
  if(music && Music.run) {
    Music.run()
  }
  const shootingObj = new Shooting(shooting)
  if (type === 'up') {
    if (shootingObj.run()) {
      let score = games[game].score
      score += 10
      store.dispatch(addScore({ game, score: 10 }))
      setSpeedAndLevels(score, levels)
    }
  } else {
    shootingObj.move(type)
  }
  store.dispatch(setShooting(shootingObj.toJsObj()))
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
  controlShooting('left')
  control.eventLoop.left = setTimeout(left, 100)
}

const right = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  controlShooting('right')
  control.eventLoop.right = setTimeout(right, 100)
}

const up = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
  controlShooting('up')
  control.eventLoop.up = setTimeout(up, 100)
}

const down = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.move) {
    Music.move()
  }
}

const rotate = () => {
  const state = store.getState()
  if (state.lock) return
  if (state.music && Music.rotate) {
    Music.rotate()
  }
  // store.dispatch(setLock(true))
  const { shooting, games, game, levels } = state
  const shootingObj = new Shooting(shooting)
  shootingObj.shoot()
  store.dispatch(setShooting(shootingObj.toJsObj()))
  setTimeout(() => {
    const { shooting } = store.getState()
    const newObj = new Shooting(shooting)
    const res = newObj.shootStone()
    let score = games[game].score
    let newLevels = levels
    if (res) {
      newLevels++
      score += 100
      store.dispatch(addScore({ game, score: 100 }))
      setSpeedAndLevels(score, newLevels)
    }
    newObj.stopShoot()
    store.dispatch(setShooting(newObj.toJsObj()))
    // store.dispatch(setLock(false))
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

