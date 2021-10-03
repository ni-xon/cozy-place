const playButtons = document.querySelectorAll(".play-button");
// Assigns a default pause state to each play button
playButtons.forEach((playButton) => (playButton.state = "pause"));
const volumeSliders = document.querySelectorAll(".volume-control");

const sounds = {
  rain: { src: "audio/rain.wav" },
  fireplace: { src: "audio/fireplace.wav" },
  storm: { src: "audio/storm.wav" },
};

// Setup the rain Howl
const rain = new Howl({
  src: [sounds.rain.src],
  loop: true,
});

// Setup the fireplace Howl
const fireplace = new Howl({
  src: [sounds.fireplace.src],
  loop: true,
});

// Setup the storm Howl
const storm = new Howl({
  src: [sounds.storm.src],
  loop: true,
});

const audioList = [rain, fireplace, storm];

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
    audio.volume(event.currentTarget.value / 100);
  });
}
