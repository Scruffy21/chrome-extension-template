function getFromStorage(key: string, storageType: 'local' | 'sync' = 'local') {
    return new Promise((resolve, reject) => {
        _browser.storage[storageType].get(key, data => {
            resolve(data && data[key]);
        });
        // maybe handle chrome.lastError - though ff handles this differently...
    });
}

function saveToStorage(key: string, dataToSave: any, storageType: 'local' | 'sync' = 'local') {
    return new Promise((resolve, reject) => {
        const objectToSave: any = {};
        objectToSave[key] = dataToSave;
        _browser.storage[storageType].set(objectToSave, resolve);
    });
}