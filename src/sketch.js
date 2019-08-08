/// <reference path="../globals.d.ts" />

import { Start, ChooseMode } from './pages/index.js'

export const state = {
  currentPage: null,
  currentMode: null,
  currentImage: null,
  highscores: {
    arcade: [12345, 465645, 345445, 3424543, 3326, 34564567],
    timetrial: [473895, 472772],
    survival: [488283, 27374],
  },
}

export const images = {}

// Fonts
let pressStart2P

export function preload() {
  pressStart2P = loadFont('./src/assets/fonts/PressStart2P.ttf')

  images.star = loadImage('./src/assets/images/star.png')
  images.clock = loadImage('./src/assets/images/clock.png')
  images.heart = loadImage('./src/assets/images/heart.png')
  images.starHelp = loadImage('./src/assets/images/star_help.png')
  images.clockHelp = loadImage('./src/assets/images/clock_help.png')
  images.heartHelp = loadImage('./src/assets/images/heart_help.png')
  images.background = loadImage('./src/assets/images/background.png')
  images.placeholderImg = loadImage('./src/assets/images/placeholder_img.png')
  images.placeholderText = loadImage('./src/assets/images/placeholder_text.png')
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
