const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const borderUnravel = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
  const colors = multiplyInnerColors(baseColors)
  createAction(nodule, 'style.borderColor', 'white', colors[timeframe.delayKey % colors.length], timeframe)
}

module.exports = borderUnravel
