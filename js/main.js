class Queue {
  constructor() {
    this.items = [];
  }

  // add element to the queue
  enqueue(element) {
    return this.items.push(element);
  }

  // remove element from the queue
  dequeue() {
    if (this.items.length > 0) {
      return this.items.shift();
    }
  }

  // view the first element
  peek() {
    return this.items[0];
  }

  // check if the queue is empty
  isEmpty() {
    return this.items.length == 0;
  }

  // the size of the queue
  size() {
    return this.items.length;
  }

  // empty the queue
  clear() {
    this.items = [];
  }
}

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

// Get h1 element
const target = document.body.querySelector(".typewrite");
const speed = target.getAttribute("data-speed");

// Constructing Queue
let listofPhrases = JSON.parse(target.getAttribute("data-type"));
let phrasesQueue = new Queue();
listofPhrases.forEach((phrase) => {
  phrasesQueue.enqueue(phrase);
});

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// Event listener for hover to play typewriter effect
target.addEventListener("mouseenter", async function () {
  if (!target.classList.contains("typing")) {
    target.classList.toggle("typing");
    await backSpace(target, speed, phrasesQueue);

    target.classList.toggle("typing");
  }
});

// Typewriter effect 2 components: backSpace and typeOut
async function backSpace(target, speed, phrasesQueue) {
  const originalWord = String(target.childNodes[0].nodeValue);
  for (let i = originalWord.length; i >= 1; i--) {
    let currentText = String(target.childNodes[0].nodeValue);
    target.childNodes[0].nodeValue = currentText.substring(0, i);
    await timer(speed);
  }

  let phraseToEnqueue = phrasesQueue.peek();
  phrasesQueue.dequeue();
  phrasesQueue.enqueue(phraseToEnqueue);

  let phraseToType = phrasesQueue.peek();
  await typeOut(target, phraseToType, speed);
}

async function typeOut(target, phrase, speed) {
  for (let i = 1; i < phrase.length + 1; i++) {
    target.childNodes[0].nodeValue = phrase.substring(0, i);
    await timer(speed);
  }
}
