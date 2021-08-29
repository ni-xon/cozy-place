// Timer object to keep track of duration, minutes and seconds
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

// Interval variable
let interval;

const modeButtons = document.querySelector("#js-mode-buttons");
modeButtons.addEventListener("click", handleMode);

// START/STOP BUTTON
const buttonSound = new Audio("static/button-sound.mp3");
const mainButton = document.querySelector(".main-button");
mainButton.addEventListener("click", () => {
  buttonSound.play();
  const { action } = mainButton.dataset;

  if (action === "start") {
    startTimer();
  } else if (action === "stop") {
    stopTimer();
  }
});

// On page load, switch mode to pomodoro
document.addEventListener("DOMContentLoaded", () => {
  switchMode("pomodoro");
});

// Function to handle switching modes
function handleMode(event) {
  const { mode } = event.target.dataset;

  // Return if target.dataset is empty
  if (!mode) return;

  switchMode(mode);
  stopTimer();
}

// Function to retrieve remaining time left on clock
function getRemainingTime(endTime) {
  const difference = endTime - Date.parse(new Date());

  const total = difference / 1000;
  const minutes = Math.floor(total / 60);
  const seconds = Math.floor(total % 60);

  return {
    total,
    minutes,
    seconds,
  };
}

// Function to start timer
function startTimer() {
  let { total } = timer.remainingTime;

  // Calculate end time for the clock (in milliseconds since 1970)
  const endTime = Date.parse(new Date()) + total * 1000;

  // If timer is started with pomodoro mode increment total sessions by 1
  if (timer.mode === "pomodoro") {
    timer.sessions++;
  }

  mainButton.dataset.action = "stop";
  mainButton.textContent = "STOP";
  mainButton.classList.add("active");

  interval = setInterval(() => {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;

    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case "pomodoro":
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode("longBreak");
          } else {
            switchMode("shortBreak");
          }
          break;
        default:
          switchMode("pomodoro");
      }
      const doneSound = new Audio("static/done.mp3");
      doneSound.play();
      startTimer();
    }
  }, 1000);
}

// Function to stop timer
function stopTimer() {
  clearInterval(interval);
  mainButton.dataset.action = "start";
  mainButton.textContent = "START";
  mainButton.classList.remove("active");
}

// Function for countdown
function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, "0");
  const seconds = `${remainingTime.seconds}`.padStart(2, "0");

  document.querySelector("#js-minutes").textContent = minutes;
  document.querySelector("#js-seconds").textContent = seconds;

  // Reflecting countdown and mode in page tab
  if (timer.mode === "pomodoro") {
    document.title = `${minutes}:${seconds} - Get back to work!`;
  } else {
    document.title = `${minutes}:${seconds} - Take a break!`;
  }
}

// Function called by handleMode(event) to switch modes
function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  // Access each mode button and remove active class
  document
    .querySelectorAll(".mode-button")
    .forEach((e) => e.classList.remove("active"));

  // Add active class to selected mode
  document.querySelector(`button[data-mode="${mode}"]`).classList.add("active");

  // Update clock display
  updateClock();
}
