const sleep = (time: number) => new Promise((resolve) => window.setTimeout(resolve, time));

// only for non-background pages
function sendMessageAsync(message: any) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, resolve);
    });
}