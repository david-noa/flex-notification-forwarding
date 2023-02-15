# Flex Notification Forwarding User Guide

## Extension Overview
The Flex Notification Forwarding Chrome extension is a utility that forwards incoming chat request notifications received from Twilio Flex chats to various messaging channels that you configure. The utility currently allows for notification forwarding to Twilio SMS and Telegram.

> Disclaimer: this extension is for educational purposes and provided as-is. By using this extension you assume all responsibility for any chats missed or affected metrics. Understand that in its current state, this extension is loaded locally and therefore information entered and stored in the extension is not secure. No PII is handled with this utility, however, know that customer account usernames will be forwarded to the messaging integrations you enable.

## Download the Extension
Download the latest build of the extension here and store the included folders in any directory on your local machine

## Load the unpacked Extension
Follow the steps outlined [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) on how to load an unpacked Chrome extension in developer mode

## How to use the Extension
* From the extensions menu puzzle button, pin your extension to the browser bar with the ‘pin’ icon and right-click the Flex Notification Forwarding extension icon ***or*** use the three dots menu next to the extension in your list of extensions to access the Flex Notification Forwarding **Options** page
* From the **Options** page, you can enable/disable and configure the integrations for which to forward notifications
* When you’ve configured an integration, you can use the ‘Test’ button to test whether your integration is configured correctly
* Click the Flex Notification Forwarding icon to bring up the extension toggle popup, which allows you to enable/disable forwarding (Note: at this time, you will need your Flex chat browser tab to be the active tab before enabling the extension or you will receive an error message)

## Configuring Twilio SMS
To get started, create a [Twilio](https://www.twilio.com/try-twilio) account
1. To get your first Twilio phone number, [head on over to your Twilio console](https://www.twilio.com/console/phone-numbers/search) and find a number you like with SMS capabilities
2. Once you get a Twilio phone number with SMS, your [Twilio console](https://console.twilio.com/) will have all the information you need to integrate Twilio SMS notifications with Flex Notification Forwarding:
> * Account SID
> * Auth Token
> * Twilio Phone number
3. Enter and save these values into the extension Options page along with the phone number you would like to forward to (*make sure to use the full number with country code, e.g. +15555555555*)
4. Test your integration with the ‘Test’ button

## Configuring Telegram
To get started, download Telegram [Desktop](https://desktop.telegram.org), [Web](https://web.telegram.org/), or Mobile and register, then start a private message with **@BotFather** on Telegram
1. Send **@BotFather** the `/newbot` command in a message to begin the bot creation process
2. Choose a **Friendly name** for your bot, for example, `My First Telegram Bot`
3. Choose a **username** for your bot ending in ‘bot’, for example, `mytestbot`
4. **@BotFather** will then provide you with your new bot’s Authentication token. Store this **API token** securely in your records and enter it in the Flex Notification Forwarding **Options** page ‘Telegram Bot’ field and click ‘Save’
> **Make sure to save your token in a secure place, treat it like a password and don't share it with anyone.**
5. Start a private chat with your new bot by visiting the link provided by **@BotFather** (*for example, t.me/mytestbot*)
6. Your new bot now needs to know the `chat ID` of this new private message. Send it any message and then enter the following command in your browser URL bar (or use a tool like [Postman](https://www.postman.com/)):

`https://api.telegram.org/bot<APIKey>/getUpdates`
> *Don’t forget the ‘bot’ in this URL before your <APIKey>, which is the API token from step 4*
7. If done correctly, this request should respond with a JSON response body that contains the ‘id’ object (*e.g.* "id":**5324547301**). Enter this `id` value into the Flex Notification Forwarding **Options** page ‘Chat ID’ field and click ‘Save’
8. Test your integration with the ‘Test’ button

## Bugs, Feature/Improvement Requests, or Feedback
Please submit your feature/improvement requests or feedback and detail any bugs [here](https://forms.gle/MPJYaYPme65NaNyA7), providing as much detail as possible. Here is an example of how to detail any bugs found:

* **Issue type:** Bug
* **Priority:** 1
* **Summary:** Extension intermittently fails to initialize
* **Description:** Intermittently the extension will fail to initialize when the Flex chats browser tab is opened.
The Dev console does not state in the logs that the Flex Notification Forwarding extension is ready or that
it’s enabled when enabling the forwarding toggle switch. The error thrown in the extension background script is:

```
content-script.js:23 Uncaught TypeError: Cannot read properties of undefined (reading 'innerText')
    at MutationObserver.callback
-OR-
Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist.
```

## Upcoming Feature List: 
* Option to mask or omit customer usernames in forwarded notifications
* Error catching for invalid values entered in the options page
