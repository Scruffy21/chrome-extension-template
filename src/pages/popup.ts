declare var browser: typeof chrome;
// @ts-ignore
const _browser = chrome || browser;

_browser.storage.sync.get("config", response => {
    const config = response.config;
});