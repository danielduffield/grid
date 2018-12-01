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

const actionSignatures = [
  { pattern: flat.snail, type: 'flat' },
  { pattern: flat.snail, type: 'flat', isReverse: true },
  { pattern: flat.snake, type: 'flat' },
  { pattern: flat.snake, type: 'flat', isReverse: true },
  { pattern: flat.stack, type: 'flat' },
  { pattern: flat.stack, type: 'flat', isReverse: true },

  { pattern: layered.concentric, type: 'layered' },
  { pattern: layered.concentric, type: 'layered', isReverse: true },
  { pattern: layered.wipe('down'), type: 'layered' },
  { pattern: layered.wipe('up'), type: 'layered' },
  { pattern: layered.wipe('right'), type: 'layered' },
  { pattern: layered.wipe('left'), type: 'layered' },

  { pattern: layered.wipeDiagonal('southeast'), type: 'layered' },
  { pattern: layered.wipeDiagonal('southeast'), type: 'layered', isReverse: true },
]
const animationTypes = ['animate', 'animateText', 'animateTextCascade']
const actions = utils.grid.flatten3dArray(
  actionSignatures.map(signature => (
    animationTypes.map(animationType => (
      () => matrix[animationType](signature.pattern, signature.type, signature.isReverse)
    ))
  ))
)

document.body.addEventListener('click', (e) => {
  actions[utils.misc.getRandomInt(actions.length)]()
})

window.onload = () => document.hasFocus() ? null : window.focus()
