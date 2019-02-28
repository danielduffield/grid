const utils = require('../utils')
const { Timeframe } = require('../models')
const { multiplyInnerColors } = utils.colors

const fontColorCascade = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'white']
  const colors = multiplyInnerColors(baseColors)
}

module.exports = fontColorCascade
