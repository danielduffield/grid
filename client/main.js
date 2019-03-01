const { Matrix, Nodule } = require('./models')
const patterns = require('./patterns')
const utils = require('./utils')
const { ROWS, COLUMNS, FPS } = require('./state/globals')
const $root = document.getElementById('root')
const $click = document.getElementById('click')

const rows = utils.misc.generateArrayOfNums(ROWS)
const columns = utils.misc.generateArrayOfNums(COLUMNS)

const nodules = columns.map(col => (
  rows.map(row => (
    new Nodule({ x: row, y: col })
  ))
))
const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
const colors = utils.colors.multiplyInnerColors(baseColors)

const matrix = new Matrix(nodules, $root)

let count = 0
let mode = 0

$click.addEventListener('click', (e) => {
  console.log(e)
  console.log('mode ', mode)
  if (mode) mode = 0
  else mode = 1
})

let fpsInterval = 1000 / FPS
let then = Date.now()
let startTime = then

const isFlat = true
const flatKeys = Object.keys(patterns.flat)
const randomFlat = patterns.flat[flatKeys[utils.misc.getRandomInt(flatKeys.length)]]
const layeredKeys = Object.keys(patterns.layered)
const randomLayered = patterns.layered[layeredKeys[utils.misc.getRandomInt(layeredKeys.length)]]
const randomAnimation = isFlat ? randomFlat : randomLayered

const nextFrame = () => {
  count++
  const updateElementsFlat = (nodule, i) => {
    nodule.update('style.backgroundColor', colors[mode ? (count + i) % colors.length : (count - i) % colors.length])
    nodule.update('style.border', `2px solid ${colors[(count + nodule.x + nodule.y - 3) % colors.length]}`)
    nodule.update('style.boxShadow', `10px 10px 10px ${colors[(count + nodule.x + nodule.y + 1) % colors.length]}`)
  }
  const updateElementsLayered = (row, i) => row.map((nodule, j) => {
    nodule.update('style.backgroundColor', colors[mode ? (count + j) % colors.length : (count - j) % colors.length])
    nodule.update('style.border', `2px solid ${colors[(count + nodule.x + nodule.y - 3) % colors.length]}`)
    nodule.update('style.boxShadow', `10px 10px 10px ${colors[(count + nodule.x + nodule.y + 1) % colors.length]}`)
  })
  const updateElements = isFlat ? updateElementsFlat : updateElementsLayered
  randomAnimation(matrix.slicedNodules()).forEach(updateElements)
  matrix.render()
}

const animate = () => {
  requestAnimationFrame(animate)
  now = Date.now()
  elapsed = now - then

  if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval)
      nextFrame()
  }
}

animate()

window.onload = () => document.hasFocus() ? null : window.focus()
