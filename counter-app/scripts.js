"use strict";

//GLOBAL VARIABLES//

const mainArea = document.querySelector(".main");
const resetButton = document.querySelector(".reset_btn");
const countNumber = document.querySelector(".number");
const bgColorBar = document.querySelector(".bg-color-bar");
const keyElement = document.querySelector("body");

let counter = 0;
let counterbgbar = 0;

//GLOBAL FUCNTIONS//
const displayNumber = (number) => {
  document.querySelector(".number").textContent = number;
};

const changeBackgorund = () => {
  counterbgbar++;
  bgColorBar.style.width = counterbgbar + "%";
  counter++;
  displayNumber(counter);
};

const resetBackgorund = () => {
  if (counterbgbar === 100) {
    counterbgbar = 0;
  }
};

const resetEverything = () => {
  counter = 0;
  counterbgbar = 0;
  displayNumber(0);
  bgColorBar.style.width = "0%";
};

///COUNTER APP///

mainArea.addEventListener("click", () => {
  changeBackgorund();
  resetBackgorund();
});

keyElement.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Enter" || key === " ") {
    changeBackgorund();
    resetBackgorund();
  } else if (key === "Escape") {
    resetEverything();
  }
});

resetButton.addEventListener("click", () => {
  resetEverything();
});
