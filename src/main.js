window.addEventListener("DOMContentLoaded", () => {
  const recordingButton = document.getElementById("recording-button");
  const transcriptionResult = document.getElementById("transcription-final");
  const transscriptionInterim = document.getElementById(
    "transcription-interim"
  );

  let isRecording = false;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // read in the bad words from the file
  let badWords = [];
  fetch("./src/badwords.json")
    .then((response) => response.json())
    .then((data) => {
      badWords = data;
    });

  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    let mostRecentResult = "";

    const onResult = (event) => {
      const result = event.results[event.results.length - 1];
      const result2 = event.results[event.results.length - 2];
      if (result.isFinal) {
        const timestamp = new Date().toLocaleTimeString();
        const text = document.createTextNode(
          `[${timestamp}] ${result[0].transcript}`
        );

        const p = document.createElement("p");
        p.appendChild(text);
        p.classList.add("final");
        transcriptionResult.appendChild(p);
        transscriptionInterim.textContent = "";

        // Sroll to the bottom of the transcription result
        var objDiv = document.getElementById("transcription-final");
        objDiv.scrollTop = objDiv.scrollHeight;
      } else {
        transscriptionInterim.textContent = "";
        mostRecentResult = result[0].transcript;
        const timestamp = new Date().toLocaleTimeString();
        let text = "";
        if (result2.isFinal) {
          text = document.createTextNode(
            `[${timestamp}] ${result[0].transcript}`
          );
        } else {
          text = document.createTextNode(
            `[${timestamp}] ${result2[0].transcript}${result[0].transcript}`
          );
        }
        const p = document.createElement("p");
        p.appendChild(text);
        transscriptionInterim.appendChild(p);
      }
    };

    const onClick = (event) => {
      if (isRecording) {
        recognition.stop();
        recordingButton.textContent = "Start recording";
      } else {
        recognition.start();
        recordingButton.textContent = "Stop recording";
      }

      isRecording = !isRecording;
    };

    recognition.addEventListener("result", onResult);
    recordingButton.addEventListener("click", onClick);
  } else {
    recordingButton.remove();
    const message = document.getElementById("error-message");
    message.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
  }
});
