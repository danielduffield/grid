const { Matrix, Nodule } = require('./models')
const { COLUMNS, ROWS } = require('./state/globals')
const utils = require('./utils')
const patterns = require('./patterns')
const { flat, layered } = patterns

const $nodules = utils.dom.generateElementGrid(COLUMNS, ROWS)

const nodules = $nodules.map(row => (
  row.map($nodule => {
    document.body.appendChild($nodule)
    return new Nodule($nodule)
  })
))

const matrix = new Matrix(nodules)

const actions = [
  // () => matrix.paintFlatNodules(matrix.getColumn(x)),
  // () => matrix.paintFlatNodules(matrix.getRow(y)),

  () => matrix.animate(flat.snail, 'flat'),
  () => matrix.animate(flat.snail, 'flat', true),
  () => matrix.animate(flat.snake, 'flat'),
  () => matrix.animate(flat.snake, 'flat', true),
  () => matrix.animate(flat.stack, 'flat'),
  () => matrix.animate(flat.stack, 'flat', true),

  () => matrix.animate(layered.concentric, 'layered'),
  () => matrix.animate(layered.concentric, 'layered', true),
  () => matrix.animate(layered.wipe('down'), 'layered'),
  () => matrix.animate(layered.wipe('up'), 'layered'),
  () => matrix.animate(layered.wipe('right'), 'layered'),
  () => matrix.animate(layered.wipe('left'), 'layered'),

  () => matrix.animate(layered.wipeDiagonal('southeast'), 'layered'),
  () => matrix.animate(layered.wipeDiagonal('southeast'), 'layered', true),
]

document.body.addEventListener('click', (e) => {
  actions[utils.misc.getRandomInt(actions.length)]()
})

window.onload = () => document.hasFocus() ? null : window.focus()
