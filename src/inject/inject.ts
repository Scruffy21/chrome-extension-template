declare var browser: typeof chrome;
// @ts-ignore
const _browser = chrome || browser;

console.log('IN INJECTED SCRIPT');

_browser.storage.sync.get("config", response => {

});

