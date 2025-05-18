export { hasError };
let hasError = false;

window.addEventListener("DOMContentLoaded", () => {
  var winNav = window.navigator;
  var vendorName = winNav.vendor;

  var isChromium = window.chrome;
  var isOpera = typeof window.opr !== "undefined";
  var isFirefox = winNav.userAgent.indexOf("Firefox") > -1;
  var isIEedge = winNav.userAgent.indexOf("Edg") > -1;
  var isIOSChrome = winNav.userAgent.match("CriOS");
  var isGoogleChrome =
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false &&
    (typeof winNav.userAgentData === "undefined" ||
      winNav.userAgentData.brands.some((x) => x.brand === "Google Chrome"));

  // Check if the browser is Mobile
  var isMobile = /Mobi|Android/i.test(navigator.userAgent);

  hasError = !(isGoogleChrome && !isMobile);
  if (isMobile) {
    // Set zoom to 1.0
    document.getElementById("main-window").style.zoom = 1.0;
    document.getElementById("browser-error").style.zoom = 1.0;
  }
  if (hasError) {
    // Show the error message
    document.getElementById("recording-button").remove();
    const message = document.getElementById("browser-error");
    const messageBackground = document.getElementById("browser-error-overlay");
    message.removeAttribute("hidden");
    messageBackground.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
    messageBackground.setAttribute("aria-hidden", "false");
  }
});
