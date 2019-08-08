import { preload, setup, draw, keyPressed } from './src/sketch.js'

// Funktionen global verfügbar machen, sodass p5.js sie finden & ausführen kann
window.preload = preload
window.setup = setup
window.draw = draw
window.keyPressed = keyPressed
