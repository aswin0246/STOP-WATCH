let timer;
let isRunning = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let lapCount = 0;
let countdownMode = false;

function updateDisplay() {
  let h = hours.toString().padStart(2, '0');
  let m = minutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  let ms = (milliseconds / 10).toFixed(0).padStart(2, '0');
  document.getElementById("display").innerHTML = `${h}:${m}:${s}:<span class="ms-part">${ms}</span>`;
}

function toggleMode() {
  countdownMode = document.getElementById("modeSwitch").checked;
  document.getElementById("countdown-inputs").style.display = countdownMode ? "block" : "none";
  resetTimer();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  if (countdownMode) {
    hours = parseInt(document.getElementById("countdownHrs").value) || 0;
    minutes = parseInt(document.getElementById("countdownMin").value) || 0;
    seconds = parseInt(document.getElementById("countdownSec").value) || 0;
    milliseconds = 0;
  }

  timer = setInterval(() => {
    if (countdownMode) {
      if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
        clearInterval(timer);
        isRunning = false;
        alert("⏰ Countdown Finished!");
        return;
      }

      if (milliseconds === 0) {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) return;
            hours--;
            minutes = 59;
            seconds = 59;
            milliseconds = 990;
          } else {
            minutes--;
            seconds = 59;
            milliseconds = 990;
          }
        } else {
          seconds--;
          milliseconds = 990;
        }
      } else {
        milliseconds -= 10;
      }

    } else {
      milliseconds += 10;
      if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
        }
      }
    }

    updateDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  updateDisplay();
  lapCount = 0;
  const tableBody = document.querySelector("#timeTable tbody");
  tableBody.innerHTML = "";
}

function lapTime() {
  if (!isRunning) return;
  lapCount++;
  const table = document.getElementById("timeTable").getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  let h = hours.toString().padStart(2, '0');
  let m = minutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  let ms = (milliseconds / 10).toFixed(0).padStart(2, '0');
  cell1.innerHTML = lapCount;
  cell2.innerHTML = `${h}:${m}:${s}:${ms}`;
}
