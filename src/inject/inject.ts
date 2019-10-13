declare var browser: typeof chrome;
// @ts-ignore
const _browser = chrome || browser;

console.log('IN INJECTED SCRIPT');

_browser.storage.sync.get("config", response => {

});

// notice, only request is here, because this received message from the background page
_browser.runtime.onMessage.addListener(request => {
    if (request === 'message1') {
        
    }
});

// send message to background
_browser.runtime.sendMessage(
    { action: 'action1', payload: 12345 }
);