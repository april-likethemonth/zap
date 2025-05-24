import DragSelect from "https://unpkg.com/dragselect@latest/dist/ds.esm.min.js";
import { hasError } from "./error";

new DragSelect({
  area: document.getElementById("desktop"),
  selectables: document.getElementsByClassName("desktop-icon"),
});

const icons = document.querySelectorAll(".desktop-icon");

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.classList.contains("desktop-icon")) {
      e.target.classList.toggle("selected");
    } else {
      e.target.parentElement.classList.toggle("selected");
    }
    // unselect all other icons
    icons.forEach((otherIcon) => {
      if (otherIcon !== e.target && otherIcon !== e.target.parentElement) {
        otherIcon.classList.remove("selected");
      }
    });
  });
  icon.addEventListener("dblclick", (e) => {
    if (icon.id === "zap-icon") {
      if (hasError) {
        document.getElementById("browser-error").hidden = false;
        document.getElementById("browser-error-overlay").hidden = false;
      }
      document.getElementById("main-window").hidden = false;
    } else if (icon.id === "github-icon") {
      window
        .open("https://github.com/april-likethemonth/zap", "_blank")
        .focus();
    }
  });
});

// unselect all icons when clicking outside of them
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("desktop-icon")) {
    icons.forEach((icon) => {
      icon.classList.remove("selected");
    });
  }
});
