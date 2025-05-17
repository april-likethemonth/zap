import DragSelect from "https://unpkg.com/dragselect@latest/dist/ds.esm.min.js";
import { hasError } from "./error";

new DragSelect({
  area: document.getElementById("desktop"),
  //   selectables: document.getElementsByClassName("selectable"),
});

const icons = document.querySelectorAll(".desktop-icon");

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    if (e.target.classList.contains("desktop-icon")) {
      e.target.classList.toggle("selected");
    } else {
      e.target.parentElement.classList.toggle("selected");
    }
  });
  icon.addEventListener("dblclick", (e) => {
    if (hasError) {
      document.getElementById("browser-error").hidden = false;
      document.getElementById("browser-error-overlay").hidden = false;
    }
    document.getElementById("main-window").hidden = false;
  });
});
