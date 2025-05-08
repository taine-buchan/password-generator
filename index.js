let generateEl = document.getElementById('generate-el')
let outputElOne = document.getElementById('output-el-one')
let outputElTwo = document.getElementById('output-el-two')
const clickSound = document.getElementById('click')

const rangeSlider = document.getElementById('character-bar')
const valueDisplay = document.getElementById('slider-value')
const muteBtn = document.getElementById('mute-btn')
const audioElements = document.querySelectorAll('audio')
let isMuted = false // Track mute state
let isMusicPlayed = false // Track if background music has been played

// Sset initial audio volume
window.addEventListener('DOMContentLoaded', function () {
  audioElements.forEach((audio) => {
    audio.volume = 0.1 // Set initial volume
  })
})

valueDisplay.textContent = rangeSlider.value

// Update display and play click sound on slider input
rangeSlider.addEventListener('input', function () {
  valueDisplay.style.opacity = '0'
  setTimeout(() => {
    valueDisplay.textContent = rangeSlider.value
    valueDisplay.style.opacity = '1'
  }, 300)
  clickSound.currentTime = 0.17 // Restart click sound
  clickSound.play()
})

// Adjust font size based on text length
function adjustFontSize(outputElement, textLength) {
  if (textLength <= 10) {
    outputElement.style.fontSize = '20px'
  } else if (textLength <= 20) {
    outputElement.style.fontSize = '16px'
  } else if (textLength <= 25) {
    outputElement.style.fontSize = '14px'
  } else if (textLength <= 30) {
    outputElement.style.fontSize = '12px'
  } else {
    outputElement.style.fontSize = '10px'
  }
}

// Generate random strings
function generate() {
  const valueLength = parseInt(rangeSlider.value)
  const resultStringOne = generatePassword(valueLength)
  const resultStringTwo = generatePassword(valueLength)

  outputElOne.textContent = resultStringOne
  outputElTwo.textContent = resultStringTwo

  playSoundEffects()
  handleBounceAnimation([outputElOne, outputElTwo])
}

function generatePassword(length) {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  const charsetLength = characters.length
  const password = []

  const randomValues = new Uint32Array(length)
  crypto.getRandomValues(randomValues)

  for (let i = 0; i < length; i++) {
    const index = randomValues[i] % charsetLength
    password.push(characters.charAt(index))
  }

  return password.join('')
}

function playSoundEffects() {
  const soundEffect = document.getElementById('soundEffect')
  soundEffect.currentTime = 0
  soundEffect.play()

  const backgroundMusic = document.getElementById('backgroundMusic')
  if (!isMusicPlayed) {
    backgroundMusic.currentTime = 0
    backgroundMusic.play().catch((error) => {
      console.log('Autoplay prevented: ', error)
    })
    isMusicPlayed = true
  }
}

function handleBounceAnimation(elements) {
  elements.forEach((el) => {
    el.classList.add('bounce')
    adjustFontSize(el, el.textContent.length)
    setTimeout(() => el.classList.remove('bounce'), 500)
  })
}

// Mute button functionality
muteBtn.addEventListener('click', function () {
  isMuted = !isMuted
  audioElements.forEach((audio) => {
    audio.volume = isMuted ? 0 : 0.1
  })

  // Toggle classes for visual feedback
  muteBtn.classList.toggle('volume-up', !isMuted)
  muteBtn.classList.toggle('volume-mute', isMuted)
})

// Copy to clipboard function
function copyToClipboard(outputId) {
  const outputElement = document.getElementById(outputId)
  const textToCopy = outputElement.textContent

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      console.log('Text copied to clipboard:', textToCopy)
      alert('Copied to clipboard: ' + textToCopy)
    })
    .catch((err) => {
      console.error('Failed to copy: ', err)
    })
}
