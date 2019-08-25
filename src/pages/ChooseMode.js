import { BasePage, ChooseLevel, Start } from './index.js'
import { state, images } from '../sketch.js'
import { COLORS_STROKE_FLICKER, MAGENTA, YELLOW, BLUE } from '../constants.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from '../constants.js'

// Klasse für einen Auswahl-Button der Spielmodi-Navigation
class ModeButton {
  // Beim Erstellen des Buttons speichern, auf welchen Modus dieser verweist
  // und wie er aussehen soll (drawOptions)
  constructor(mode, drawOptions) {
    this.mode = mode
    this.drawOptions = drawOptions
  }

  draw(isSelected) {
    const { x, y, label, icon } = this.drawOptions

    // Button Outline
    strokeWeight(8)
    if (isSelected) stroke(random(COLORS_STROKE_FLICKER), 255, 255)
    else stroke(MAGENTA)

    // Button Background
    fill(0)
    rectMode(CENTER)
    rect(x, y, 200, 200)
    rectMode(CORNER)

    // Button Label
    noStroke()
    fill(255)
    textSize(18)
    textAlign(CENTER, TOP)
    text(label, x, y + 42)

    // Button Icon
    imageMode(CENTER)
    image(icon, x, y - 22.5)
  }
}

export class ChooseMode extends BasePage {
  constructor() {
    super()

    const xCenter = width / 2

    //Für die drei verfügbaren Modi Buttons instanziieren
    const arcadeMode = new ModeButton(GAME_MODE_ARCADE, {
      label: 'ARCADE',
      icon: images.STAR,
      x: xCenter - 250,
      y: 350,
    })
    const timeMode = new ModeButton(GAME_MODE_TIMETRIAL, {
      label: 'TIMETRIAL',
      icon: images.CLOCK,
      x: xCenter,
      y: 350,
    })
    const surviveMode = new ModeButton(GAME_MODE_SURVIVAL, {
      label: 'SURVIVAL',
      icon: images.HEART,
      x: xCenter + 250,
      y: 350,
    })

    // Die drei Buttons und die Auswahl, welcher aktuell angewählt ist, speichern
    this.buttons = [arcadeMode, timeMode, surviveMode]
    this.currentIndex = 0
  }

  get selectedButton() {
    return this.buttons[this.currentIndex]
  }
  get selectedMode() {
    return this.selectedButton.mode
  }

  draw() {
    // Styling von Titel
    noStroke()
    fill(255)
    textSize(30)
    textAlign(CENTER, TOP)
    text('CHOOSE YOUR MODE', width / 2, 100)

    // Buttons rendern
    this.buttons.forEach(button => {
      const isSelected = this.selectedButton === button
      button.draw(isSelected)
    })
  }

  onKeyPress() {
    // Die Pfeiltasten-Navigation.
    // Da es am Anfang und Ende nicht weitergeht, müssen wir wissen,
    // ob erster/letzter Button schon angewählt ist.
    const lastIsSelected = this.currentIndex === this.buttons.length - 1
    const firstIsSelected = this.currentIndex === 0

    if (keyCode === RIGHT_ARROW && !lastIsSelected) this.currentIndex++
    if (keyCode === LEFT_ARROW && !firstIsSelected) this.currentIndex--

    // Bei Enter: ausgewählten Modus im State speichern und zur nächsten Seite wechseln
    if (keyCode === ENTER) {
      state.currentMode = this.selectedButton.mode
      state.currentPage = new ChooseLevel()
    }
  }
}
