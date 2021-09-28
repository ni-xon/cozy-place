// DARK MODE BUTTON
const root = document.querySelector("html");
const darkModeButton = document.getElementById("theme-button");

darkModeButton.addEventListener("click", () => {
  root.classList.toggle("dark-mode");
  if (root.classList.contains("dark-mode")) {
    darkModeButton.textContent = "Light Mode";
    root.style.setProperty("--bg-color", "black");
    root.style.setProperty("--text-color", "white");
  } else if (!root.classList.contains("dark-mode")) {
    darkModeButton.textContent = "Dark Mode";
    root.style.setProperty("--bg-color", "white");
    root.style.setProperty("--text-color", "black");
  }
});
