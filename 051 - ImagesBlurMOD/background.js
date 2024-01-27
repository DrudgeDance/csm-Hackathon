chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  // Receiving blur state from content script
  if (message.command === "updateState") {
    console.log("BG: States updated: ", message.command);
  } else if ( message.command ) {

    console.log(`BG: toggled ${message.command}`);
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length === 0 || !tabs[0]) {
          console.error(`BG: ${message.command}: No active tab found or tab ID is undefined`);
          return;
      }

      console.log(`BG: Sending ${message.command} command to content script`); 
      chrome.tabs.sendMessage(tabs[0].id, {command: message.command})
    });
  }
  return true; 

});


