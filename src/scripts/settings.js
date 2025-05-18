//get all inputs on the settings page
const usernameInput = document.getElementById("username");
const APIKeyInput = document.getElementById("apikey");
const codeInput = document.getElementById("code");
const nameInput = document.getElementById("name");

const shockModal = document.getElementById("shock");
const vibrateModal = document.getElementById("vibrate");
const beepModal = document.getElementById("beep");

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
