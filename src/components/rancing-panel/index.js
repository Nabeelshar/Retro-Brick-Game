/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Matrix from '../matrix'
import games from '../../utils/games'
import { useSelector } from 'react-redux'
import { blankMatrix } from '../../games/tetris/tetris'
import { copyData } from '../../utils/helps'
import { gameover, run } from '../../control/racing'
import { shape, speeds } from '../../games/racing'

const RacingPanel = () => {
  let matrix = []

  const { racing, pause, lock, speed } = useSelector(state => state)

  const buildMatrix = () => {
    if (pause === 0) {
      matrix = games.racing
    } else {
      matrix = copyData(blankMatrix)
      racing.cars.map((car) => {
        shape.forEach((m, k1) => {
          m.forEach((n, k2) => {
            if (n) {
              const x = car[0] + k1
              const y = car[1] + k2
              if (x >= 0 && x <= 19 &&
                  y >=0 && y <= 9) {
                matrix[x][y] = n
              }
            }
          })
        })
      })
      shape.forEach((m, k1) => {
        m.forEach((n, k2) => {
          if (n) {
            const x = racing.x + k1
            const y = racing.y + k2
            if (x >= 0 && x <= 19 &&
                  y >=0 && y <= 9) {
              matrix[x][y] = n
            }
          }
        })
      })
      for(let i=19; i>=0; i--) {
        matrix[i][0] = racing.sider[i]
        matrix[i][9] = racing.sider[i]
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
      }, speeds[speed])
      return (() => {
        clearInterval(timer)
      })
    }
  }, [pause, lock, speed])
  return (
    <Matrix matrix={matrix} isDead={racing.death} gameover={gameover}/>
  )
}

export default RacingPanel