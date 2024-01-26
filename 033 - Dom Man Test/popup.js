document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("readDOMButton").addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            console.log(activeTab)
            // chrome.scripting.executeScript(
            //     {
            //         target: { tabId: activeTab.id },
            //         function: function() {
            //             return document.documentElement.outerHTML;
            //         },
            //     },
            //     function(result) {
            //         const domContent = result[0].result;
            //         document.getElementById("output").textContent = domContent;
            //     }
            // );
        });
    });




});