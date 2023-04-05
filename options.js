// global options var constructors
let telegramBotToken = '';
let telegramChatId = '';
let twilioAccountSid = '';
let twilioAuthToken = '';
let twilioPhoneNumber = '';
let twilioForwardPhoneNumber = '';
let twilioSMSToggleState = false;
let telegramToggleState = false;
let smsToggle = document.querySelector("input[name=smsToggle]");
let telegramToggle = document.querySelector("input[name=telegramToggle]");

// Saves options to chrome.storage
function save_options() {
    chrome.storage.sync.set({
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Initialize page with user options stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
      telegramBotToken: '',
      telegramChatId: '',
      twilioAccountSid: '',
      twilioAuthToken: '',
      twilioPhoneNumber: '',
      twilioForwardPhoneNumber: '',
      twilioSMSToggleState: false,
      telegramToggleState: false
    }, function(items) {
      document.getElementById('telegramBotToken').value = items.telegramBotToken;
      document.getElementById('telegramChatId').value = items.telegramChatId;
      document.getElementById('twilioAccountSid').value = items.twilioAccountSid;
      document.getElementById('twilioAuthToken').value = items.twilioAuthToken;
      document.getElementById('twilioPhoneNumber').value = items.twilioPhoneNumber;
      document.getElementById('twilioForwardPhoneNumber').value = items.twilioForwardPhoneNumber;
      telegramBotToken = items.telegramBotToken;
      telegramChatId = items.telegramChatId;
      twilioAccountSid = items.twilioAccountSid;
      twilioAuthToken = items.twilioAuthToken;
      twilioPhoneNumber = items.twilioPhoneNumber;
      twilioForwardPhoneNumber = items.twilioForwardPhoneNumber;
      twilioSMSToggleState = items.twilioSMSToggleState;
      telegramToggleState = items.telegramToggleState;
      // load toggle state of integrations
      if (items.twilioSMSToggleState == false){
        document.getElementById('twilioSMS-options-container').classList.add('toggle-state-disabled');
      } else {
        smsToggle.checked = true;
      }
      if (items.telegramToggleState == false){
        document.getElementById('telegram-options-container').classList.add('toggle-state-disabled');
      } else {
        telegramToggle.checked = true;
      }
    });
  }

// Twilio SMS toggle function
smsToggle.addEventListener('change', function() {
  if (this.checked){
    chrome.storage.sync.set({twilioSMSToggleState: true});
    document.getElementById('twilioSMS-options-container').classList.remove('toggle-state-disabled');
  } else {
    chrome.storage.sync.set({twilioSMSToggleState: false});
    document.getElementById('twilioSMS-options-container').classList.add('toggle-state-disabled');
  }
});

// Telegram toggle function
telegramToggle.addEventListener('change', function() {
  if (this.checked){
    chrome.storage.sync.set({telegramToggleState: true});
    document.getElementById('telegram-options-container').classList.remove('toggle-state-disabled');
  } else {
    chrome.storage.sync.set({telegramToggleState: false});
    document.getElementById('telegram-options-container').classList.add('toggle-state-disabled');
  }
});

// Telegram Bot Token save button listener
document.querySelector('.saveTelegramBotToken').addEventListener('click', function(){
    var newTelegramBotToken = document.getElementById('telegramBotToken').value;
    chrome.storage.sync.set({
      telegramBotToken: newTelegramBotToken
    });
    chrome.storage.sync.get({
      telegramBotToken: 'default'
    }, function(item) {
    telegramBotToken = item.telegramBotToken;
    console.log("new key saved as", item.telegramBotToken);
    });
});

// Telegram Chat ID save button listener
document.querySelector('.saveTelegramChatId').addEventListener('click', function(){
  var newTelegramBotChatId = document.getElementById('telegramChatId').value;
  chrome.storage.sync.set({
    telegramChatId: newTelegramBotChatId
  });
  chrome.storage.sync.get({
    telegramChatId: ''
  }, function(item) {
  telegramChatId = item.telegramChatId;
  console.log("new Chat ID saved as", item.telegramChatId);
  });
});

// Twilio Account SID save button listener
document.querySelector('.saveTwilioAccountSid').addEventListener('click', function(){
  var newtwilioAccountSid = document.getElementById('twilioAccountSid').value;
  chrome.storage.sync.set({
    twilioAccountSid: newtwilioAccountSid
  });
  chrome.storage.sync.get({
    twilioAccountSid: ''
  }, function(item) {
    twilioAccountSid = item.twilioAccountSid;
  console.log("new Twilio Account SID saved as", item.twilioAccountSid);
  });
});

// Twilio Auth Token save button listener
document.querySelector('.saveTwilioAuthToken').addEventListener('click', function(){
  var newtwilioAuthToken = document.getElementById('twilioAuthToken').value;
  chrome.storage.sync.set({
    twilioAuthToken: newtwilioAuthToken
  });
  chrome.storage.sync.get({
    twilioAuthToken: ''
  }, function(item) {
    twilioAuthToken = item.twilioAuthToken;
  console.log("new Twilio Auth Token saved");
  });
});

// Twilio Phone Number save button listener
document.querySelector('.saveTwilioPhoneNumber').addEventListener('click', function(){
  var newtwilioPhoneNumber = document.getElementById('twilioPhoneNumber').value;
  chrome.storage.sync.set({
    twilioPhoneNumber: newtwilioPhoneNumber
  });
  chrome.storage.sync.get({
    twilioPhoneNumber: ''
  }, function(item) {
    twilioPhoneNumber = item.twilioPhoneNumber;
    console.log("new Twilio Phone Number saved as", item.twilioPhoneNumber);
  });
});

// Twilio Forwarding Phone Number save button listener
document.querySelector('.saveTwilioForwardPhoneNumber').addEventListener('click', function(){
  var newtwilioForwardPhoneNumber = document.getElementById('twilioForwardPhoneNumber').value;
  chrome.storage.sync.set({
    twilioForwardPhoneNumber: newtwilioForwardPhoneNumber
  });
  chrome.storage.sync.get({
    twilioForwardPhoneNumber: ''
  }, function(item) {
    twilioForwardPhoneNumber = item.twilioForwardPhoneNumber;
    console.log("new Twilio Forwarding Phone Number saved as", item.twilioForwardPhoneNumber);
  });
});

// Telegram Bot Message Tester
document.querySelector('.testTelegram').addEventListener('click', function(){

  fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`,{
    method: "POST",

    body: JSON.stringify({
        chat_id: `${telegramChatId}`,
        text: "[Test] Incoming Chat Request from (username)"
    }),

    headers: {
        "Content-type": "application/json"
    }
})
  .then((response) => response.json())
  .then(json => console.log(json));
});

// Twilio SMS Message Tester
document.querySelector('.testTwilioSms').addEventListener('click', function(){

var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic " + btoa(`${twilioAccountSid}:${twilioAuthToken}`));
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("To", `${twilioForwardPhoneNumber}`);
urlencoded.append("From", `${twilioPhoneNumber}`);
urlencoded.append("Body", "[Test] Incoming Chat Request from (username)");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

});

document.addEventListener('DOMContentLoaded', restore_options);