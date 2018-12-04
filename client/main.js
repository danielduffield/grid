const { Matrix, Nodule } = require('./models')
const { COLUMNS, ROWS } = require('./state/globals')
const utils = require('./utils')

const $nodules = utils.dom.generateElementGrid(COLUMNS, ROWS)

const nodules = $nodules.map(row => (
  row.map($nodule => new Nodule($nodule))
))

const matrix = new Matrix(nodules)

matrix.appendNodules(document.body)

// document.body.addEventListener('click', (e) => {
//   utils.animations.triggerRandomAnimation(matrix)
// })

function randomIntervalAnimation() {
  utils.animations.triggerRandomAnimation(matrix)
  const delay = (5 + utils.misc.getRandomInt(10)) * 1000
  setTimeout(randomIntervalAnimation, delay)
}

setTimeout(randomIntervalAnimation, 5000)

window.onload = () => document.hasFocus() ? null : window.focus()
