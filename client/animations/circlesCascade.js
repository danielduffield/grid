const utils = require('../utils')
const { Timeframe } = require('../models')
const { multiplyInnerColors } = utils.colors

const circlesCascade = (nodule, timeframe) => {
  const sizes = utils.misc.generateArrayOfNums(11).map(num => `${num * 10}%`)
}

module.exports = circlesCascade
