import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import Decorate from '../components/decorate'
import Keyboard from '../components/keybord'
import Number from '../components/number'
import Music from '../components/music'
import Pause from '../components/pause'
import Welcome from '../components/welcome'
import { shallowEqual, useSelector } from 'react-redux'
import TetrisPanel from '../components/tetris-panel'
import SnakePanel from '../components/snake-panel'
import ShootingPanel from '../components/shooting-panel'
import { transform } from '../utils/const'
import Logo from '../components/logo'
import Guide from '../components/guide'
import BreakoutPanel from '../components/breakout-panel'
import RacingPanel from '../components/rancing-panel'
import TankPanel from '../components/tank-panel'

const App = () => {
  const state = useSelector((state) => state, shallowEqual)
  const { levels, speed, music, pause, game, games } = state

  const [w, setW] = useState(document.documentElement.clientWidth)
  const [h, setH] = useState(document.documentElement.clientHeight)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setW(document.documentElement.clientWidth)
      setH(document.documentElement.clientHeight)
    })
  }, [w, h])
  let filling = 0
  const size = (() => {
    const ratio = h / w
    let scale
    let css = {}
    if (ratio < 1.5) {
      scale = h / 960
    } else {
      scale = w / 640
      filling = (h - (960 * scale)) / scale / 3
      css = {
        paddingTop: Math.floor(filling) + 42,
        paddingBottom: Math.floor(filling),
        marginTop: Math.floor(-480 - (filling * 1.5)),
      }
    }
    css[transform] = `scale(${scale})`
    return css
  })()

  return (
    <div className={style.app} style={size}>
      <div className={style.rect}>
        <Decorate />
        <div className={style.screen}>
          <div className={style.panel}>
            {games[game].name === 'tetris' && <TetrisPanel />}
            {games[game].name === 'snake' && <SnakePanel />}
            {games[game].name === 'shooting' && <ShootingPanel />}
            {games[game].name === 'racing' && <RacingPanel />}
            {games[game].name === 'breakout' && <BreakoutPanel />}
            {games[game].name === 'tank' && <TankPanel />}
            {pause === 0 && <Welcome game={games[game].name.toUpperCase()} />}
            <div className={style.state}>
              {
                pause === 0
                  ?
                  <>
                    <p>HI-SCORE</p>
                    <Number number={games[game].highest} length={6} />
                  </>
                  :
                  <>
                    <p>SCORE</p>
                    <Number number={games[game].score} length={6} />
                  </>
              }
              <p>levels</p>
              <Number number={levels} length={6} />
              <p>speed</p>
              <Number number={speed} length={1} />
              {pause===0 && <Logo/>}
              <div className={style.bottom}>
                <Music music={music} />
                <Pause pause={pause} />
                <Number time={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Keyboard filling={filling}/>
      <Guide/>
    </div>
  )
}

export default App
