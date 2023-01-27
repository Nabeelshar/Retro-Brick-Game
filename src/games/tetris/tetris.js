import { blockType, blockShape } from './block'
//初始坐标
export const originXY = [-2, 4]
const addScores = [100, 300, 700, 1500]
export const addSpeedScore = 1000
export const speeds = [800, 650, 500, 370, 250, 160]

const blankLine = Array(10).fill(0)
export const blankMatrix = (() => {
  const matrix = Array(20).fill(blankLine)
  return matrix
})()

export const initMatrix = (levels) => {
  let res = []
  if (levels > 10) {
    levels = 10
  }
  for(let i=0; i<levels; i++) {
    res.push(initLines())
  }
  while(res.length<20) {
    res.unshift(Array(10).fill(0))
  }
  return res
}

const initLines = () => {
  //4~8个1
  let n = Math.floor(Math.random()*4)+4
  let lines = Array(n).fill(1).concat(Array(10-n).fill(0))
  lines.sort(() => {
    return .5 - Math.random()
  })
  return lines
}

class Tetris {
  constructor({ levels, matrix, next, score, shape, xy }) {
    this.matrix = this.copyData(matrix)
    this.xy = this.copyData(xy)
    this.shape = this.copyData(shape)
    this.next = next
    this.score = score || 0
    this.levels = levels
  }

  copyData(data) {
    const res = []
    for (let l of data) {
      if (typeof l === 'object') {
        const [...line] = l
        res.push(line)
      } else {
        res.push(l)
      }
    }
    return res
  }

  createInitState() {

    return blankMatrix
  }

  incLevels() {
    this.levels++
  }

  decLevels() {
    this.levels--
  }

  levelsToScore() {
    const res =  this.levels * 2
    //等级越高，加分越多，最高加12分
    return res > 12 ? 12 : res
  }

  // 是否达到消除状态
  clearLines() {
    if (this.checkMove('down')) {
      return []
    }
    const clearLines = []
    this.matrix.forEach((m, k) => {
      if (m.every(n => !!n)) {
        clearLines.push(k)
      }
    })
    return clearLines
  }

  //消除
  clear() {
    this.matrix = this.matrix.filter(line => !line.every(n => !!n))
    let lines = this.matrix.length
    this.score += addScores[20-lines]
    if (lines === 20) {
      return false
    }
    while(lines<20) {
      this.matrix.unshift(Array(10).fill(0))
      lines++
    }
    return true
  }

  isDead() {
    return this.matrix.every(line => line.some(n => !!n))
  }

  canDown() {
    return this.checkMove('down')
  }

  //移动前检测
  checkMove(action) {
    const nextXY = this.getNextXY(action)
    let shape = this.shape
    if (action === 'rotate') {
      shape = this.rotate()
    }

    return shape.every((m, k1) => (
      m.every((n, k2) => {
        //left
        if (nextXY[1] < 0) {
          return false
        }
        //right
        if (nextXY[1] + shape[0].length > 10) {
          return false
        }
        //bottom
        if (nextXY[0] + k1 >= 20) {
          return false
        }

        //目标位置且在目前方块外有方块
        if (n) {
          const distX = nextXY[0] + k1
          const distY = nextXY[1] + k2
          if (distX >=0 && distX <20 &&
              distY >=0 && distY < 10 &&
              this.matrix[distX][distY]) {
            return false
          }
          return true
        }
        return true
      })
    ))
  }

  getNextXY(type) {
    const [...nextXY] = this.xy
    switch (type) {
    case 'down': {
      nextXY[0]++
      break
    }
    case 'left': {
      nextXY[1]--
      break
    }
    case 'right': {
      nextXY[1]++
      break
    }
    case 'rotate': {
      nextXY[0] = nextXY[0] + (this.shape.length - this.shape[0].length)
      break
    }
    }
    return nextXY
  }
  move(action = 'down') {
    const nextXY = this.getNextXY(action)
    if (!this.checkMove(action)) {
      return false
    }

    if (action === 'rotate') {
      this.shape = this.rotate()
    }
    this.xy = nextXY
    return true
  }

  draw() {
    for(let i=0; i<this.shape.length; i++) {
      for (let j=0; j<this.shape[0].length; j++) {
        //绘制新位置
        if (i+this.xy[0] >= 0 && i+this.xy[0] < 20 && j+this.xy[1] >= 0 && j+this.xy[1] < 10) {
          if (this.shape[i][j]) {
            this.matrix[i+this.xy[0]][j+this.xy[1]] = 1
          }
        }
      }
    }
    this.score += this.levelsToScore()
  }

  rotate(){
    const cols = this.shape.length
    const rows = this.shape[0].length
    const N = Math.max(cols, rows)
    let res = []
    for (let j=0; j<N; j++) {
      const line = Array(N).fill(0)
      res.push(line)
    }

    for(let i=0; i<N; i++) {
      for(let j=0; j<N; j++) {
        res[i][j] = (N-1-j>=0 && N-1-j<cols && this.shape[N-j-1][i]) || 0
      }
    }

    //删除全0col
    res = res.filter((row) => row.some(number => number!==0))

    //删除全0row
    for(let j=0; j<res[res.length-1].length;) {
      let flag = false
      for(let i=0; i<res.length; i++) {
        if (res[i][j] === 1) {
          flag = true
          continue
        }
      }
      if(!flag) {
        for(let k = 0; k<res.length; k++) {
          res[k].splice(j, 1)
        }
      } else {
        j++
      }
    }
    return res
  }

  toJsObj() {
    return {
      matrix: this.matrix,
      xy: this.xy,
      next: this.next,
      shape: this.shape,
      score: this.score,
      levels: this.levels
    }
  }

  static getNextType() {
    // return 'O'
    return blockType[Math.floor(Math.random() * blockType.length)]
  }

}

export const createNewTetris = ({ levels, next }) => {
  next = next || Tetris.getNextType()
  const shape = blockShape[next]
  next = Tetris.getNextType()
  const params = {
    matrix: initMatrix(levels-1),
    xy: originXY,
    next,
    shape,
    score: 0,
    levels: levels
  }
  return new Tetris(params)
}

export default Tetris
