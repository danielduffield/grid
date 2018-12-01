const Action = require('../models/action')
const Timeframe = require('../models/timeframe')

const misc = require('./misc')
const { deepRead, deepSet } = misc

const createAction = (nodule, propKey, nextValue, timeframe) => {
  const props = propKey.split('.')
  const initialValue = deepRead(nodule.$nodule, propKey)

  if (initialValue) {
    const trigger = {
      activate: () => deepSet(nodule.$nodule, propKey, nextValue),
      revert: () => deepSet(nodule.$nodule, propKey, initialValue),
    }
    return new Action(nodule, trigger, timeframe)
  }
  return null
}

const createActionSet = (nodule, propKey, valueSet, timeframe) => {
  const props = propKey.split('.')
  const initialValue = deepRead(nodule.$nodule, propKey)

  const actionSequence = valueSet.map((value, i) => {
    const trigger = {
      activate: () => deepSet(nodule.$nodule, propKey, value),
    }

    const newTimeframe = new Timeframe(
      timeframe.delay,
      timeframe.delayKey * (i + 1.5) / valueSet.length,
      timeframe.duration,
    )
    if (!nodule.isActive) {
      return new Action(nodule, trigger, newTimeframe)
    }
  })
  const revertToInitial = {
    activate: () => deepSet(nodule.$nodule, propKey, initialValue),
  }
  const newTimeframe = new Timeframe(timeframe.delay, actionSequence.length, timeframe.duration)
  // actionSequence.push(new Action(nodule, revertToInitial, newTimeframe))
  return actionSequence
}

module.exports = {
  createAction,
  createActionSet,
}
