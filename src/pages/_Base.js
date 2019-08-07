// Basis-Template für einzelne Seiten mit variablem Inhalt
import { HEADER_HEIGHT } from "../constants.js";

export class BasePage {
  draw() {
    noStroke();
    fill(40);
    rect(0, 0, 1155, 650);
  }
}
