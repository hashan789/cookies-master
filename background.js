window.users = {}

chrome.runtime.onMessage.addListener(function (message,sender,sendResponse){
    window.users = message.list;
});