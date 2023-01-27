export const speeds = [1000, 800, 650, 500, 370, 200]

export default class Snake {

  constructor({ head, bodies, food, deadth, levels, direction }) {
    this.head = head || this.initHead()
    this.bodies = bodies || this.initBodies(levels)
    this.food = food || this.changeFood()
    this.deadth = deadth || false
    this.direction = direction || ''
  }

  initHead() {
    return [
      Math.floor(Math.random()*19),
      Math.floor(Math.random()*4)
    ]
  }

  initBodies({ levels }) {
    let bodies = [this.head]
    let l = levels + 1
    if(l > 5) l = 5
    while(bodies.length < 6 && l > 0) {
      bodies.push([
        this.head[0],
        bodies[bodies.length-1][1]+1,
      ])
      l--
    }
    return bodies
  }

  changeFood() {
    let food = randomXY()
    // while(this.bodies.contains(food)) {
    //   food = List(randomXY())
    // }
    while(this.bodies.some(point => {
      return point[0] === food[0] && point[1] === food[1]
    })) {
      food = randomXY()
    }
    return food
  }

  setDeath(death) {
    this.deadth = death
  }

  getDeath() {
    return this.deadth
  }

  getHead() {
    return this.head
  }

  addBody() {
    this.bodies = [[...this.head], ...this.bodies.concat()]
  }

  moveBody(x, y) {
    const newBodies = this.bodies.slice(0, -1)
    newBodies.unshift([x, y])
    this.bodies = newBodies
  }

  //检测头是否撞到身体
  checkHeadBody(x, y) {
    return this.bodies.slice(1).some(point => {
      return point[0] === x && point[1] === y
    })
  }

  checkBorder(x, y) {
    return x >= 0 && x <20 &&
           y >= 0 && y <10
  }

  getNextXY() {
    let [x, y] = this.head
    switch(this.direction) {
    case 'down': x+=1; break
    case 'up': x-=1; break
    case 'left': y-=1; break
    case 'right': y+=1; break
    }
    return [x, y]
  }

  move() {
    let [x, y] = this.getNextXY()
    //反向
    if (x===this.bodies[1][0] && y===this.bodies[1][1]) {
      return false
    }

    if (!this.checkBorder(x, y) || this.checkHeadBody(x, y)) {
      this.setDeath(true)
      return false
    }

    this.head = [x, y]

    if (x === this.food[0] && y === this.food[1]) {
      this.addBody()
      this.food = this.changeFood()
      return true
    }
    this.moveBody(x, y)

    return false
  }

  toJsObj() {
    return {
      head: this.head,
      bodies: this.bodies,
      food: this.food,
      death: this.deadth,
      direction: this.direction
    }
  }
}

export const randomXY = () => {
  return [
    Math.floor(Math.random()*19),
    Math.floor(Math.random()*9),
  ]
}

export const createNewSnake = (levels) => {
  return new Snake({ levels })
}