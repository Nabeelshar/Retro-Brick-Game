/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Matrix from '../matrix'
import Next from './next'
import games from '../../utils/games'
import { useSelector } from 'react-redux'
import Tetris, { speeds } from '../../games/tetris/tetris'
import { controlTetris, tetrisClearLines, gameover } from '../../control/tetris'
import { copyData } from '../../utils/helps'
const TetrisPanel = () => {
  const { pause, tetris, speed, lock } = useSelector(state => state)

  useEffect(() => {
    if (pause === 1 && !lock) {
      const timer = setInterval(() => {
        controlTetris('down')
        if(lock) {
          clearInterval(timer)
        }
      }, speeds[speed])
      return (() => {
        clearInterval(timer)
      })
    }
  }, [pause, lock])

  const tetrisObj = new Tetris(tetris)
  let matrix = copyData(tetrisObj.matrix)
  let lines = []
  if (pause === 0) {
    matrix = copyData(games.tetris)
  } else {
    //build shape
    for(let i=0; i<tetrisObj.shape.length; i++) {
      for (let j=0; j<tetrisObj.shape[0].length; j++) {
        //绘制新位置
        if (i+tetrisObj.xy[0] >= 0 && i+tetrisObj.xy[0] < 20 && j+tetrisObj.xy[1] >= 0 && j+tetrisObj.xy[1] < 10) {
          if (tetrisObj.shape[i][j]) {
            matrix[i+tetrisObj.xy[0]][j+tetrisObj.xy[1]] = 1
          }
        }
      }
    }

    if (!tetrisObj.checkMove('down')) {
      matrix.forEach((m, k) => {
        if (m.every(n => !!n)) {
          lines.push(k)
        }
      })
    }
  }

  return (
    <>
      <Matrix matrix={matrix} isDead={tetrisObj.isDead()} gameover={gameover} tetrisClearLines={tetrisClearLines} lines={lines} pause={pause}/>
      {pause !==0 && <Next />}
    </>
  )
}

export default TetrisPanel