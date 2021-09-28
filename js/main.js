// DARK MODE BUTTON
const root = document.querySelector("html");
const darkModeButton = document.getElementById("theme-button");
const spotifyButton = document.querySelector(".spotify-button");
const spotifyEmbed = document.getElementById("spotify-embed");

const moonIcon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");

darkModeButton.addEventListener("click", () => {
  root.classList.toggle("dark-mode");
  if (root.classList.contains("dark-mode")) {
    darkModeButton.textContent = "Light Mode";
    root.style.setProperty("--bg-color", "black");
    root.style.setProperty("--text-color", "white");
    sunIcon.style.transform = "translateY(110vh)";
    moonIcon.style.transform = "translateY(-110vh)";
  } else if (!root.classList.contains("dark-mode")) {
    darkModeButton.textContent = "Dark Mode";
    root.style.setProperty("--bg-color", "white");
    root.style.setProperty("--text-color", "black");
    moonIcon.style.transform = "translateY(0vh)";
    sunIcon.style.transform = "translateY(0vh)";
  }
});

spotifyButton.addEventListener("click", () => {
  root.classList.toggle("spotifyPlaylistDisplayed");
  if (root.classList.contains("spotifyPlaylistDisplayed")) {
    spotifyEmbed.style.setProperty("display", "inline-block");
  } else if (!root.classList.contains("spotifyPlaylistDisplayed")) {
    spotifyEmbed.style.setProperty("display", "none");
  }
});
