const utils = require('../utils')
const { Timeframe } = require('../models')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors

const circlesCascade = (nodule, timeframe) => {
  const sizes = utils.misc.generateArrayOfNums(11).map(num => `${num * 10}%`)
  createActionSet(nodule, 'style.borderRadius', '0%', sizes, timeframe)
}

module.exports = circlesCascade
