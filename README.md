# Flex Notification Forwarding User Guide

## Extension Overview
The Flex Notification Forwarding Chrome extension is a utility that forwards incoming chat request notifications received from Twilio Flex chats to various messaging channels that you've enabled integrations with. The extension currently allows for notification forwarding to [Twilio SMS](https://www.twilio.com/docs/sms) and [Telegram](https://telegram.org) with more to come in future builds.

For instance, when the extension is enabled, your enabled messaging integrations will send you a notification message:

```
Incoming chat request from: <username>
```

> *Disclaimer: this extension is for educational purposes and provided as-is. By using this extension you assume all responsibility for any chats missed or affected metrics. Understand that in its current state, this extension is loaded locally and, therefore, any information entered and stored in the extension is not secure. No PII is handled with this utility, however, know that customer account usernames will be forwarded to the messaging integrations you enable.*

## Download the Extension
Download the latest build of the extension from this GitHub page using the '**<> Code**' drop-down menu at the top and selecting 'Download as ZIP'. Extract the files in this ZIP into any directory on your local machine (*e.g. 'Documents'*).

## Load the unpacked Extension
To load an unpacked extension in [developer mode](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked):
1. Go to the Extensions page by entering `chrome://extensions` in a new tab (*by design `chrome://` URLs are not linkable*).
* Alternatively, click on the Extensions menu puzzle button and select **Manage Extensions** at the bottom of the menu.
* Or, click the Chrome menu, hover over **More Tools**, then select **Extensions**.
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **Load unpacked** button and select the directory containing the extension files that you downloaded in the previous section.
> <img src="https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/BzVElZpUtNE4dueVPSp3.png" width="258" height="188" />

## How to use the Extension
* From the extensions menu puzzle button, pin your extension to the browser bar with the ‘pin’ icon
* Access the extension's **Options** page by clicking the pinned Flex Notification Forwarding extension icon and clicking the **Options** 'gear' icon
> <img src="https://i.imgur.com/DEjjul0.png" width="322" height="301" />
* From the **Options** page, you can enable/disable and configure the integrations for which to forward notifications
* When you’ve configured an integration, you can use the ‘Test’ button to test whether your integration is configured correctly
* Click the Flex Notification Forwarding icon to bring up the extension toggle popup, which allows you to enable/disable forwarding (*Note: at this time, you will need your Flex chat browser tab to be the active tab before enabling the extension or you will receive an error message*)

## Configuring Twilio SMS
To get started, create a [Twilio](https://www.twilio.com/try-twilio) account or sign-in to an existing account
1. To [get your first Twilio phone number](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number), head on over to your [Twilio console](https://www.twilio.com/console/phone-numbers/search) and find a number you like with SMS capabilities
2. Once you get a Twilio phone number with SMS, your [Twilio console](https://console.twilio.com/) will have all the information you need to integrate Twilio SMS notifications with Flex Notification Forwarding:
* Account SID
* Auth Token
* Twilio Phone number
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

```
https://api.telegram.org/bot<APIKey>/getUpdates
```
> *Don’t forget the ‘bot’ in this URL before your `<APIKey>`, which is the API token from step 4*
7. If done correctly, this request should respond with a JSON response body that contains an ‘id’ object (*e.g.* "id":**5324547301**), which is the Chat ID for the private message with your new bot. Enter this `id` value into the Flex Notification Forwarding **Options** page ‘Chat ID’ field and click ‘Save’
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

## Troubleshooting
*"I followed the steps to setup X integration, but the 'Test' button doesn't work"*

The best way to troubleshoot the integrations is to view the JSON response after pressing the 'Test' button.
You can view the JSON response using Chrome developer tools while on the extension's **Options** page

1. *Right-click* anywhere on the **Options** page and choose 'Inspect'
2. Select the 'Console' tab in the Chrome developer tools panel

After clicking the 'Test' button while viewing the developer console, you should see the JSON response from the integration's API.
You may need to click the '>' to expand the response. Look for any details JSON response such as an error code or error message that might help to identify the issue.

For example, the error message:
```
{"code": 21606, "message": "The From phone number +13295551234 is not a valid, SMS-capable inbound phone number or short code for your account.", "more_info": "https://www.twilio.com/docs/errors/21606", "status": 400}
```
gives a clear indication that your 'From' phone number for Twilio SMS is either entered incorrectly or invalid.

## Upcoming Feature List: 
* Option to mask or omit customer usernames in forwarded notifications
* Error catching for invalid values entered in the options page
