const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const rainbowUnravel = (nodule, timeframe) => {

  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
  const colors = multiplyInnerColors(baseColors)
}

module.exports = rainbowUnravel
