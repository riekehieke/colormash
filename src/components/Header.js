import { HEADER_HEIGHT } from '../constants.js'

// Header für jede Seite
export class Header {
  constructor() {}
  home() {}
  draw() {
    noStroke()
    fill(40)
    rect(0, 0, 1155, HEADER_HEIGHT)
    fill(255)
    textSize(10)
    textAlign(LEFT, TOP)
    text('ESC TO HOME', 30, 20)
    fill(255, 255, 0)
    textAlign(RIGHT, TOP)
    text('COLOR MASH', width - 30, 20)
  }
}
