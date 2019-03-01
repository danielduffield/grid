const miscUtils = require('./misc')
const { generateArrayOfNums } = miscUtils

const createElement = (type, text, attributes, styles, children) => {
  const $el = document.createElement(type)

  if (text) $el.textContent = text
  if (attributes) {
    Object.keys(attributes).forEach(attr => $el.setAttribute(attr, attributes[attr]))
  }
  if (styles) {
    Object.keys(styles).forEach(style => $el.style[style] = styles[style])
  }
  if (children) {
    children.forEach(child => $el.appendChild(child))
  }
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
          border: '2px solid white',
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
