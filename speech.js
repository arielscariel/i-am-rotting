const textDisplay = document.getElementById('overlay');
const bubble = document.querySelector('.tooltip');
const pigeon = document.getElementById("pigeon");

function normalize(text) {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, "");
}

function randomText(length = 14) {
  const chars = "0123456789@#$%&*+=?!<>[]{}";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}



// Initialize SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';


recognition.interimResults = true;
recognition.continuous = true;

let rotBitch = 0
let = hideTimer = null;

function updateRot() {
  pigeon.className = `stage-${rotBitch}`;
  document.body.className = `stage-${rotBitch}`;
}



// display  text
recognition.onresult = function(event) {
  const result = event.results[event.results.length - 1];   
  const transcript = result[0].transcript;
  const normalized = normalize(transcript);


  // rotting text
  if (normalized.includes("am rotting") && result.isFinal) {
  textDisplay.classList.add("rotting");
  textDisplay.textContent = "I am rotting.";

  // rot images
  if (rotBitch < 3) {
    rotBitch++;
    updateRot();
  }

  // random text
  } else {
   textDisplay.textContent = randomText();
     textDisplay.classList.remove("rotting");;
  } 




//   speech bubble
bubble.style.opacity = "1";              
  clearTimeout(hideTimer);                 
  hideTimer = setTimeout(() => {          
  
    textDisplay.textContent = "...";
  }, 3000);
};

// Error handling
recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};

// Start speech recognition
recognition.start();