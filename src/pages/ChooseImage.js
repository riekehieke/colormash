import { BasePage, Game } from './index.js'
import { state, images } from '../sketch.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  LVL1,
  LVL2,
  LVL3,
  LVL4,
  LVL5,
  LVL6,
  LVL7,
  LVL8,
} from '../constants.js'

let colorsBlue = [200, 0, 0, 0, 0]

class ImageButton {
  constructor(level, drawOptions) {
    this.level = level
    this.drawOptions = drawOptions
  }

  draw(isSelected) {
    const { x, y, icon } = this.drawOptions

    // Button icon
    imageMode(LEFT, TOP)
    image(icon, x, y)

    // Button outline
    strokeWeight(8)
    if (isSelected) stroke(random(colorsBlue), 255, 255)
    else stroke(255, 0, 255)

    // Button background
    fill(0, 0, 0, 0)
    rectMode(LEFT, TOP)
    rect(x, y, 138, 138)
    rectMode(CORNER)
  }
}

const xFirstUpper = 239
const yFirstUpper = 206

export class ChooseImage extends BasePage {
  constructor() {
    super()

    const image1 = new ImageButton(LVL1, {
      icon: images.placeholder,
      x: xFirstUpper,
      y: yFirstUpper,
    })
    const image2 = new ImageButton(LVL2, {
      icon: images.placeholder,
      x: xFirstUpper + 180,
      y: yFirstUpper,
    })
    const image3 = new ImageButton(LVL3, {
      icon: images.placeholder,
      x: xFirstUpper + 180 * 2,
      y: yFirstUpper,
    })
    const image4 = new ImageButton(LVL4, {
      icon: images.placeholder,
      x: xFirstUpper + 180 * 3,
      y: yFirstUpper,
    })
    const image5 = new ImageButton(LVL5, {
      icon: images.placeholder,
      x: xFirstUpper,
      y: yFirstUpper + 180,
    })
    const image6 = new ImageButton(LVL6, {
      icon: images.placeholder,
      x: xFirstUpper + 180 * 1,
      y: yFirstUpper + 180,
    })
    const image7 = new ImageButton(LVL7, {
      icon: images.placeholder,
      x: xFirstUpper + 180 * 2,
      y: yFirstUpper + 180,
    })
    const image8 = new ImageButton(LVL8, {
      icon: images.placeholder,
      x: xFirstUpper + 180 * 3,
      y: yFirstUpper + 180,
    })

    this.upperRow = [image1, image2, image3, image4]
    this.lowerRow = [image5, image6, image7, image8]
    this.currentRow = this.upperRow
    this.currentIndex = 0
  }

  get selectedButton() {
    return this.currentRow[this.currentIndex]
  }
  get selectedLevel() {
    return this.selectedButton.level
  }

  draw() {
    // Styling von Titel usw.
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    text('CHOOSE YOUR IMAGE', width / 2, 100)

    // Buttons rendern
    this.upperRow.forEach(button => {
      const isSelected = this.selectedButton === button
      button.draw(isSelected)
    })
    this.lowerRow.forEach(button => {
      const isSelected = this.selectedButton === button
      button.draw(isSelected)
    })
  }

  onKeyPress() {
    const lastIsSelected = this.currentIndex === this.currentRow.length - 1
    const firstIsSelected = this.currentIndex === 0

    if (keyCode === RIGHT_ARROW && !lastIsSelected) {
      this.currentIndex++
    }
    if (keyCode === LEFT_ARROW && !firstIsSelected) {
      this.currentIndex--
    }
    if (keyCode === DOWN_ARROW && this.currentRow !== this.lowerRow) {
      this.currentRow = this.lowerRow
    }
    if (keyCode === UP_ARROW && this.currentRow !== this.upperRow) {
      this.currentRow = this.upperRow
    }
    if (keyCode === ENTER) {
      state.currentLevel = this.selectedButton.level
      state.currentPage = new Game()
    }
  }
}
