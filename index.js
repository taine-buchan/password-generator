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
const muteBtn = document.getElementById('mute-btn');
const audioElements = document.querySelectorAll('audio');
let isMuted = false; // Track mute state
let isMusicPlayed = false; // Track if background music has been played

// Set initial audio volume
window.addEventListener('DOMContentLoaded', function() {
    audioElements.forEach(audio => {
        audio.volume = 0.1; // Set initial volume
    });
});

valueDisplay.textContent = rangeSlider.value;

// Update display and play click sound on slider input
rangeSlider.addEventListener('input', function () {
    valueDisplay.style.opacity = '0';
    setTimeout(() => {
        valueDisplay.textContent = rangeSlider.value;
        valueDisplay.style.opacity = '1';
    }, 300);
    clickSound.currentTime = 0.17; // Restart click sound
    clickSound.play();
});

// Function to adjust font size based on text length
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

// Generate random strings
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
    [outputElOne, outputElTwo].forEach(output => {
        output.classList.add("bounce");
        adjustFontSize(output, output.textContent.length);
        setTimeout(() => output.classList.remove("bounce"), 500);
    });
}

// Mute button functionality
muteBtn.addEventListener('click', function() {
    isMuted = !isMuted; // Toggle mute state
    audioElements.forEach(audio => {
        audio.volume = isMuted ? 0 : 0.1; // Set volume based on mute state
    });
    
    // Toggle classes for visual feedback
    muteBtn.classList.toggle('volume-up', !isMuted);
    muteBtn.classList.toggle('volume-mute', isMuted);
});

// Copy to clipboard function
function copyToClipboard(outputId) {
    const outputElement = document.getElementById(outputId);
    const textToCopy = outputElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log('Text copied to clipboard:', textToCopy);
        alert('Copied to clipboard: ' + textToCopy);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

