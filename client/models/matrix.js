const Action = require('./action')
const Timeframe = require('./timeframe')
const { flat: flatPatterns, layered: layeredPatterns } = require('../patterns')
const utils = require('../utils')
const { rainbow, textCascade, textUnravel } = require('../animations')
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
    this.animate = this.animate.bind(this)
    this.animateText = this.animateText.bind(this)
    this.animateTextCascade = this.animateTextCascade.bind(this)
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

  animate(pattern, type, isReverse) {
    const paintMethodMap = {
      flat: this.paintFlatNodules,
      layered: this.paintLayerNodules,
    }
    const toAnimate = pattern(this.slicedNodules())
    if (isReverse) toAnimate.reverse()
    paintMethodMap[type](toAnimate)
  }

  animateText(pattern, type, isReverse) {
    const textMethodMap = {
      flat: this.textFlatNodules,
      layered: this.textLayerNodules,
    }
    const toAnimate = pattern(this.slicedNodules())
    textMethodMap[type](toAnimate)
  }

  animateTextCascade(pattern, type, isReverse) {
    const paintMethodMap = {
      flat: this.textCascadeFlatNodules,
      layered: this.textCascadeLayerNodules,
    }
    const toAnimate = pattern(this.slicedNodules())
    if (isReverse) toAnimate.reverse()
    paintMethodMap[type](toAnimate)
  }

  textCascadeFlatNodules(flatNodules) {
    flatNodules.forEach((nodule, i) => {
      const timeframe = new Timeframe(DELAY, i, DURATION)
      textCascade(nodule, timeframe)
    })

  }

  textCascadeLayerNodules(layerNodules) {
    layerNodules.forEach((layer, i) => {
      layer.forEach(nodule => {
        const timeframe = new Timeframe(DELAY, i, DURATION)
        textCascade(nodule, timeframe)
      })
    })
  }

  textFlatNodules(nodules) {
    textUnravel(nodules)
  }

  textLayerNodules(nodules) {
    textUnravel(nodules, true)
  }

  paintFlatNodules(flatNodules) {
    flatNodules.forEach((nodule, i) => {
      const timeframe = new Timeframe(DELAY, i, DURATION)
      rainbow(nodule, timeframe)
    })
  }

  paintLayerNodules(layerNodules) {
    layerNodules.forEach((layer, i) => {
      layer.forEach(nodule => {
        const timeframe = new Timeframe(DELAY, i, DURATION)
        rainbow(nodule, timeframe)
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
