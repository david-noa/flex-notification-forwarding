let pluginToggle = document.querySelector("input[name=pluginToggle]");
let currentStatusColor = toggleNotifications.style.backgroundColor;
let telegramAPIKey = document.getElementById("telegramAPIKey");
let active_tab = 0;

// initialize popup page with stored state
function initializePopup(){
  // Use default value pluginStatus = 'disabled'
  chrome.storage.sync.get({
    pluginStatus: 'Disabled'
  }, function(item) {
    if (item.pluginStatus === 'Disabled') {
      setPluginStatus(false, item.pluginStatus);
    } else {
      setPluginStatus(true, item.pluginStatus);
    }
  });
}

function setPluginStatus(status, statusText) {
  if (status){
    document.getElementById('plugin-status').classList.remove('status-disabled');
    document.getElementById('plugin-status').classList.add('status-enabled');
    document.getElementById('status-container').style.borderColor = 'limegreen';
    pluginToggle.checked = true;
    chrome.storage.sync.set({pluginStatus: 'Enabled'});
    document.getElementById('plugin-status').innerHTML = statusText;
    chrome.action.setIcon({path: '/images/flex-icon-active-128.png'});
  } else {
    document.getElementById('plugin-status').classList.remove('status-enabled');
    document.getElementById('plugin-status').classList.add('status-disabled');
    document.getElementById('status-container').style.borderColor = 'grey';
    pluginToggle.checked = false;
    chrome.storage.sync.set({pluginStatus: 'Disabled'});
    document.getElementById('plugin-status').innerHTML = statusText;
    chrome.action.setIcon({path: '/images/flex-icon-default-128.png'});
  }
}

// force toggle state on document load
/* function toggle(checked) {
  if (checked != pluginToggle.checked) {
    pluginToggle.click();
  }
} */

// extension toggle function
pluginToggle.addEventListener('change', function() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let activeTabId = tabs[0].id;
     if (this.checked){
      chrome.tabs.sendMessage(activeTabId, {greeting: "notifications enabled"}, function(response) {
        var lastError = chrome.runtime.lastError;
        // check for connection to content-script
        if (lastError?.message && lastError.message == "Could not establish connection. Receiving end does not exist.") {
            document.getElementById('toggleError').innerHTML = "A flex.twilio.com browser tab was not detected. Please first set your Flex chat as the active browser tab or refresh the page.";
            // undo toggle state with extra click
            pluginToggle.click();
            return;
        } else {
          setPluginStatus(true, 'Enabled');
        }
      });
      } else {
      chrome.tabs.sendMessage(activeTabId, {greeting: "notifications disabled"}, function(response){
        var lastError = chrome.runtime.lastError;
        if (lastError?.message && lastError.message == "Could not establish connection. Receiving end does not exist.") {
            document.getElementById('toggleError').innerHTML = "A <u>flex.twilio.com</u> browser tab was not detected. Please first set your Flex chat as the active browser tab or refresh the page.";
            return;
        } else {
          setPluginStatus(false, 'Disabled');
        }
      });
      }
    });
});

document.addEventListener('DOMContentLoaded', initializePopup);