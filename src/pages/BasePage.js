import { state, images } from '../sketch.js'
import { Header } from '../components/Header.js'
import { Start } from './index.js'

export class BasePage {
  header = new Header()

  constructor() {
    const originalDraw = this.draw.bind(this)
    const originalOnKeyPress = this.onKeyPress.bind(this)

    // Extend the draw method
    function extendedDraw() {
      this._drawBackground()
      this._drawHeader()
      originalDraw()
    }
    // Extend the keyPress method
    function extendedOnKeyPress() {
      this._handleEscapeToHome()
      originalOnKeyPress()
    }

    this.draw = extendedDraw
    this.onKeyPress = extendedOnKeyPress
  }

  draw() {}
  onKeyPress() {}

  // Private methods, used to extend certain core methods (see constructor)
  _drawBackground() {
    imageMode(CORNER)
    image(images.background, 0, 0)
    // noStroke()
    // fill(40)
    // rectMode(CORNER)
    // rect(0, 0, width, height)
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
