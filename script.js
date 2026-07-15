// Timer Variables

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let timer = null;
let running = false;

let lapCount = 0;

let lapTimes = [];

// Elements

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const millisecond = document.getElementById("millisecond");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

const lapList = document.getElementById("lapList");

const greeting = document.getElementById("greeting");

const dateTime = document.getElementById("dateTime");

// Greeting

function updateGreeting(){

    const hourNow = new Date().getHours();

    if(hourNow < 12){

        greeting.textContent = "☀️ Good Morning!";

    }

    else if(hourNow < 17){

        greeting.textContent = "🌿 Good Afternoon!";

    }

    else{

        greeting.textContent = "🌙 Good Evening!";

    }

}

updateGreeting();

// Live Date & Time

function updateClock(){

    const now = new Date();

    dateTime.textContent = now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

// Update Stopwatch Display

function updateDisplay(){

    hour.textContent = String(hours).padStart(2,"0");

    minute.textContent = String(minutes).padStart(2,"0");

    second.textContent = String(seconds).padStart(2,"0");

    millisecond.textContent = String(milliseconds).padStart(3,"0");

}

// Stopwatch Logic

function runTimer(){

    milliseconds += 10;

    if(milliseconds===1000){

        milliseconds=0;

        seconds++;

    }

    if(seconds===60){

        seconds=0;

        minutes++;

    }

    if(minutes===60){

        minutes=0;

        hours++;

    }

    updateDisplay();

}

// Start

startBtn.addEventListener("click",()=>{

    if(running) return;

    timer = setInterval(runTimer,10);

    running=true;

});

// Pause

pauseBtn.addEventListener("click",()=>{

    clearInterval(timer);

    running=false;

});

// Reset

resetBtn.addEventListener("click",()=>{

    clearInterval(timer);

    running=false;

    hours=0;

    minutes=0;

    seconds=0;

    milliseconds=0;

    lapCount=0;

    lapTimes=[];

    updateDisplay();

    lapList.innerHTML=`<li class="empty">🌱 Your bloom journey starts here...</li>`;

    document.getElementById("totalLaps").textContent="0";

    document.getElementById("fastLap").textContent="--";

    document.getElementById("latestLap").textContent="--";

});
// Bloom Lap

lapBtn.addEventListener("click", () => {

    if (!running) return;

    // Remove empty message
    const empty = document.querySelector(".empty");
    if (empty) {
        empty.remove();
    }

    lapCount++;

    const lapTime =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}:` +
        `${String(milliseconds).padStart(3, "0")}`;

    lapTimes.push(lapTime);

    const li = document.createElement("li");

    li.innerHTML = `
    <span class="lapName">🌸 Bloom Lap ${lapCount}</span>
    <span class="lapTime">${lapTime}</span>
`;

    lapList.prepend(li);

    // Update Statistics
    document.getElementById("totalLaps").textContent = lapCount;
    document.getElementById("latestLap").textContent = lapTime;

    // Fastest Lap (simple version)
    document.getElementById("fastLap").textContent = lapTimes[0];

});
const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", () => {

    if (lapTimes.length === 0) {
        alert("No Bloom Laps to export!");
        return;
    }

    let content = "🌸 BloomWatch - Lap History\n\n";

    lapTimes.forEach((lap, index) => {
        content += `Bloom Lap ${index + 1} : ${lap}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "BloomWatch_Laps.txt";

    link.click();

});