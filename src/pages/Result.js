import { BasePage } from './index.js'
import { state, images } from '../sketch.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from '../constants.js'

export class Result extends BasePage {
  drawArcade() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text('00.00', posLeft, 335)
    text('12345', posRight, 335)
  }
  drawTimetrial() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME LEFT', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text('03.34', posLeft, 335)
    text('12345', posRight, 335)
  }
  drawSurvival() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    fill(255)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text('00.00', posLeft, 335)
    text('12345', posRight, 335)

    // Herzen für verfügbare Leben hier anzeigen
    imageMode(CENTER)
    image(images.heartFilled, width / 2, 55, 22.3, 18.3)
    image(images.heartFilled, width / 2 - 40, 55, 22.3, 18.3)
    image(images.heartFilled, width / 2 + 40, 55, 22.3, 18.3)
  }
  draw() {
    // Hier dann am Ende das richtige (ausgemalte) Bild
    strokeWeight(3)
    rectMode(CENTER)
    fill(0)
    rect(width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)

    // Congratulations/Game Over
    noStroke()
    fill(0, 255, 255)
    rect(578, 325, 300, 200)
    textAlign(CENTER, CENTER)
    textSize(30)
    fill(255, 0, 255)
    text('YOU WIN', 578, 325)
    if (state.currentMode === GAME_MODE_ARCADE) this.drawArcade()
    if (state.currentMode === GAME_MODE_TIMETRIAL) this.drawTimetrial()
    if (state.currentMode === GAME_MODE_SURVIVAL) this.drawSurvival()
  }
}
