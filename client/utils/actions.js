const Action = require('../models/action')
const Timeframe = require('../models/timeframe')

const misc = require('./misc')
const { deepRead, deepSet } = misc

const createAction = (nodule, propKey, initialValue, nextValue, timeframe) => {
  const props = propKey.split('.')
  const trigger = {
    activate: () => deepSet(nodule.$nodule, propKey, nextValue),
    revert: () => deepSet(nodule.$nodule, propKey, initialValue),
  }
  return new Action(nodule, trigger, timeframe, propKey)
}

const createActionSet = (nodule, propKey, initialValue, valueSet, timeframe) => {
  const props = propKey.split('.')
  if (nodule.isActive(propKey)) {
    nodule.clearTimers(propKey)
  }

  const actionSequence = valueSet.map((value, i) => {
    const trigger = {
      activate: () => deepSet(nodule.$nodule, propKey, value),
    }

    const newTimeframe = new Timeframe(
      timeframe.delay,
      timeframe.delayKey * (i + 1.5) / valueSet.length,
      timeframe.duration,
    )
    if (i === valueSet.length - 1) {
      trigger.revert = () => deepSet(nodule.$nodule, propKey, initialValue)
    }
    return new Action(nodule, trigger, newTimeframe, propKey)
  })
  return actionSequence
}

module.exports = {
  createAction,
  createActionSet,
}
