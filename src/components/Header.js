import { HEADER_HEIGHT } from "../constants.js";

// Header für jede Seite
export class Header {
  constructor() {}
  home() {}
  draw() {
    noStroke();
    fill(255);
    rect(0, 0, 1155, HEADER_HEIGHT);
    fill(66, 135, 245);
    textSize(20);
    textAlign(LEFT, TOP);
    text("ESC: HOME", 20, 15);
    fill(243, 71, 255);
    textAlign(RIGHT, TOP);
    text("Colormash", width - 15, 15);
  }
}
