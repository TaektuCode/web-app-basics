const redRange = document.getElementById("red");
const greenRange = document.getElementById("green");
const blueRange = document.getElementById("blue");
const colorValue = document.getElementById("color-value");
const colorDisplay = document.querySelector("main");

function updateColor() {
  const redValue = redRange.value;
  const greenValue = greenRange.value;
  const blueValue = blueRange.value;

  // Update colorValue
  colorDisplay.style.backgroundColor = `RGB(${redValue}, ${greenValue}, ${blueValue})`;

  // Set the color value
  colorValue.textContent = `RGB(${redValue}, ${greenValue}, ${blueValue})`;
}

redRange.addEventListener("input", updateColor);
greenRange.addEventListener("input", updateColor);
blueRange.addEventListener("input", updateColor);

// Initialize the color
updateColor();
