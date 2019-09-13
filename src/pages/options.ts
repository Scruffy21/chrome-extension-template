declare var browser: typeof chrome;
// @ts-ignore
const _browser = chrome || browser;

_browser.storage.sync.get("config", response => {
    const config = response.config;

});

function saveToStorage() {
    console.log("saving to storage");
    let el1, el2, el3, el4, el5;
    const config = {
        countriesBlacklist: el1,
        tagsBlacklist: el2,
        employerPropertiesAll: el3,
        employerPropertiesOne: el4,
        openAttachments: el5
    }
    _browser.storage.sync.set({ config: config }, () => {
        const result = _browser.runtime.lastError ? "There was an error while saving." : "Changes have been saved!";
        console.log(result);
    });    
}