const utils = require('../utils')
const Timeframe = require('../models/timeframe')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors
const { DELAY, DURATION } = require('../state/globals')

const textUnravel = (nodules, isLayered) => {
  const text = 'All work and no play makes Jack a dull boy.'

  if (isLayered) {
    nodules.forEach((layer, i) => {
      layer.forEach(nodule => {
        const timeframe = new Timeframe(DELAY, i, 5000)
        createAction(nodule, 'textContent', '', text[i % text.length], timeframe)
      })
    })
  } else {
    nodules.forEach((nodule, i) => {
      const timeframe = new Timeframe(DELAY, i, 5000)
      createAction(nodule, 'textContent', '', text[i % text.length], timeframe)
    })
  }
}

module.exports = textUnravel
