import { copyright } from "../utils";

const START_YEAR = 2021;

const target = document.getElementById("copyright_years");

if (target) {
  target.textContent = copyright(START_YEAR);
}
