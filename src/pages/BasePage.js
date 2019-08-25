import { state, images } from '../sketch.js'
import { Header } from '../components/Header.js'
import { Start } from './index.js'

// Grundlage für alle Seiten, die sicherstellt, dass Seiten einheitlich einen Header rendern,
// globale Funktionen wie die Escape-Navigation unterstützen usw.
// Wird von den Seiten-Klassen jeweils extended
export class BasePage {
  constructor() {
    this.header = new Header()

    // Seitenspezifische draw- und onKeyPress-Methoden, definiert in Start.js, Imprint.js, usw.
    const originalDraw = this.draw.bind(this)
    const originalOnKeyPress = this.onKeyPress.bind(this)

    // Draw-Methode erweitern, sodass immer Background & Header geupdated werden,
    // bevor die seitenspezifische draw-Methode - s. originalDraw() - ausgeführt wird
    function extendedDraw() {
      this._drawBackground()
      this._drawHeader()
      originalDraw()
    }
    // OnKeyPress Methode erweitern, sodass globale Escape-Navigation zusätzlich zu
    // seitenspezifischem Key-Handler funktioniert
    function extendedOnKeyPress() {
      this._handleEscapeToHome()
      originalOnKeyPress()
    }

    this.draw = extendedDraw
    this.onKeyPress = extendedOnKeyPress
  }

  draw() {}
  onKeyPress() {}

  // Private Methoden, um die seitenspezfischen Methoden zu erweitern (siehe constructor)
  _drawBackground() {
    imageMode(CORNER)
    image(images.PAGE_BACKGROUND, 0, 0)
  }
  _drawHeader() {
    if (this.header) this.header.draw()
  }
  _handleEscapeToHome() {
    if (this.header && keyCode === ESCAPE) {
      state.currentPage = new Start()
    }
  }
}
