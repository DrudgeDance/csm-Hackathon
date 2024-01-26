document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleBlur');
  const statusElement = document.getElementById('blurStatus');
  
  // Function to update the status text
  const updateStatus = (text) => {
    console.log("Updating status to:", text); // Log status update
    statusElement.textContent = text;
  };


    // Event listener for the button
    toggleButton.addEventListener('click', () => {
      updateStatus("Sent a request to blur images");

      chrome.runtime.sendMessage({command: "toggle"}, response => {
        console.log("Received response:", response); // Log received response
        if (response && response.blurState) {
              updateStatus("(Blur Info Received) Blurred");
          } else {
              updateStatus("(Blur Info Received) No-Blur");
          }
      });
    });

    // Initialize with current blur state
    chrome.runtime.sendMessage({request: "getBlurState"}, response => {
      console.log("Received initial blur state:", response); // Log received response
      if (response && response.blurState) {
          updateStatus("Images are Blurred");
      } else {
          updateStatus("Images are Not Blurred");
      }
  });
});
