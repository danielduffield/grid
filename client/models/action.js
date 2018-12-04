class Action {
  constructor(nodule, trigger, timeframe, propKey) {
    this.nodule = nodule
    this.trigger = trigger
    this.timeframe = timeframe
    this.propKey = propKey

    this.actionTimers = {}
    this.revertTimers = {}

    this.activate = this.activate.bind(this)
    this.deactivate = this.deactivate.bind(this)

    this.activate()
  }

  activate() {
    this.actionTimers[this.propKey] = setTimeout(() => {
      this.trigger.activate()
    }, this.timeframe.delay * this.timeframe.delayKey)
    this.nodule.addTimer(this.actionTimers[this.propKey], this.propKey)

    if (this.trigger.revert) {
      this.revertTimers[this.propKey] = setTimeout(() => {
        this.nodule.clearTimers(this.propKey)
        this.trigger.revert()
      }, (this.timeframe.delay * this.timeframe.delayKey) + this.timeframe.duration)
      this.nodule.addTimer(this.revertTimers[this.propKey], this.propKey)
    }
  }

  deactivate() {
    clearTimeout(actionTimers[this.propKey], this.propKey)
    this.actionTimers[this.propKey] = null
    clearTimeout(revertTimers[this.propKey], this.propKey)
    this.revertTimers[this.propKey] = null
  }
}

module.exports = Action
