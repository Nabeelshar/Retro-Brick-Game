export const speeds = [1000, 800, 650, 500, 370, 200]
export const shape = [[0, 1, 0],[1, 1, 1],[0, 1, 0],[1, 0, 1]]
export const defaultSider = [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0]

export default class Shooting {

  constructor({ x, stones, sider, death, fire }) {
    this.x = x || 5
    this.stones = stones || this.initStones()
    // this.stones = stones || [[0,3], [2, 3], [1, 5], [15, 4], [16, 3], ]
    this.sider = sider || defaultSider
    this.death = death || false
    this.fire = fire || false
  }

  initStones() {
    return [
      ...this.randomStone()
    ]
  }
  randomStone() {
    const num = Math.floor(Math.random()*2)
    const res = []
    for (let i=0; i<num; i++) {
      res.push([
        0,
        Math.floor(Math.random()*6)+2
      ])
    }
    return res
  }

  addStones() {
    this.stones = this.stones.concat(this.randomStone())
  }

  fallStones() {
    this.stones = this.stones.map((stone) => {
      return [stone[0]+1, stone[1]]
    }).filter(stone => {
      return stone[0] <= 19
    })
  }

  setDeath(death) {
    this.death = death
  }

  getDeath() {
    return this.death
  }

  shoot() {
    this.fire = true
  }

  shootStone() {
    let shootedStone = []
    for(let i=14; i>=0; i--) {
      if (this.stones.some(stone => stone[1]===this.x && stone[0] === i)) {
        shootedStone = [i, this.x]
        break
      }
    }
    if (shootedStone.length === 0) {
      return false
    }
    this.stones = this.stones.filter((stone) =>
      (stone[0] !== shootedStone[0] && stone[1] !== shootedStone))
    return true
  }

  stopShoot() {
    this.fire = false
  }

  moveSider() {
    const item = this.sider[0]
    const newSider = this.sider.slice(1).concat(item)
    this.sider = newSider
  }

  checkStones(nextX) {
    // const position = [15,nextX-2]
    let positions = []
    shape.forEach((m, k1) => {
      m.forEach((n, k2) => {
        if(n) {
          positions.push([15+k1, nextX-1+k2])
        }
      })
    })
    return this.stones.every((point) => {
      return positions.every((pos => {
        return pos[0] !== point[0] || pos[1] !== point[1]
      }))
    })
  }

  run() {
    this.fallStones()  //落石
    this.addStones()
    this.moveSider() //路边
    if (!this.checkStones(this.x)) {
      this.setDeath(true)
      return false
    }
    return true
  }

  move(type) {
    let nextX = this.x
    switch(type) {
    case 'left':
      if (this.x <= 2) {
        return false
      } else {
        nextX = this.x-1
        if(this.checkStones(nextX)) {
          this.x = nextX
          return true
        }
        return false
      }
    case 'right':
      if (type==='right' && this.x >= 7) {
        return false
      } else {
        nextX = this.x+1
        if(this.checkStones(nextX)) {
          this.x = nextX
          return true
        }
        return false
      }
    default: return false
    }
  }

  toJsObj() {
    return {
      x: this.x,
      sider: this.sider,
      death: this.death,
      stones: this.stones,
      fire: this.fire
    }
  }
}

export const randomXY = () => {
  return [
    Math.floor(Math.random()*19),
    Math.floor(Math.random()*9),
  ]
}

export const createNewShooting = () => {
  return new Shooting({ x: 5 })
}