window.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementById("exit-button");
  const minimizeButton = document.getElementById("minimize-button");

  const onClose = (event) => {
    console.log("close");
    document.getElementById("main-window").hidden = true;
  };

  exitButton.addEventListener("click", onClose);
  minimizeButton.addEventListener("click", onClose);
});
