const utils = require('../utils')
const { Timeframe } = require('../models')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors

const boxShadowCascade = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'white']
  const colors = multiplyInnerColors(baseColors).map(color => `10px 10px 10px ${color}`)
  createActionSet(nodule, 'style.boxShadow', 'none', colors, timeframe)
}

module.exports = boxShadowCascade
