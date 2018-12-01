(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const rainbow = require('./rainbow')

module.exports = {
  rainbow,
}

},{"./rainbow":2}],2:[function(require,module,exports){
const utils = require('../utils')
const { Timeframe } = require('../models')
const { createAction, createActionSet } = utils.actions
const { multiplyInnerColors } = utils.colors

const rainbow = (nodule, timeframe) => {
  const baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink']
  const colors = multiplyInnerColors(baseColors)
  colors.push(nodule.$nodule.style.backgroundColor || 'white')
  createActionSet(nodule, 'style.backgroundColor', colors, timeframe)
}

module.exports = rainbow

},{"../models":5,"../utils":17}],3:[function(require,module,exports){
const { Matrix, Nodule } = require('./models')
const { COLUMNS, ROWS } = require('./state/globals')
const utils = require('./utils')

const $nodules = utils.dom.generateElementGrid(COLUMNS, ROWS)

const nodules = $nodules.map(row => (
  row.map($nodule => {
    document.body.appendChild($nodule)
    return new Nodule($nodule)
  })
))

const matrix = new Matrix(nodules)

document.body.addEventListener('click', (e) => {
  matrix.animateSnake()
})

window.onload = () => document.hasFocus() ? null : window.focus()

},{"./models":5,"./state/globals":12,"./utils":17}],4:[function(require,module,exports){
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

    if (this.trigger.revert) {
      this.nodule.isActive = false
      this.revertTimer = setTimeout(() => {
        this.trigger.revert()
      }, (this.timeframe.delay * this.timeframe.delayKey) + this.timeframe.duration)
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

},{}],5:[function(require,module,exports){
const Action = require('./action')
const Matrix = require('./matrix')
const Nodule = require('./nodule')
const Timeframe = require('./timeframe')

module.exports = {
  Action,
  Matrix,
  Nodule,
  Timeframe,
}

},{"./action":4,"./matrix":6,"./nodule":7,"./timeframe":8}],6:[function(require,module,exports){
const Action = require('./action')
const Timeframe = require('./timeframe')
const { flat: flatPatterns, layered: layeredPatterns } = require('../patterns')
const utils = require('../utils')
const { rainbow } = require('../animations')
const { clone3dArray } = utils.grid
const { DELAY, DURATION } = require('../state/globals')

class Matrix {
  constructor(nodules) {
    this.nodules = nodules

    this.slicedNodules = this.slicedNodules.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getColumn = this.getColumn.bind(this)
    this.getNodule = this.getNodule.bind(this)
    this.getNoduleFlat = this.getNoduleFlat.bind(this)
    this.paintFlatNodules = this.paintFlatNodules.bind(this)
    this.animateSnail = this.animateSnail.bind(this)
    this.animateSnake = this.animateSnake.bind(this)
  }

  getRow(rowNum) {
    return this.nodules[rowNum]
  }

  getColumn(colNum) {
    return this.nodules.reduce((acc, cur) => [...acc, cur[colNum]], [])
  }

  getNodule(rowNum, colNum) {
    return this.nodules[rowNum][colNum]
  }

  getNoduleFlat(index) {
    return this.flatSlicedNodules()[index]
  }

  animateSnail() {
    this.paintFlatNodules(flatPatterns.snail(this.slicedNodules()))
  }

  animateSnake() {
    this.paintFlatNodules(flatPatterns.snake(this.slicedNodules()))
  }

  paintFlatNodules(flatNodules) {
    flatNodules.forEach((nodule, i) => {
      const timeframe = new Timeframe(DELAY, i, DURATION)
      // new Action(nodule, nodule.createAction(), timeframe)
      rainbow(nodule, timeframe)
      // nodule.flash(DELAY, i, DURATION)
    })
  }

  paintLayerNodules(layerNodules) {
    layerNodules.forEach((layer, i) => {
      layer.forEach(nodule => {
        const timeframe = new Timeframe(DELAY, i, DURATION)
        new Action(nodule, nodule.createAction(), timeframe)
        // nodule.flash(DELAY, i, DURATION)
      })
    })
  }

  slicedNodules() {
    return clone3dArray(this.nodules)
  }

  flatSlicedNodules() {
    return flatten3dArray(this.slicedNodules())
  }
}

module.exports = Matrix

},{"../animations":1,"../patterns":10,"../state/globals":12,"../utils":17,"./action":4,"./timeframe":8}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
class Timeframe {
  constructor(delay, delayKey, duration) {
    this.delay = delay
    this.delayKey = delayKey
    this.duration = duration
  }
}

module.exports = Timeframe

},{}],9:[function(require,module,exports){
const snail = (array) => {
  var vector = []

  while (array.length) {
    vector.push(...array.shift())
    array.map(row => vector.push(row.pop()))
    array.reverse().map(row => row.reverse())
  }
  return vector
}

const stack = (array) => {
  array.reduce((acc, cur) => ([...acc, ...cur]), [])
}

const snake = (array) => (
  array.map((row, i) => i % 2 === 0 ? row : row.reverse())
    .reduce((acc, cur) => ([...acc, ...cur]), [])
)

module.exports = {
  snail,
  snake,
  stack,
}

},{}],10:[function(require,module,exports){
const flat = require('./flat.js')
const layered = require('./layered.js')

module.exports = {
  flat,
  layered,
}

},{"./flat.js":9,"./layered.js":11}],11:[function(require,module,exports){
const concentric = (array) => {
  const residesInLayer = (row, column) => (
    row === layerNum && column >= layerNum && column <= (array.length - layerNum - 1)
      || row === (array.length - layerNum - 1) && column >= layerNum && column <= (array.length - layerNum - 1)
      || column === layerNum && row >= layerNum && row >= layerNum && row <= (array.length - layerNum - 1)
      || column === (array.length - layerNum - 1)  && row >= layerNum && row <= (array.length - layerNum - 1)
  )

  const layered = generateArrayOfNums(Math.ceil(array.length / 2)).map(layerNum => {
    return array.map((row, rowNum) => (
      row.filter((col, colNum) => (
        residesInLayer(rowNum, colNum)
      ))
    )).filter()
  })
  return layered
}

const wipeDiagonal = (array, direction) => {
  const getFlippedPoint = (x, y) => {
    return array[array.length - 1 - x][array.length - 1 - y]
  }

  switch (direction) {
    case 'southwest':
    case 'southeast':
      const arr = generateArrayOfNums(array.length).map(layerNum => {
        const startNodule = array[0][0]
        let nodules = [startNodule]
        let remaining = array.length - 1
        while (remaining > 0) {
          const point = array[layerNum][remaining - layerNum]
          if (point) {
            nodules.push(point)
            nodules.push(getFlippedPoint(point.column, point.row))
            if (layerNum !== remaining - layerNum) {
              const altPoint = array[remaining - layerNum][layerNum]
              nodules.push(altPoint)
              nodules.push(getFlippedPoint(altPoint.column, altPoint.row))
            }
          }
          remaining--
        }
        return nodules
      })
      return arr
    case 'northwest':
    case 'northeast':
  }
}

const wipe = (array, direction) => {
  switch (direction) {
    case 'down':
      return array
    case 'up':
      return array.reverse()
    case 'right':
      return array.map((row, i) => getColumn(array, i))
    case 'left':
      return array.map((row, i) => getColumn(array, i)).reverse()
  }
}

const layeredPatterns = {
  concentric,
  wipe,
  wipeDiagonal,
}

},{}],12:[function(require,module,exports){
DELAY = 100
DURATION = 300

COLUMNS = 10
ROWS = 10

module.exports = {
  DELAY,
  DURATION,
  COLUMNS,
  ROWS,
}

},{}],13:[function(require,module,exports){
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

},{"../models/action":4,"../models/timeframe":8,"./misc":18}],14:[function(require,module,exports){
function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

const splitColorHex = (hex) => ([
  hex.substring(1, 3),
  hex.substring(3, 5),
  hex.substring(5, 7),
])

const formatHexComponent = (levelA, levelB) => {
  const sum = Math.floor((Number.parseInt(levelA, 16) + Number.parseInt(levelB, 16)) / 2)

  return 0 < sum && sum < 256
    ? Math.abs(sum).toString(16)
    : '00'
}

const findBetweenColor = (colorAHex, colorBHex) => {
  const [r1, g1, b1] = splitColorHex(colorAHex)
  const [r2, g2, b2] = splitColorHex(colorBHex)

  const r = formatHexComponent(r1, r2)
  const g = formatHexComponent(g1, g2)
  const b = formatHexComponent(b1, b2)

  return `#${r}${g}${b}`
}

const colorMap = {
  red: '#FF0000',
  orange: '#FF7F00',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  indigo: '#6f00ff',
  violet: '#8B00FF',
}

const multiplyInnerColors = (colors) => {
  return colors.map((color, index) => {
    if (colors[index + 1]) {
      const nextColor = colorMap[colors[index + 1]] || colourNameToHex(colors[index + 1])
      const currentColor = colorMap[color] || colourNameToHex(color)

      const halfway = findBetweenColor(currentColor, nextColor)
      const quarter = findBetweenColor(currentColor, halfway)
      const threeQuarters = findBetweenColor(halfway, nextColor)
      return [color, halfway]
    }
    return [color]
  }).reduce((acc, cur) => ([...acc, ...cur]), [])
}

module.exports = {
  colourNameToHex,
  findBetweenColor,
  multiplyInnerColors,
}

},{}],15:[function(require,module,exports){
const miscUtils = require('./misc')
const { generateArrayOfNums } = miscUtils

const createElement = (type, klass, attributes, styles, children) => {
  const $el = document.createElement(type)
  $el.classList.add(klass)
  Object.keys(attributes).forEach(attr => $el.setAttribute(attr, attributes[attr]))
  children.forEach(child => $el.appendChild(child))
  Object.keys(styles).forEach(style => $el.style[style] = styles[style])
  return $el
}

const generateElementGrid = (colCount, rowCount) => (
  generateArrayOfNums(colCount).map(col => (
    generateArrayOfNums(rowCount).map(row => (
      createElement(
        'div',
        'grid-cell',
        { id: `${row}-${col}` },
        {
          height: `calc(100vh / ${ROWS})`,
          width: `${100 / COLUMNS}%`,
          float: 'left',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '18px',
          letterSpacing: '1.25',
        },
        [],
      )
    ))
  ))
)

module.exports = {
  createElement,
  generateElementGrid,
}

},{"./misc":18}],16:[function(require,module,exports){
const getRow = (array, rowNum) => array[rowNum]

const getColumn = (array, colNum) => (
  array.reduce((acc, cur) => [...acc, cur[colNum]], [])
)

const flatten3dArray = (array) => array.reduce((acc, cur) => [...acc, ...cur], [])

const clone3dArray = (array) => array.slice().map(arr => arr.slice())

module.exports = {
  clone3dArray,
  flatten3dArray,
  getColumn,
  getRow,
}

},{}],17:[function(require,module,exports){
const actions = require('./actions')
const colors = require('./colors')
const dom = require('./dom')
const grid = require('./grid')
const misc = require('./misc')

module.exports = {
  actions,
  dom,
  colors,
  grid,
  misc,
}

},{"./actions":13,"./colors":14,"./dom":15,"./grid":16,"./misc":18}],18:[function(require,module,exports){
const generateArrayOfNums = (length => [...Array(length).keys()])

const getRandomInt = (max) => (
  Math.floor(Math.random() * Math.floor(max))
)

const deepRead = (object, path) => {
  const keys = path.split('.')
  let currentValue = object[keys.shift()]
  while (keys.length) {
    const next = keys.shift()
    if (currentValue) {
      currentValue = currentValue[next]
    }
  }
  return currentValue
}

const deepSet = (object, path, value) => {
  const keys = path.split('.')
  let currentValue = object[keys.shift()]
  while (keys.length > 1) {
    const next = keys.shift()
    if (currentValue) {
      currentValue = currentValue[next]
    }
  }
  if (keys.length) {
    currentValue[keys[0]] = value
  }
  return object
}

module.exports = {
  getRandomInt,
  generateArrayOfNums,
  deepRead,
  deepSet,
}

},{}]},{},[3]);
