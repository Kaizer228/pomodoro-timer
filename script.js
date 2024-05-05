window.addEventListener("load", () => {
  TimeLeft = parseInt(localStorage.getItem('TimeLeft')) || 0;
  BreakTime = parseInt(localStorage.getItem('BreakTime')) || 0;

  if (TimeLeft > 0) {
    UpdateTimer();
  }

  if (BreakTime > 0) {
    TimeBreak();
  }
});
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);

    
});

let Start = document.getElementById("Start");
let btn1 = document.getElementById("Set1");
let btn2 = document.getElementById("Set2");
let Timer = document.getElementById("Timer");
let Timer2 = document.getElementById("Timer2");
let audio = document.getElementById("myAudio");
let TimerInput = document.getElementById("TimerInput");
let TimerBreakInput = document.getElementById("TimerBreakInput");
let StartTimer = document.getElementById('Start');
var PlayAlarm = () => { audio.currentTime = 0; audio.play(); };
let interval;
let TimeLeft;
let interval2;
let BreakTime;

 
function SetTimer() {
  let displayTime = TimerInput.value;
  let ConvertedValue = TimerInput.value * 60;
  TimeLeft = ConvertedValue;
  TimerInput.value = " ";
  btn1.style.display = "none";
  Timer.innerHTML = displayTime + ":00";

  if (TimeLeft === "" || TimeLeft === 0) {
    alert("Set time duration first");
    btn1.style.display = "";
  }

  // Save the timer value to local storage
  localStorage.setItem('TimeLeft', TimeLeft.toString());
}

function SetBreakTimer() {
  let displayBreakTime = TimerBreakInput.value;
  let ConvertedValue1 = TimerBreakInput.value * 60;
  BreakTime = ConvertedValue1;
  TimerBreakInput.value = " ";
  btn2.style.display = "none";
  Timer2.innerHTML = displayBreakTime + ":00";

  if (BreakTime === "" || BreakTime === 0) {
    alert("Set break time duration first");
    clearInterval(interval2);
    BreakTime = "";
    btn2.style.display = "";
  }

  // Save the break time value to local storage
  localStorage.setItem('BreakTime', BreakTime.toString());
}

function UpdateTimer() {
  let minutes = Math.floor(TimeLeft / 60);
  let second = Math.floor(TimeLeft % 60);
  let FormatedTime = `${minutes.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  Timer.innerHTML = FormatedTime;
}

function TimeBreak() {
  let Breakminutes = Math.floor(BreakTime / 60);
  let Breaksecond = Math.floor(BreakTime % 60);
  let Break = `${Breakminutes.toString().padStart(2, "0")}:${Breaksecond.toString().padStart(2, "0")}`;
  Timer2.innerHTML = Break;
}

StartTimer.addEventListener('click', function (event) {
  event.preventDefault();

  if (TimeLeft == 0) {
    alert("Set duration first");
  } else {
    interval = setInterval(() => {
      TimeLeft--;
      UpdateTimer();
      Start.style.display = "none";

      if (TimeLeft === 0) {
        PlayAlarm();
        clearInterval(interval);
        Start.style.display = "";
        btn1.style.display = "";
        TimeLeft;

        if (BreakTime === "" || BreakTime === 0) {
          clearInterval(interval2);
          BreakTime = "";
          btn2.style.display = "";
        } else {
          interval2 = setInterval(() => {
            BreakTime--;
            TimeBreak();

            if (BreakTime === 0) {
              PlayAlarm();
              clearInterval(interval2);
              btn2.style.display = "";
              BreakTime;
              UpdateTimer();
            }
          }, 1000);
        }
      }
    }, 1000);
  }
});

function StopTimer() {
  clearInterval(interval);
  btn1.style.display = "";
  Start.style.display = "";
   
}

function ResetTimer() {
  clearInterval(interval);
  TimeLeft = "";
  btn1.style.display = "";
  Start.style.display = "";
  UpdateTimer();
  TimerInput.value = '';
  // Clear local storage value when the timer is reset
  localStorage.removeItem('TimeLeft');
}

function ResetTimer1() {
  clearInterval(interval2);
  BreakTime = "";
  btn2.style.display = "";
  UpdateTimer();
  TimeBreak();
  TimerBreakInput.value = "";
  // Clear local storage value when the break timer is reset
  localStorage.removeItem('BreakTime');
}


