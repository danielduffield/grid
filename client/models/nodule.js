class Nodule {
  constructor($nodule) {
    this.$nodule = $nodule

    const [row, column] = $nodule.id.split('-')
    this.row = row
    this.column = column
    this.isActive = false
    this.actionTimers = []

    $nodule.addEventListener('click', () => console.log(this))

    this.addTimer = this.addTimer.bind(this)
    this.clearTimers = this.clearTimers.bind(this)
  }

  addTimer(timer) {
    this.actionTimers = [...this.actionTimers, timer]
  }

  clearTimers() {
    this.actionTimers.forEach(timer => clearTimeout(timer))
    this.actionTimers = []
    this.isActive = false
  }
}

module.exports = Nodule
