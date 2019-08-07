/// <reference path="../globals.d.ts" />

import { Start } from './pages/index.js'

export const state = {
  currentPage: null,
  currentMode: null,
  currentImage: null,
}

// Fonts
let ocrFont

export function preload() {
  ocrFont = loadFont('/src/assets/fonts/PressStart2P.ttf')
}

export function setup() {
  createCanvas(1155, 650)

  noStroke()
  textFont(ocrFont)

  state.currentPage = new Start()
}

export function draw() {
  background(0)
  if (state.currentPage) state.currentPage.draw()
}

export function keyPressed() {
  if (state.currentPage.onKeyPress) state.currentPage.onKeyPress()
}
