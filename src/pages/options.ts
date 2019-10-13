declare var browser: typeof chrome;
// @ts-ignore
const _browser = chrome || browser;

_browser.storage.sync.get("config", response => {
    const config = response.config;

});

function saveOptionsToStorage() {
    console.log("saving to storage");
    let el1, el2, el3, el4, el5;
    const config = {
        firstKey: 'firstVal',
    }
    _browser.storage.sync.set({ config: config }, () => {
        const result = _browser.runtime.lastError ? "There was an error while saving." : "Changes have been saved!";
        console.log(result);
    });    
}