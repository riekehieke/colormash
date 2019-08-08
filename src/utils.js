export function createChunkedArray(targetArray, chunkSize = 10) {
  var chunkedArray = []

  while (targetArray.length) {
    chunkedArray.push(targetArray.splice(0, chunkSize))
  }

  return chunkedArray
}
