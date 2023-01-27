import { decLevels, incLevels, setLevels } from '../../store/reducer/levelsSlice'
import { incSpeed, decSpeed, setSpeed } from '../../store/reducer/speedSlice'
import { setPause } from '../../store/reducer/pauseSlice'
import { setGame } from '../../store/reducer/gameSlice'
import { toggle } from '../../store/reducer/musicSlice'
import { Music } from '../../utils/music'
import store from '../../store'
import { setTetris } from '../../store/reducer/tetrisSlice'
import { createNewTetris } from '../../games/tetris/tetris'
import { setSnake } from '../../store/reducer/snakeSlice'
import { createNewSnake } from '../../games/snake/snake'
import { setShooting } from '../../store/reducer/shootingSlice'
import { createNewShooting } from '../../games/shooting/shooting'
import { createNewBreakout, initPaddleY, initX, initY } from '../../games/breakout/breakout'
import { setBreakout } from '../../store/reducer/breakoutSlice'
import { createNewRacing } from '../../games/racing'
import { setRacing } from '../../store/reducer/racingSlice'
import { createNewTank } from '../../games/tank/tank'
import { setTank } from '../../store/reducer/tankSlice'

const left = () => {
  const state = store.getState()
  if (state.music && Music.move) {
    Music.move()
  }
  store.dispatch(decSpeed())
}

const right = () => {
  const state = store.getState()
  if (state.music && Music.move) {
    Music.move()
  }
  store.dispatch(incSpeed())
}

const up = () => {
  const state = store.getState()
  if (state.music && Music.move) {
    Music.move()
  }
  store.dispatch(incLevels())
}

const down = () => {
  const state = store.getState()
  if (state.music && Music.move) {
    Music.move()
  }
  store.dispatch(decLevels())
}

const p = () => {
  const { levels, games, game, music, pause } = store.getState()
  if (music && Music.start) {
    Music.start()
  }
  const newPause = pause === 1 ? 2 : 1
  if (games[game].name === 'tetris') {
    const newTetris = createNewTetris({ levels: levels })
    store.dispatch(setTetris(newTetris.toJsObj()))
  } else if(games[game].name === 'snake') {
    const newSnake = createNewSnake({ levels: levels })
    store.dispatch(setSnake(newSnake.toJsObj()))
  } else if(games[game].name === 'shooting') {
    const newShooting = createNewShooting({ levels: levels })
    store.dispatch(setShooting(newShooting.toJsObj()))
  }else if(games[game].name === 'breakout') {
    const newBreakout = createNewBreakout({ x: initX, y: initY, paddleY: initPaddleY })
    store.dispatch(setBreakout(newBreakout.toJsObj()))
  }else if(games[game].name === 'racing') {
    const newRacing = createNewRacing({})
    store.dispatch(setRacing(newRacing.toJsObj()))
  }else if(games[game].name === 'tank') {
    const newTank = createNewTank()
    store.dispatch(setTank(newTank.toJsObj()))
  }
  store.dispatch(setPause(newPause))
}

const s = () => {
  store.dispatch(toggle())
}

const r = () => {
  store.dispatch(setPause(0))
  store.dispatch(setSpeed(1))
  store.dispatch(setLevels(1))
}

const nextGameIndex = (games, game) => {
  let idx = game
  if (idx === games.length - 1) {
    return 0
  }
  return idx + 1
}

const rotate = () => {
  const { games, game, music } = store.getState()
  if (music && Music.rotate) {
    Music.rotate()
  }
  const idx = nextGameIndex(games, game)
  store.dispatch(setGame(idx))
}

export default {
  left,
  right,
  up,
  down,
  p,
  s,
  r,
  rotate,
}
