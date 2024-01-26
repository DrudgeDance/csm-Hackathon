let blurState = false;  // Variable to store the current blur state

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message in background script:", message); // Log received message
  
// Receiving blur state from content script
  if (message.blurState !== undefined) {
      blurState = message.blurState;
      console.log("Blur state updated to:", blurState);
  }

  // Forward command to content script and return the current blur state
  if (message.command === "toggle") {
    blurState = !blurState; // Toggle the blur state
    console.log("Toggled blur state to:", blurState);
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
       if (tabs.length === 0 || !tabs[0]) {
            console.error("No active tab found or tab ID is undefined");
            return;
        }

        console.log("Sending toggle command to content script"); // Log before sending
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggle"}, () => {
            sendResponse({blurState: blurState}); // Send response back to hideimage.js
        });
    });

    return true; // Indicates that the response is sent asynchronously
}

  // Send the current blur state to popup script when requested
  if (message.request === "getBlurState") {
    console.log("Sending current blur state:", blurState); // Log before sending response
    sendResponse({blurState: blurState});
  }

  return true;  // Indicates that the response is sent asynchronously
});