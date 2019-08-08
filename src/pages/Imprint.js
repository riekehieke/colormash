import { BasePage } from './index.js'

export class Imprint extends BasePage {
  draw() {
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
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
}
