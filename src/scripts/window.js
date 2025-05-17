window.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementsByClassName("exit-button")[0];
  const exitButton2 = document.getElementsByClassName("exit-button")[1];
  const minimizeButton = document.getElementsByClassName("minimize-button")[0];
  const minimizeButton2 = document.getElementsByClassName("minimize-button")[1];

  const onClose = (event) => {
    document.getElementById("main-window").hidden = true;
  };

  const onErrorClose = (event) => {
    document.getElementById("main-window").hidden = true;
    document.getElementById("browser-error").hidden = true;
    document.getElementById("browser-error-overlay").hidden = true;
  };

  exitButton.addEventListener("click", onClose);
  minimizeButton.addEventListener("click", onClose);
  exitButton2.addEventListener("click", onErrorClose);
  minimizeButton2.addEventListener("click", onErrorClose);
});
