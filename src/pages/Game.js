import { state, images } from '../sketch.js'
import { BasePage, Result } from './index.js'
import { createChunkedArray } from '../utils.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  YELLOW,
  BLUE,
  MAGENTA,
  ONE_MINUTE,
} from '../constants.js'

// Größe des Spielbretts festlegen
const TILE_SIZE = 16
const ROW_SIZE = 32

// Klasse für ein Quadrat des Spielbrett-Rasters
class PixelTile {
  constructor(tile, index) {
    this.tile = tile
    this.index = index
  }

  draw(drawOptions) {
    const { color, key, keyText } = this.tile
    const { x, y, isRevealed } = drawOptions

    // Falls aufgedeckt: kleine Umrandung und schwarzer Hintergrund,
    // ansonsten kein Rand und Tile-Farbe anzeigen
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
  constructor() {
    super()

    this.currentIndex = -1
    // Spielelemente wie Zeit, Timer, Score und Fehler-Count initialisieren
    this.time = 0
    if (state.currentLevel.mode === 'text') this.timer = ONE_MINUTE * 3
    else this.timer = ONE_MINUTE * 4
    this.timeRemaining = this.timer / 1000
    this.errorCount = 0
    this.score = 0
    this.multiplier = 1
    this.multiplierTime = 1
    this.letterCount = 0
    this.text = 'MISTAKES: '
    this.isInErrorState = false

    this.drawRow = this.drawRow.bind(this)

    // Gesamtanzahl an Tiles/Pixeln
    const tileCount = ROW_SIZE ** 2

    // Falls Level mehr Tiles hat als gewünscht: "zuschneiden"
    let tiles = state.currentLevel.tiles
    if (tiles.length > tileCount) tiles = tiles.slice(0, tileCount)

    // Für jedes Tile eine Pixel-Klasse erstellen, in Gruppen je nach ROW_SIZE einteilen
    const pixels = tiles.map((tile, index) => new PixelTile(tile, index))
    const rows = createChunkedArray(pixels, ROW_SIZE)

    this.tiles = tiles
    this.rows = rows
  }

  // Nächste Kachel abrufen
  get nextTile() {
    return this.tiles[this.currentIndex + 1]
  }

  // Rendert eine einzelne Reihe an Kacheln
  drawRow(row, rowIndex, xCoord) {
    const yFirstRow = 84 + TILE_SIZE / 2

    // Alle Kacheln der Reihe rendern
    row.forEach((pixel, columnIndex) =>
      pixel.draw({
        x: xCoord + columnIndex * TILE_SIZE,
        y: yFirstRow + rowIndex * TILE_SIZE,
        isRevealed: this.currentIndex >= pixel.index,
      }),
    )
  }

  // Draw-Methode für Arcade-Mode
  drawArcade(xCoord) {
    // Stoppuhr
    if (this.startTime) this.time = (millis() - this.startTime) / 1000
    // Zeit & Score Anzeige
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', xCoord / 2, 285)
    text('SCORE', width - xCoord / 2, 285)
    textSize(30)
    text(this.time.toFixed(2), xCoord / 2, 335)
    text(this.score, width - xCoord / 2, 335)

    // Realtime Fehler Count
    textSize(10)
    fill(255)
    text(this.text + this.errorCount, width / 2, height - 30)
  }

  // Draw Methode für Time Trial Mode
  drawTimetrial(xCoord) {
    // Timer
    if (this.startTime) {
      let spielzeit = millis() - this.startTime
      this.timeRemaining = (this.timer - spielzeit) / 1000
    }

    // Zeit & Score Anzeige
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME LEFT', xCoord / 2, 285)
    text('SCORE', width - xCoord / 2, 285)
    textSize(30)
    text(this.timeRemaining.toFixed(2), xCoord / 2, 335)
    text(this.score, width - xCoord / 2, 335)

    // Realtime Fehler Count
    textSize(10)
    fill(255)
    text(this.text + this.errorCount, width / 2, height - 30)
  }

  // Draw Methode für Survival Mode
  drawSurvival(xCoord) {
    // Stoppuhr
    if (this.startTime) this.time = (millis() - this.startTime) / 1000
    // Zeit & Score Anzeige
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', xCoord / 2, 285)
    text('SCORE', width - xCoord / 2, 285)
    textSize(30)
    text(this.time.toFixed(2), xCoord / 2, 335)
    text(this.score, width - xCoord / 2, 335)

    // Herzen für verfügbare Leben anzeigen
    imageMode(CENTER)
    if (this.errorCount === 0)
      image(images.HEART_FILLED, width / 2 + 40, 55, 22.3, 18.3)
    else image(images.HEART, width / 2 + 40, 55, 22.3, 18.3)
    if (this.errorCount <= 1)
      image(images.HEART_FILLED, width / 2, 55, 22.3, 18.3)
    else image(images.HEART, width / 2, 55, 22.3, 18.3)
    if (this.errorCount <= 2)
      image(images.HEART_FILLED, width / 2 - 40, 55, 22.3, 18.3)
    else image(images.HEART, width / 2 - 40, 55, 22.3, 18.3)
  }

  draw() {
    const xCoord = width / 2 - ((TILE_SIZE - 0.5) * ROW_SIZE) / 2

    // Markierung, wenn Fehler gemacht wird
    if (this.isInErrorState) {
      rectMode(CENTER)
      fill(0)
      strokeWeight(15)
      stroke(255, 0, 0)
      rect(width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)
    }

    // Die einzelnen Reihen des Spielfelds rendern
    this.rows.forEach((row, index) => this.drawRow(row, index, xCoord))

    // Je nade dem welcher Mode gewählt ist: Mode-spezifische draw-Methoden ausführen
    if (state.currentMode === GAME_MODE_ARCADE) this.drawArcade(xCoord)
    if (state.currentMode === GAME_MODE_TIMETRIAL) this.drawTimetrial(xCoord)
    if (state.currentMode === GAME_MODE_SURVIVAL) this.drawSurvival(xCoord)

    // Im Timetrial-Mode: Game Over wenn Zeit abgelaufen
    if (this.timeRemaining <= 0) this.timeOut()

    // Multiplier anzeigen
    if (this.multiplier === 2) {
      fill(YELLOW)
      textSize(40)
      text('x2', width - 100, 370)
    }
    if (this.multiplier === 3) {
      fill(BLUE)
      textSize(45)
      text('x3', width - 100, 370)
    }
    if (this.multiplier === 4) {
      fill(MAGENTA)
      textSize(50)
      text('x4', width - 100, 370)
    }
  }

  // Wenn Zeit abgelaufen: Endwerte (Status, Score und letzte Position im Spiel)
  // im State speichern und zu nächster Seite gehen
  timeOut() {
    state.result.time = this.timeRemaining = 0
    state.result.status = 'GAME OVER'
    state.result.score = this.score
    state.result.tileIndex = this.currentIndex

    state.currentPage = new Result()
  }

  // Wenn keine Leben mehr übrig: Endwerte (Zeit, Status, Score und letzte Position im Spiel)
  // im State speichern und zu nächster Seite gehen
  outOfHearts() {
    state.result.time = (millis() - this.startTime) / 1000
    state.result.hearts = 0
    state.result.score = this.score
    state.result.status = 'GAME OVER'

    state.result.tileIndex = this.currentIndex
    state.currentPage = new Result()
  }

  // Beschreibt, was passiert wenn das Spiel gewonnen wird
  win() {
    // Wenn Perfektes Spiel: Bonuspunkte zu Score addieren
    if (this.errorCount === 0) this.score += 48200
    // Mulitplier je nach Zeit berechnen
    if (state.currentMode !== GAME_MODE_TIMETRIAL) {
      let timeBefore = (millis() - this.startTime) / 1000
      if (timeBefore / 32 > 25) this.multiplierTime = 1
      if (timeBefore / 32 <= 20) this.multiplierTime = 2
      if (timeBefore / 32 <= 15) this.multiplierTime = 3
      if (timeBefore / 32 <= 10) this.multiplierTime = 4
    }
    // Ergebnisse speichern
    state.result.time = (millis() - this.startTime) / 1000
    state.result.status = 'YOU WIN'
    // Zusätzlich für Survival Mode die Anzahl der verbleibenden leben speichern
    state.result.hearts = 3 - this.errorCount
    // Im Timetrial Mode: Multiplier nach Rest-Zeit berechnen & Restzeit speichern
    if (state.currentMode === GAME_MODE_TIMETRIAL) {
      let timeBefore = 300 - this.timeRemaining
      if (timeBefore / 32 > 10) this.multiplierTime = 1
      if (timeBefore / 32 <= 7) this.multiplierTime = 2
      if (timeBefore / 32 <= 5) this.multiplierTime = 3
      if (timeBefore / 32 <= 3) this.multiplierTime = 4
      state.result.time = this.timeRemaining
    }
    // Score und letzte Position speichern
    state.result.score = this.score * this.multiplierTime
    state.result.tileIndex = this.currentIndex
    // Zu Result-Seite gehen
    state.currentPage = new Result()
  }

  // Beschreibt, was passiert wenn zur nächsten Kachel im Spiel gegangen wird
  goNext() {
    // Fehler-Status auf False setzen, Index erhöhen
    // und Count für Eingaben ohne Fehler erhöhen
    this.isInErrorState = false
    this.currentIndex++
    this.letterCount++
    // Multiplier berechnen: Höher, umso mehr Tasten man in Fole ohne Fehler drückt
    if (this.letterCount > 10) this.multiplier = 2
    if (this.letterCount > 20) this.multiplier = 3
    if (this.letterCount > 30) this.multiplier = 4
    // Score berechnen
    this.score += 50 * this.multiplier
  }

  // Beschreibt, was passiert wenn ein Fehler gemacht wird
  handleError() {
    // Falls vorher schon ein Fehler gemacht wird, returnen
    if (this.isInErrorState) return

    // Fehler-Status auf true setzen, Fehler-Count erhöhen
    // und Count für Eingaben am Stück ohne Fehler auf 0 zurücksetzen
    this.isInErrorState = true
    this.errorCount++
    this.letterCount = 0
    this.multiplier = 1
    // Survival Mode: Falls Fehler Count größer gleich 3 ist: Keine Leben mehr übrig
    if (this.errorCount >= 3 && state.currentMode === GAME_MODE_SURVIVAL)
      this.outOfHearts()
  }

  onKeyPress() {
    // Stoppuhr/Timer starten
    if (!this.startTime) this.startTime = millis()

    // Wenn richtige Taste gedrückt wurde und es noch weitere (unausgefüllte) Kacheln gibt,
    // goNext() ausführen, sonst handleError() ausführen
    if (this.nextTile) {
      const nextKey = this.nextTile.key
      if (key.toLowerCase() === nextKey) this.goNext()
      else if (keyCode !== SHIFT) this.handleError()
    }

    // Wenn keine weiteren (unausgefüllten) Kacheln mehr vorhanden sind:
    // win() ausführen -> Spiel gewonnen
    if (!this.nextTile) this.win()
  }
}
