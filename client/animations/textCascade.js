const utils = require('../utils')
const { Timeframe } = require('../models')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors

const textCascade = (nodule, timeframe) => {
  const text = 'All work and no play makes Jack a dull boy.'
  createActionSet(nodule, 'textContent', '', text.split(''), timeframe)
}

module.exports = textCascade
