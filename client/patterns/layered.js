const misc = require('../utils/misc')
const grid = require('../utils/grid')

const concentric = (array) => {

  const layered = misc.generateArrayOfNums(Math.ceil(array.length / 2)).map(layerNum => {
    const residesInLayer = (row, column) => (
      row === layerNum && column >= layerNum && column <= (array.length - layerNum - 1)
        || row === (array.length - layerNum - 1) && column >= layerNum && column <= (array.length - layerNum - 1)
        || column === layerNum && row >= layerNum && row >= layerNum && row <= (array.length - layerNum - 1)
        || column === (array.length - layerNum - 1)  && row >= layerNum && row <= (array.length - layerNum - 1)
    )

    return grid.flatten3dArray(
      array.map((row, rowNum) => (
        row.filter((col, colNum) => (
          residesInLayer(rowNum, colNum)
        ))
      )).filter(arr => arr)
    )
  })
  return layered
}

const wipeDiagonal = (direction) => (array) => {
  const getFlippedPoint = (x, y) => {
    return array[array.length - 1 - x][array.length - 1 - y]
  }

  switch (direction) {
    case 'southwest':
    case 'southeast':
      const arr = misc.generateArrayOfNums(array.length).map(layerNum => {
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

const wipe = (direction) => (array) => {
  switch (direction) {
    case 'down':
      return array
    case 'up':
      return array.reverse()
    case 'right':
      return array.map((row, i) => grid.getColumn(array, i))
    case 'left':
      return array.map((row, i) => grid.getColumn(array, i)).reverse()
  }
}

module.exports = {
  concentric,
  wipe,
  wipeDiagonal,
}
