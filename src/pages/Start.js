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

    strokeWeight(3);
    if (isActive) stroke(0, 255, 255);
    else stroke(255, 0, 255);

    fill(0);
    rect(this.x, this.y, 100, 100);
  }
}

export class Start extends BasePage {
  constructor() {
    super();

    const startButton = new Button({ x: 50, y: 50 }, Imprint);
    const helpButton = new Button({ x: 200, y: 50 }, Imprint);
    const leaderboardButton = new Button({ x: 350, y: 50 }, Imprint);

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

    if (keyCode === RIGHT_ARROW && !lastIsActive) {
      this.activeButtonIndex++;
    }
    if (keyCode === LEFT_ARROW && !firstIsActive) {
      this.activeButtonIndex--;
    }
    if (keyCode === ENTER) {
      state.currentPage = new this.buttons[this.activeButtonIndex].Page();
    }
  }
}
