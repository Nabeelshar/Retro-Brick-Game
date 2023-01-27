export const blockShape = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
}
// const origin = {
//   I: [
//     [-1, 1],
//     [1, -1],
//   ],
//   L: [[0, 0]],
//   J: [[0, 0]],
//   Z: [[0, 0]],
//   S: [[0, 0]],
//   O: [[0, 0]],
//   T: [
//     [0, 0],
//     [1, 0],
//     [-1, 1],
//     [0, -1],
//   ],
// }

export const blockType = Object.keys(blockShape)

export const rotate = (shape) => {
  let res = Array(shape[0].length).fill(Array(shape.length).fill(0))
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      res[i][j] = shape[j][i]
    }
  }
  return res
}
