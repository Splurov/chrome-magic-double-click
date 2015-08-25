'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.windows.getAll({populate: true}, function(windows) {
        windows.forEach(function(window) {
            window.tabs.forEach(function(tab) {
                chrome.tabs.executeScript(tab.id, {
                    file: "content.js"
                }, function() {
                    // http://stackoverflow.com/a/30261291
                    if (
                        chrome.runtime.lastError &&
                        chrome.runtime.lastError.message.indexOf('Cannot access a') === -1
                    ) {
                        throw new Error(chrome.runtime.lastError.message);
                    }
                });
            });
        });
    });
});
