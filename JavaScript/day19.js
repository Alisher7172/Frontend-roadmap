// JavaScript to display current viewport width for debugging/understanding breakpoints
function updateViewportInfo() {
  const viewportWidthElement = document.getElementById("viewport-width");
  if (viewportWidthElement) {
    viewportWidthElement.textContent = window.innerWidth;
  }
}
window.addEventListener("resize", updateViewportInfo);
updateViewportInfo(); // Initial call
