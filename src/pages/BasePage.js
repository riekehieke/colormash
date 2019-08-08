import { state, images } from '../sketch.js'
import { Header } from '../components/Header.js'
import { Start } from './index.js'

export class BasePage {
  header = new Header()

  constructor() {
    const originalDraw = this.draw.bind(this)
    const originalOnKeyPress = this.onKeyPress.bind(this)

    // Draw methode erweitern, sodass immer Background & Header geupdated werden
    function extendedDraw() {
      this._drawBackground()
      this._drawHeader()
      originalDraw()
    }
    // OnKeyPress Methode erweitern, sodass globale Escape-Navigation funktioniert
    function extendedOnKeyPress() {
      this._handleEscapeToHome()
      originalOnKeyPress()
    }

    this.draw = extendedDraw
    this.onKeyPress = extendedOnKeyPress
  }

  draw() {}
  onKeyPress() {}

  // Private Methoden, die Grundmethoden wie draw oder onKeyPress erweitern (siehe constructor)
  _drawBackground() {
    imageMode(CORNER)
    image(images.background, 0, 0)
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
