import { BasePage, ChooseMode, Help, Highscores, Imprint } from './index.js'
import { state, images } from '../sketch.js'
import {
  YELLOW,
  MAGENTA,
  COLORS_TEXT_FLICKER,
  COLORS_STROKE_FLICKER,
} from '../constants.js'

// Klasse für den Auswahl-Button der Hauptnavigation
class MenuButton {
  // Beim Erstellen des Buttons speichern, auf welche Seite dieser verweist
  // und wie er aussehen soll (drawOptions)
  constructor(TargetPage, drawOptions) {
    this.TargetPage = TargetPage
    this.drawOptions = drawOptions
  }

  draw(isSelected) {
    const { x, y, label } = this.drawOptions

    // Button Outline
    strokeWeight(8)
    if (isSelected) stroke(random(COLORS_STROKE_FLICKER), 255, 255)
    else stroke(MAGENTA)

    // Button Background
    fill(0)
    rectMode(CENTER)
    rect(x, y, 300, 75)

    // Button Label
    noStroke()
    fill(255)
    textSize(18)
    textAlign(CENTER, TOP)
    text(label, x, y - 7.5)
  }
}

export class Start extends BasePage {
  constructor() {
    // super() führt den constructor der BasePage aus
    super()
    // Header (in BasePage instanziiert), auf null setzen, da auf Startseite nicht benötigt
    this.header = null

    const xCenter = width / 2
    const yFirstButton = 225 + 37.5

    // Für die drei Menüpunkte Buttons erstellen
    const startButton = new MenuButton(ChooseMode, {
      label: 'START',
      x: xCenter,
      y: yFirstButton,
    })
    const helpButton = new MenuButton(Help, {
      label: 'HOW TO PLAY',
      x: xCenter,
      y: yFirstButton + 125,
    })
    const leaderboardButton = new MenuButton(Highscores, {
      label: 'HIGHSCORES',
      x: xCenter,
      y: yFirstButton + 2 * 125,
    })

    // Die Buttons, und die Auswahl, welcher Button aktuellen angewählt ist, speichern
    this.buttons = [startButton, helpButton, leaderboardButton]
    this.currentIndex = 0
  }

  // der aktuell angewählte Button
  get selectedButton() {
    return this.buttons[this.currentIndex]
  }

  draw() {
    // Styling der Startseite
    noStroke()
    fill(YELLOW)
    textSize(50)
    textAlign(LEFT, TOP)
    text('COLOR MASH', 328, 100)

    // Buttons rendern
    this.buttons.forEach(button => {
      const isSelected = this.selectedButton === button
      button.draw(isSelected)
    })

    // Hinweis auf Impressum
    textSize(10)
    textAlign(RIGHT, TOP)
    fill(random(COLORS_TEXT_FLICKER))
    text('PRESS i FOR IMPRINT', width - 30, 610)

    // Nyan Cat
    imageMode(BOTTOM)
    image(images.NYAN_CAT, 0, height - 230)
  }

  onKeyPress() {
    if (key === 'i') state.currentPage = new Imprint()

    // Die Pfeiltasten-Navigation.
    // Da es am Anfang und Ende nicht weitergeht, müssen wir wissen,
    // ob erster/letzter Button schon angewählt ist.
    const lastIsSelected = this.currentIndex === this.buttons.length - 1
    const firstIsSelected = this.currentIndex === 0

    if (keyCode === DOWN_ARROW && !lastIsSelected) this.currentIndex++
    if (keyCode === UP_ARROW && !firstIsSelected) this.currentIndex--

    if (keyCode === ENTER) {
      const { TargetPage } = this.selectedButton
      state.currentPage = new TargetPage()
    }
  }
}
