const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const rainbowUnravel = (nodules, isLayered) => {

  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
  const colors = multiplyInnerColors(baseColors)

  if (isLayered) {
    nodules.forEach((layer, i) => {
      layer.forEach(nodule => {
        const timeframe = new Timeframe(DELAY, i, 5000)
        createAction(nodule, 'style.backgroundColor', '', colors[i % colors.length], timeframe)
      })
    })
  } else {
    nodules.forEach((nodule, i) => {
      const timeframe = new Timeframe(DELAY, i, 5000)
      createAction(nodule, 'style.backgroundColor', '', colors[i % colors.length], timeframe)
    })
  }
}

module.exports = rainbowUnravel
