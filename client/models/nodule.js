const utils = require('../utils')
const { ROWS, COLUMNS } = require('../state/globals')

class Nodule {
  constructor(coords) {
    const { x, y } = coords
    this.x = x
    this.y = y

    this.state = {}
    this.$nodule = null
    this.shouldRerender = false

    this.update = this.update.bind(this)
    this.createInitial$nodule = this.createInitial$nodule.bind(this)
    this.create$nodule = this.create$nodule.bind(this)
    this.render = this.render.bind(this)
  }

  update(key, value) {
    this.state[key] = value
    this.shouldRerender = true
  }

  createInitial$nodule() {
    return utils.dom.createElement(
      'div',
      '',
      { id: `${this.x}-${this.y}` },
      {
        height: `calc(100vh / ${ROWS})`,
        width: `${100 / COLUMNS}%`,
        float: 'left',
      },
      [],
    )
  }

  create$nodule() {
    const attributes = Object.keys(this.state).map(key => ({ key, value: this.state[key] }))
    const $nodule = this.createInitial$nodule()
    attributes.forEach(attr => utils.misc.deepSet($nodule, attr.key, attr.value))
    return $nodule
  }

  render() {
    let $nodule = null
    if (!(Object.keys(this.state).length)) {
      $nodule = this.createInitial$nodule()
    } else if (this.shouldRerender) {
      $nodule = this.create$nodule()
    } else {
      $nodule = this.$nodule
    }
    this.shouldRerender = false
    this.$nodule = $nodule
    return this.$nodule
  }
}

module.exports = Nodule
