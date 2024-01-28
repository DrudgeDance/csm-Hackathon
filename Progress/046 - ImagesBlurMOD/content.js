let isBlurred = false;

function toggleImageBlur() {

    if (isBlurred) {
        document.querySelectorAll('img').forEach(img => img.style.filter = '');
    } else {
        document.querySelectorAll('img').forEach(img => img.style.filter = 'blur(8px)');
    }

    isBlurred = !isBlurred;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.command === "toggle") {
        toggleImageBlur();
        sendResponse({result: "Toggled blur effect"});
    }
    
});