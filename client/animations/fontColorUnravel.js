const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const fontColorUnravel = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'white']
  const colors = multiplyInnerColors(baseColors)
  createAction(nodule, 'style.color', 'black', colors[timeframe.delayKey % colors.length], timeframe)
}

module.exports = fontColorUnravel
