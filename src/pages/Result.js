import { BasePage, Highscores, Game } from './index.js'
import { state, images } from '../sketch.js'
import { buildImageFromTiles, cloneDeep } from '../utils.js'
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

    // Speichern, ob die Vollbild-Ansicht des Bildes gerade aktiv ist oder nicht
    this.showFullscreenView = false

    // Die anzuzeigenden Tiles/Farben: nicht erreichte Tiles durch Farbe schwarz ersetzen
    const imageTiles = state.currentLevel.tiles.map((tile, index) => {
      return index <= state.result.tileIndex ? tile : { color: 0 }
    })

    // Anzuzeigendes Bild - basierend auf den imageTiles mit schwarzen Pixeln, wo unerreicht
    this.resultImage = buildImageFromTiles(imageTiles)

    // Bei Erreichen der Result-Seite aktuelles Spiel in den Highscores speichern
    state.highscores[state.currentMode].push(cloneDeep(state.result))
    localStorage.setItem('__HIGHSCORES', JSON.stringify(state.highscores))
  }

  // Draw Methode für Arcade Mode
  drawArcade() {
    const posLeft = (width / 2 - (16 * 32) / 2) / 2
    const posRight = width - posLeft
    const { score, time } = state.result

    // Zeit & Score anzeigen
    fill(YELLOW)
    textAlign(CENTER, TOP)
    textSize(20)
    text('TIME', posLeft, 285)
    text('SCORE', posRight, 285)
    textSize(30)
    text(time.toFixed(2), posLeft, 335)
    text(score, posRight, 335)

    // Erreichte Sterne anhand des Scores berechnen und anzeigen
    imageMode(CENTER)
    const firstStar = score >= 100000 ? images.STAR_FILLED : images.STAR
    const secondStar = score >= 300000 ? images.STAR_FILLED : images.STAR
    const thirdStar = score >= 800000 ? images.STAR_FILLED : images.STAR
    image(firstStar, 578 - 100, 360)
    image(secondStar, 578, 360)
    image(thirdStar, 578 + 100, 360)
  }

  // Draw Methode für Time Trial Mode
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

  // Draw Methode für Survival Mode
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

    // Herzen anzeigen: Verbleibende Herzen ausgefüllt, verlorene Leben umrandet
    imageMode(CENTER)
    const firstHeart = hearts >= 1 ? images.HEART_FILLED : images.HEART
    const secondHeart = hearts >= 2 ? images.HEART_FILLED : images.HEART
    const thirdHeart = hearts >= 3 ? images.HEART_FILLED : images.HEART
    image(firstHeart, width / 2 - 40, 55, 22.3, 18.3)
    image(secondHeart, width / 2, 55, 22.3, 18.3)
    image(thirdHeart, width / 2 + 40, 55, 22.3, 18.3)
  }

  // Rendert die Vollbild-Ansicht des fertigen Bildes
  // (die man aktivieren kann, falls man das Level geschafft hat)
  drawFullscreenImage() {
    fill(0, 0, 0, 230)
    rectMode(CORNER)
    rect(0, 0, width, height)
    rectMode(CENTER)
    imageMode(CENTER)
    image(this.resultImage, width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)
  }

  draw() {
    const { currentMode, result } = state

    // Aus Spielfortschritt resultierendes Bild anzeigen
    imageMode(CENTER)
    image(this.resultImage, width / 2, (16 * 32) / 2 + 84, 16 * 32, 16 * 32)

    // Pop-up für Game Over/You Win Schriftzug:
    // Hintergrund
    noStroke()
    fill(0)
    rect(578, 325, 400, 200)
    // Schriftzug (bei Arcade weiter oben, damit Platz für Sterne ist)
    textAlign(CENTER, CENTER)
    textSize(30)
    fill(random(COLORS_STRONG_FLICKER))
    const statusOffset = currentMode !== GAME_MODE_ARCADE ? 325 : 290
    text(result.status, 578, statusOffset)

    // Bei Game Over: Retry einblenden
    if (result.status === 'GAME OVER') {
      textSize(10)
      textAlign(CENTER, TOP)
      fill(random(COLORS_TEXT_FLICKER))
      text('PRESS R TO RETRY', width / 2, 360)
    }

    // Die draw-Methode des aktuell ausgewählten Spielmodus ausführen
    switch (currentMode) {
      case GAME_MODE_ARCADE:
        this.drawArcade()
        break
      case GAME_MODE_TIMETRIAL:
        this.drawTimetrial()
        break
      case GAME_MODE_SURVIVAL:
        this.drawSurvival()
        break
    }

    // Vollbild-Ansicht des Bilds rendern, falls aktiviert
    if (this.showFullscreenView) this.drawFullscreenImage()

    // Hinweise für "h" (Highscores) und "v" (Vollbild-Ansicht)
    // Vollbild-Ansicht nicht bei Game Over verfügbar
    textSize(10)
    textAlign(CENTER, TOP)
    fill(random(COLORS_TEXT_FLICKER))
    if (result.status === 'YOU WIN') {
      text(
        'PRESS V TO TOGGLE FULL SIZE IMAGE. PRESS H TO GO TO HIGHSCORES.',
        width / 2,
        height - 30,
      )
    } else text('PRESS H TO GO TO HIGHSCORES.', width / 2, height - 30)
  }

  onKeyPress() {
    // "h" und "r" navigieren zu anderen Seiten
    if (key.toLowerCase() === 'h') state.currentPage = new Highscores()
    if (key.toLowerCase() === 'r') state.currentPage = new Game()

    // "v" zeigt Bild in der Vollbild-Ansicht, falls Level erfolgreich abgeschlossen wurde
    if (key.toLowerCase() === 'v' && state.result.status !== 'GAME OVER') {
      this.showFullscreenView = !this.showFullscreenView
    }
  }
}
