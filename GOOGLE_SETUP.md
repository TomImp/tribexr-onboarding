# Google Contacts API Setup

To enable Google Contacts import functionality, you'll need to set up Google Cloud credentials.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **People API** (Google Contacts)

## Step 2: Create Credentials

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > API Key**
3. Copy the API key
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add your domain to **Authorized JavaScript origins**:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
7. Copy the Client ID

## Step 3: Update Configuration

In `messaging.js`, update the `GOOGLE_CONFIG` object:

```javascript
const GOOGLE_CONFIG = {
    apiKey: 'YOUR_ACTUAL_API_KEY_HERE',
    clientId: 'YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com',
    discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
    scope: 'https://www.googleapis.com/auth/contacts.readonly'
};
```

## Step 4: Enable Real Implementation

In `messaging.js`, uncomment the real Google API code in the `importGoogleContacts()` function and comment out the demo implementation.

## Demo Mode

Currently, the app runs in demo mode with mock contact data. This allows you to test the UI without setting up Google API credentials.

## Security Notes

- Never commit real API keys to version control
- Use environment variables in production
- Consider using a backend proxy for API calls in production
- Restrict API keys to specific domains/IPs