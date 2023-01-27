import React, { useEffect } from 'react'
import Matrix from '../matrix'
import games from '../../utils/games'
import { useSelector } from 'react-redux'
import { blankMatrix } from '../../games/tetris/tetris'
import { copyData } from '../../utils/helps'
import { gameover, run } from '../../control/breakout'

const BreakoutPanel = () => {
  let matrix = []

  const { breakout, pause, lock } = useSelector(state => state)

  const buildMatrix = () => {
    if (pause === 0) {
      matrix = games.breakout
    } else {
      matrix = copyData(blankMatrix)
      breakout.bricks.forEach((point) => {
        matrix[point[0]][point[1]] = 1
      })
      //ball
      matrix[breakout.x][breakout.y] = 2

      //paddle
      for(let y = 0; y<breakout.paddleLength; y++) {
        matrix[19][breakout.paddleY+y] = 1
      }
    }
  }

  buildMatrix()

  useEffect(() => {
    if (pause === 1 && !lock) {
      const timer = setInterval(() => {
        run()
        if(lock) {
          clearInterval(timer)
        }
      }, 300)
      return (() => {
        clearInterval(timer)
      })
    }
  }, [pause, lock])
  return (
    <Matrix matrix={matrix} isDead={breakout.death} gameover={gameover}/>
  )
}

export default BreakoutPanel