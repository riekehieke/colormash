import { BasePage, Game } from './index.js'
import { state, images } from '../sketch.js'
import * as LEVELS from '../levels/index.js'
import { colorsBW, colorsBlue, magenta, yellow, blue } from '../constants.js'
import { createChunkedArray, buildImageFromTiles } from '../utils.js'

const allLevels = Object.values(LEVELS)

class LevelButton {
  constructor(level) {
    this.level = level
    if (level.mode !== 'text') this.picture = buildImageFromTiles(level.tiles)
  }

  draw(drawOptions) {
    const { x, y, isSelected } = drawOptions
    const { level, picture } = this

    // Button icon
    if (level.mode !== 'text') {
      noSmooth()
      imageMode(CENTER)
      image(picture || images.placeholderImg, x, y, 130, 130)
    }

    // Button outline
    strokeWeight(8)
    if (isSelected) stroke(random(colorsBlue), 255, 255)
    else stroke(magenta)

    // Button background
    fill(level.mode === 'text' ? 0 : color(0, 0, 0, 0))
    rectMode(CENTER, TOP)
    rect(x, y, 138, 138)
    rectMode(CORNER)

    // Button label
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

    this.currentRowIndex = 0
    this.currentColumnIndex = 0
    this.selectedLevelType = 'image'
    this.imageLevels = []
    this.textLevels = []

    for (const level of allLevels) {
      if (level.mode === 'text') this.textLevels.push(level)
      else this.imageLevels.push(level)
    }
    this.imageButtons = this.imageLevels.map(level => new LevelButton(level))
    this.textButtons = this.textLevels.map(level => new LevelButton(level))
  }

  get buttons() {
    if (this.selectedLevelType === 'text') return this.textButtons
    else return this.imageButtons
  }
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
    // Styling von Titel usw.
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    let title = 'CHOOSE YOUR IMAGE'
    if (this.selectedLevelType === 'text') title = 'CHOOSE YOUR TEXT'
    text(title, width / 2, 100)

    // Switch Text
    textSize(10)
    fill(random(colorsBW))
    textAlign(CENTER, TOP)
    text('PRESS S TO SWITCH BETWEEN TEXT AND IMAGE MODE', width / 2, 150)

    this.rows.forEach(this.drawRow)
  }

  drawRow = (row, rowIndex) => {
    const xFirstColumn = 308
    const yFirstRow = 294

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
    if (this.buttons.length) this.handleNavigation()

    if (key === 's') {
      const otherType = this.selectedLevelType === 'image' ? 'text' : 'image'
      this.selectedLevelType = otherType
      this.currentColumnIndex = 0
      this.currentRowIndex = 0
    }

    if (keyCode === ENTER) {
      state.currentLevel = this.selectedButton.level
      state.currentPage = new Game()
    }
  }

  handleNavigation() {
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
        if (!onLastRow) {
          const nextRow = this.rows[this.currentRowIndex + 1]
          if (nextRow[this.currentColumnIndex]) this.currentRowIndex++
        }
        break
      case UP_ARROW:
        if (!onFirstRow) this.currentRowIndex--
        break
    }
  }
}
