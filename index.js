import { preload, setup, draw, keyPressed } from './src/sketch.js'

// Funktionen global verfügbar machen, sodass p5.js sie finden & ausführen kann
window.preload = preload
window.setup = setup
window.draw = draw
window.keyPressed = keyPressed

if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  navigator.serviceWorker.register('./serviceworker.js').catch(error => {
    console.warn(`Fehler beim Registrieren des Service Workers: ${error}`)
  })
}
