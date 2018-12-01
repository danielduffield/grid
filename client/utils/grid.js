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
