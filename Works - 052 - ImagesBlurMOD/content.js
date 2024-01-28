chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.command === "toggleBlur") {
        toggleImageBlur()
    }

    if (request.command === "toggleBlackout") {
        toggleBlackout()
    }
});

function toggleImageBlur() {
    const images = document.querySelectorAll('img');
    if (images.length === 0) return; 
    

    const isBlurred = images[0].style.filter.includes('blur(8px)');
    images.forEach(img => {
        img.style.filter = isBlurred ? '' : 'blur(8px)';
    });
}

function toggleBlackout() {
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
        overlay.style.opacity = .9; 
        document.body.appendChild(overlay);
    } else {
        overlay.style.display = (overlay.style.display === 'none') ? 'block' : 'none';
    }

}