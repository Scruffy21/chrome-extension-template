console.log("in background script");
chrome.runtime.onInstalled.addListener(function () {
    console.log("oninstalled run");
});

chrome.browserAction.onClicked.addListener(function (tab) {
    console.log('browser action button was clicked');
});


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message.reason === 'greeting') {
            console.log('greeting message received');
        }
    }
);