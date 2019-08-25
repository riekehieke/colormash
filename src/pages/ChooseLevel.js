import { BasePage, Game } from './index.js'
import { state, images } from '../sketch.js'
import { createChunkedArray, buildImageFromTiles } from '../utils.js'
import * as LEVELS from '../levels/index.js'
import {
  MAGENTA,
  COLORS_TEXT_FLICKER,
  COLORS_STROKE_FLICKER,
} from '../constants.js'

// Klasse für einen Button der Level-Navigation
class LevelButton {
  constructor(level) {
    this.level = level
    // Falls es ein Image-Level ist: Thumbnail generieren
    if (level.mode !== 'text') this.picture = buildImageFromTiles(level.tiles)
  }

  draw(drawOptions) {
    const { x, y, isSelected } = drawOptions
    const { level, picture } = this

    // Button Outline
    strokeWeight(8)
    if (isSelected) stroke(random(COLORS_STROKE_FLICKER), 255, 255)
    else stroke(MAGENTA)

    // Button Background
    fill(0)
    rectMode(CENTER, TOP)
    rect(x, y, 138, 138)
    rectMode(CORNER)

    // Thumbnail anzeigen, falls kein Text-Level
    if (level.mode !== 'text') {
      noSmooth()
      imageMode(CENTER)
      image(picture, x, y, 130, 130)
    }

    // Label anzeigen, falls Text-Level
    if (level.mode === 'text') {
      noStroke()
      fill(255)
      textSize(10)
      textAlign(CENTER, TOP)
      const name = level.name || ''
      text(name.toUpperCase(), x, y - 9)
    }
  }
}

export class ChooseLevel extends BasePage {
  constructor() {
    super()

    // Speichern, welcher Button angewählt ist
    this.currentRowIndex = 0
    this.currentColumnIndex = 0
    // Speichern, welcher Level-Typ ausgewählt ist (Text/Bild)
    this.selectedLevelType = 'image'

    // Die verfügbaren Levels nach Level-Typ gruppiert
    const levels = Object.values(LEVELS)
    this.imageLevels = levels.filter(level => level.mode !== 'text')
    this.textLevels = levels.filter(level => level.mode === 'text')

    this.drawRow = this.drawRow.bind(this)

    // Für jedes Level einen Level-Button erstellen
    this.imageButtons = this.imageLevels.map(level => new LevelButton(level))
    this.textButtons = this.textLevels.map(level => new LevelButton(level))
  }

  // Die Buttons für den aktuell ausgewählten Level-Typ
  get buttons() {
    if (this.selectedLevelType === 'text') return this.textButtons
    else return this.imageButtons
  }
  // Die anzuzeigenden Buttons in 4er-Reihen gruppiert
  get rows() {
    return createChunkedArray(this.buttons, 4)
  }
  get selectedRow() {
    return this.rows.length && this.rows[this.currentRowIndex]
  }
  get selectedButton() {
    return this.selectedRow && this.selectedRow[this.currentColumnIndex]
  }

  draw() {
    // Styling Titel
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    // Überschrift je nach Level-Typ anpassen
    let title = 'CHOOSE YOUR IMAGE'
    if (this.selectedLevelType === 'text') title = 'CHOOSE YOUR TEXT'
    text(title, width / 2, 100)

    // Styling Switch Erklärung
    textSize(10)
    fill(random(COLORS_TEXT_FLICKER))
    textAlign(CENTER, TOP)
    text('PRESS S TO SWITCH BETWEEN TEXT AND IMAGE MODE', width / 2, 150)

    // Die Reihen an Level-Buttons rendern
    this.rows.forEach(this.drawRow)
  }

  drawRow(row, rowIndex) {
    const xFirstColumn = 308
    const yFirstRow = 294

    // Die Buttons einer Reihe von links nach rechts rendern
    row.forEach((button, columnIndex) => {
      const isOnCurrentRow = this.currentRowIndex === rowIndex
      const isOnCurrentColumn = this.currentColumnIndex === columnIndex
      button.draw({
        x: xFirstColumn + columnIndex * 180,
        y: yFirstRow + rowIndex * 180,
        showText: this.selectedLevelType === 'text',
        showImage: this.selectedLevelType === 'image',
        isSelected: isOnCurrentRow && isOnCurrentColumn,
      })
    })
  }

  onKeyPress() {
    // Button-Navigation ausführen
    if (this.buttons.length) this.handleNavigation()

    // Bei "s": Zwischen Bild und Text wechseln
    if (key === 's') {
      const otherType = this.selectedLevelType === 'image' ? 'text' : 'image'
      this.selectedLevelType = otherType
      // Position des angewählten Buttons resetten
      this.currentColumnIndex = 0
      this.currentRowIndex = 0
    }

    // Bei "Enter": aktuell ausgewähltes Level im state speichern und weiter zur nächsten Seite
    if (keyCode === ENTER) {
      state.currentLevel = this.selectedButton.level
      state.currentPage = new Game()
    }
  }

  handleNavigation() {
    // Die Pfeiltasten-Navigation.
    // Da es am Anfang und Ende von Spalten & Reihen nicht weitergeht, müssen wir wissen,
    // ob erste/letzte Spalte/Reihe schon erreicht ist.
    const onFirstColumn = this.currentColumnIndex === 0
    const onLastColumn = this.currentColumnIndex === this.selectedRow.length - 1
    const onFirstRow = this.currentRowIndex === 0
    const onLastRow = this.currentRowIndex === this.rows.length - 1

    switch (keyCode) {
      case RIGHT_ARROW:
        if (!onLastColumn) this.currentColumnIndex++
        break
      case LEFT_ARROW:
        if (!onFirstColumn) this.currentColumnIndex--
        break
      case DOWN_ARROW:
        if (!onLastRow) this.currentRowIndex++
        break
      case UP_ARROW:
        if (!onFirstRow) this.currentRowIndex--
        break
    }
  }
}
