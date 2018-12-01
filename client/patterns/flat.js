const snail = (array) => {
  var vector = []

  while (array.length) {
    vector.push(...array.shift())
    array.map(row => vector.push(row.pop()))
    array.reverse().map(row => row.reverse())
  }
  return vector
}

const stack = (array) => (
  array.reduce((acc, cur) => ([...acc, ...cur]), [])
)

const snake = (array) => (
  array.map((row, i) => i % 2 === 0 ? row : row.reverse())
    .reduce((acc, cur) => ([...acc, ...cur]), [])
)

module.exports = {
  snail,
  snake,
  stack,
}
