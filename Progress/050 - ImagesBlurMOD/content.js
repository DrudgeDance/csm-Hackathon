const statesCon = {
    blurState: false,
    blackoutState: false
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.command === "toggleBlur") {
        statesCon.blurState = !statesCon.blurState;
        toggleImageBlur()
        console.log(`CON::blur toggleBlackout triggered::blurState: ${statesCon.blurState}, blackoutState: ${statesCon.blackoutState}`)
        chrome.runtime.sendMessage({command: "updateState", blurState: statesCon.blurState, blackoutState: statesCon.blackoutState}

        );
    }

    if (request.command === "toggleBlackout") {
        statesCon.blackoutState = !statesCon.blackoutState;
        toggleBlackout()
        console.log(`CON:black toggleBlackout triggered::blurState: ${statesCon.blurState}, blackoutState: ${statesCon.blackoutState}`)
        chrome.runtime.sendMessage({command: "updateState", blurState: statesCon.blurState, blackoutState: statesCon.blackoutState}

        );
    }
});

function toggleImageBlur() {

    if (statesCon.blurState) {
        document.querySelectorAll('img').forEach(img => img.style.filter = '');
    } else {
        document.querySelectorAll('img').forEach(img => img.style.filter = 'blur(8px)');
    }

    // Send the current state back to the background script
    // chrome.runtime.sendMessage({blurState: statesCon.blurState});
    // if (chrome.runtime.lastError) {
    //     // Handle error, e.g., log or retry
    //     console.error("CON:blur: Error sending message to background script:", chrome.runtime.lastError.message);
    // } else {
    //     // Optional: Handle successful response from background script
    //     console.log("CON:blur: Response from background:", argResponse);
    // }
}

function toggleBlackout(argResponse) {
    let overlay = document.getElementById('blackout-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'blackout-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = 9999;
        overlay.style.opacity = 0.75; // Adjust for desired darkness
        document.body.appendChild(overlay);
    } else {
        overlay.style.display = (overlay.style.display === 'none') ? 'block' : 'none';
    }


    // Send the current state back to the background script
    // chrome.runtime.sendMessage({blackoutState: statesCon.blackoutState});
    // if (chrome.runtime.lastError) {
    //     // Handle error, e.g., log or retry
    //     console.error("CON:blackOut: Error sending message to background script:", chrome.runtime.lastError.message);
    // } else {
    //     // Optional: Handle successful response from background script
    //     console.log("CON:blackOut: Response from background:", argResponse);
    // }
}