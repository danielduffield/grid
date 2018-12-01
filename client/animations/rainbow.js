const utils = require('../utils')
const { Timeframe } = require('../models')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors

const rainbow = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
  const colors = multiplyInnerColors(baseColors)
  colors.push(nodule.$nodule.style.backgroundColor || 'white')
  createActionSet(nodule, 'style.backgroundColor', colors, timeframe)
}

module.exports = rainbow
