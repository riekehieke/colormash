import { LETTERS } from './constants.js'

export function throwError(message) {
  throw Error(message)
}

export const getRandomColor = () => color(random(255), random(255), random(255))

export function createChunkedArray(targetArray, chunkSize = 10) {
  targetArray = targetArray.slice()
  var chunkedArray = []

  while (targetArray.length) {
    chunkedArray.push(targetArray.splice(0, chunkSize))
  }

  return chunkedArray
}

export const createTilesFromText = text => {
  text = text
    .replace(/\n/g, '')
    .toLowerCase()
    .padEnd(1024)

  if (text.length > 1024) throwError('Text too long:\n' + text)

  const keys = text.split('')
  const tiles = keys.map(k => LETTERS[k] || throwError(`Invalid key: "${k}"`))
  return tiles
}

export const buildImageFromTiles = tiles => {
  const image = createImage(32, 32)
  image.loadPixels()

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i]
    const index = i * 4

    image.pixels[index] = red(tile.color)
    image.pixels[index + 1] = green(tile.color)
    image.pixels[index + 2] = blue(tile.color)
    image.pixels[index + 3] = alpha(tile.color)
  }

  image.updatePixels()
  return image
}
