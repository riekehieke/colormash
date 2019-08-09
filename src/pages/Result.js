import { BasePage } from './index.js'
import { state, images } from '../sketch.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  yellow,
  magenta,
  blue,
} from '../constants.js'
import { buildImageFromTiles } from '../utils.js'

export class Result extends BasePage {
  constructor() {
    super()
    this.picture = buildImageFromTiles(state.currentLevel.tiles)
    this.wechsel = [
      magenta,
      magenta,
      magenta,
      magenta,
      yellow,
      magenta,
      magenta,
      magenta,
      yellow,
      magenta,
      magenta,
      magenta,
    ]

    state.highscores[state.currentMode].push(state.result)
    localStorage.setItem('__HIGHSCORES', JSON.stringify(state.highscores))
  }

  drawArcade() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    fill(yellow)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(state.result.time.toFixed(2), posLeft, 335)
    text(state.result.score, posRight, 335)
    // Banner mit Sternen
    noStroke()
    fill(0)
    rect(578, 325, 400, 200)
    textAlign(CENTER, CENTER)
    textSize(30)
    fill(random(this.wechsel))
    text(state.result.status, 578, 290)
    // Sterne
    imageMode(CENTER)
    if (state.result.score >= 100000) image(images.starFilled, 578 - 100, 360)
    else image(images.star, 578 - 100, 360)
    if (state.result.score >= 300000) image(images.starFilled, 578, 360)
    else image(images.star, 578, 360)
    if (state.result.score >= 800000) image(images.starFilled, 578 + 100, 360)
    else image(images.star, 578 + 100, 360)
  }
  drawTimetrial() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    fill(yellow)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME LEFT', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(state.result.time.toFixed(2), posLeft, 335)
    text(state.result.score, posRight, 335)
  }
  drawSurvival() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    fill(yellow)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(state.result.time.toFixed(2), posLeft, 335)
    text(state.result.score, posRight, 335)

    // Herzen für verfügbare Leben hier anzeigen
    imageMode(CENTER)
    if (state.result.hearts >= 1)
      image(images.heartFilled, width / 2 - 40, 55, 22.3, 18.3)
    else image(images.heart, width / 2 - 40, 55, 22.3, 18.3)
    if (state.result.hearts >= 2)
      image(images.heartFilled, width / 2, 55, 22.3, 18.3)
    else image(images.heart, width / 2, 55, 22.3, 18.3)
    if (state.result.hearts === 3)
      image(images.heartFilled, width / 2 + 40, 55, 22.3, 18.3)
    else image(images.heart, width / 2 + 40, 55, 22.3, 18.3)
  }
  draw() {
    // Hier dann am Ende das richtige (ausgemalte) Bild
    strokeWeight(3)
    imageMode(CENTER)
    //fill(yellow)
    image(this.picture, width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)
    //rect(width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)

    // You Win/Game Over
    if (state.currentMode !== GAME_MODE_ARCADE) {
      noStroke()
      fill(0)
      rect(578, 325, 400, 200)
      textAlign(CENTER, CENTER)
      textSize(30)
      fill(random(this.wechsel))
      text(state.result.status, 578, 325)
    }
    if (state.currentMode === GAME_MODE_ARCADE) this.drawArcade()
    if (state.currentMode === GAME_MODE_TIMETRIAL) this.drawTimetrial()
    if (state.currentMode === GAME_MODE_SURVIVAL) this.drawSurvival()
  }
}
