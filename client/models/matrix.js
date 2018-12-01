const Action = require('./action')
const Timeframe = require('./timeframe')
const { flat: flatPatterns, layered: layeredPatterns } = require('../patterns')
const utils = require('../utils')
const { rainbow } = require('../animations')
const { clone3dArray } = utils.grid
const { DELAY, DURATION } = require('../state/globals')

class Matrix {
  constructor(nodules) {
    this.nodules = nodules

    this.slicedNodules = this.slicedNodules.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getColumn = this.getColumn.bind(this)
    this.getNodule = this.getNodule.bind(this)
    this.getNoduleFlat = this.getNoduleFlat.bind(this)
    this.paintFlatNodules = this.paintFlatNodules.bind(this)
    this.animateSnail = this.animateSnail.bind(this)
    this.animateSnake = this.animateSnake.bind(this)
  }

  getRow(rowNum) {
    return this.nodules[rowNum]
  }

  getColumn(colNum) {
    return this.nodules.reduce((acc, cur) => [...acc, cur[colNum]], [])
  }

  getNodule(rowNum, colNum) {
    return this.nodules[rowNum][colNum]
  }

  getNoduleFlat(index) {
    return this.flatSlicedNodules()[index]
  }

  animateSnail() {
    this.paintFlatNodules(flatPatterns.snail(this.slicedNodules()))
  }

  animateSnake() {
    this.paintFlatNodules(flatPatterns.snake(this.slicedNodules()))
  }

  paintFlatNodules(flatNodules) {
    flatNodules.forEach((nodule, i) => {
      const timeframe = new Timeframe(DELAY, i, DURATION)
      // new Action(nodule, nodule.createAction(), timeframe)
      rainbow(nodule, timeframe)
      // nodule.flash(DELAY, i, DURATION)
    })
  }

  paintLayerNodules(layerNodules) {
    layerNodules.forEach((layer, i) => {
      layer.forEach(nodule => {
        const timeframe = new Timeframe(DELAY, i, DURATION)
        new Action(nodule, nodule.createAction(), timeframe)
        // nodule.flash(DELAY, i, DURATION)
      })
    })
  }

  slicedNodules() {
    return clone3dArray(this.nodules)
  }

  flatSlicedNodules() {
    return flatten3dArray(this.slicedNodules())
  }
}

module.exports = Matrix
