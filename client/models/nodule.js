class Nodule {
  constructor($nodule) {
    this.$nodule = $nodule

    const [row, column] = $nodule.id.split('-')
    this.row = row
    this.column = column
    this.actionTimers = []

    $nodule.addEventListener('click', () => console.log(this))

    this.addTimer = this.addTimer.bind(this)
    this.clearTimers = this.clearTimers.bind(this)
    this.isActive = this.isActive.bind(this)
  }

  isActive(propKey) {
    return this.actionTimers.filter(timer => timer.propKey === propKey).length > 1
  }

  addTimer(timer, propKey) {
    this.actionTimers = [...this.actionTimers, { timer, propKey }]
  }

  clearTimers(propKey) {
    this.actionTimers.filter(timer => timer.propKey === propKey)
      .forEach(timer => clearTimeout(timer.timer))
    this.actionTimers = this.actionTimers.filter(timer => timer.propKey !== propKey)
  }
}

module.exports = Nodule
