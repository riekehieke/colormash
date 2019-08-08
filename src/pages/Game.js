import { state, images } from '../sketch.js'
import { BasePage, Result } from './index.js'
import { createChunkedArray } from '../utils.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from '../constants.js'

const TILE_SIZE = 16
const ROW_SIZE = 32

class PixelTile {
  constructor(tile, index) {
    this.tile = tile
    this.index = index
  }

  draw(drawOptions) {
    const { color, key, keyText } = this.tile
    const { x, y, isRevealed } = drawOptions

    if (!isRevealed) {
      strokeWeight(1)
      stroke(255)
    } else noStroke()

    fill(isRevealed ? color : 0)

    rectMode(CENTER)
    rect(x, y, TILE_SIZE, TILE_SIZE)

    // Buchstabe anzeigen, falls Tile noch nicht aufgedeckt wurde
    if (!isRevealed) {
      noStroke()
      fill(255)
      textAlign(CENTER, CENTER)
      text((keyText || key).toUpperCase(), x + 1, y + 1)
    }
  }
}

export class Game extends BasePage {
  currentIndex = -1
  time = 0
  timer = 60000
  timeRemaining = 60
  errorCount = 0

  constructor() {
    super()
    const tileCount = ROW_SIZE ** 2

    let tiles = state.currentLevel.tiles
    if (tiles.length > tileCount) tiles = tiles.slice(0, tileCount)

    const pixels = tiles.map((tile, index) => new PixelTile(tile, index))
    const rows = createChunkedArray(pixels, ROW_SIZE)

    this.tiles = tiles
    this.rows = rows
  }

  get nextTile() {
    return this.tiles[this.currentIndex + 1]
  }

  drawRow = (row, rowIndex, xCoord) => {
    const yFirstRow = 84 + TILE_SIZE / 2

    row.forEach((pixel, columnIndex) =>
      pixel.draw({
        x: xCoord + columnIndex * TILE_SIZE,
        y: yFirstRow + rowIndex * TILE_SIZE,
        isRevealed: this.currentIndex >= pixel.index,
      }),
    )
  }

  drawArcade(xCoord) {
    // Stoppuhr
    if (this.startTime) this.time = (millis() - this.startTime) / 1000
    // Zeit
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', xCoord / 2, 285)
    text('SCORE', width - xCoord / 2, 285)
    textSize(30)
    text(this.time.toFixed(2), xCoord / 2, 335)
    text('12345', width - xCoord / 2, 335)
  }

  drawTimetrial(xCoord) {
    // Timer
    if (this.startTime) {
      let spielzeit = millis() - this.startTime
      this.timeRemaining = (this.timer - spielzeit) / 1000
    }

    // Zeit
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME LEFT', xCoord / 2, 285)
    text('SCORE', width - xCoord / 2, 285)
    textSize(30)
    text(this.timeRemaining.toFixed(2), xCoord / 2, 335)
    text('12345', width - xCoord / 2, 335)
  }

  drawSurvival(xCoord) {
    // Stoppuhr
    if (this.startTime) this.time = (millis() - this.startTime) / 1000
    // Zeit
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', xCoord / 2, 285)
    text('SCORE', width - xCoord / 2, 285)
    textSize(30)
    text(this.time.toFixed(2), xCoord / 2, 335)
    text('12345', width - xCoord / 2, 335)

    // Herzen für verfügbare Leben hier anzeigen
    imageMode(CENTER)
    if (this.errorCount === 0)
      image(images.heartFilled, width / 2 + 40, 55, 22.3, 18.3)
    if (this.errorCount <= 1)
      image(images.heartFilled, width / 2, 55, 22.3, 18.3)
    if (this.errorCount <= 2)
      image(images.heartFilled, width / 2 - 40, 55, 22.3, 18.3)
    if (this.errorCount >= 3) {
      state.result.time = (millis() - this.startTime) / 1000
      state.result.score = '12345'
      state.result.hearts = 0
      state.result.status = 'GAME OVER'
      state.currentPage = new Result()
    }
  }

  draw() {
    const xCoord = width / 2 - ((TILE_SIZE - 0.5) * ROW_SIZE) / 2
    // Spielbrett
    this.rows.forEach((row, index) => this.drawRow(row, index, xCoord))

    // Spielbrett je nach Modus anpassen
    if (state.currentMode === GAME_MODE_ARCADE) this.drawArcade(xCoord)
    if (state.currentMode === GAME_MODE_TIMETRIAL) this.drawTimetrial(xCoord)
    if (state.currentMode === GAME_MODE_SURVIVAL) this.drawSurvival(xCoord)

    // Timetrial: Game Over wenn Zeit abgelaufen
    if (state.currentMode === GAME_MODE_TIMETRIAL) {
      if (this.timeRemaining <= 0) {
        state.result.time = this.timeRemaining
        state.result.status = 'GAME OVER'
        state.result.score = 12345
        state.currentPage = new Result()
      }
    }
  }

  onKeyPress() {
    if (!this.startTime) this.startTime = millis()

    const nextKey = this.nextTile.key
    if (key === nextKey) this.currentIndex++
    else this.errorCount++

    if (!this.nextTile) {
      state.result.time = (millis() - this.startTime) / 1000

      state.result.status = 'SUCCESS'
      state.result.score = 12345
      // Survival Mode
      state.result.hearts = 3 - this.errorCount

      // Timetrial Mode
      if (state.currentMode === GAME_MODE_TIMETRIAL)
        state.result.time = this.timeRemaining

      state.currentPage = new Result()
    }
  }
}
