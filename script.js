const texts = document.querySelector('textarea');
        const selectVoiceList = document.querySelector('select');
        const button = document.querySelector('button');
        let isSpeaking = true;

        const voices = ()=>{
            for(let voice of speechSynthesis.getVoices()){

                let selected = "";
                if(voice.name === "Google US English"){
                    selected = "selected";
                }

                // Create option values 
                let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
                selectVoiceList.insertAdjacentHTML("beforeend",option);
            }
        }

        speechSynthesis.addEventListener("voiceschanged", voices);

        const playAudio = (text)=>{
            let utterance = new SpeechSynthesisUtterance(text);
            // This will change voice according to user choice 
            for(let voice of speechSynthesis.getVoices()){
                if(voice.name === selectVoiceList.value){
                    utterance.voice = voice;
                }
            }

            // This will play the audio 
            speechSynthesis.speak(utterance);
        }

        button.addEventListener("click", fun =>{
            fun.preventDefault();
            if(texts.value !== ""){
                if(speechSynthesis.speaking == false){  
                    playAudio(texts.value);
                }
                if(texts.value.length > 60){
                    if(isSpeaking){
                        speechSynthesis.resume();
                        isSpeaking = false;
                        button.innerText = "Pause";
                        button.style = "background: rgb(203, 4, 4);";
                    }
                    else{
                        speechSynthesis.pause();
                        isSpeaking = true;
                        button.innerText = "Resume";
                        button.style = "rgb(3, 163, 3)"
                    }

                    setInterval(()=>{
                        if(isSpeaking == false && speechSynthesis.speaking == false){
                            isSpeaking == true;
                            button.innerText = "Listen The Text";
                            button.style = "rgb(3, 163, 3";
                        }
                    })
                }
            }
        })
