
const transform = (function () {
  const trans = ['transform', 'webkitTransform', 'msTransform', 'mozTransform', 'oTransform']
  const body = document.body
  return trans.filter((e) => body.style[e] !== undefined)[0]
}())

const speeds = [800, 650, 500, 370, 250, 160]

const delays = [50, 60, 70, 80, 90, 100]

export {
  transform,
  speeds,
  delays,
}