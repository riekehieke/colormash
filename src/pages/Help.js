import { BasePage } from './index.js'
import { images } from '../sketch.js'

export class Help extends BasePage {
  draw() {
    textAlign(CENTER, TOP)
    fill(255)
    textSize(30)
    text('HOW TO PLAY', width / 2, 100)
    textSize(10)
    textLeading(19)
    text(
      `YOUR GOAL IS TO COLORIZE THE WORD PUZZLE. PRESS THE SHOWN KEY ON YOUR KEYBOARD -

PIXEL BY PIXEL AND ROW BY ROW. YOU START AT THE TOP LEFT CORNER.

THE PUZZLE IS SOLVED WHEN YOU PAINT THE LAST PIXEL IN THE BOTTOM RIGHT.


YOU CAN CHOOSE OUT OF THREE MODES:


`,
      width / 2,
      180,
    )
    textAlign(LEFT, TOP)
    text(
      `- ARCADE MODE: FINISH THE IMAGE AS FAST AS POSSIBLE. YOU WILL GET STARS FOR
  SPEED AND ACCURACY.

`,
      223,
      382,
    )
    text(
      `- TIMETRIAL: YOU ARE PLAYING AGAINST THE CLOCK. EVERY LEVEL HAS A SPECIFIC
  TIME IN WHICH YOU HAVE TO FINISH THE PICTURE.

`,
      223,
      460,
    )
    text(
      `- SURVIVAL MODE: YOU HAVE THREE LIVES. WITH EVERY ERROR YOU WILL LOSE ONE LIFE.
  COMPLETE AS MUCH IMAGES AS YOU CAN.`,
      223,
      538,
    )
    imageMode(CENTER)
    image(images.starHelp, 178, 372 + 15)
    image(images.clockHelp, 178, 452 + 15)
    image(images.heartHelp, 178, 532 + 15)
  }
}
