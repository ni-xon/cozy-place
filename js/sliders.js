const playButtons = document.querySelectorAll(".play-button");
// Assigns a default pause state to each play button
playButtons.forEach((playButton) => (playButton.state = "pause"));

const rainAudio = document.querySelector("#rain");
const fireplaceAudio = document.querySelector("#fireplace");
const stormAudio = document.querySelector("#storm");
const audioList = [rainAudio, fireplaceAudio, stormAudio];
const volumeSliders = document.querySelectorAll(".volume-control");

// Add event listener to each play button for play/pause functionality
for (let [index, playButton] of playButtons.entries()) {
  playButton.addEventListener("click", function (event) {
    let audio = audioList[index];
    // Prevents button click from refreshing page
    event.preventDefault();
    if (playButton.state === "play") {
      playButton.innerHTML = "<i class='fas fa-play'></i>";
      audio.pause();
      playButton.state = "pause";
    } else if (playButton.state === "pause") {
      playButton.innerHTML = "<i class='fas fa-pause'></i>";
      audio.play();
      playButton.state = "play";
    }
  });
}

// Add event listener to all volume sliders for adjusting volume functionality
for (let [index, volumeSlider] of volumeSliders.entries()) {
  volumeSlider.addEventListener("change", function (event) {
    let audio = audioList[index];
    audio.volume = event.currentTarget.value / 100;
  });
}
