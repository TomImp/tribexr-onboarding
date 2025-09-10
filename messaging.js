// Messaging System - Basic MVP
// This will later integrate with Stream.io or similar service

let currentUser = null;
let selectedFriendId = null;
let messages = {};
let friends = [];

// Mock data for demonstration
const mockFriends = [
    {
        id: 'dj_alex',
        name: 'DJ Alex',
        avatar: '🎧',
        status: 'Learning beat matching',
        online: true,
        lastMessage: 'Hey! Just finished the EQ lesson',
        lastMessageTime: '2 min ago'
    },
    {
        id: 'dj_sarah',
        name: 'DJ Sarah',
        avatar: '🎵',
        status: 'Practicing mixing',
        online: true,
        lastMessage: 'Want to practice together?',
        lastMessageTime: '15 min ago'
    },
    {
        id: 'dj_mike',
        name: 'DJ Mike',
        avatar: '🔥',
        status: 'Offline',
        online: false,
        lastMessage: 'Thanks for the tip!',
        lastMessageTime: '1 hour ago'
    }
];

// Mock message data
const mockMessages = {
    'dj_alex': [
        {
            id: '1',
            senderId: 'dj_alex',
            text: 'Hey! Just finished the EQ lesson. It was amazing!',
            timestamp: new Date(Date.now() - 300000),
            type: 'received'
        },
        {
            id: '2',
            senderId: 'current_user',
            text: 'Nice! How did you find the frequency separation part?',
            timestamp: new Date(Date.now() - 240000),
            type: 'sent'
        },
        {
            id: '3',
            senderId: 'dj_alex',
            text: 'It was challenging but I think I got it. Want to practice together sometime?',
            timestamp: new Date(Date.now() - 120000),
            type: 'received'
        }
    ],
    'dj_sarah': [
        {
            id: '4',
            senderId: 'dj_sarah',
            text: 'Want to practice together? I just set up my controller',
            timestamp: new Date(Date.now() - 900000),
            type: 'received'
        },
        {
            id: '5',
            senderId: 'current_user',
            text: 'Absolutely! What time works for you?',
            timestamp: new Date(Date.now() - 850000),
            type: 'sent'
        }
    ],
    'dj_mike': [
        {
            id: '6',
            senderId: 'current_user',
            text: 'Try using the low-pass filter more gradually on the outgoing track',
            timestamp: new Date(Date.now() - 3600000),
            type: 'sent'
        },
        {
            id: '7',
            senderId: 'dj_mike',
            text: 'Thanks for the tip! That made a huge difference',
            timestamp: new Date(Date.now() - 3500000),
            type: 'received'
        }
    ]
};

// Initialize messaging system
function initializeMessaging() {
    // Load user profile
    loadCurrentUser();
    
    // Load friends and messages
    loadFriends();
    loadMessages();
    
    // Render friends list
    renderFriendsList();
    
    // Set up event listeners
    setupEventListeners();
}

function loadCurrentUser() {
    // Get user profile from localStorage (existing system)
    const savedProfile = localStorage.getItem('tribexr-user-profile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        currentUser = {
            id: 'current_user',
            name: profile.djName || 'DJ Beginner',
            avatar: profile.profileEmoji || '🎧'
        };
    } else {
        currentUser = {
            id: 'current_user',
            name: 'DJ Beginner',
            avatar: '🎧'
        };
    }
}

function loadFriends() {
    // For now, use mock data. Later this will come from Stream.io or your backend
    friends = [...mockFriends];
    
    // In production, you'd fetch from your backend/Stream.io:
    // const savedFriends = localStorage.getItem('tribexr-friends');
    // friends = savedFriends ? JSON.parse(savedFriends) : [];
}

function loadMessages() {
    // For now, use mock data. Later this will come from Stream.io
    messages = { ...mockMessages };
    
    // In production, you'd fetch from Stream.io:
    // const savedMessages = localStorage.getItem('tribexr-messages');
    // messages = savedMessages ? JSON.parse(savedMessages) : {};
}

