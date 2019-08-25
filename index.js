import { preload, setup, draw, keyPressed } from './src/sketch.js'

// Funktionen global verfügbar machen, sodass p5.js sie finden & ausführen kann
window.preload = preload
window.setup = setup
window.draw = draw
window.keyPressed = keyPressed

// Escape-Taste locken, damit Escape nicht den Vollbild-Modus beendet,
// sondern vom Spiel zur Navigation genutzt werden kann (aktuell nur Chromium)
if ('keyboard' in navigator && navigator.keyboard.lock) {
  navigator.keyboard.lock(['Escape']).catch(error => {
    console.log('Escape-Taste konnte nicht gelockt werden:')
    console.error(error)
  })
}

// Service-Worker registrieren, damit die Seite auch offline funktioniert
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  navigator.serviceWorker.register('./serviceworker.js').catch(error => {
    console.warn(`Fehler beim Registrieren des Service Workers: ${error}`)
  })
}
