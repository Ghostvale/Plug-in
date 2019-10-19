// Saves options to chrome.storage
function save_options() {
    var cheatsheet = document.getElementById('cheatsheet').checked;
    var on_switch = document.getElementById('on-off-switch').checked;
    chrome.storage.sync.set({
        CheatSheet: cheatsheet,
        On_Off_switch: on_switch
    }, function() {});
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        On_Off_switch: true,
        CheatSheet: true
    }, function(items) {
        document.getElementById('cheatsheet').checked = items.CheatSheet;
        document.getElementById('on-off-switch').checked = items.On_Off_switch;
        console.log(items.CheatSheet);
        console.log(items.On_Off_switch);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById("cheatsheet").addEventListener('change', save_options);
document.getElementById("on-off-switch").addEventListener('change', save_options);