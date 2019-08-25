/// <reference path="../globals.d.ts" />

import { Start } from './pages/index.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  COLORS_TEXT_FLICKER,
} from './constants.js'

// Konstanten, die in diesem Modul verwendet werden
const FULLSCREEN_TOGGLE_KEY = '5'
const SOUND_TOGGLE_KEY = '9'

const defaultHighscores = {
  [GAME_MODE_ARCADE]: [],
  [GAME_MODE_TIMETRIAL]: [],
  [GAME_MODE_SURVIVAL]: [],
}
const defaultResult = {
  time: null,
  tileIndex: null,
  score: null,
  status: null,
  hearts: null,
}

// Der Anwendungs-State, der alle Informationen über den momentanen Zustand des Spiels speichert
// und Änderungen daran ermöglicht, bspw. wenn die Seite gewechselt wird.
export const state = {
  currentPage: null,
  currentMode: null,
  currentLevel: null,
  highscores: defaultHighscores,
  result: defaultResult,
  isFullscreen: false,
}

// Objekt, in das die verwendeten (externen) Bilder während dem preload() gespeichert werden
export const images = {
  STAR: null,
  STAR_FILLED: null,
  CLOCK: null,
  HEART: null,
  HEART_FILLED: null,
  NYAN_CAT: null,
  LEVEL_THUMB: null,
  PAGE_BACKGROUND: null,
}

// Font
let pressStart2P = null
// Song
let flamingoSong = null

// Benötigte Assets laden, bevor setup() ausgeführt werden kann
// Bereitgestellt durch p5.js
export function preload() {
  // Highscores aus dem LocalStorage laden und im State speichern
  const storedHighscores = localStorage.getItem('__HIGHSCORES')
  if (storedHighscores) state.highscores = JSON.parse(storedHighscores)

  images.STAR = loadImage('./src/assets/images/star.png')
  images.CLOCK = loadImage('./src/assets/images/clock.png')
  images.HEART = loadImage('./src/assets/images/heart.png')
  images.HEART_FILLED = loadImage('./src/assets/images/heart_filled.png')
  images.STAR_FILLED = loadImage('./src/assets/images/star_filled.png')
  images.PAGE_BACKGROUND = loadImage('./src/assets/images/background.png')
  images.LEVEL_THUMB = loadImage('./src/assets/images/placeholder_img.png')
  images.NYAN_CAT = loadImage('./src/assets/images/nyan.png')

  pressStart2P = loadFont('./src/assets/fonts/PressStart2P.ttf')
  flamingoSong = loadSound('./src/assets/sounds/flamingo.mp3')
}

// Einmaliges Setup - Canvas erstellen, Font definieren, Musik starten und Startseite laden
export function setup() {
  createCanvas(1155, 650)

  noStroke()
  textFont(pressStart2P)

  state.currentPage = new Start()
  flamingoSong.loop()
}

// Draw-Methode definieren, die dann 60x pro s ausgeführt wird.
// Wird durch eigene draw-Methoden der Seiten-Klassen ergänzt.
export function draw() {
  background(0)
  // Seiten-spezifische draw-Methode ausführen
  state.currentPage.draw()

  // Info zu Sound an-/ausschalten
  noStroke()
  if (flamingoSong.isPlaying()) fill(255)
  else fill(random(COLORS_TEXT_FLICKER), 100)
  textSize(10)
  textAlign(CENTER)
  text(`♪ PRESS ${SOUND_TOGGLE_KEY} TO TOGGLE MUSIC`, width / 2 + 150, 20)

  // Fullscreen Mode an-/ausschalten
  state.isFullscreen = fullscreen()
  const fullScreenIcon = state.isFullscreen ? '×' : 'Ξ'
  const fullscreenText = `${fullScreenIcon} PRESS ${FULLSCREEN_TOGGLE_KEY} FOR FULLSCREEN`
  fill(255)
  text(fullscreenText, width / 2 - 150, 20)
}

// keyPressed-Methode, wird von p5.js immer dann ausgeführt, wenn eine Taste gedrückt wurde
export function keyPressed() {
  // Seiten-spezifischen Key-Handler ausführen
  if (state.currentPage) state.currentPage.onKeyPress()

  // Hintergrundmusik togglen
  if (!!flamingoSong && key === SOUND_TOGGLE_KEY) {
    if (flamingoSong.isPlaying()) flamingoSong.pause()
    else flamingoSong.loop()
  }

  // Vollbild-Modus togglen
  if (key === FULLSCREEN_TOGGLE_KEY) fullscreen(!state.isFullscreen)
}
