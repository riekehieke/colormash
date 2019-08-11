/// <reference path="../globals.d.ts" />

import { Start } from './pages/index.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
  COLORS_TEXT_FLICKER,
} from './constants.js'

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

export const state = {
  currentPage: null,
  currentMode: null,
  currentLevel: null,
  highscores: defaultHighscores,
  result: defaultResult,
}

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

export function preload() {
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

export function setup() {
  createCanvas(1155, 650)

  noStroke()
  textFont(pressStart2P)

  state.currentPage = new Start()
  flamingoSong.loop()
}

export function draw() {
  background(0)
  state.currentPage.draw()

  // Info zu Sound an-/ausschalten
  noStroke()
  if (flamingoSong.isPlaying()) fill(255)
  else fill(random(COLORS_TEXT_FLICKER), 100)
  textSize(10)
  textAlign(CENTER)
  text(`♪ PRESS ${SOUND_TOGGLE_KEY} TO TOGGLE`, width / 2 + 150, 20)

  // Fullscreen Mode
  fill(255)
  text(`PRESS 5 FOR FULLSCREEN`, width / 2 - 150, 20)
}

export function keyPressed() {
  if (!!flamingoSong && key === SOUND_TOGGLE_KEY) {
    if (flamingoSong.isPlaying()) flamingoSong.pause()
    else flamingoSong.loop()
  }
  if (key.toLowerCase() === '5') {
    let fs = fullscreen()
    fullscreen(!fs)
  }
  if (state.currentPage) state.currentPage.onKeyPress()
}
