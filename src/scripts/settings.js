import { getCookie } from "./util";
import { apiCall } from "./util";

//get all inputs on the settings page
const usernameInput = document.getElementById("username");
const APIKeyInput = document.getElementById("apikey");
const codeInput = document.getElementById("code");
const nameInput = document.getElementById("name");

const shockRadio = document.getElementById("shock");
const vibrateRadio = document.getElementById("vibrate");
const beepRadio = document.getElementById("beep");

const shockIntensityInput = document.getElementById("shock-intensity-range");
const shockDurationInput = document.getElementById("shock-duration-range");

shockIntensityInput.addEventListener("input", () => {
  document.getElementById("shock-intensity-value").innerText =
    shockIntensityInput.value;
});

shockDurationInput.addEventListener("input", () => {
  document.getElementById("shock-duration-value").innerText =
    shockDurationInput.value;
});

// Save settings on any input change
usernameInput.addEventListener("input", saveSettings);
APIKeyInput.addEventListener("input", saveSettings);
codeInput.addEventListener("input", saveSettings);
nameInput.addEventListener("input", saveSettings);
shockIntensityInput.addEventListener("input", saveSettings);
shockDurationInput.addEventListener("input", saveSettings);
shockRadio.addEventListener("click", saveSettings);
vibrateRadio.addEventListener("click", saveSettings);
beepRadio.addEventListener("click", saveSettings);
// Load settings when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
});

function saveSettings() {
  const username = usernameInput.value;
  const apikey = APIKeyInput.value;
  const code = codeInput.value;
  const name = nameInput.value;

  const shockIntensity = shockIntensityInput.value;
  const shockDuration = shockDurationInput.value;

  const shockEnabled = shockRadio.checked;
  const vibrateEnabled = vibrateRadio.checked;
  const beepEnabled = beepRadio.checked;
  let operation;
  if (shockEnabled) {
    operation = 0;
  } else if (vibrateEnabled) {
    operation = 1;
  } else if (beepEnabled) {
    operation = 2;
  }

  const daysToExpire = new Date(2147483647 * 1000).toUTCString();

  document.cookie = `username=${username}; expires=${daysToExpire};`;
  console.log("Username cookie set to:", username);
  document.cookie = `apikey=${apikey}; expires=${daysToExpire};`;
  console.log("APIKey cookie set to:", apikey);
  document.cookie = `code=${code}; expires=${daysToExpire};`;
  console.log("Code cookie set to:", code);
  document.cookie = `name=${name}; expires=${daysToExpire};`;
  console.log("Name cookie set to:", name);
  document.cookie = `shockIntensity=${shockIntensity}; expires=${daysToExpire};`;
  console.log("Shock Intensity cookie set to:", shockIntensity);
  document.cookie = `shockDuration=${shockDuration}; expires=${daysToExpire};`;
  console.log("Shock Duration cookie set to:", shockDuration);
  document.cookie = `operation=${operation}; expires=${daysToExpire};`;
  console.log("Operation cookie set to:", operation);
}

function loadSettings() {
  const username = getCookie("username");
  const apikey = getCookie("apikey");
  const code = getCookie("code");
  const name = getCookie("name");
  const shockIntensity = getCookie("shockIntensity");
  const shockDuration = getCookie("shockDuration");
  const operation = getCookie("operation");

  if (username) {
    usernameInput.value = username;
  }
  if (apikey) {
    APIKeyInput.value = apikey;
  }
  if (code) {
    codeInput.value = code;
  }
  if (name) {
    nameInput.value = name;
  } else {
    nameInput.value = "zap.faggotville.com";
  }
  if (shockIntensity) {
    shockIntensityInput.value = shockIntensity;
    document.getElementById("shock-intensity-value").innerText = shockIntensity;
  }
  if (shockDuration) {
    shockDurationInput.value = shockDuration;
    document.getElementById("shock-duration-value").innerText = shockDuration;
  }
  if (operation === "0") {
    shockRadio.checked = true;
  } else if (operation === "1") {
    vibrateRadio.checked = true;
  } else if (operation === "2") {
    beepRadio.checked = true;
  }

  console.log("Settings loaded successfully!");
}

export async function apiCallWithSettings() {
  const username = getCookie("username");
  const apikey = getCookie("apikey");
  const code = getCookie("code");
  const name = getCookie("name");
  const shockIntensity = getCookie("shockIntensity");
  const shockDuration = getCookie("shockDuration");
  const operation = getCookie("operation");

  if (!username || !apikey || !code || !name) {
    console.error("Missing required settings for API call.");
    return;
  } else {
    if (operation == 2) {
      await apiCall(username, apikey, code, name, operation, shockDuration);
    } else if (operation == 1 || operation == 0) {
      await apiCall(
        username,
        apikey,
        code,
        name,
        operation,
        shockDuration,
        shockIntensity
      );
    }
  }
}
