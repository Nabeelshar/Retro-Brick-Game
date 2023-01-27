export const speeds = [1000, 800, 650, 500, 370, 200]
export const shape = [[0, 1, 0],[1, 1, 1],[0, 1, 0],[1, 0, 1]]
export const randomCarIndex = [-8, -9, -10, -11]
export const defaultSider = [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0]

class Racing {
  constructor({ y, cars, sider, death }) {
    this.x = 15 //固定行
    this.y = y || 2
    this.cars = cars || [[-10, 2]]
    this.sider = sider || defaultSider
    this.death = death || false
  }

  addCar() {
    if (this.cars.length > 0 && this.cars[this.cars.length-1][0] <= 0) {
      return
    }
    this.cars = this.cars.concat([this.randomCar()])
  }

  removeCar() {
    this.cars = this.cars.filter(car => car[0]<20)
  }

  moveSider() {
    const item = this.sider[0]
    const newSider = this.sider.slice(1).concat(item)
    this.sider = newSider
  }

  run() {
    this.addCar()
    this.cars = this.cars.map(car => {
      return [car[0]+1, car[1]]
    })
    if (this.collisionDetection()) {
      this.death = true
    }
    this.removeCar()
    this.moveSider()
  }

  randomCar() {
    const idx = Math.floor((Math.random()*randomCarIndex.length))
    const x = randomCarIndex[idx]
    const y = Math.random() > 0.5 ? 2 : 5
    return [x, y]
  }

  collisionDetection() {
    return this.cars.some(car => car[1] === this.y && (car[0]>=13 && car[0]<18))
  }

  checkMove() {
    return !this.cars.some(car => car[0] === 13 || car[0] === 15 || car[0] === 17)
  }

  move(type) {
    if (!this.checkMove()) {
      return false
    }
    if (type === 'left') {
      this.y = 2
    }
    if (type === 'right') {
      this.y = 5
    }
    return true
  }

  toJsObj() {
    const { ...object } = this
    return object
  }
}

export const createNewRacing = () => {
  return new Racing({})
}

export default Racing