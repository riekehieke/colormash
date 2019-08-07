import { BasePage, Imprint } from "./index.js";
import { state } from "../index.js";

class Button {
  constructor({ x, y }, Page) {
    this.x = x;
    this.y = y;
    this.Page = Page;
  }

  draw(activeButton) {
    const isActive = activeButton === this;

    // Styling der Startseite
    noStroke();
    fill(255, 255, 0);
    textSize(50);
    textAlign(LEFT, TOP);
    text("COLOR MASH", 328, 100);

    strokeWeight(8);
    if (isActive) stroke(0, 255, 255);
    else stroke(255, 0, 255);

    fill(0);
    rect(this.x, this.y, 300, 75);

    noStroke();
    fill(255);
    textSize(18);
    text("START", 533, 255);
    text("HOW TO PLAY", 478.5, 380);
    text("LEADERBOARD", 478.5, 505);
    textSize(10);
    textAlign(RIGHT, TOP);
    text("PRESS i FOR IMPRINT", width - 30, 610);
  }
}

export class Start extends BasePage {
  constructor() {
    super();

    const startButton = new Button({ x: 428, y: 225 }, Imprint);
    const helpButton = new Button({ x: 428, y: 350 }, Imprint);
    const leaderboardButton = new Button({ x: 428, y: 475 }, Imprint);

    this.buttons = [startButton, helpButton, leaderboardButton];
    this.activeButtonIndex = 0;
  }

  draw() {
    super.draw();
    const activeButton = this.buttons[this.activeButtonIndex];
    this.buttons.forEach(button => button.draw(activeButton));
  }

  onKeyPress() {
    const lastIsActive = this.activeButtonIndex === this.buttons.length - 1;
    const firstIsActive = this.activeButtonIndex === 0;

    if (keyCode === DOWN_ARROW && !lastIsActive) {
      this.activeButtonIndex++;
    }
    if (keyCode === UP_ARROW && !firstIsActive) {
      this.activeButtonIndex--;
    }
    if (keyCode === ENTER) {
      state.currentPage = new this.buttons[this.activeButtonIndex].Page();
    }
    if (key == "i") state.currentPage = new Imprint();
  }
}
