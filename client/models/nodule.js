class Nodule {
  constructor($nodule) {
    this.$nodule = $nodule

    const [row, column] = $nodule.id.split('-')
    this.row = row
    this.column = column
    this.isActive = false

    $nodule.addEventListener('click', () => console.log(this))
  }

  createAction() {
    const current = this.$nodule.style.color
    return {
      activate: () => { this.$nodule.style.backgroundColor = 'red' },
      revert: () => { this.$nodule.style.backgroundColor = current },
    }
  }
}

module.exports = Nodule
