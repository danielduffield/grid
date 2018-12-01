const grid = require('./grid')
const misc = require('./misc')
const patterns = require('../patterns')
const { flat, layered } = patterns

const actionSignatures = [
  { pattern: flat.snail, type: 'flat' },
  { pattern: flat.snail, type: 'flat', isReverse: true },
  { pattern: flat.snake, type: 'flat' },
  { pattern: flat.snake, type: 'flat', isReverse: true },
  { pattern: flat.stack, type: 'flat' },
  { pattern: flat.stack, type: 'flat', isReverse: true },

  { pattern: layered.concentric, type: 'layered' },
  { pattern: layered.concentric, type: 'layered', isReverse: true },
  { pattern: layered.wipe('down'), type: 'layered' },
  { pattern: layered.wipe('up'), type: 'layered' },
  { pattern: layered.wipe('right'), type: 'layered' },
  { pattern: layered.wipe('left'), type: 'layered' },

  { pattern: layered.wipeDiagonal('southeast'), type: 'layered' },
  { pattern: layered.wipeDiagonal('southeast'), type: 'layered', isReverse: true },
]
const animationTypes = ['animate', 'animateText', 'animateTextCascade']
const animations = grid.flatten3dArray(
  actionSignatures.map(signature => (
    animationTypes.map(animationType => (
      (matrix) => matrix[animationType](signature.pattern, signature.type, signature.isReverse)
    ))
  ))
)

const triggerRandomAnimation = (matrix) => {
  animations[misc.getRandomInt(animations.length)](matrix)
}

module.exports = {
  animations,
  triggerRandomAnimation,
}
