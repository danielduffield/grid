const grid = require('./grid')
const misc = require('./misc')
const patterns = require('../patterns')
const { flat, layered } = patterns

const actionSignatures = [
  { pattern: flat.snail },
  { pattern: flat.snail, isReverse: true },
  { pattern: flat.snake },
  { pattern: flat.snake, isReverse: true },
  { pattern: flat.stack },
  { pattern: flat.stack, isReverse: true },

  { pattern: layered.concentric, isLayered: true },
  { pattern: layered.concentric, isLayered: true, isReverse: true },
  { pattern: layered.wipe('down'), isLayered: true },
  { pattern: layered.wipe('up'), isLayered: true },
  { pattern: layered.wipe('right'), isLayered: true },
  { pattern: layered.wipe('left'), isLayered: true },

  { pattern: layered.wipeDiagonal('southeast'), isLayered: true },
  { pattern: layered.wipeDiagonal('southeast'), isLayered: true, isReverse: true },
]
const animationTypes = [
  'rainbowCascade',
  'rainbowUnravel',
  'textCascade',
  'textUnravel',
]
const animations = grid.flatten3dArray(
  actionSignatures.map(signature => (
    animationTypes.map(animationType => (
      (matrix) => matrix.animate(
        signature.pattern,
        animationType,
        {
          isLayered: signature.isLayered || false,
          isReverse: signature.isReverse,
        },
      )
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
