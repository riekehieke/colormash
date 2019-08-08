import { state } from '../sketch.js'
import { BasePage, Game } from './index.js'

export class ChooseImage extends BasePage {
  draw() {
    textAlign(CENTER)
    text('CHOOSE IMAGE', width / 2, height / 2)
    text('(press ENTER to continue)', width / 2, height / 2 + 20)
  }

  onKeyPress() {
    if (keyCode === ENTER) state.currentPage = new Game()
  }
}
