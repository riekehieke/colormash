import { LETTERS } from './constants.js'

export function throwError(message) {
  throw Error(message)
}

// Teilt ein Array in gleichgroße Teile auf und speichert diese in einzelnen Arrays
// Wird z.B. für das Erstellen des "Spielbretts" benötigt.
export function createChunkedArray(targetArray, chunkSize = 10) {
  targetArray = targetArray.slice()
  var chunkedArray = []

  while (targetArray.length) {
    chunkedArray.push(targetArray.splice(0, chunkSize))
  }

  return chunkedArray
}

// Wandelt einen String in ein Array aus Objekten um, wobei jedes Objekt
// den Buchstaben mit zugehöriger Information wie Farbe enthält
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

// Nimmt durch createTilesFromText() erstelltes Array aus Objekten entgegen
// und erstellt daraus ein Bild, indem es die Farbe aus den Objekten den Pixeln zuweist
// Dadurch entsteht die visuelle Repräsentation einer Buchstabenfolge
// Wird u.A. für Thumbnails und den Result-Screen verwendet
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

// Returned einen Klon des übergebenen Objekts, der keine Referenzen mehr enthält
export const cloneDeep = obj => JSON.parse(JSON.stringify(obj))
