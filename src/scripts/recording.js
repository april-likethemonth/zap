import { badWordsRaw } from "./badwords.js";
import { apiCallWithSettings } from "./settings.js";
const badWords = badWordsRaw.split(",");
console.log("badWords: ", badWords);

window.addEventListener("DOMContentLoaded", () => {
  const recordingButton = document.getElementById("recording-button");
  const transcriptionResult = document.getElementById("transcription-final");

  let isRecording = false;

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (typeof SpeechRecognition !== "undefined") {
    let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    const onResult = async (event) => {
      const result = event.results[event.results.length - 1];
      const result2 = event.results[event.results.length - 2];
      if (result.isFinal) {
        // Check if the result contains any bad words
        const transcript = result[0].transcript.split(" ");
        for (let i = 0; i < transcript.length; i++) {
          if (badWords.includes(transcript[i].toLowerCase())) {
            // replace the bad word with a span element with a red background and the bad word
            const span = document.createElement("span");
            span.classList.add("bad-word");
            span.textContent = transcript[i];
            transcript[i] = span.outerHTML;

            // Send punishment
            await apiCallWithSettings();
          }
        }
        // Join the transcript back together
        const finalTranscript = transcript.join(" ");
        console.log(finalTranscript);

        const timestamp = new Date().toLocaleTimeString();
        const text = `[${timestamp}] ${finalTranscript}`;

        const p = document.createElement("p");
        p.innerHTML = text;
        p.classList.add("final");
        transcriptionResult.appendChild(p);
        document.getElementById("chatbox-text").value = "";

        // Sroll to the bottom of the transcription result
        var objDiv = document.getElementById("transcription-final");
        objDiv.scrollTop = objDiv.scrollHeight;
      } else {
        const timestamp = new Date().toLocaleTimeString();

        // Sometimes interim results are spilt in between two results, needs to be combined when exists
        let text = "";
        if (result2?.isFinal !== false) {
          text = result[0].transcript;
        } else {
          text = result2[0].transcript + result[0].transcript;
        }

        document.getElementById("chatbox-text").value = text;
      }
    };

    const onClick = (event) => {
      if (isRecording) {
        recognition.abort();
        recordingButton.textContent = "Start recording";
      } else {
        recognition.start();
        recordingButton.textContent = "Stop recording";
      }

      isRecording = !isRecording;
    };

    recognition.addEventListener("result", onResult);
    recordingButton.addEventListener("click", onClick);
    recognition.addEventListener("speechend", async () => {
      if (isRecording) {
        console.log("speechend");
        // restart recognition
        recognition.abort();

        setTimeout(() => {
          recognition.start();
          console.log("restart recognition");
        }, 1);
      }
    });
  }
});
