# Chrome Prompt API Demo Extension

A Chrome extension that demonstrates the use of Chrome's built-in Prompt API (Gemini Nano) for on-device AI capabilities.

## Features

- Check Prompt API availability
- Send prompts to the built-in AI model
- Display responses in a clean, user-friendly interface
- Real-time status updates
- Error handling and loading states

## Prerequisites

Before using this extension, you need:

1. **Chrome Version**: Chrome 127 or later (Dev, Canary, or Beta channel recommended)
2. **Enable Chrome Flags**: Several experimental flags need to be enabled
3. **Download AI Model**: The Gemini Nano model needs to be downloaded

## Setup Instructions

### Step 1: Enable Chrome Flags

1. Open Chrome and navigate to `chrome://flags`

2. Enable the following flags:

   **Required Flags:**
   - `chrome://flags/#optimization-guide-on-device-model` - Set to **Enabled BypassPerfRequirement**
   - `chrome://flags/#prompt-api-for-gemini-nano` - Set to **Enabled**

   **Additional Flags (recommended):**
   - `chrome://flags/#translation-api` - Set to **Enabled** (if using translation features)

3. Click **Relaunch** to restart Chrome

### Step 2: Download the AI Model

1. After restarting Chrome, navigate to `chrome://components`

2. Look for one of these component names (the name varies by Chrome version):
   - **"Optimization Guide On Device Model"**
   - **"On-Device Model"**

   Use Ctrl+F (or Cmd+F on Mac) to search for "model" to find it more easily.

3. Click the **Check for update** button next to the component

4. Wait for the model to download (this may take 10+ minutes, size is approximately 1.5-2.4 GB)

5. The component status will show "Downloading" during the download, and the version number will update when complete (from 0.0.0.0 to an actual version number)

### Step 3: Verify API Availability

You can verify the API is working by opening Chrome DevTools console and running:

```javascript
(async () => {
  const capabilities = await window.ai.languageModel.capabilities();
  console.log('API Capabilities:', capabilities);
})();
```

If successful, you should see the capabilities object with `available: "readily"`.

### Step 4: Load the Extension Locally

1. **Clone or download this repository** to your local machine

2. **Open Chrome Extensions page:**
   - Navigate to `chrome://extensions/`
   - Or click the three-dot menu > More tools > Extensions

3. **Enable Developer Mode:**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension:**
   - Click the "**Load unpacked**" button
   - Navigate to the directory containing this extension
   - Select the folder and click "Select Folder" (or "Open")

5. **Verify installation:**
   - The extension should now appear in your extensions list
   - You should see the "Chrome Prompt API Demo" extension with the AI icon
   - Pin the extension to your toolbar for easy access (click the puzzle icon, then the pin next to the extension)

### Step 5: Use the Extension

1. Click the extension icon in your Chrome toolbar

2. Check the **API Status** section to see if the API is ready

3. Enter a prompt in the text area (e.g., "Write a haiku about coding")

4. Click **Send Prompt** or press Enter

5. Wait for the response to appear in the Response section

## Project Structure

```
chrome-prompt-api-demo/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.js              # Prompt API integration logic
├── styles.css            # Styling for the popup
├── icon16.svg            # Extension icon (16x16)
├── icon48.svg            # Extension icon (48x48)
├── icon128.svg           # Extension icon (128x128)
└── README.md             # This file
```

## How It Works

The extension uses the `window.ai.languageModel` API provided by Chrome:

1. **Initialization**: Checks if the API is available using `window.ai.languageModel.capabilities()`

2. **Session Creation**: Creates a language model session with `window.ai.languageModel.create()`

3. **Prompt Execution**: Sends prompts using `session.prompt(userInput)`

4. **Response Handling**: Displays the AI-generated response in the UI

## Troubleshooting

### API Not Available

- Make sure you're using Chrome 127 or later
- Verify all flags are enabled correctly
- Restart Chrome after enabling flags

### Model Not Downloaded

- Check `chrome://components` and manually trigger download
- Ensure you have sufficient disk space (2+ GB)
- Check your internet connection

### Extension Not Loading

- Make sure Developer Mode is enabled
- Check the console for any errors
- Verify all files are present in the extension directory

### No Response from Prompt

- Check the browser console (F12) for errors
- Verify the model is fully downloaded
- Try a simpler prompt first
- Ensure the session initialized successfully

## Limitations

- **Device Requirements**: Requires sufficient RAM and storage
- **Model Size**: Initial download is ~1.5-2 GB
- **Language Support**: Currently optimized for English
- **Rate Limiting**: May have usage limits (not officially documented)
- **Experimental API**: API is subject to change

## Development

To modify the extension:

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes by opening the extension popup

## Resources

- [Chrome Built-in AI Documentation](https://developer.chrome.com/docs/ai/built-in)
- [Prompt API Guide](https://github.com/explainers-by-googlers/prompt-api)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)

## License

MIT License - Feel free to use and modify as needed.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Notes

- This extension is for demonstration and educational purposes
- The Prompt API is experimental and may change
- Always handle user data responsibly
- Consider privacy implications when using AI features

## Support

For issues with:
- **This extension**: Open an issue in this repository
- **Chrome Prompt API**: Check Chrome's developer documentation
- **Chrome flags**: Visit Chrome support forums
