const Action = require('./action')
const Timeframe = require('./timeframe')
const { flat: flatPatterns, layered: layeredPatterns } = require('../patterns')
const utils = require('../utils')
const {
  borderCascade,
  borderUnravel,
  rainbowCascade,
  textCascade,
  textUnravel,
  rainbowUnravel,
} = require('../animations')
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
    this.animate = this.animate.bind(this)
    this.appendNodules = this.appendNodules.bind(this)
  }

  appendNodules($container) {
    this.nodules.forEach((row) => (
      row.forEach(nodule => $container.appendChild(nodule.$nodule))
    ))
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

  animate(pattern, animation, options) {
    const { isReverse, isLayered } = options
    const renderMethodMap = {
      borderCascade,
      borderUnravel,
      rainbowCascade,
      rainbowUnravel,
      textCascade,
      textUnravel,
    }
    const toAnimate = pattern(this.slicedNodules())
    if (isReverse) toAnimate.reverse()

    if (options.isLayered) {
      toAnimate.forEach((layer, i) => {
        layer.forEach(nodule => {
          const timeframe = new Timeframe(DELAY, i, DURATION)
          renderMethodMap[animation](nodule, timeframe)
        })
      })
    } else {
      toAnimate.forEach((nodule, i) => {
        const timeframe = new Timeframe(DELAY, i, DURATION)
        renderMethodMap[animation](nodule, timeframe)
      })
    }
  }

  slicedNodules() {
    return clone3dArray(this.nodules)
  }

  flatSlicedNodules() {
    return flatten3dArray(this.slicedNodules())
  }
}

module.exports = Matrix
