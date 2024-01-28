  const elements = {};

  document.addEventListener('DOMContentLoaded', function() {

  elements.toggleBlur = document.getElementById('toggleBlur');
  elements.toggleBlackout = document.getElementById('toggleBlackout');
  elements.statusElement = document.getElementById('allStatus');

  // Event listener for the BLUR button
  elements.toggleBlur.addEventListener('click', () => {
      chrome.runtime.sendMessage({command: "toggleBlur"});
  });

  // Event listener for the BLACKOUT button
  elements.toggleBlackout.addEventListener('click', function() {
     chrome.runtime.sendMessage({command: "toggleBlackout"}); 
  })


});
