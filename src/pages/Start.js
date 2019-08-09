import { BasePage, ChooseMode, Help, Highscores, Imprint } from './index.js'
import { state, images } from '../sketch.js'
import { colorsBW, colorsBlue, magenta, yellow, blue } from '../constants.js'

class MenuButton {
  constructor(TargetPage, drawOptions) {
    this.TargetPage = TargetPage
    this.drawOptions = drawOptions
  }

  draw(isSelected) {
    const { x, y, label } = this.drawOptions

    // Button outline
    strokeWeight(8)
    if (isSelected) stroke(random(colorsBlue), 255, 255)
    else stroke(magenta)

    // Button background
    fill(0)
    rectMode(CENTER)
    rect(x, y, 300, 75)

    // Button label
    noStroke()
    fill(255)
    textSize(18)
    textAlign(CENTER, TOP)
    text(label, x, y - 7.5)
  }
}

export class Start extends BasePage {
  header = null

  constructor() {
    super()
    const xCenter = width / 2
    const yFirstButton = 225 + 37.5

    const startButton = new MenuButton(ChooseMode, {
      label: 'START',
      x: xCenter,
      y: yFirstButton,
    })
    const helpButton = new MenuButton(Help, {
      label: 'HOW TO PLAY',
      x: xCenter,
      y: yFirstButton + 125,
    })
    const leaderboardButton = new MenuButton(Highscores, {
      label: 'HIGHSCORES',
      x: xCenter,
      y: yFirstButton + 2 * 125,
    })

    this.buttons = [startButton, helpButton, leaderboardButton]
    this.currentIndex = 0
  }

  get selectedButton() {
    return this.buttons[this.currentIndex]
  }

  draw() {
    // Styling der Startseite
    noStroke()
    fill(yellow)
    textSize(50)
    textAlign(LEFT, TOP)
    text('COLOR MASH', 328, 100)

    // Buttons rendern
    this.buttons.forEach(button => {
      const isSelected = this.selectedButton === button
      button.draw(isSelected)
    })

    // Hinweis auf Impressum
    textSize(10)
    textAlign(RIGHT, TOP)
    fill(random(colorsBW))
    text('PRESS i FOR IMPRINT', width - 30, 610)

    // Nyan Cat
    imageMode(BOTTOM)
    image(images.nyan, 0, height - 230)
  }

  onKeyPress() {
    if (key === 'i') state.currentPage = new Imprint()

    const lastIsSelected = this.currentIndex === this.buttons.length - 1
    const firstIsSelected = this.currentIndex === 0

    if (keyCode === DOWN_ARROW && !lastIsSelected) {
      this.currentIndex++
    }
    if (keyCode === UP_ARROW && !firstIsSelected) {
      this.currentIndex--
    }
    if (keyCode === ENTER) {
      const { TargetPage } = this.selectedButton
      state.currentPage = new TargetPage()
    }
  }
}
