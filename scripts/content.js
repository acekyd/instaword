// JavaScript Document
// Send a message containing the page details back to the event page
chrome.runtime.sendMessage({
    'summary': window.getSelection().toString()
});