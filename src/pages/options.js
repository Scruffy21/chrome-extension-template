const slider = document.getElementById("slider");
const blackListElem = document.querySelector("#blacklist");

const hideSponsoredElem = document.querySelector("#hide_section_sponsored");
const hidePromotedElem = document.querySelector("#hide_section_promoted");
const hideRegularElem = document.querySelector("#hide_section_regular");

const hideSellersElem = document.querySelector("#hide_sellers");
const hideSellersChoiceElem = document.querySelector("#company_filter");

const searchRegularElem = document.querySelector("#search_regular");
const hideDuplicatesElem = document.querySelector("#hide_duplicates");

const saveButton = document.querySelector("#save_btn");
const saveResultElem = document.querySelector(".save-result");

noUiSlider.create(slider, {
    start: [0, 100],
    step: 0.1,
    tooltips: [true, true],
    range: {
        'min': [0],
        'max': [100]
    },
    connect: [false, true, false],
    format: {
        to: function (value) { 
            return value.toFixed(1);
        },
        from: function (value) {
            return value;
        }
    }
});

const blacklistTagify = new Tagify(blackListElem, {});

chrome.storage.sync.get("config", response => {
    const config = response.config;
    hideSponsoredElem.checked = config.hideSponsored;
    hidePromotedElem.checked = config.hidePromoted;
    hideRegularElem.checked = config.hideRegular;
    
    hideSellersElem.checked = config.hideFirms || config.hideCommoners;
    hideSellersChoiceElem.value = config.hideCommoners ? "commoner" : "company";

    searchRegularElem.checked = config.searchRegular;
    hideDuplicatesElem.checked = config.hideDuplicates;

    blacklistTagify.addTags(config.blacklist);
    slider.noUiSlider.set(config.feedbackRange);
});

saveButton.addEventListener("click", () => {
    const hideSponsored = hideSponsoredElem.checked;
    const hidePromoted = hidePromotedElem.checked;
    const hideRegular = hideRegularElem.checked;
    const hideFirms = hideSellersElem.checked ? hideSellersChoiceElem.value == "company" : false;
    const hideCommoners = hideSellersElem.checked ? !hideFirms : false;
    const searchRegular = searchRegularElem.checked;
    const hideDuplicates = hideDuplicatesElem.checked;
    const blacklist = blacklistTagify.value.map(el => el.value);
    const feedbackRange = slider.noUiSlider.get().map(val => parseFloat(val));

    const config = {
        hideSponsored: hideSponsored,
        hidePromoted: hidePromoted,
        hideRegular: hideRegular,
        hideFirms: hideFirms,
        hideCommoners: hideCommoners,
        searchRegular: searchRegular,
        hideDuplicates: hideDuplicates,
        feedbackRange: feedbackRange,
        blacklist: blacklist,
    }
    chrome.storage.sync.set({ config: config }, response => {
        const result = chrome.runtime.lastError ? "Zapisywanie nie powiodło się." : "Opcje zostały zapisane!";
        saveResultElem.textContent = result;
    });
});

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