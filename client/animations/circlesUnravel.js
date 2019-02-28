const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const circlesUnravel = (nodule, timeframe) => {
  const sizes = utils.misc.generateArrayOfNums(11).map(num => `${num * 10}%`)
}

module.exports = circlesUnravel
