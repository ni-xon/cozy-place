const root = document.querySelector("html");
const darkModeButton = document.querySelector("#theme-button");
const spotifyButton = document.querySelector(".spotify-button");
const spotifyEmbed = document.querySelector("#spotify-embed");
const youtubeButton = document.querySelector(".youtube-button");
const youtubeEmbed = document.querySelector("#youtube-embed");
const moonIcon = document.querySelector(".fa-moon");
const sunIcon = document.querySelector(".fa-sun");

const darkModeList = [moonIcon, sunIcon, darkModeButton];

// Allows moon, sun and dark mode elements to be clicked to switch between light/dark mode
darkModeList.forEach((element) => {
  element.addEventListener("click", () => {
    root.classList.toggle("dark-mode");
    if (root.classList.contains("dark-mode")) {
      darkModeButton.textContent = "Light Mode";
      root.style.setProperty("--bg-color", "#121212");
      root.style.setProperty("--text-color", "white");
      sunIcon.style.transform = "translateY(110vh)";
      moonIcon.style.transform = "translateY(-110vh)";
    } else if (!root.classList.contains("dark-mode")) {
      darkModeButton.textContent = "Dark Mode";
      root.style.setProperty("--bg-color", "white");
      root.style.setProperty("--text-color", "#121212");
      moonIcon.style.transform = "translateY(0vh)";
      sunIcon.style.transform = "translateY(0vh)";
    }
  });
});

// Allow spotify button to be toggled on/off
spotifyButton.addEventListener("click", () => {
  root.classList.toggle("spotifyPlaylistDisplayed");
  if (root.classList.contains("spotifyPlaylistDisplayed")) {
    // If youtube playlist is displayed toggle it off
    if (root.classList.contains("youtubePlaylistDisplayed")) {
      root.classList.toggle("youtubePlaylistDisplayed");
      youtubeEmbed.style.setProperty("display", "none");
    }
    spotifyEmbed.style.setProperty("display", "inline-block");
  } else if (!root.classList.contains("spotifyPlaylistDisplayed")) {
    spotifyEmbed.style.setProperty("display", "none");
  }
});

// Allow youtube button to be toggled on/off
youtubeButton.addEventListener("click", () => {
  root.classList.toggle("youtubePlaylistDisplayed");
  if (root.classList.contains("youtubePlaylistDisplayed")) {
    // If spotify playlist is displayed toggle it off
    if (root.classList.contains("spotifyPlaylistDisplayed")) {
      root.classList.toggle("spotifyPlaylistDisplayed");
      spotifyEmbed.style.setProperty("display", "none");
    }
    youtubeEmbed.style.setProperty("display", "inline-block");
  } else if (!root.classList.contains("youtubePlaylistDisplayed")) {
    youtubeEmbed.style.setProperty("display", "none");
  }
});
