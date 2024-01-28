const statesBG = {
  blurState: false,
  blackoutState: false
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //console.log("BG: Received message in background script:", message); // Log received message
  
  // Receiving blur state from content script
  if (message.command === "updateState") {
    console.log("BG: States updated: Blur -", statesBG.blurState, ", Blackout -", statesBG.blackoutState);
  }

  // toggle BLUR
  if (message.command === "toggleBlur") {
    statesBG.blurState = !statesBG.blurState; // Toggle the blur state
    console.log("BG: Toggled blur state to:", statesBG.blurState);
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 0 || !tabs[0]) {
          console.error("BG: ToggleBlur: No active tab found or tab ID is undefined");
          return;
      }

      console.log("BG: Sending toggleBlur command to content script"); // Log before sending
      chrome.tabs.sendMessage(tabs[0].id, {command: "toggleBlur"})
      
      //, () => {sendResponse({statesBG.blurState: statesBG.blurState});});// Send blurState response back to popup.js
    });
    return true; // Indicates that the response is sent asynchronously
  }

  // toggle BLACKOUT
  if (message.command === "toggleBlackout") {
    statesBG.blackoutState = !statesBG.blackoutState;
    console.log("BG: Toggled Blackout state to:", statesBG.blackoutState);
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 0 || !tabs[0]) {
        console.error("BG: ToggleBlackout: No active tab found or tab ID is undefined");
        return;
      }
      
      console.log("BG: Sending toggleBlackout command to content script"); // Log before sending
      chrome.tabs.sendMessage(tabs[0].id, {command: "toggleBlackout"})
      //,() => {sendResponse({statesBG.blackoutState: statesBG.blackoutState}); });// Send blackoutState response back to popup.js
    });
  return true;  // Indicates that the response is sent asynchronously
  };

});


