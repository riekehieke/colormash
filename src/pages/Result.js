import { BasePage, Highscores } from './index.js'
import { state, images } from '../sketch.js'
import { buildImageFromTiles } from '../utils.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  YELLOW,
  COLORS_TEXT_FLICKER,
  COLORS_STRONG_FLICKER,
} from '../constants.js'

export class Result extends BasePage {
  constructor() {
    super()
    this.displayFullImage = false

    const progressTiles = state.currentLevel.tiles.map((tile, index) => {
      return index <= state.result.tileIndex ? tile : { color: 0 }
    })

    this.fullPicture = buildImageFromTiles(state.currentLevel.tiles)
    this.progressPicture = buildImageFromTiles(progressTiles)

    state.highscores[state.currentMode].push(state.result)
    localStorage.setItem('__HIGHSCORES', JSON.stringify(state.highscores))
  }

  drawArcade() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    const { score, time } = state.result

    fill(YELLOW)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(time.toFixed(2), posLeft, 335)
    text(score, posRight, 335)

    // Sterne
    imageMode(CENTER)
    const firstStar = score >= 100000 ? images.STAR_FILLED : images.STAR
    const secondStar = score >= 300000 ? images.STAR_FILLED : images.STAR
    const thirdStar = score >= 800000 ? images.STAR_FILLED : images.STAR
    image(firstStar, 578 - 100, 360)
    image(secondStar, 578, 360)
    image(thirdStar, 578 + 100, 360)
  }

  drawTimetrial() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    const { score, time } = state.result

    fill(YELLOW)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME LEFT', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(time.toFixed(2), posLeft, 335)
    text(score, posRight, 335)
  }

  drawSurvival() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    const { score, time, hearts } = state.result

    fill(YELLOW)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(time.toFixed(2), posLeft, 335)
    text(score, posRight, 335)

    // Herzen für verfügbare Leben hier anzeigen
    imageMode(CENTER)
    const firstHeart = hearts >= 1 ? images.HEART_FILLED : images.HEART
    const secondHeart = hearts >= 2 ? images.HEART_FILLED : images.HEART
    const thirdHeart = hearts >= 3 ? images.HEART_FILLED : images.HEART
    image(firstHeart, width / 2 - 40, 55, 22.3, 18.3)
    image(secondHeart, width / 2, 55, 22.3, 18.3)
    image(thirdHeart, width / 2 + 40, 55, 22.3, 18.3)
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
    const { currentMode, result } = state

    // Fertiges Bild
    imageMode(CENTER)
    image(this.progressPicture, width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)

    // You Win/Game Over Banner
    noStroke()
    fill(0)
    rect(578, 325, 400, 200)
    textAlign(CENTER, CENTER)
    textSize(30)
    fill(random(COLORS_STRONG_FLICKER))
    // Status bei Arcade weiter unten, damit Platz für Sterne ist
    const statusOffset = currentMode !== GAME_MODE_ARCADE ? 325 : 290
    text(result.status, 578, statusOffset)

    if (currentMode === GAME_MODE_ARCADE) this.drawArcade()
    if (currentMode === GAME_MODE_TIMETRIAL) this.drawTimetrial()
    if (currentMode === GAME_MODE_SURVIVAL) this.drawSurvival()

    // Full Image
    if (this.displayFullImage) this.drawFullImage()

    // Insctructions press V & H
    textSize(10)
    textAlign(CENTER, TOP)
    fill(random(COLORS_TEXT_FLICKER))
    text(
      'PRESS V TO TOGGLE FULL SIZE IMAGE. PRESS H TO GO TO HIGHSCORES.',
      width / 2,
      height - 30,
    )
  }

  onKeyPress() {
    // Press H to go to Highscores
    if (key.toLowerCase() === 'h') {
      state.currentPage = new Highscores()
    }

    // Press V to view image
    if (key.toLowerCase() === 'v') {
      this.displayFullImage = !this.displayFullImage
    }
  }
}
