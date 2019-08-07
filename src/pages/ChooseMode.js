import { BasePage, ChooseImage } from './index.js'
import { state } from '../index.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from '../constants.js'

class ModeButton {
  constructor(mode) {
    this.mode = mode
  }

  draw(activeMode) {
    const isActive = activeMode === this.mode
    // Draw stuff
  }
}

export class ChooseMode extends BasePage {
  constructor() {
    const arcadeMode = new ModeButton(GAME_MODE_ARCADE, { text: 'Arcade' })
    const timeMode = new ModeButton(GAME_MODE_TIMETRIAL, { text: 'Time Trial' })
    const surviveMode = new ModeButton(GAME_MODE_SURVIVAL, { text: 'Survival' })

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
    this.modeButtons.forEach(mode => mode.draw(this.activeMode))
  }

  onKeyPress() {
    const lastIsActive = this.activeButtonIndex === this.modeButtons.length - 1
    const firstIsActive = this.activeButtonIndex === 0

    if (keyCode === RIGHT_ARROW && !lastIsActive) {
      this.activeModeButtonIndex++
    }
    if (keyCode === LIGHT_ARROW && !firstIsActive) {
      this.activeModeButtonIndex--
    }
    if (keyCode === ENTER) {
      state.currentMode = this.activeModeButton.mode
      state.currentPage = new ChooseImage()
    }
  }
}
