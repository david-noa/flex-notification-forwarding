var targetNode = document.querySelector(".Twilio-ScreenReaderAlert");

// Timeout loop to wait for Flex page loading screen before selecting target node
function selectNodeAfterPageLoad() {
  //select the node that will be observed for mutations
  var node = document.querySelector(".Twilio-ScreenReaderAlert");
  if(!node) {
      //The node we need does not exist yet.
      //Wait 1500ms and try again
      window.setTimeout(selectNodeAfterPageLoad,1500);
      return;
  }
  targetNode = node;
  console.log("Flex Chat Notifications is loaded")
}
selectNodeAfterPageLoad();

// Callback function to execute when appropriate mutations are observed
function callback(mutations) {
    for (let mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
            // tell extension to send push notification
            var messageText = document.querySelectorAll(".Twilio")[1].innerText;
            chrome.runtime.sendMessage({"message": "Incoming chat request detected", "notificationText": `${messageText}`});
            console.log("Incoming chat request notification sent to background script")
        }
    }
}

// create observer instance linked to callback function
const observer = new MutationObserver(callback);
const observerOptions = {
    childList: true
};

// listener to enable/disable observing when extension is enabled/disabled
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "notifications enabled") {
      sendResponse({farewell: "Content-script has enabled notifications"});
      observer.observe(targetNode, observerOptions);
      console.log("Flex Notification Forwarding Enabled");
    } else if (request.greeting === "notifications disabled"){
  sendResponse({farewell: "Content-script has disabled notifications"});
  console.log("Flex Notification Forwarding Disabled");
  observer.disconnect();
    }
    }
);