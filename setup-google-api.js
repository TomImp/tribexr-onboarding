// Google API Setup Script
// Run this script to configure your Google Contacts integration
// 
// Usage: node setup-google-api.js

const fs = require('fs');
const path = require('path');

console.log('🔧 TribeXR Google Contacts Setup');
console.log('================================');

// Check if we're in the right directory
if (!fs.existsSync('./messaging.js')) {
    console.error('❌ Error: Please run this script from the tribexr-onboarding directory');
    process.exit(1);
}

console.log('\n📋 You\'ll need:');
console.log('1. Google API Key (from Google Cloud Console)');
console.log('2. OAuth 2.0 Client ID (from Google Cloud Console)');
console.log('3. Your Vercel deployment URL');

console.log('\n⚠️  SECURITY WARNING:');
console.log('- Never commit real API keys to version control');
console.log('- Keep your credentials secure');
console.log('- Consider using environment variables in production');

console.log('\n🔍 To find your credentials:');
console.log('1. Go to: https://console.cloud.google.com/');
console.log('2. Navigate to: APIs & Services > Credentials');
console.log('3. Copy your API Key and OAuth 2.0 Client ID');

console.log('\n✅ Manual Setup Instructions:');
console.log('1. Open messaging.js in your editor');
console.log('2. Find the GOOGLE_CONFIG object (around line 394)');
console.log('3. Replace:');
console.log('   - YOUR_GOOGLE_API_KEY with your actual API key');
console.log('   - YOUR_GOOGLE_CLIENT_ID with your actual client ID');
console.log('4. In importGoogleContacts() function:');
console.log('   - Uncomment lines 432-442 (real implementation)');
console.log('   - Comment out lines 445-467 (demo implementation)');
console.log('5. Test the integration!');

console.log('\n🚀 After setup:');
console.log('- Restart your local server');
console.log('- Click Messages > Add Friend > Import from Google Contacts');
console.log('- You\'ll see a Google login popup');
console.log('- Grant contacts permission');
console.log('- Your real contacts will appear!');

console.log('\n📖 For detailed setup guide, see: GOOGLE_SETUP.md');