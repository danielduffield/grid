const { Matrix, Nodule } = require('./models')
const { COLUMNS, ROWS } = require('./state/globals')
const utils = require('./utils')

const $nodules = utils.dom.generateElementGrid(COLUMNS, ROWS)

const nodules = $nodules.map(row => (
  row.map($nodule => new Nodule($nodule))
))

const matrix = new Matrix(nodules)

matrix.appendNodules(document.body)

document.body.addEventListener('click', (e) => {
  utils.animations.triggerRandomAnimation(matrix)
})

// setInterval(() => {
//   utils.animations.triggerRandomAnimation(matrix)
// }, 10000)

window.onload = () => document.hasFocus() ? null : window.focus()
