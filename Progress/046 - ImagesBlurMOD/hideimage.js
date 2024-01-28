document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById('toggleBlur');

  if (toggleButton) {

      toggleButton.addEventListener('click', function() {
        console.log("Toggle button clicked");
        chrome.runtime.sendMessage({ command: "toggle" });
      }, false);

  } else {
      console.error('Toggle button not found');
  }

}, false);