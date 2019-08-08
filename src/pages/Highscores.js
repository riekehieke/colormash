import { BasePage } from './index.js'
import { state } from '../sketch.js'

const showOnlyFirstFive = (_, index) => {
  return index < 5
}

class HighscoreColumn {
  constructor(values, drawOptions) {
    // Setup
    this.values = values
    this.drawOptions = drawOptions
  }
  draw() {
    noStroke()
    textAlign(CENTER, TOP)
    textSize(18)
    if (!this.drawOptions.noSort)
      this.values = this.values.sort((a, b) => b - a)
    this.values.filter(showOnlyFirstFive).forEach((value, i) => {
      text(value, this.drawOptions.x, this.drawOptions.y + 68 * i)
    })
  }
}

const xFirst = 236
const xSecond = 486
const xThird = 736
const yRow = 263

export class Highscores extends BasePage {
  constructor() {
    super()
    const numberColumn = new HighscoreColumn(['1.', '2.', '3.', '4.', '5.'], {
      x: (xFirst - 160) / 2 + 160,
      y: yRow,
      noSort: true,
    })
    const arcadeColumn = new HighscoreColumn(state.highscores.arcade, {
      x: (xSecond - xFirst) / 2 + xFirst,
      y: yRow,
    })
    const timetrialColumn = new HighscoreColumn(state.highscores.timetrial, {
      x: (xThird - xSecond) / 2 + xSecond,
      y: yRow,
    })
    const survivalColumn = new HighscoreColumn(state.highscores.survival, {
      x: (width - 160 - xThird) / 2 + xThird,
      y: yRow,
    })

    this.columns = [numberColumn, arcadeColumn, timetrialColumn, survivalColumn]
  }
  draw() {
    // Überschrift
    fill(255)
    textAlign(CENTER, TOP)
    textSize(30)
    text('HIGHSCORES', width / 2, 100)
    // Modi
    textAlign(LEFT, TOP)
    textSize(18)
    text('ARCADE', 310, 192)
    text('TIMETRIAL', 536, 192)
    text('SURVIVAL', 798, 192)
    // Tabelle
    stroke(255)
    strokeWeight(3)
    line(160, 230, width - 160, 230)
    line(xFirst, 180, xFirst, height - 70)
    line(xSecond, 180, xSecond, height - 70)
    line(xThird, 180, xThird, height - 70)

    // Numbers

    // Highscore Entrys rendern
    this.columns.forEach(column => {
      column.draw()
    })
  }
}
