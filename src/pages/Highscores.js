import { BasePage } from './index.js'
import { state } from '../sketch.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  COLORS_TEXT_FLICKER,
} from '../constants.js'

const showOnlyFirstFive = (_, index) => index < 5

class HighscoreColumn {
  constructor(values, drawOptions) {
    this.values = values
    this.drawOptions = drawOptions
  }

  draw() {
    noStroke()
    textAlign(CENTER, TOP)
    textSize(18)

    // Highscores der Größe nach sortieren (Höchster Highscore zuerst)
    if (!this.drawOptions.noSort) {
      this.values = this.values.sort((a, b) => b.score - a.score)
    }
    // Bei den ersten 5 Einträgen den "score"-Wert als Text anzeigen
    this.values.filter(showOnlyFirstFive).forEach((value, i) => {
      text(value.score, this.drawOptions.x, this.drawOptions.y + 68 * i)
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

    this.offset = -41.5

    // Die Daten für die 4 Spalten an Highscores (Index und Scores der 3 Modi)
    const numbers = ['1.', '2.', '3.', '4.', '5.'].map(num => ({ score: num }))
    const arcadeScores = state.highscores[GAME_MODE_ARCADE]
    const timetrialScores = state.highscores[GAME_MODE_TIMETRIAL]
    const survivalScores = state.highscores[GAME_MODE_SURVIVAL]

    // Für jede der vier angezeigten Spalten eine HighscoreColumn-Klasse erstellen
    const numberColumn = new HighscoreColumn(numbers, {
      x: (xFirst - 160) / 2 + 160 + this.offset,
      y: yRow,
      noSort: true,
    })
    const arcadeColumn = new HighscoreColumn(arcadeScores, {
      x: (xSecond - xFirst) / 2 + xFirst + this.offset,
      y: yRow,
    })
    const timetrialColumn = new HighscoreColumn(timetrialScores, {
      x: (xThird - xSecond) / 2 + xSecond + this.offset,
      y: yRow,
    })
    const survivalColumn = new HighscoreColumn(survivalScores, {
      x: (width - 160 - xThird) / 2 + xThird + this.offset,
      y: yRow,
    })

    // Alle Spalten in einem Array speichern
    this.columns = [numberColumn, arcadeColumn, timetrialColumn, survivalColumn]
  }

  draw() {
    // Überschrift
    fill(255)
    textAlign(CENTER, TOP)
    textSize(30)
    text('HIGHSCORES', width / 2, 100)
    // Tabellen-Überschriften
    textAlign(LEFT, TOP)
    textSize(18)
    text('ARCADE', 310 + this.offset, 192)
    text('TIMETRIAL', 536 + this.offset, 192)
    text('SURVIVAL', 798 + this.offset, 192)
    // Tabelle
    stroke(255)
    strokeWeight(3)
    line(160 + this.offset, 230, width - 160 + this.offset, 230)
    line(xFirst + this.offset, 180, xFirst + this.offset, height - 70)
    line(xSecond + this.offset, 180, xSecond + this.offset, height - 70)
    line(xThird + this.offset, 180, xThird + this.offset, height - 70)

    // Spalten (Highscore-Einträge) rendern
    this.columns.forEach(column => column.draw())

    // Hinweis zum Highscore-Reset
    textSize(10)
    fill(random(COLORS_TEXT_FLICKER))
    text('PRESS R TO RESET HIGHSCORES', width / 2, height - 30)
  }

  onKeyPress() {
    // Bei "r"-Taste:
    // Alle Highscores auf leere Arrays zurücksetzen, dann Seite neu laden
    if (key.toLowerCase() === 'r') {
      state.highscores = {
        [GAME_MODE_ARCADE]: [],
        [GAME_MODE_TIMETRIAL]: [],
        [GAME_MODE_SURVIVAL]: [],
      }

      localStorage.setItem('__HIGHSCORES', JSON.stringify(state.highscores))
      state.currentPage = new Highscores()
    }
  }
}
