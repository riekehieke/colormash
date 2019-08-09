/// <reference path="../globals.d.ts" />

import { Start } from './pages/index.js'
import {
  GAME_MODE_ARCADE,
  GAME_MODE_TIMETRIAL,
  GAME_MODE_SURVIVAL,
} from './constants.js'

export const state = {
  currentPage: null,
  currentMode: null,
  currentLevel: null,
  highscores: {
    [GAME_MODE_ARCADE]: [],
    [GAME_MODE_TIMETRIAL]: [],
    [GAME_MODE_SURVIVAL]: [],
  },
  result: {
    time: null,
    score: null,
    status: null,
    hearts: null,
  },
}

export const images = {
  star: null,
  clock: null,
  heart: null,
  starHelp: null,
  clockHelp: null,
  heartHelp: null,
  background: null,
  placeholderImg: null,
  nyan: null,
}

// Fonts
let pressStart2P

export function preload() {
  const storedHighscores = localStorage.getItem('__HIGHSCORES')
  if (storedHighscores) state.highscores = JSON.parse(storedHighscores)

  pressStart2P = loadFont('./src/assets/fonts/PressStart2P.ttf')

  images.star = loadImage('./src/assets/images/star.png')
  images.clock = loadImage('./src/assets/images/clock.png')
  images.heart = loadImage('./src/assets/images/heart.png')
  images.starHelp = loadImage('./src/assets/images/star_help.png')
  images.clockHelp = loadImage('./src/assets/images/clock_help.png')
  images.heartHelp = loadImage('./src/assets/images/heart_help.png')
  images.heartFilled = loadImage('./src/assets/images/heart_filled.png')
  images.starFilled = loadImage('./src/assets/images/star_filled.png')
  images.background = loadImage('./src/assets/images/background.png')
  images.placeholderImg = loadImage('./src/assets/images/placeholder_img.png')
  images.nyan = loadImage('./src/assets/images/nyan.png')
}

export function setup() {
  createCanvas(1155, 650)

  noStroke()
  textFont(pressStart2P)

  state.currentPage = new Start()
}

export function draw() {
  background(0)
  state.currentPage.draw()
}

export function keyPressed() {
  state.currentPage.onKeyPress()
}
