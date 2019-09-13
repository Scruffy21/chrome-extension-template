chrome.storage.sync.get("config", response => {
    const config = response.config;
    $(blacklistCountriesElem).val(config.countriesBlacklist).trigger('chosen:updated');
    $(blacklistTagsElem).val(config.tagsBlacklist).trigger('chosen:updated');
    $(employerPropertiesAllElem).val(config.employerPropertiesAll).trigger('chosen:updated');
    $(employerPropertiesOneElem).val(config.employerPropertiesOne).trigger('chosen:updated');
    openAttachmentsElem.checked = config.openAttachments;
});

// add a listener for when a change happens..., to save the entire config to the storage
[blacklistCountriesElem, blacklistTagsElem, employerPropertiesAllElem, employerPropertiesOneElem].forEach(element => $(element).on("change", saveToStorage));

function saveToStorage() {
    console.log("saving to storage");
    const countriesBlacklist = $(blacklistCountriesElem).val();
    const tagsBlacklist = $(blacklistTagsElem).val();
    const employerPropertiesAll = $(employerPropertiesAllElem).val();
    const employerPropertiesOne = $(employerPropertiesOneElem).val();
    const openAttachments = openAttachmentsElem.checked;

    const config = {
        countriesBlacklist: countriesBlacklist,
        tagsBlacklist: tagsBlacklist,
        employerPropertiesAll: employerPropertiesAll,
        employerPropertiesOne: employerPropertiesOne,
        openAttachments: openAttachments
    }
    chrome.storage.sync.set({ config: config }, response => {
        const result = chrome.runtime.lastError ? "There was an error while saving." : "Changes have been saved!";
        console.log(result);
    });    
}