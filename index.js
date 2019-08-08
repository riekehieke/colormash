import { preload, setup, draw, keyPressed } from './src/sketch.js'

// Expose functions globally so p5.js can find them
window.preload = preload
window.setup = setup
window.draw = draw
window.keyPressed = keyPressed
