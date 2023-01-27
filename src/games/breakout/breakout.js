export const initX = 18
export const initY = 4
export const initPaddleY = 3

class Breakout {
  constructor({ x, y, dx, dy, bricks, paddleY, death }) {
    this.x = x
    this.y = y
    this.dx = dx || -1
    this.dy = dy || 1
    this.bricks = bricks || this.initBricks()
    this.paddleY = paddleY
    this.paddleLength = 3
    this.death = death || false
  }

  run() {
    if (this.x + this.dx < 0) {
      this.dx = -this.dx
    }
    if (this.x + this.dx > 18) {
      if (this.y >= this.paddleY && this.y <= this.paddleY+this.paddleLength) {
        this.dx = -this.dx
      } else {
        this.death = true
      }

    }
    if (this.y + this.dy > 9 || this.y + this.dy < 0) {
      this.dy = -this.dy
    }

    this.x = this.x + this.dx
    this.y = this.y + this.dy
  }

  move(type) {
    if (type === 'left' && this.paddleY > 0) {
      if(this.x===18 && this.y > 0) {
        this.y--
      }
      this.paddleY--
    } else if (type === 'right' && this.paddleY < 7) {
      if(this.x===18 && this.y < 9) {
        this.y++
      }
      this.paddleY++
    }
  }

  initBricks() {
    let breaks = []
    for (let c = 0; c <= 3; c++) {
      for (let r = 0; r<=9; r++) {
        breaks.push([c, r])
      }
    }
    return breaks
  }

  collisionDetection() {
    const flag =  this.bricks.some(brick => {
      return brick[0] === this.x && brick[1] === this.y
    })
    if (flag) {
      this.bricks = this.bricks.filter(brick => {
        return !(brick[0] === this.x && brick[1] === this.y)
      })
      if(this.bricks.length === 0) {
        this.death = true
      }
      this.dx = -this.dx
    }
    return flag
  }

  toJsObj() {
    const { ...object } = this
    return object
  }
}

export const createNewBreakout = (obj) => {
  return new Breakout(obj)
}

export default Breakout