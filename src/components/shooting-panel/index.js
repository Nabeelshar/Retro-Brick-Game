import React, { useEffect } from 'react'
import Matrix from '../matrix'
import games from '../../utils/games'
import { useSelector } from 'react-redux'
import { blankMatrix } from '../../games/tetris/tetris'
import { copyData } from '../../utils/helps'
import { speeds } from '../../games/snake/snake'
import { shape } from '../../games/shooting/shooting'
import { controlShooting, gameover } from '../../control/shooting'

const SnakePanel = () => {
  let matrix = []

  const { shooting, pause, lock, speed } = useSelector(state => state)

  const buildMatrix = () => {
    if (pause === 0) {
      matrix = games.shooting
    } else {
      matrix = copyData(blankMatrix)
      shooting.stones.forEach((point) => {
        matrix[point[0]][point[1]] = 1
      })
      const position = [15,shooting.x-1]
      shape.forEach((m, k1) => {
        m.forEach((n, k2) => {
          if(n) {
            matrix[position[0]+k1][position[1]+k2] = n
          }
        })
      })

      for(let i=0; i<shooting.sider.length; i++) {
        matrix[19-i][0] = shooting.sider[i]
        matrix[19-i][9] = shooting.sider[i]
      }

      if (shooting.fire) {
        let color = 2
        for (let i=14; i>=0; i--) {
          if((14-i)%3 === 0) {
            color++
          }
          if(matrix[i][shooting.x] === 1) {
            break
          }
          matrix[i][shooting.x] = color
        }
      }
    }
  }

  buildMatrix()

  useEffect(() => {
    if (pause === 1 && !lock) {
      const timer = setInterval(() => {
        controlShooting('up')
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
    <Matrix matrix={matrix} isDead={shooting.death} gameover={gameover}/>
  )
}

export default SnakePanel