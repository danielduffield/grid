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
