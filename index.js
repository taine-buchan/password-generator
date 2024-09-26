let generateEl = document.getElementById("generate-el");
let outputElOne = document.getElementById("output-el-one");
let outputElTwo = document.getElementById("output-el-two");

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

// Display initial slider value
valueDisplay.textContent = rangeSlider.value;

// Update displayed value when slider is moved
rangeSlider.addEventListener('input', function () {
    valueDisplay.style.opacity = '0'; // Set opacity to 0 for fade out effect
    setTimeout(() => {
        valueDisplay.textContent = rangeSlider.value; // Update the value
        valueDisplay.style.opacity = '1'; // Fade in to full opacity
    }, 300); // Wait for the opacity change to take effect
});

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

    [outputElOne, outputElTwo].forEach(output => {
        output.classList.add("bounce"); // Add bounce class
        adjustFontSize(output, output.textContent.length);
        setTimeout(() => output.classList.remove("bounce"), 500); // Remove class after animation
    });
}

function copyToClipboard(outputId) {
    const outputElement = document.getElementById(outputId);
    const textToCopy = outputElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Copied to clipboard: ${textToCopy}`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

