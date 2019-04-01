//Init 
const synth = window.speechSynthesis;

const form = document.querySelector("form");
const inputText = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const voiceSelected = document.querySelector("#voice-selection");

// init voice array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //loop voices and create option for each one
    voices.forEach(voice => {
        //create option element
       const option = document.createElement('option');
       //fill otpion with the voice and language
       option.textContent = voice.name + '('+ voice.lang +')';
       //set needed option data attribute
       option.setAttribute('data-lang',voice.lang);
       option.setAttribute('data-name',voice.name);
       voiceSelected.appendChild(option);

    });
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//speak
const speak = () =>{
    //check if speaking
    if(synth.speaking){
        console.error("Already speaking....");
        return;
    }

    if(inputText.value !== ""){
        //get speak text
        const speakText = new SpeechSynthesisUtterance(inputText.value);
        //speak end
        speakText.onend = e => {
            console.log("Done Speaking...")
        }

        //speak errro
        speak.onerror = e => {
            console.error("something went wrong...")
        }

        //selected voice
        const selectedVoice = voiceSelected.selectedOptions[0].getAttribute('data-name');
        
        //loop through voices
        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak
        synth.speak(speakText);

    }
};

//event listeners

//form submission
form.addEventListener("submit", e =>{
    e.preventDefault();
    speak();
    inputText.blur()
});

//rate value change
rate.addEventListener("change", e => rateValue.textContent = rate.value);
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);

//voice selected event
voiceSelected.addEventListener("change", e => speak());