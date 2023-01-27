import store from '../store'
import control from '.'
import { initGameData } from '../utils/games'

const keyboard = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  32: 'rotate',
  83: 's',
  82: 'r',
  80: 'p',
}

let keydownActive

const boardKeys = Object.keys(keyboard).map(e => parseInt(e, 10))

const keyDown = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return
  }
  const type = keyboard[e.keyCode]
  if (type === keydownActive) {
    return
  }
  keydownActive = type
  const { pause, game } = store.getState()
  if (pause === 0) {
    control['todo'][type]()
  } else {
    control[initGameData[game].name][type]()
  }
}

const keyUp = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return
  }
  const type = keyboard[e.keyCode]
  if (type === keydownActive) {
    control.clearLoop()
    keydownActive = ''
  }
}

document.addEventListener('keydown', keyDown, true)
document.addEventListener('keyup', keyUp, true)

