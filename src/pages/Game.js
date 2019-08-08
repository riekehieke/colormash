import { state } from '../sketch.js'
import { BasePage, Success } from './index.js'
import { LETTERS } from '../constants.js'
import { createChunkedArray } from '../utils.js'

const TILE_SIZE = 16
const ROW_SIZE = 32

// TODO: Level aus Auswahl auslesen
const getLevel = () => {
  return [...Array(ROW_SIZE ** 2)].map(() => random(Object.values(LETTERS)))
}

class PixelTile {
  constructor(tile, index) {
    this.tile = tile
    this.index = index
  }

  draw(drawOptions) {
    const { color, key } = this.tile
    const { x, y, isRevealed } = drawOptions

    if (!isRevealed) {
      strokeWeight(1)
      stroke(255)
    } else noStroke()

    const rgb = isRevealed ? color : [0]
    fill(...rgb)

    rectMode(CENTER)
    rect(x, y, TILE_SIZE, TILE_SIZE)

    // Buchstabe anzeigen, falls Tile noch nicht aufgedeckt wurde
    if (!isRevealed) {
      noStroke()
      fill(255)
      textAlign(CENTER, CENTER)
      text(key.toUpperCase(), x + 1, y + 1)
    }
  }
}

export class Game extends BasePage {
  currentIndex = -1

  constructor() {
    super()

    const level = getLevel()
    const pixels = level.map((tile, index) => new PixelTile(tile, index))
    const rows = createChunkedArray(pixels, ROW_SIZE)

    this.level = level
    this.rows = rows
  }

  get nextTile() {
    return this.level[this.currentIndex + 1]
  }

  drawRow = (row, rowIndex) => {
    const yFirstRow = 84 + TILE_SIZE / 2
    const xCoord = width / 2 - (TILE_SIZE * ROW_SIZE) / 2

    row.forEach((pixel, columnIndex) =>
      pixel.draw({
        x: xCoord + columnIndex * TILE_SIZE,
        y: yFirstRow + rowIndex * TILE_SIZE,
        isRevealed: this.currentIndex >= pixel.index,
      }),
    )
  }

  draw() {
    this.rows.forEach(this.drawRow)
  }

  onKeyPress() {
    const nextKey = this.nextTile.key
    if (key === nextKey) this.currentIndex++

    if (!this.nextTile) state.currentPage = new Success()
  }
}
