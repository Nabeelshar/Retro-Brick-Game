/* eslint-disable no-unused-vars */
import { copyData } from '../../utils/helps'
import { blankMatrix } from '../tetris/tetris'
import { enemyShape, generateEnemy, initPos } from './enemy'
const playerShape = { up:[[0, 1, 0],
  [1, 1, 1],
  [1, 1, 1]],down:[[1, 1, 1],
  [1, 1, 1],
  [0, 1, 0]],left:[[0, 1, 1],
  [1, 1, 1],
  [0, 1, 1]],right:[[1, 1, 0],
  [1, 1, 1],
  [1, 1, 0]] }

class Tank {
  constructor({ matrix, enemiesBullets, player, enemies, stones, death, direction, bullet, score }) {
    this.player = player || [15, 4]
    this.enemies = enemies || []
    this.stones = stones || this.initStones()
    this.direction = direction || 'up'
    this.death = death || false
    this.bullet = bullet || null
    this.enemiesBullets = enemiesBullets || []
    this.score = score || 0
    this.draw()
  }

  addEnemy() {
    if (this.enemies.length < 3) {
      this.enemies = this.enemies.concat(generateEnemy({ direction:this.randomEnemyDirection(), xy: this.randomEnemyPos() }))
    }
  }

  randomEnemyDirection(){
    const idx = Math.floor(Math.random()*4)
    let res
    switch(idx) {
    case 0: res = 'up';break
    case 1: res = 'down'; break
    case 2: res = 'left'; break
    case 3: res = 'right'; break
    }
    return res
  }

  randomEnemyPos() {
    let x
    let y
    let flag = true
    do {
      x = Math.ceil(Math.random()*17)
      y = Math.ceil(Math.random()*7)
      for(let i=0; i<3; i++) {
        let find = false
        for(let j=0; j<3; j++){
          if (this.matrix[i+x][j+y]) {
            flag = true
            find = true
            break
          }
          if(i===2 && j===2 && this.matrix[i+x][j+y]===0){
            flag = false
          }
        }
        if(find) {
          break
        }
      }
    } while (flag)
    return [x, y]
  }

  run() {
    const add = Math.random() > 0.6
    if (add) {
      this.addEnemy()
    }
    this.enemiesMove()
    // this.enemiesFire()
  }

  enemiesMove() {
    this.enemies = this.enemies.map((enemy) => {
      const newEnemy = Object.assign({}, enemy)
      const nextXy = this.getNextXy(enemy.xy, enemy.direction)
      if (this.checkMove(nextXy, enemy.direction)) {
        newEnemy.xy = nextXy
        newEnemy.position = initPos(newEnemy.shape, newEnemy.xy)
      } else {
        newEnemy.direction = this.randomEnemyDirection()
        newEnemy.shape = enemyShape[newEnemy.direction]
        newEnemy.position = initPos(newEnemy.shape, newEnemy.xy)
      }
      return newEnemy
    })
  }
  enemiesFire() {
    const idx = Math.floor(Math.random()*3)
    const enemy = this.enemies[Math.floor(Math.random()*3)]
    if(!enemy) return
    let pos
    switch(enemy.direction) {
    case 'up': {
      pos = [enemy.xy[0]-1, enemy.xy[1]+1]
      break
    }
    case 'down': {
      pos = [enemy.xy[0]+3, enemy.xy[1]+1]
      break
    }
    case 'left': {
      pos = [enemy.xy[0]+1, enemy.xy[1]-1]
      break
    }
    case 'right': {
      pos = [enemy.xy[0]+1, enemy.xy[1]+3]
      break
    }
    }
    this.enemiesBullets = this.enemiesBullets.concat({ direction: enemy.direction, pos })
    this.enemiesBullets = this.enemiesBullets.filter(bullet => !(bullet.pos[0]<0 || bullet.pos[0] >19 ||
        bullet.pos[1]<0 || bullet.pos[1] > 9))

  }

  runEnemiesBullet() {
    this.enemiesBullets = this.enemiesBullets.map(bullet => {
      const pos = [...bullet.pos]
      switch(bullet.direction) {
      case 'up': {
        pos[0]--
        break
      }
      case 'down': {
        pos[0]++
        break
      }
      case 'left': {
        pos[1]--
        break
      }
      case 'right': {
        pos[1]++
        break
      }
      }
      return { ...bullet, pos }
    })
    //remove bullet which out of matrix
    this.enemiesBullets = this.enemiesBullets.filter(bullet => !(bullet.pos[0]<0 || bullet.pos[0] >19 ||
        bullet.pos[1]<0 || bullet.pos[1] > 9))
  }

  initStones() {
    let res = []
    for(let i=0; i<3; i++) {
      const x = Math.ceil(Math.random()*19)
      const y = Math.ceil(Math.random()*9)
      //stone can't be generated at corner
      if((x===0 && y===0) || (x===0&&y===9)||
         (x===19 && y===0) ||(x===19 && y===19)) {
        continue
      }
      res.push([x, y])
    }
    return res
  }

