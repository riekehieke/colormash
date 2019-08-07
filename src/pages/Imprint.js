import { BasePage, Start } from './index.js'
import { Header } from '../components/Header.js'
import { state } from '../index.js'

export class Imprint extends BasePage {
  constructor() {
    super()
    this.header = new Header()
  }
  draw() {
    super.draw()
    this.header.draw()
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    // text('IMPRINT', 473, 100)
    text('IMPRINT', width / 2, 100)
    textSize(10)
    textLeading(19)
    textAlign(CENTER, TOP)
    text(
      `Hallo
Wie gehts?
Hier kommt das Impressum hin.`,
      width / 2,
      180,
    )
  }
  onKeyPress() {
    if (keyCode == ESCAPE) state.currentPage = new Start()
  }
}
