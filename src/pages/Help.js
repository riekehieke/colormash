import { BasePage } from './BasePage.js'
import { images } from '../sketch.js'

const TEXT_EXPLANATION = `YOUR GOAL IS TO COLORIZE THE WORD PUZZLE. PRESS THE SHOWN KEY ON YOUR KEYBOARD -

PIXEL BY PIXEL AND ROW BY ROW. YOU START AT THE TOP LEFT CORNER.

THE PUZZLE IS SOLVED WHEN YOU PAINT THE LAST PIXEL IN THE BOTTOM RIGHT.


YOU CAN CHOOSE OUT OF THREE MODES:


`
const TEXT_ARCADE = `- ARCADE MODE: FINISH THE IMAGE AS FAST AS POSSIBLE. YOU WILL GET STARS FOR
  SPEED AND ACCURACY.

`
const TEXT_TIMETRIAL = `- TIMETRIAL: YOU ARE PLAYING AGAINST THE CLOCK. EVERY LEVEL HAS A SPECIFIC
  TIME IN WHICH YOU HAVE TO FINISH THE PICTURE.

`
const TEXT_SURVIVAL = `- SURVIVAL MODE: YOU HAVE THREE LIVES. WITH EVERY ERROR YOU WILL LOSE ONE LIFE.
  COMPLETE AS MUCH IMAGES AS YOU CAN.`

export class Help extends BasePage {
  draw() {
    // Überschrift & allgemeiner Erklärungstext
    textAlign(CENTER, TOP)
    fill(255)
    textSize(30)
    text('HOW TO PLAY', width / 2, 100)
    textSize(10)
    textLeading(19)
    text(TEXT_EXPLANATION, width / 2, 180)

    // Erklärung der Spielmodi: Bild links & Text daneben
    textAlign(LEFT, TOP)
    imageMode(CENTER)
    image(images.STAR, 178, 372 + 15, 28, 30)
    text(TEXT_ARCADE, 223, 382)
    image(images.CLOCK, 178, 452 + 15, 32, 30)
    text(TEXT_TIMETRIAL, 223, 460)
    image(images.HEART, 178, 532 + 15, 37, 30)
    text(TEXT_SURVIVAL, 223, 538)
  }
}
