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

    const onResult = (event) => {
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
    const message = document.getElementById("browser-error");
    const messageBackground = document.getElementById("browser-error-overlay");
    message.removeAttribute("hidden");
    messageBackground.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
    messageBackground.setAttribute("aria-hidden", "false");
  }
});

const tabs = document.querySelectorAll("menu[role=tablist]");

for (let i = 0; i < tabs.length; i++) {
  const tab = tabs[i];

  const tabButtons = tab.querySelectorAll("menu[role=tablist] > button");

  tabButtons.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      tabButtons.forEach((button) => {
        if (
          button.getAttribute("aria-controls") ===
          e.target.getAttribute("aria-controls")
        ) {
          button.setAttribute("aria-selected", true);
          openTab(e, tab);
        } else {
          button.setAttribute("aria-selected", false);
        }
      });
    })
  );
}

function openTab(event, tab) {
  const articles = tab.parentNode.querySelectorAll('[role="tabpanel"]');
  articles.forEach((p) => {
    p.setAttribute("hidden", true);
  });
  const article = tab.parentNode.querySelector(
    `[role="tabpanel"]#${event.target.getAttribute("aria-controls")}`
  );
  article.removeAttribute("hidden");
}
