// Listener for browser action (e.g., clicking the extension icon)
chrome.action.onClicked.addListener((tab) => {
  // Toggle state or perform some action
  // Example: Send a message to the content script of the active tab
  chrome.tabs.sendMessage(tab.id, { command: "toggle" });

});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "toggle") {
      
    // Send message to the active tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {command: "toggle"}, (response) => {
              // Optional: Handle the response here
              console.log("Response from content script:", response);
          });
      });

      // Indicate an asynchronous response
      return true;
  }
});

// Function to send a message to the active tab
function sendMessageToActiveTab(message) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "toggle"}, function(response) {
          if (response) {
              console.log("Response:", response.result);
          } else {
              console.log("No response or error occurred.");
          }
      });
  });

}