/// <reference path="../globals.d.ts" />

import { Start } from './pages/index.js'

export const state = {
  currentPage: null,
  currentMode: null,
  currentImage: null,
}
export const images = {
  star: null,
}

// Fonts
let Font

export function preload() {
  Font = loadFont('/src/assets/fonts/PressStart2P.ttf')
  images.star = loadImage('/src/assets/images/star.png')
  images.clock = loadImage('/src/assets/images/clock.png')
  images.heart = loadImage('/src/assets/images/heart.png')
}

export function setup() {
  createCanvas(1155, 650)

  noStroke()
  textFont(Font)

  state.currentPage = new Start()
}

export function draw() {
  background(0)
  if (state.currentPage) state.currentPage.draw()
}

export function keyPressed() {
  if (state.currentPage.onKeyPress) state.currentPage.onKeyPress()
}
