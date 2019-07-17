if (typeof browser != 'undefined' && (typeof chrome == 'undefined' || typeof chrome.runtime == 'undefined')) {
    chrome = browser;
}