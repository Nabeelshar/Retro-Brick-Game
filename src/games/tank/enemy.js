export const enemyShape =  {
  up:[[0, 1, 0],
    [1, 1, 1],
    [1, 0, 1]],
  down:[[1, 0, 1],
    [1, 1, 1],
    [0, 1, 0]],
  left:[[0, 1, 1],
    [1, 1, 0],
    [0, 1, 1]],
  right:[[1, 1, 0],
    [0, 1, 1],
    [1, 1, 0]] }

export const generateEnemy = ({ oriShape, direction, fire, xy, death }) => {
  const shape = oriShape || enemyShape[direction]
  const position = initPos(shape, xy)
  return {
    shape,
    xy,
    position,
    fire: fire || null,
    death: death || false,
    direction: direction || 'up'
  }
}

export const initPos = (shape, position) => {
  let res = []
  shape.forEach((m, k1) => {
    m.forEach((n, k2) => {
      if(n) {
        res.push([position[0]+k1, position[1]+k2])
      }
    })
  })
  return res
}

export const rotate = (shape) => {
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      shape[i][j] = shape[2-j][i]
    }
  }
}
