import { getCookie } from "./util";
import ImportedbadWords from "../badwords.json" assert { type: "json" };

let badWordsRaw = ImportedbadWords.join("\n");
if (getCookie("badWords")) {
  console.log("badWords cookie exists");
  badWordsRaw = getCookie("badWords");
}

const badWordsTextBox = document.getElementById("badwordstext");

const exportButton = document.getElementById("export-badword");
const exportLink = document.getElementById("export-link");
const saveButton = document.getElementById("save-badword");
const resetButton = document.getElementById("reset-badword");

badWordsTextBox.textContent = badWordsRaw.replace(/,/g, "\n");

const exportBadWords = () => {
  const textContent = badWordsTextBox.value;
  exportLink.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
  );
  exportLink.download = "badWords" + ".txt";
};

const saveBadWords = () => {
  badWordsRaw = badWordsTextBox.value;
  const daysToExpire = new Date(2147483647 * 1000).toUTCString();
  document.cookie =
    "badWords=" +
    badWordsTextBox.value.replace(/\n/g, ",") +
    "; expires=" +
    daysToExpire;
  console.log(
    "badWords cookie set to: " + badWordsTextBox.value.replace(/\n/g, ",")
  );
};

const resetBadWords = () => {
  document.cookie = "badWords=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  badWordsRaw = ImportedbadWords.join("\n");
  badWordsTextBox.textContent = badWordsRaw.replace(/,/g, "\n");
};

exportButton.addEventListener("click", exportBadWords);
saveButton.addEventListener("click", saveBadWords);
resetButton.addEventListener("click", resetBadWords);

export { badWordsRaw };
