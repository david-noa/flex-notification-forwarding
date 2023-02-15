// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.newValue) {
    const currentStatus = changes;
  }
});

// listener for notification from content-script.js
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.message === "Incoming chat request detected") {
      // send notification to toggled integrations
      chrome.storage.sync.get({
        twilioSMSToggleState: false,
        telegramToggleState: false
      }, function (items) {
        if (items.twilioSMSToggleState) {
          sendSMSNotification(request.notificationText);
        }
        if (items.telegramToggleState) {
          sendTelegramNotification(request.notificationText);
        }
      }
      );
    }
  });

// Telegram notification function
function sendTelegramNotification(msgText) {
  chrome.storage.sync.get({
    telegramBotToken: '',
    telegramChatId: ''
  }, function (items) {
    let botToken = items.telegramBotToken;
    let chatId = items.telegramChatId;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      body: JSON.stringify({
        chat_id: `${chatId}`,
        text: `${msgText}`
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(json => console.log(json));
  });
}

// Twilio SMS notification function
function sendSMSNotification(msgText) {
  chrome.storage.sync.get({
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: '',
    twilioForwardPhoneNumber: '',
  }, function (items) {
    let sid = items.twilioAccountSid;
    let authToken = items.twilioAuthToken;
    let fromPhone = items.twilioPhoneNumber;
    let toPhone = items.twilioForwardPhoneNumber;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(`${sid}:${authToken}`));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("To", `${toPhone}`);
    urlencoded.append("From", `${fromPhone}`);
    urlencoded.append("Body", `${msgText}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  });
}

// sanitize incoming data
function sanitizeInput(input) {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

// register inputs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.allowedAction)
    console.log("This is an allowed action.");
});