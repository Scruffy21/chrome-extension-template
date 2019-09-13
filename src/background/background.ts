declare var browser: typeof chrome;
// @ts-ignore
const _browser = chrome || browser;

console.log("in background script");
_browser.runtime.onInstalled.addListener(function () {
    console.log("oninstalled run");
});

_browser.browserAction.onClicked.addListener(function (tab) {
    console.log('browser action button was clicked');
});


_browser.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message.reason === 'greeting') {
            console.log('greeting message received');
        }
    }
);