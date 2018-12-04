const utils = require('../utils')
const { Timeframe } = require('../models')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors

const borderCascade = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
  const colors = multiplyInnerColors(baseColors)
  nodule.$nodule.style.border = '2px solid white'
  createActionSet(nodule, 'style.borderColor', 'white', colors, timeframe)
}

module.exports = borderCascade