function renderFriendsList() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';
    
    if (friends.length === 0) {
        friendsList.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); margin: 20px 0;">
                <p>No friends yet!</p>
                <p style="font-size: 12px;">Add friends to start chatting about your DJ journey</p>
            </div>
        `;
        return;
    }
    
    friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.className = `friend-item ${selectedFriendId === friend.id ? 'active' : ''}`;
        friendElement.onclick = () => selectFriend(friend.id);
        
        friendElement.innerHTML = `
            <div class="friend-avatar">${friend.avatar}</div>
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="friend-status">${friend.lastMessage || friend.status}</div>
            </div>
            ${friend.online ? '<div class="online-indicator"></div>' : ''}
        `;
        
        friendsList.appendChild(friendElement);
    });
}

function selectFriend(friendId) {
    selectedFriendId = friendId;
    const friend = friends.find(f => f.id === friendId);
    
    if (!friend) return;
    
    // Update UI
    renderFriendsList(); // Re-render to show active state
    showChatArea(friend);
    renderMessages(friendId);
}

function showChatArea(friend) {
    // Hide "no chat selected" message
    document.getElementById('no-chat-selected').style.display = 'none';
    
    // Show chat components
    document.getElementById('chat-header').style.display = 'flex';
    document.getElementById('chat-messages').style.display = 'flex';
    document.getElementById('chat-input-area').style.display = 'flex';
    
    // Update chat header
    document.getElementById('chat-avatar').textContent = friend.avatar;
    document.getElementById('chat-friend-name').textContent = friend.name;
    document.getElementById('chat-friend-status').textContent = friend.online ? 'Online' : 'Offline';
}

function renderMessages(friendId) {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    
    const friendMessages = messages[friendId] || [];
    
    if (friendMessages.length === 0) {
        messagesContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); margin: 20px 0;">
                <p>No messages yet. Start the conversation!</p>
            </div>
        `;
        return;
    }
    
    friendMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        
        messageElement.innerHTML = `
            <div>${message.text}</div>
            <div class="message-time">${formatMessageTime(message.timestamp)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    if (!selectedFriendId) return;
    
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    // Create new message
    const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        text: messageText,
        timestamp: new Date(),
        type: 'sent'
    };
    
    // Add to messages
    if (!messages[selectedFriendId]) {
        messages[selectedFriendId] = [];
    }
    messages[selectedFriendId].push(newMessage);
    
    // Clear input
    messageInput.value = '';
    
    // Re-render messages
    renderMessages(selectedFriendId);
    
    // In production, you'd send this to Stream.io or your backend
    // sendMessageToBackend(selectedFriendId, newMessage);
    
    // Mock receiving a response (for demo purposes)
    setTimeout(() => {
        simulateReceivedMessage(selectedFriendId);
    }, 1000 + Math.random() * 2000);
}

function simulateReceivedMessage(friendId) {
    const responses = [
        "That's awesome! 🎧",
        "Nice mixing! Keep it up",
        "Want to practice together?",
        "I love that track!",
        "Great beat matching 🔥",
        "Thanks for the tip!",
        "Let's jam sometime",
        "What controller are you using?"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const receivedMessage = {
        id: Date.now().toString(),
        senderId: friendId,
        text: randomResponse,
        timestamp: new Date(),
        type: 'received'
    };
    
    if (!messages[friendId]) {
        messages[friendId] = [];
    }
    messages[friendId].push(receivedMessage);
    
    // Only re-render if this friend is currently selected
    if (selectedFriendId === friendId) {
        renderMessages(friendId);
    }
}

function setupEventListeners() {
    // Enter key to send message
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auto-resize text input (future enhancement)
    document.getElementById('message-input').addEventListener('input', function() {
        // Enable/disable send button based on input
        const sendButton = document.getElementById('send-button');
        sendButton.disabled = this.value.trim().length === 0;
    });
}

function formatMessageTime(timestamp) {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - messageTime) / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    
    return messageTime.toLocaleDateString();
}

// Add Friend Modal Functions
function showAddFriendModal() {
    document.getElementById('add-friend-modal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('add-friend-modal').classList.add('show');
    }, 10);
}

function closeAddFriendModal() {
    const modal = document.getElementById('add-friend-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function searchFriends() {
    const searchTerm = document.getElementById('friend-search').value.trim();
    if (!searchTerm) return;
    
    // Mock search results (in production, this would query your backend/Stream.io)
    alert(`Searching for: "${searchTerm}"\n\nThis will integrate with your backend to find DJs by name, email, or phone number.`);
    
    // For demo, add a mock friend
    if (searchTerm.toLowerCase().includes('test')) {
        const newFriend = {
            id: 'test_user_' + Date.now(),
            name: 'Test DJ',
            avatar: '🎛️',
            status: 'New friend',
            online: true,
            lastMessage: '',
            lastMessageTime: ''
        };
        
        friends.push(newFriend);
        renderFriendsList();
        closeAddFriendModal();
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('add-friend-modal');
    if (e.target === modal) {
        closeAddFriendModal();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeMessaging);

// Google API Configuration
const GOOGLE_CONFIG = {
    apiKey: 'AIzaSyCteEx5KeHLRNXfF8T2Ea4fVhuCE6OxArs', // You'll need to get this from Google Cloud Console
    clientId: '908438948027-g2ugn0jkt2imv5s2qq3028te6slmsob7.apps.googleusercontent.com', // You'll need to get this from Google Cloud Console
    discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
    scope: 'https://www.googleapis.com/auth/contacts.readonly'
};

// Google API initialization
let gapiInitialized = false;
let tokenClient = null;

function initializeGoogleAPI() {
    if (gapiInitialized) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: GOOGLE_CONFIG.apiKey,
                discoveryDocs: GOOGLE_CONFIG.discoveryDocs,
            }).then(() => {
                // Initialize Google Identity Services
                tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: GOOGLE_CONFIG.clientId,
                    scope: GOOGLE_CONFIG.scope,
                    callback: '', // Will be set dynamically
                });
                
                gapiInitialized = true;
                resolve();
            }).catch(reject);
        });
    });
}

// Google Contacts Import
async function importGoogleContacts() {
    const button = document.getElementById('google-btn-text');
    button.textContent = 'Connecting...';
    
    try {
        // For demo purposes, we'll simulate the Google Contacts flow
        // In production, you'd uncomment the real implementation below
        
        // Real implementation (requires API keys):
        await initializeGoogleAPI();
        
        // Request access token with new Google Identity Services
        await new Promise((resolve, reject) => {
            tokenClient.callback = (resp) => {
                if (resp.error !== undefined) {
                    reject(resp);
                } else {
                    resolve(resp);
                }
            };
            tokenClient.requestAccessToken();
        });
        
        const response = await gapi.client.people.people.connections.list({
            'resourceName': 'people/me',
            'personFields': 'names,emailAddresses,phoneNumbers',
        });
        
        const contacts = response.result.connections || [];
	displayGoogleContacts(contacts);
  	button.textContent = 'Import Contacts';
        
        /*
	// Demo implementation with mock data:
        setTimeout(() => {
            const mockContacts = [
                {
                    names: [{displayName: 'Sarah Johnson'}],
                    emailAddresses: [{value: 'sarah.dj@email.com'}],
                    phoneNumbers: [{value: '+1234567890'}]
                },
                {
                    names: [{displayName: 'Mike Chen'}],
                    emailAddresses: [{value: 'mike.beats@email.com'}],
                    phoneNumbers: [{value: '+1987654321'}]
                },
                {
                    names: [{displayName: 'Alex Rodriguez'}],
                    emailAddresses: [{value: 'alex.mix@email.com'}],
                    phoneNumbers: []
                }
            ];
            
            displayGoogleContacts(mockContacts);
            button.textContent = 'Import Contacts';
        }, 1500);
	*/
        
    } catch (error) {
        console.error('Error importing contacts:', error);
        alert('Unable to import contacts. This feature requires Google API setup.');
        button.textContent = 'Import Contacts';
    }
}

// Store contacts globally for search/filter
let allContacts = [];

function displayGoogleContacts(contacts) {
    // Sort contacts alphabetically by name
    allContacts = contacts.sort((a, b) => {
        const nameA = (a.names?.[0]?.displayName || 'Unknown').toLowerCase();
        const nameB = (b.names?.[0]?.displayName || 'Unknown').toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    const optionsDiv = document.querySelector('.add-friend-options');
    const resultsDiv = document.getElementById('google-contacts-results');
    
    optionsDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
    
    // Update results div with search and bulk selection
    resultsDiv.innerHTML = `
        <h3>📋 Contacts Found (${allContacts.length})</h3>
        <div style="margin-bottom: 15px;">
            <input type="text" id="contact-search" placeholder="🔍 Search contacts..." 
                   style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-card); color: var(--text-primary);" 
                   oninput="filterContacts()">
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <button id="select-all-btn" class="btn-secondary" onclick="toggleSelectAll()" style="flex: 1;">Select All</button>
                <button id="add-selected-btn" class="btn-primary" onclick="addSelectedContacts()" style="flex: 1;" disabled>Add Selected (0)</button>
            </div>
        </div>
        <div id="contacts-list" style="max-height: 300px; overflow-y: auto; margin: 10px 0;"></div>
        <button class="btn-secondary" onclick="hideGoogleResults()">Back to Options</button>
    `;
    
    renderContactsList(allContacts);
}

function renderContactsList(contactsToShow) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contactsToShow.length === 0) {
        contactsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No contacts found.</p>';
        return;
    }
    
    contactsToShow.forEach((contact, index) => {
        const name = contact.names?.[0]?.displayName || 'Unknown';
        const email = contact.emailAddresses?.[0]?.value || '';
        const phone = contact.phoneNumbers?.[0]?.value || '';
        const contactId = `contact_${index}_${Date.now()}`;
        
        const contactElement = document.createElement('div');
        contactElement.className = 'contact-item';
        contactElement.style.cssText = 'display: flex; align-items: center; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 8px; background: var(--bg-card);';
        contactElement.innerHTML = `
            <input type="checkbox" id="${contactId}" class="contact-checkbox" 
                   onchange="updateSelectedCount()" 
                   style="margin-right: 12px; transform: scale(1.2);">
            <div class="contact-info" style="flex: 1;">
                <div class="contact-name" style="font-weight: 500; color: var(--text-primary);">${name}</div>
                <div class="contact-detail" style="font-size: 0.9em; color: var(--text-secondary);">${email || phone || 'No contact info'}</div>
            </div>
            <button class="add-contact-btn" onclick="addContactAsFriend('${name}', '${email}', '${phone}')" 
                    style="margin-left: 10px; padding: 6px 12px; background: var(--accent-gradient); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 0.9em;">
                Add
            </button>
        `;
        
        contactsList.appendChild(contactElement);
    });
}

function filterContacts() {
    const searchTerm = document.getElementById('contact-search').value.toLowerCase();
    const filteredContacts = allContacts.filter(contact => {
        const name = (contact.names?.[0]?.displayName || '').toLowerCase();
        const email = (contact.emailAddresses?.[0]?.value || '').toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });
    renderContactsList(filteredContacts);
}

function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.contact-checkbox');
    const selectAllBtn = document.getElementById('select-all-btn');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(cb => cb.checked = !allChecked);
    selectAllBtn.textContent = allChecked ? 'Select All' : 'Deselect All';
    updateSelectedCount();
}

function updateSelectedCount() {
    const selectedCount = document.querySelectorAll('.contact-checkbox:checked').length;
    const addSelectedBtn = document.getElementById('add-selected-btn');
    
    addSelectedBtn.textContent = `Add Selected (${selectedCount})`;
    addSelectedBtn.disabled = selectedCount === 0;
    
    const selectAllBtn = document.getElementById('select-all-btn');
    const totalCheckboxes = document.querySelectorAll('.contact-checkbox').length;
    const allChecked = selectedCount === totalCheckboxes && totalCheckboxes > 0;
    selectAllBtn.textContent = allChecked ? 'Deselect All' : 'Select All';
}

function addSelectedContacts() {
    const selectedCheckboxes = document.querySelectorAll('.contact-checkbox:checked');
    let addedCount = 0;
    
    selectedCheckboxes.forEach(checkbox => {
        const contactItem = checkbox.closest('.contact-item');
        const name = contactItem.querySelector('.contact-name').textContent;
        const email = contactItem.querySelector('.contact-detail').textContent;
        const phone = ''; // We don't display phone separately anymore
        
        // Don't add if email is "No contact info"
        const actualEmail = email === 'No contact info' ? '' : email;
        
        addContactAsFriend(name, actualEmail, phone, true); // true = silent mode
        addedCount++;
    });
    
    alert(`Added ${addedCount} contacts as friends!`);
    hideGoogleResults();
    closeAddFriendModal();
}

function hideGoogleResults() {
    document.querySelector('.add-friend-options').style.display = 'block';
    document.getElementById('google-contacts-results').style.display = 'none';
}

function addContactAsFriend(name, email, phone, silent = false) {
    // Check if friend already exists
    const existingFriend = friends.find(f => f.name === name || (email && f.email === email));
    if (existingFriend) {
        if (!silent) alert(`${name} is already in your friends list!`);
        return false;
    }
    
    // Create a new friend from contact
    const newFriend = {
        id: 'contact_' + Date.now() + '_' + Math.random(),
        name: name,
        avatar: '👤',
        status: 'From contacts',
        online: false,
        lastMessage: '',
        lastMessageTime: '',
        email: email,
        phone: phone
    };
    
    friends.push(newFriend);
    renderFriendsList();
    
    if (!silent) {
        // Show success message
        alert(`Added ${name} as a friend!`);
        
        // Close modals
        hideGoogleResults();
        closeAddFriendModal();
    }
    
    return true;
}

// QR Code Functions
function showQRCode() {
    const modal = document.getElementById('qr-code-modal');
    const title = document.getElementById('qr-modal-title');
    const instructions = document.getElementById('qr-instructions');
    const scannerContainer = document.getElementById('qr-scanner-container');
    
    title.textContent = 'Your DJ QR Code';
    instructions.textContent = 'Share this QR code with other DJs to connect instantly!';
    scannerContainer.style.display = 'none';
    
    // Generate QR code with user info
    const userInfo = {
        type: 'tribexr_dj',
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        timestamp: Date.now()
    };
    
    const qrData = JSON.stringify(userInfo);
    
    QRCode.toCanvas(document.getElementById('qr-code-canvas'), qrData, {
        width: 200,
        height: 200,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, function (error) {
        if (error) {
            console.error('QR Code generation error:', error);
            alert('Error generating QR code');
            return;
        }
        
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    });
    
    closeAddFriendModal();
}

function scanQRCode() {
    const modal = document.getElementById('qr-code-modal');
    const title = document.getElementById('qr-modal-title');
    const instructions = document.getElementById('qr-instructions');
    const scannerContainer = document.getElementById('qr-scanner-container');
    const qrContainer = document.getElementById('qr-code-container');
    
    title.textContent = 'Scan Friend\'s QR Code';
    instructions.textContent = 'Upload a photo or screenshot of your friend\'s QR code:';
    qrContainer.style.display = 'none';
    scannerContainer.style.display = 'block';
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    
    closeAddFriendModal();
}

function handleQRUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Create an image element to decode QR
        const img = new Image();
        img.onload = function() {
            try {
                // In a real implementation, you'd use a QR code decoder library
                // For demo purposes, we'll simulate successful scanning
                setTimeout(() => {
                    const mockFriendData = {
                        type: 'tribexr_dj',
                        id: 'scanned_user_' + Date.now(),
                        name: 'DJ Scanned',
                        avatar: '🎵',
                        timestamp: Date.now()
                    };
                    
                    processScanResult(mockFriendData);
                }, 1000);
                
                // Real implementation would use something like:
                // const qrData = decodeQRCode(img);
                // const friendData = JSON.parse(qrData);
                // processScanResult(friendData);
                
            } catch (error) {
                alert('Could not read QR code. Please try another image.');
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function processScanResult(friendData) {
    if (friendData.type !== 'tribexr_dj') {
        alert('This is not a valid TribeXR DJ QR code.');
        return;
    }
    
    // Check if friend already exists
    const existingFriend = friends.find(f => f.id === friendData.id);
    if (existingFriend) {
        alert(`You're already friends with ${friendData.name}!`);
        closeQRModal();
        return;
    }
    
    // Add new friend
    const newFriend = {
        id: friendData.id,
        name: friendData.name,
        avatar: friendData.avatar,
        status: 'Added via QR code',
        online: true,
        lastMessage: '',
        lastMessageTime: ''
    };
    
    friends.push(newFriend);
    renderFriendsList();
    
    alert(`Successfully added ${friendData.name} as a friend!`);
    closeQRModal();
}

function closeQRModal() {
    const modal = document.getElementById('qr-code-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('qr-code-container').style.display = 'flex';
        document.getElementById('qr-scanner-container').style.display = 'none';
        document.getElementById('qr-file-input').value = '';
    }, 300);
}

// Close QR modal when clicking outside
document.addEventListener('click', function(e) {
    const qrModal = document.getElementById('qr-code-modal');
    if (e.target === qrModal) {
        closeQRModal();
    }
});

// Export functions for potential integration with other parts of the app
window.TribeMessaging = {
    selectFriend,
    sendMessage,
    loadFriends,
    renderFriendsList,
    importGoogleContacts,
    showQRCode,
    scanQRCode
};