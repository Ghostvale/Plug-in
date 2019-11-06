/*  Register a keyword "srh" on the address bar
 *  Quickly search in usyd online library
 */


// add omnibox on Chrome browser
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log("inputEntered: " + text);
    if (!text) { return; }
    var texts = text.split(" ");
    var href = "";
    if (texts.includes("online")) {
        texts.splice(texts.indexOf("online"), 1);
        href = "https://sydney.primo.exlibrisgroup.com/discovery/search?query=any,contains," + texts.join(" ") + "&tab=Everything&search_scope=MyInst_and_CI&vid=61USYD_INST:sydney&mfacet=tlevel,include,online_resources,1&mode=basic";
    } else {
        href = "https://sydney.primo.exlibrisgroup.com/discovery/search?vid=61USYD_INST:sydney&tab=Everything&search_scope=MyInst_and_CI&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&query=any,contains," + text;
    }

    openUrlCurrentTab(href);

});

// get current tad id
function getCurrentTablId(callback) {
    chrome.tabs.query({ active: true }, function(tabs) {
        if (callback) { callback(tabs[0].id) }
    });
}

//open a new link at current tab

function openUrlCurrentTab(href) {
    getCurrentTablId(tabId => {
        chrome.tabs.create({ url: href });
    });
}



/*  
 * Handle the icon and show the status of the plug-in
 * Switch the extension to ON of OFF
 */

var Icon_switch = {};

// The function to control the icon switch
function handle_icon_switch(tab) {
    Icon_switch[tab.id] = !Icon_switch[tab.id]

    chrome.tabs.sendMessage(tab.id, { status: "icon_switch", icon_switch: Icon_switch[tab.id] });
    if (Icon_switch[tab.id]) {
        chrome.pageAction.setIcon({
            tabId: tab.id,
            path: {
                "32": "image/icon32.png",
                '128': 'image/icon32.png'
            }
        });
        chrome.pageAction.setTitle({ tabId: tab.id, title: "Library download helper is ON. Click this button or use Alt+A to disable." });
    } else {
        chrome.pageAction.setIcon({
            tabId: tab.id,
            path: {
                "32": "image/icon32-off.png",
                '128': 'image/icon32-off.png'
            }
        });
        chrome.pageAction.setTitle({ tabId: tab.id, title: "Library download helper is OFF. Click this button or use Alt+A to enable." });
    }
}


// add listener on clicked
chrome.pageAction.onClicked.addListener(handle_icon_switch);

// add listener for recieving the message and 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.status === "Page Supported") {
        console.log('Loaded ' + sender.tab.url);
        Icon_switch[sender.tab.id] = true;
        chrome.pageAction.show(sender.tab.id);
    }
    if (request.status === "icon_switch") {
        handle_icon_switch(sender.tab);
    }
});