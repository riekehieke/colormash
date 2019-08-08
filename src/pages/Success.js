import { BasePage } from './index.js'

export class Success extends BasePage {
  draw() {
    textAlign(CENTER)
    text('SUCCESS!!!', width / 2, height / 2)
  }
}
