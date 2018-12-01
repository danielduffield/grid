const { Matrix, Nodule } = require('./models')
const { COLUMNS, ROWS } = require('./state/globals')
const utils = require('./utils')

const $nodules = utils.dom.generateElementGrid(COLUMNS, ROWS)

const nodules = $nodules.map(row => (
  row.map($nodule => {
    document.body.appendChild($nodule)
    return new Nodule($nodule)
  })
))

const matrix = new Matrix(nodules)

document.body.addEventListener('click', (e) => {
  utils.animations.triggerRandomAnimation(matrix)
})

window.onload = () => document.hasFocus() ? null : window.focus()
