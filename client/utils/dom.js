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
