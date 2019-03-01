const Timeframe = require('./timeframe')
const { flat: flatPatterns, layered: layeredPatterns } = require('../patterns')
const utils = require('../utils')
const {
  borderCascade,
  borderUnravel,
  boxShadowCascade,
  boxShadowUnravel,
  circlesCascade,
  circlesUnravel,
  fontColorCascade,
  fontColorUnravel,
  rainbowCascade,
  textCascade,
  textUnravel,
  rainbowUnravel,
} = require('../animations')
const { DELAY, DURATION } = require('../state/globals')

class Matrix {
  constructor(nodules, $root) {
    this.nodules = nodules
    this.$root = $root

    this.slicedNodules = this.slicedNodules.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getColumn = this.getColumn.bind(this)
    this.getNodule = this.getNodule.bind(this)
    this.getNoduleFlat = this.getNoduleFlat.bind(this)

    this.create$container = this.create$container.bind(this)
    this.generateNextFrame = this.generateNextFrame.bind(this)
    this.append$container = this.append$container.bind(this)
    this.purge = this.purge.bind(this)
    this.render = this.render.bind(this)
  }

  slicedNodules() {
    return utils.grid.clone3dArray(this.nodules)
  }

  flatSlicedNodules() {
    return utils.grid.flatten3dArray(this.slicedNodules())
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
  create$container() {
      const $container = utils.dom.createElement('div')
      this.$container = $container
      return $container
    }

  generateNextFrame() {
    const $container = this.create$container()
    const $nodules = this.nodules.map(row => (
      row.map(nodule => (
        nodule.render()
      ))
    ))
    $nodules.forEach(row => {
      row.forEach($nodule => {
        $container.appendChild($nodule)
      })
    })
    return $container
  }

  append$container($container) {
    this.$root.appendChild($container)
  }

  purge() {
    if (this.$container) {
      this.$container.remove()
    }
    this.$container = null
  }

  render() {
    this.purge()
    const nextFrame = this.generateNextFrame()
    this.append$container(nextFrame)
  }
}

module.exports = Matrix
