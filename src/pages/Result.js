import { BasePage, Highscores } from './index.js'
import { state, images } from '../sketch.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  yellow,
  magenta,
  blue,
  colorsBW,
} from '../constants.js'
import { buildImageFromTiles } from '../utils.js'

export class Result extends BasePage {
  constructor() {
    super()

    this.fullPicture = buildImageFromTiles(state.currentLevel.tiles)
    const progressTiles = state.currentLevel.tiles.map((tile, index) => {
      return index <= state.result.tileIndex ? tile : { color: 0 }
    })
    this.progressPicture = buildImageFromTiles(progressTiles)

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
      colorsBW,
    ]
    this.displayFullImage = false

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

  drawFullImage() {
    fill(0, 0, 0, 230)
    rectMode(CORNER)
    rect(0, 0, width, height)
    rectMode(CENTER)
    imageMode(CENTER)
    image(this.fullPicture, width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)
  }

  draw() {
    // Fertiges Bild
    imageMode(CENTER)
    image(this.progressPicture, width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)

    // You Win/Game Over Banner
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

    // Full Image
    if (this.displayFullImage) {
      this.drawFullImage()
    }

    // Insctructions press V & H
    textSize(10)
    textAlign(CENTER, TOP)
    fill(random(colorsBW))
    text(
      'PRESS V TO TOGGLE FULL SIZE IMAGE. PRESS H TO GO TO HIGHSCORES.',
      width / 2,
      height - 30,
    )
  }

  onKeyPress() {
    // Press H to go to Highscores
    if (key.toLowerCase() === 'h') state.currentPage = new Highscores()
    // Press V to view image
    if (key.toLowerCase() === 'v') {
      if (!this.displayFullImage) this.displayFullImage = true
      else this.displayFullImage = false
    }
  }
}