  draw() {
    let matrix = copyData(blankMatrix)

    this.shootingDetection()
    this.shootedPlayerDetection()
    //draw stone
    this.stones.forEach(stone => {
      matrix[stone[0]][stone[1]] = 1
    })

    // draw enemies
    this.enemies.forEach((enemy) => {enemy.position.forEach((pos) => {
      matrix[pos[0]][pos[1]] = 1
    })})

    //draw player
    playerShape[this.direction].forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          matrix[k1+this.player[0]][k2+this.player[1]] = n
        }
      })
    })

    //draw fire
    this.stopFire()
    if (this.bullet) {
      matrix[this.bullet.pos[0]][this.bullet.pos[1]] = 2
    }
    //draw enemy fire
    if (this.enemiesBullets.length>0) {
      this.enemiesBullets.forEach(bullet => {
        matrix[bullet.pos[0]][bullet.pos[1]] = 3
      })
    }
    this.matrix = matrix
  }

  shootingDetection() {
    if (this.bullet === null) {
      return
    }
    //射中石头
    const shootedStone = this.stones.some(stone => stone[0] === this.bullet.pos[0] && stone[1] === this.bullet.pos[1])
    if (shootedStone) {
      this.stones = this.stones.filter(stone => !(stone[0] === this.bullet.pos[0] && stone[1] === this.bullet.pos[1]))
      this.bullet = null
      this.score += 100
    }

    if (this.bullet === null) {
      return
    }
    //射中敌人
    const shootedEnemy = this.enemies.some(enemy => enemy.position.some(pos => pos[0] === this.bullet.pos[0] && pos[1] === this.bullet.pos[1]))
    if (shootedEnemy) {
      this.enemies = this.enemies.filter(enemy => !enemy.position.some(pos => pos[0] === this.bullet.pos[0] && pos[1] === this.bullet.pos[1]))
      this.bullet = null
      this.score += 200
    }
  }

  shootedPlayerDetection() {
    let positions = []
    playerShape[this.direction].forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          positions.push([this.player[0]+k1, this.player[1]+k2])
        }
      })
    })
    //敌人射中玩家
    this.enemiesBullets.forEach(bullet => {
      const shooted = positions.some(pos => pos[0] === bullet.pos[0] && pos[1] === bullet.pos[1])
      if(shooted) {
        this.death = true
      }
    })
  }

  fire() {
    if (this.bullet === null) {
      let pos
      switch(this.direction) {
      case 'up': {
        pos = [this.player[0]-1, this.player[1]+1]
        break
      }
      case 'down': {
        pos = [this.player[0]+3, this.player[1]+1]
        break
      }
      case 'left': {
        pos = [this.player[0]+1, this.player[1]-1]
        break
      }
      case 'right': {
        pos = [this.player[0]+1, this.player[1]+3]
        break
      }
      }
      this.bullet = { direction: this.direction, pos }
    } else {
      const pos = [...this.bullet.pos]
      switch(this.bullet.direction) {
      case 'up': {
        pos[0]--
        break
      }
      case 'down': {
        pos[0]++
        break
      }
      case 'left': {
        pos[1]--
        break
      }
      case 'right': {
        pos[1]++
        break
      }
      }
      this.bullet = { ...this.bullet, pos }
    }
  }

  stopFire() {
    if (this.bullet) {
      if(this.bullet.pos[0]<0 || this.bullet.pos[0] >19 ||
            this.bullet.pos[1]<0 || this.bullet.pos[1] > 9) {
        this.bullet = null
      }
    }
  }

  getNextXy(xy, type) {
    let nextXy
    switch(type) {
    case 'up': {
      nextXy = [xy[0]-1, xy[1]]
      break
    }
    case 'down': {
      nextXy = [xy[0]+1, xy[1]]
      break
    }
    case 'left': {
      nextXy = [xy[0], xy[1]-1]
      break
    }
    case 'right': {
      nextXy = [xy[0], xy[1]+1]
      break
    }
    }
    return nextXy
  }

  checkMove(nextXy, type) {
    switch(type) {
    case 'up': {
      if(nextXy[0] < 0) {return false}
      if (this.matrix[nextXy[0]+1][nextXy[1]] || this.matrix[nextXy[0]+1][nextXy[1]+2] || this.matrix[nextXy[0]][nextXy[1]+1]) {
        return false
      }
      break
    }
    case 'down': {
      if(nextXy[0] > 17) {return false}
      if (this.matrix[nextXy[0]+1][nextXy[1]] || this.matrix[nextXy[0]+1][nextXy[1]+2] || this.matrix[nextXy[0]+2][nextXy[1]+1]) {
        return false
      }
      break
    }
    case 'left': {
      if(nextXy[1] < 0) {return false}
      if (this.matrix[nextXy[0]][nextXy[1]+1] || this.matrix[nextXy[0]+1][nextXy[1]] || this.matrix[nextXy[0]+2][nextXy[1]+1]) {
        return false
      }
      break
    }
    case 'right': {
      if(nextXy[1] > 7) {return false}
      if (this.matrix[nextXy[0]][nextXy[1]+1] || this.matrix[nextXy[0]+1][nextXy[1]+2] || this.matrix[nextXy[0]+2][nextXy[1]+1]) {
        return false
      }
      break
    }
    }
    return true
  }

  move(type) {
    if (this.direction !== type) {
      this.direction = type
    } else {
      let nextXy = this.getNextXy(this.player, type)
      if (this.checkMove(nextXy, type)) {
        this.player = nextXy
      }
    }
  }

  drawPlayer() {
    let matrix = copyData(blankMatrix)
    playerShape[this.direction].forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          matrix[k1+this.player[0]][k2+this.player[1]] = n
        }
      })
    })
    this.matrix = matrix
  }

  toJsObj() {
    const { ...object } = this
    return object
  }
}

export const createNewTank = () => {
  return new Tank({})
}

export default Tank