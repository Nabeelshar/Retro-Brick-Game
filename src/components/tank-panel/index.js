/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Matrix from '../matrix'
import games from '../../utils/games'
import { useSelector } from 'react-redux'
import { enemyFire, gameover, run, runEnemiesBullet } from '../../control/tank'

const TankPanel = () => {
  let matrix = []

  const { tank, pause, lock } = useSelector(state => state)

  const buildMatrix = () => {
    if (pause === 0) {
      matrix = games.tank
    } else {
      matrix = tank.matrix
    }
  }

  buildMatrix()

  useEffect(() => {
    if (pause === 1 && !lock) {
      const timer = setInterval(() => {
        run()
        enemyFire()
        if(lock) {
          clearInterval(timer)
        }
      }, 1000)
      const bulletTimer = setInterval(() => {
        runEnemiesBullet()
      }, 100)
      return (() => {
        clearInterval(timer)
        clearInterval(bulletTimer)
      })
    }
  }, [pause, lock])
  return (
    <Matrix matrix={matrix} isDead={tank.death} gameover={gameover}/>
  )
}

export default TankPanel