// Basis-Template für einzelne Seiten mit variablem Inhalt
import { HEADER_HEIGHT } from "../constants.js";

export class BasePage {
  draw() {
    fill(229);
    rect(0, HEADER_HEIGHT, 1155, 600);
  }
}
