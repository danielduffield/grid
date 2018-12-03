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
  let currentValue = object

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
