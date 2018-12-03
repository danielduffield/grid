const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const textUnravel = (nodule, timeframe) => {
  const text = 'All work and no play makes Jack a dull boy. '
  createAction(nodule, 'textContent', '', text[timeframe.delayKey % text.length], timeframe)
}

module.exports = textUnravel
