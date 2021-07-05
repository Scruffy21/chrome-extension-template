const sleep = (time: number) => new Promise((resolve) => window.setTimeout(resolve, time));

// only for non-background pages
function sendMessageAsync(message: any) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, resolve);
    });
}

function promisify(fn: Function, args: any) {
    return new Promise((resolve, reject) => { 
        try {
            let argumentsList;
            if (args === undefined) {
                argumentsList = [];
            }
            else if (args instanceof Array) {
                argumentsList = args;
            }
            else {
                argumentsList = [args];
            }
            fn.apply(null, [...argumentsList, resolve]);   
        }
        catch (e) {
            reject('fn.apply failed');
        }
    });
}

function dispatchChangeEvent(targetElement: HTMLElement) {
    var event = new Event('change');
    targetElement.dispatchEvent(event);
}

function getActiveTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs[0]));
    });
}