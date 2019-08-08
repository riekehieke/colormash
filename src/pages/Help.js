import { BasePage } from './index.js'

export class Help extends BasePage {
  draw() {
    textAlign(CENTER)
    text('HELP', width / 2, height / 2)
  }
}
