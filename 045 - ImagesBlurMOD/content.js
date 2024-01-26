let isBlurred = false;

function toggleImageBlur() {

    if (isBlurred) {
        document.querySelectorAll('img').forEach(img => img.style.filter = '');
    } else {
        document.querySelectorAll('img').forEach(img => img.style.filter = 'blur(8px)');
    }

    isBlurred = !isBlurred;

    // Send the current state back to the background script
    chrome.runtime.sendMessage({blurState: isBlurred});
        if (chrome.runtime.lastError) {
            // Handle error, e.g., log or retry
            console.error("Error sending message to background script:", chrome.runtime.lastError.message);
        } else {
            // Optional: Handle successful response from background script
            console.log("Response from background:", response);
        }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.command === "toggle") {
        toggleImageBlur();
        sendResponse({result: "Toggled blur effect", blurState: isBlurred});
    }
    
});