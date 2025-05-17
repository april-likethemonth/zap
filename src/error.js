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

  if (isGoogleChrome) {
    // is Google Chrome on IOS
  } else {
    document.getElementById("recording-button").remove();
    const message = document.getElementById("browser-error");
    const messageBackground = document.getElementById("browser-error-overlay");
    message.removeAttribute("hidden");
    messageBackground.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
    messageBackground.setAttribute("aria-hidden", "false");
  }
});
