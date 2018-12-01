class Action {
  constructor(nodule, trigger, timeframe) {
    this.nodule = nodule
    this.trigger = trigger
    this.timeframe = timeframe

    this.actionTimer = null
    this.revertTimer = null

    this.activate = this.activate.bind(this)
    this.deactivate = this.deactivate.bind(this)

    this.activate()
  }

  activate() {
    this.actionTimer = setTimeout(() => {
      this.nodule.isActive = true
      this.trigger.activate()
    }, this.timeframe.delay * this.timeframe.delayKey)
    this.nodule.addTimer(this.actionTimer)

    if (this.trigger.revert) {
      this.revertTimer = setTimeout(() => {
        this.nodule.clearTimers()
        this.trigger.revert()
      }, (this.timeframe.delay * this.timeframe.delayKey) + this.timeframe.duration)
      this.nodule.addTimer(this.revertTimer)
    }
  }

  deactivate() {
    clearTimeout(actionTimer)
    this.actionTimer = null
    clearTimeout(revertTimer)
    this.revertTimer = null
  }
}

module.exports = Action
