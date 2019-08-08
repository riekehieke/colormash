import { BasePage, Game } from './index.js'
import { state, images } from '../sketch.js'
import {
  LVL1,
  LVL2,
  LVL3,
  LVL4,
  LVL5,
  LVL6,
  LVL7,
  LVL8,
  LVL9,
  LVL10,
  LVL11,
  LVL12,
  LVL13,
  LVL14,
  LVL15,
  LVL16,
  colorsBW,
  colorsBlue,
} from '../constants.js'

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

export class ChooseLevel extends BasePage {
  constructor() {
    super()

    const image1 = new ImageButton(LVL1, {
      icon: images.placeholderImg,
      x: xFirstUpper,
      y: yFirstUpper,
    })
    const image2 = new ImageButton(LVL2, {
      icon: images.placeholderImg,
      x: xFirstUpper + 180,
      y: yFirstUpper,
    })
    const image3 = new ImageButton(LVL3, {
      icon: images.placeholderImg,
      x: xFirstUpper + 180 * 2,
      y: yFirstUpper,
    })
    const image4 = new ImageButton(LVL4, {
      icon: images.placeholderImg,
      x: xFirstUpper + 180 * 3,
      y: yFirstUpper,
    })
    const image5 = new ImageButton(LVL5, {
      icon: images.placeholderImg,
      x: xFirstUpper,
      y: yFirstUpper + 180,
    })
    const image6 = new ImageButton(LVL6, {
      icon: images.placeholderImg,
      x: xFirstUpper + 180 * 1,
      y: yFirstUpper + 180,
    })
    const image7 = new ImageButton(LVL7, {
      icon: images.placeholderImg,
      x: xFirstUpper + 180 * 2,
      y: yFirstUpper + 180,
    })
    const image8 = new ImageButton(LVL8, {
      icon: images.placeholderImg,
      x: xFirstUpper + 180 * 3,
      y: yFirstUpper + 180,
    })
    const image9 = new ImageButton(LVL9, {
      icon: images.placeholderText,
      x: xFirstUpper,
      y: yFirstUpper,
    })
    const image10 = new ImageButton(LVL10, {
      icon: images.placeholderText,
      x: xFirstUpper + 180,
      y: yFirstUpper,
    })
    const image11 = new ImageButton(LVL11, {
      icon: images.placeholderText,
      x: xFirstUpper + 180 * 2,
      y: yFirstUpper,
    })
    const image12 = new ImageButton(LVL12, {
      icon: images.placeholderText,
      x: xFirstUpper + 180 * 3,
      y: yFirstUpper,
    })
    const image13 = new ImageButton(LVL13, {
      icon: images.placeholderText,
      x: xFirstUpper,
      y: yFirstUpper + 180,
    })
    const image14 = new ImageButton(LVL14, {
      icon: images.placeholderText,
      x: xFirstUpper + 180 * 1,
      y: yFirstUpper + 180,
    })
    const image15 = new ImageButton(LVL15, {
      icon: images.placeholderText,
      x: xFirstUpper + 180 * 2,
      y: yFirstUpper + 180,
    })
    const image16 = new ImageButton(LVL16, {
      icon: images.placeholderText,
      x: xFirstUpper + 180 * 3,
      y: yFirstUpper + 180,
    })

    this.upperRowImg = [image1, image2, image3, image4]
    this.lowerRowImg = [image5, image6, image7, image8]
    this.upperRowText = [image9, image10, image11, image12]
    this.lowerRowText = [image13, image14, image15, image16]
    this.currentRow = this.upperRowImg
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
    text('CHOOSE YOUR LEVEL', width / 2, 100)

    // Switch Text
    textSize(10)
    fill(random(colorsBW))
    textAlign(CENTER, TOP)
    text('PRESS S TO SWITCH BETWEEN TEXT AND IMAGE MODE', width / 2, 150)

    // Buttons rendern wenn current row image ist
    if (
      this.currentRow === this.upperRowImg ||
      this.currentRow === this.lowerRowImg
    ) {
      this.upperRowImg.forEach(button => {
        const isSelected = this.selectedButton === button
        button.draw(isSelected)
      })
      this.lowerRowImg.forEach(button => {
        const isSelected = this.selectedButton === button
        button.draw(isSelected)
      })
    }
    // Buttons rendern wenn current row text ist
    if (
      this.currentRow === this.upperRowText ||
      this.currentRow === this.lowerRowText
    ) {
      this.upperRowText.forEach(button => {
        const isSelected = this.selectedButton === button
        button.draw(isSelected)
      })
      this.lowerRowText.forEach(button => {
        const isSelected = this.selectedButton === button
        button.draw(isSelected)
      })
    }
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

    if (
      this.currentRow !== this.upperRowImg &&
      this.currentRow !== this.lowerRowImg
    ) {
      if (keyCode === DOWN_ARROW && this.currentRow !== this.lowerRowImg) {
        this.currentRow = this.lowerRowImg
      }
      if (keyCode === UP_ARROW && this.currentRow !== this.upperRowImg) {
        this.currentRow = this.upperRowImg
      }
    }

    if (
      this.currentRow !== this.upperRowText &&
      this.currentRow !== this.lowerRowText
    ) {
      if (keyCode === DOWN_ARROW && this.currentRow !== this.lowerRowText) {
        this.currentRow = this.lowerRowText
      }
      if (keyCode === UP_ARROW && this.currentRow !== this.upperRowText) {
        this.currentRow = this.upperRowText
      }
    }

    if (
      key === 's' &&
      this.currentRow !== this.upperRowImg &&
      this.currentRow !== this.lowerRowImg
    ) {
      this.currentRow = this.upperRowImg
      console.log('Switch zu Bild')
      console.log(this.currentRow)
    } else {
      this.currentRow = this.upperRowText
      console.log('Switch zu Text')
      console.log(this.currentRow)
    }

    if (keyCode === ENTER) {
      state.currentLevel = this.selectedButton.level
      state.currentPage = new Game()
    }
  }
}
