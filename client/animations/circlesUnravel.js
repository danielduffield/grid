const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const circlesUnravel = (nodule, timeframe) => {
  const sizes = utils.misc.generateArrayOfNums(11).map(num => `${num * 10}%`)
  createAction(nodule, 'style.borderRadius', '0%', sizes, timeframe)
}

module.exports = circlesUnravel
