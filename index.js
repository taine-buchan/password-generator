let generateEl = document.getElementById("generate-el");
let outputElOne = document.getElementById("output-el-one");
let outputElTwo = document.getElementById("output-el-two");
const clickSound = document.getElementById('click');

const characters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
    "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_",
    "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"
];

const rangeSlider = document.getElementById('character-bar');
const valueDisplay = document.getElementById('slider-value');

window.addEventListener('DOMContentLoaded', function() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.volume = 0.1; // Set initial volume
    });
});

valueDisplay.textContent = rangeSlider.value;

rangeSlider.addEventListener('input', function () {
    valueDisplay.style.opacity = '0';
    setTimeout(() => {
        valueDisplay.textContent = rangeSlider.value;
        valueDisplay.style.opacity = '1';
    }, 300);
    clickSound.currentTime = 0.17; // Restart click sound
    clickSound.play();
});

let isMusicPlayed = false; // Flag to track if background music has been played

function adjustFontSize(outputElement, textLength) {
    if (textLength <= 10) {
        outputElement.style.fontSize = '20px';
    } else if (textLength <= 20) {
        outputElement.style.fontSize = '16px';
    } else if (textLength <= 25) {
        outputElement.style.fontSize = '14px';
    } else if (textLength <= 30) {
        outputElement.style.fontSize = '12px';
    } else {
        outputElement.style.fontSize = '10px';
    }
}

function generate() {
    let valueLength = parseInt(rangeSlider.value);

    let resultStringOne = "";
    let resultStringTwo = "";

    for (let i = 0; i < valueLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        resultStringOne += characters[randomIndex];
    }

    for (let i = 0; i < valueLength; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        resultStringTwo += characters[randomIndex];
    }

    outputElOne.textContent = resultStringOne;
    outputElTwo.textContent = resultStringTwo;

    // Play sound effect
    const soundEffect = document.getElementById('soundEffect');
    soundEffect.currentTime = 0;
    soundEffect.play();

    // Play background music only the first time
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (!isMusicPlayed) {
        backgroundMusic.currentTime = 0; // Reset to the beginning
        backgroundMusic.play().catch(error => {
            console.log('Autoplay prevented: ', error);
        });
        isMusicPlayed = true; // Set flag to true after playing music
    }

    // Add bounce effect and adjust font size
    ;[outputElOne, outputElTwo].forEach(output => {
        output.classList.add("bounce");
        adjustFontSize(output, output.textContent.length);
        setTimeout(() => output.classList.remove("bounce"), 500);
    });
}

// Mute button functionality
const muteButton = document.getElementById('mute-btn');
const audioElements = document.querySelectorAll('audio');
let isMuted = false;

muteButton.addEventListener('click', function () {
    isMuted = !isMuted;

    audioElements.forEach(audio => {
        audio.muted = isMuted;
    });

    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
});

// Event listener for click event
const muteBtn = document.getElementById('mute-btn');

muteBtn.addEventListener('click', function() {
    // Toggle between volume-up and volume-mute classes
    if (muteBtn.classList.contains('volume-up')) {
        muteBtn.classList.remove('volume-up');
        muteBtn.classList.add('volume-mute');
    } else {
        muteBtn.classList.remove('volume-mute');
        muteBtn.classList.add('volume-up');
    }
});

