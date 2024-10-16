# Gimkit Random Game Finder Chrome Extension

This Chrome extension allows users to quickly find and join active Gimkit games by automatically searching for valid game codes through Gimkit's API. With a simple click, the extension will run multiple requests in parallel to locate a live game in an average of under 10 seconds. 

## Features

- **Find Active Gimkit Games**: The extension adds a "Find active game" button to your browser. When clicked, it searches for active Gimkit game codes using the Gimkit API.
- **Fast Game Code Search**: The search runs in parallel, making it possible to find a game code in under 10 seconds on average.
- **Automatic Code Entry**: Once a valid game code is found, it is automatically entered into the game code input field on Gimkit, allowing you to join instantly.
- **Game Code Storage**: The extension saves found game codes in your browser's storage, so you can easily revisit them later via the popup.
- **Popup Interface**: View all your previously found game codes in a simple popup interface, with clickable codes that allow you to directly join a game.
- **Code Clearing**: A "Clear Codes" button is provided in the popup to clear all stored game codes.

## How It Works

1. **Search for Active Game Codes**: The extension uses Gimkit's `find-info-from-code` API endpoint to check random game codes. The process sends multiple requests in parallel to speed up the search.

2. **Display the Game Code**: When a valid, active game code is found, the extension enters it into the game code input field on the Gimkit page and triggers validation events to allow you to join the game.

3. **Store the Game Code**: The found game codes are stored using Chrome’s `chrome.storage.sync` API, allowing them to persist even if the browser is closed. The stored codes can be accessed from the extension's popup interface.

4. **Popup Interface**: The popup displays a list of all found codes. You can click any code to open the corresponding game in a new tab, or clear all codes using the provided button.

## Safety Measures

1. **Rate Limiting Protection**: The extension is designed to stop searching if Gimkit responds with a "429 Too Many Requests" error, which indicates that the API's rate limit has been reached. When this happens, the extension will stop further requests and display a message indicating that the search has been paused.

2. **Graceful Error Handling**: The extension checks for errors during the search process and handles them gracefully. If an error occurs while fetching game codes (such as network issues or rate limits), the extension will log the error and stop execution without causing disruptions to the browser.

3. **No Unauthorized Access**: The extension does not access any personal information or require any unnecessary permissions. It only interacts with Gimkit’s API endpoints for searching game codes and uses the browser’s storage to keep found codes locally.

## How to Use

1. Install the extension from the Chrome Web Store.
2. Visit the [Gimkit Join Game page](https://www.gimkit.com/join).
3. Click the "Find active game" button added by the extension. It will search for an active game code and automatically enter it into the input field.
4. Alternatively, open the extension's popup to view previously found game codes. You can click any code to join the game, or clear the codes using the "Clear Codes" button.

## Installation

1. Download and unzip the extension files from the latest release (or clone this repository).
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension will now be installed and ready to use.

### Note:
When the Chrome Extension gets approved on the [Chrome Webstore](https://chromewebstore.google.com/), I will update the installation section with the URL to install. Until then, use the method stated above.

## Permissions

- **Storage**: The extension uses Chrome's storage to save found game codes locally in the user's browser.
- **Network Requests**: The extension sends requests to Gimkit's API to search for active game codes.

## Disclaimer

This extension is intended for educational and entertainment purposes only. It does not bypass any security measures implemented by Gimkit. The extension merely interacts with Gimkit's API and respects all rate limits to ensure responsible use.

---

**Note**: This extension is not affiliated with or endorsed by Gimkit.
