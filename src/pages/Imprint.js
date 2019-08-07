import { BasePage, Start } from "./index.js";
import { Header } from "../components/Header.js";
import { state } from "../index.js";

export class Imprint extends BasePage {
  constructor() {
    super();
    this.header = new Header();
  }
  draw() {
    super.draw();
    this.header.draw();
    fill(243, 250, 45);
    rect(50, 50, 100, 100);
  }
  onKeyPress() {
    if (keyCode == ESCAPE) state.currentPage = new Start();
  }
}
