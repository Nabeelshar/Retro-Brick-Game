import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import style from './index.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { setLock } from '../../store/reducer/lockSlice'
import { copyData } from '../../utils/helps'
import { Music } from '../../utils/music'
import PropTypes from 'prop-types'
const Matrix = ({ matrix, isDead, gameover, lines, tetrisClearLines }) => {
  const [state, setState] = useState([])
  const { music, pause, lock } = useSelector(state => state)

  const dispatch = useDispatch()

  const clearAnimate = () => {
    const anima = (callback) => {
      setTimeout(() => {
        changeColor(0)
        setTimeout(() => {
          changeColor(2)
          if (typeof callback === 'function') {
            callback()
          }
        }, 50)
      }, 50)
    }
    anima(() => {
      anima(() => {
        anima(() => {
          setTimeout(
            tetrisClearLines, 100
          )
        })
      })
    })
  }

  const exLine = (index) => {
    if (index <= 19) {
      setState((old) => {
        const newState =  old.map((line, idx) => {
          if(idx !== index) {
            return line
          } else {
            return Array(10).fill(1)
          }
        })
        return newState
      })
    } else if (index >= 20 && index <= 39) {
      setState((old) => {
        return old.map((line, idx) => {
          if(idx !== (19-(index-20))) {
            return line
          } else {
            return Array(10).fill(0)
          }
        })
      })
    } else {
      //over
      gameover()
      dispatch(setLock(false))
      return
    }
  }
  const changeColor = (color) => {
    setState((oldState) => {
      return oldState.map((line,idx) => {
        if (lines.indexOf(idx) !== -1) {
          return Array(10).fill(color)
        } else {
          return line
        }
      })
    })
  }
  useEffect(() => {
    setState(copyData(matrix))
    //消除行
    if (lines &&  lines.length > 0 && !lock) {
      dispatch(setLock(true))
      if (music && Music.clear) {
        Music.clear()
      }
      changeColor(2)
      clearAnimate()
    }
    if (pause === 1 && isDead && !lock) {
      dispatch(setLock(true))
      if (music && Music.gameover) {
        Music.gameover()
      }
      for (let i = 0; i <= 40; i++) {
        setTimeout(exLine.bind(null, i), 40 * (i + 1))
      }
    }
  }, [matrix])

  return (
    <div className={style.matrix}>{
      state.map((p, k1) => (<p key={k1}>
        {
          p.map((e, k2) => <b
            className={classnames({
              c: e === 1,
              d: e === 2,
              e: e === 3,
              f: e === 4,
              g: e === 5,
              h: e === 6,
              i: e === 7,
            })}
            key={k2}
          />)
        }
      </p>))
    }
    </div>
  )
}
Matrix.propTypes = {
  matrix: PropTypes.array.isRequired,
  isDead: PropTypes.bool.isRequired,
  gameover: PropTypes.func.isRequired,
  lines: PropTypes.array,
  tetrisClearLines: PropTypes.func
}

export default Matrix