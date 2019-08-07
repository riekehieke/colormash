import { BasePage, ChooseImage, Start } from './index.js'
import { state, images } from '../index.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from '../constants.js'
import { Header } from '../components/header.js'

class ModeButton {
  constructor(mode, { x, y }) {
    this.mode = mode
    this.x = x
    this.y = y
  }

  draw(activeMode) {
    const isActive = activeMode === this.mode
    // Styling Buttons
    strokeWeight(8)
    if (isActive) stroke(0, 255, 255)
    else stroke(255, 0, 255)

    fill(0)
    rect(this.x, this.y, 200, 200)
  }
}

export class ChooseMode extends BasePage {
  constructor() {
    super()
    this.header = new Header()
    const arcadeMode = new ModeButton(GAME_MODE_ARCADE, { x: 227, y: 250 })
    const timeMode = new ModeButton(GAME_MODE_TIMETRIAL, { x: 477, y: 250 })
    const surviveMode = new ModeButton(GAME_MODE_SURVIVAL, { x: 727, y: 250 })

    this.modeButtons = [arcadeMode, timeMode, surviveMode]
    this.activeModeButtonIndex = 0
  }

  get activeModeButton() {
    return this.modeButtons[this.activeModeButtonIndex]
  }
  get activeMode() {
    return this.activeModeButton.mode
  }

  draw() {
    super.draw()
    this.header.draw()
    // Styling Title
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    text('CHOOSE YOUR MODE', width / 2, 100)
    // Buttons rendern
    this.modeButtons.forEach(mode => mode.draw(this.activeMode))
    // Button Texte
    noStroke()
    fill(255)
    textSize(18)
    textAlign(LEFT, TOP)
    text('ARCADE', 273, 392)
    text('TIMETRIAL', 499, 392)
    text('SURVIVAL', 755, 392)
    // Bilder einbinden
    image(images.star, 301.2, 300)
    image(images.clock, 551, 300)
    image(images.heart, 794, 300)
  }

  onKeyPress() {
    const lastIsActive =
      this.activeModeButtonIndex === this.modeButtons.length - 1
    const firstIsActive = this.activeModeButtonIndex === 0

    if (keyCode === RIGHT_ARROW && !lastIsActive) {
      this.activeModeButtonIndex++
    }
    if (keyCode === LEFT_ARROW && !firstIsActive) {
      this.activeModeButtonIndex--
    }
    if (keyCode === ENTER) {
      state.currentMode = this.activeModeButton.mode
      state.currentPage = new ChooseImage()
    }
    if (keyCode == ESCAPE) state.currentPage = new Start()
  }
}
