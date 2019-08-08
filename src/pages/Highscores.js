import { BasePage } from './index.js'

export class Highscores extends BasePage {
  draw() {
    textAlign(CENTER)
    text('HIGHSCORES', width / 2, height / 2)
  }
}
