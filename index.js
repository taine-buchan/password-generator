let generateEl = document.getElementById("generate-el")
let outputElOne = document.getElementById("output-el-one")
let outputElTwo = document.getElementById("output-el-two")

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2",
    "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_",
    "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];



function generate() {
    let resultStringOne = ""
    for (let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length)
        resultStringOne += characters[randomIndex]
    }
    outputElOne.textContent = resultStringOne
    outputElOne.classList.add("scale")
    setTimeout(() => outputElOne.classList.remove("scale"), 300)

    let resultStringTwo = ""
    for (let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length)
        resultStringTwo += characters[randomIndex]
    }
    outputElTwo.textContent = resultStringTwo
    outputElTwo.classList.add("scale")
    setTimeout(() => outputElTwo.classList.remove("scale"), 300)
}

function copyToClipboard(outputId) {
    const outputElement = document.getElementById(outputId)
    const textToCopy = outputElement.textContent

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Copied to clipboard: ${textToCopy}`)
    }).catch(err => {
        console.error('Failed to copy: ', err)
    });
}

