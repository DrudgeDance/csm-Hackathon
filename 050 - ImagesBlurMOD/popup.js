  const elements = {};

  const statesSent = {
    sentBlur: false,
    sentBlackout: false
  };

  const statesRcvd = {
    sentBlur: false,
    sentBlackout: false
  };
  
  document.addEventListener('DOMContentLoaded', function() {

  elements.toggleBlur = document.getElementById('toggleBlur')
  elements.toggleBlackout = document.getElementById('toggleBlackout')
  elements.statusElement = document.getElementById('allStatus');

  // Event listener for the BLUR button
  elements.toggleBlur.addEventListener('click', () => {
    statesSent.sentBlur = !statesSent.sentBlur;
    updateStatus(`=====================================================================`);
    updateStatus(`POP:blur: Sent a blur request: ${(statesSent.sentBlur) ? true: false}`);
    
    chrome.runtime.sendMessage({command: "toggleBlur"}, (response) => {
      console.log("POP:blur: Received toggleBlur response:", response); // Log received response
      
      if (response) {
            updateStatus("(Blur Info Received) Blurred");
        } else {
            updateStatus("(Blur Info Received) No-Blur");
        }

    });
  });


  // Event listener for the BLACKOUT button
  elements.toggleBlackout.addEventListener('click', function() {
    statesSent.sentBlackout = !statesSent.sentBlackout;
    updateStatus(`=====================================================================`);
    updateStatus(`POP:blackOut: Sent a blackout request ${(statesSent.sentBlackout) ? true: false}`);

    chrome.runtime.sendMessage({command: "toggleBlackout"}, (response) => {
      console.log("POP:blackOut: Received toggleBlackout response:", response); // Log received response
 
      if (response) {
            updateStatus("(Blackout Info Received) Blackedout");
        } else {
            updateStatus("(Blackout Info Received) No-Blackedout");
        }

     }); 
    })


});


  // Function to update the status text
  const updateStatus = (text) => {
    console.log("POP: Updating status to:", text); // Log status update
    elements.statusElement.textContent = text;
  };
  
  
  
  
  
  
  
  // // Initialize with current blur state
  // chrome.runtime.sendMessage({request: "requestState"}, response => {
  //   console.log("Received state info:", response); // Log received response
  //   if (response.blurState) {
  //       updateStatus("POP:blur: Images are Blurred");
  //   } else {
  //       updateStatus("POP:blur: Images are Not Blurred");
  //   }

  //   if (response.blackoutState) {
  //     updateStatus("POP:blackOut: Images are Blackedout");
  //   } else {
  //     updateStatus("POP:blackOut: Images are Not Blackedout");
  //   }
  // });