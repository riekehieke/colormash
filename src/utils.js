import { LETTERS } from './constants.js'

export function throwError(message) {
  throw Error(message)
}

export function createChunkedArray(targetArray, chunkSize = 10) {
  targetArray = targetArray.slice()
  var chunkedArray = []

  while (targetArray.length) {
    chunkedArray.push(targetArray.splice(0, chunkSize))
  }

  return chunkedArray
}

export const createTilesFromText = text => {
  if (text.length > 1024) throwError('Text too long:\n' + text)
  text = text.toLowerCase().padEnd(1024)
  const keys = text.split('')
  const tiles = keys.map(k => LETTERS[k] || throwError(`Invalid key: "${k}"`))
  return tiles
}
