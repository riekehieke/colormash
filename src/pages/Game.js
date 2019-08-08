import { state } from '../sketch.js'
import { BasePage } from './index.js'

export class Game extends BasePage {
  draw() {
    textAlign(CENTER)
    text('PLAY!', width / 2, height / 2)
    text(`(mode: ${state.currentMode})`, width / 2, height / 2 + 20)
  }
}
