const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const boxShadowUnravel = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'white']
  const colors = multiplyInnerColors(baseColors).map(color => `10px 10px 10px ${color}`)
  createAction(nodule, 'style.boxShadow', 'none', colors[timeframe.delayKey % colors.length], timeframe)
}

module.exports = boxShadowUnravel
