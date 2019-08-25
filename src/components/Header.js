import { HEADER_HEIGHT } from '../constants.js'

export class Header {
  draw() {
    // Background
    noStroke()
    fill(40)
    rect(0, 0, width, HEADER_HEIGHT)

    // Navigations-Hinweis
    fill(255)
    textSize(10)
    textAlign(LEFT, TOP)
    text('ESC TO HOME', 30, 20)

    // Logo
    fill(255, 255, 0)
    textAlign(RIGHT, TOP)
    text('COLOR MASH', width - 30, 20)
  }
}
