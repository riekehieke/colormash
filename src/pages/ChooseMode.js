import { BasePage, ChooseLevel, Start } from './index.js'
import { state, images } from '../sketch.js'
import { colorsBlue } from '../constants.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from '../constants.js'

class ModeButton {
  constructor(mode, drawOptions) {
    this.mode = mode
    this.drawOptions = drawOptions
  }

  draw(isSelected) {
    const { x, y, label, icon } = this.drawOptions

    // Button outline
    strokeWeight(8)
    if (isSelected) stroke(random(colorsBlue), 255, 255)
    else stroke(255, 0, 255)

    // Button background
    fill(0)
    rectMode(CENTER)
    rect(x, y, 200, 200)
    rectMode(CORNER)

    // Button label
    noStroke()
    fill(255)
    textSize(18)
    textAlign(CENTER, TOP)
    text(label, x, y + 42)

    // Button icon
    imageMode(CENTER)
    image(icon, x, y - 22.5)
  }
}

export class ChooseMode extends BasePage {
  constructor() {
    super()
    const xCenter = width / 2

    const arcadeMode = new ModeButton(GAME_MODE_ARCADE, {
      label: 'ARCADE',
      icon: images.star,
      x: xCenter - 250,
      y: 350,
    })
    const timeMode = new ModeButton(GAME_MODE_TIMETRIAL, {
      label: 'TIMETRIAL',
      icon: images.clock,
      x: xCenter,
      y: 350,
    })
    const surviveMode = new ModeButton(GAME_MODE_SURVIVAL, {
      label: 'SURVIVAL',
      icon: images.heart,
      x: xCenter + 250,
      y: 350,
    })

    this.buttons = [arcadeMode, timeMode, surviveMode]
    this.currentIndex = 0
  }

  get selectedButton() {
    return this.buttons[this.currentIndex]
  }
  get selectedMode() {
    return this.selectedButton.mode
  }

  draw() {
    // Styling von Titel usw.
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    text('CHOOSE YOUR MODE', width / 2, 100)

    // Buttons rendern
    this.buttons.forEach(button => {
      const isSelected = this.selectedButton === button
      button.draw(isSelected)
    })
  }

  onKeyPress() {
    const lastIsSelected = this.currentIndex === this.buttons.length - 1
    const firstIsSelected = this.currentIndex === 0

    if (keyCode === RIGHT_ARROW && !lastIsSelected) {
      this.currentIndex++
    }
    if (keyCode === LEFT_ARROW && !firstIsSelected) {
      this.currentIndex--
    }

    if (keyCode === ENTER) {
      state.currentMode = this.selectedButton.mode
      state.currentPage = new ChooseLevel()
    }
  }
}
