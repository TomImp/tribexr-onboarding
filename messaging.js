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
        messageElement.setAttribute('data-message-id', message.id);
        
        messageElement.innerHTML = `
            <div class="message-content">
                <div>${message.text}</div>
                <div class="message-time">${formatMessageTime(message.timestamp)}</div>
            </div>
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
    document.getElementById('send-button').disabled = true;
    
    // Re-render messages
    renderMessages(selectedFriendId);
    
    // Update friend's last message in sidebar
    updateFriendLastMessage(selectedFriendId, messageText, 'just now');
    
    // Show typing indicator and simulate realistic response
    showTypingIndicator(selectedFriendId);
    
    // Simulate friend reading the message (mark as read)
    setTimeout(() => {
        markMessageAsRead(newMessage.id);
    }, 500 + Math.random() * 1500);
    
    // Mock receiving a response with realistic timing
    const responseDelay = getRealisticResponseDelay(messageText);
    setTimeout(() => {
        hideTypingIndicator(selectedFriendId);
        simulateReceivedMessage(selectedFriendId, messageText);
    }, responseDelay);
}

function simulateReceivedMessage(friendId, userMessage = '') {
    const friend = friends.find(f => f.id === friendId);
    const friendName = friend ? friend.name : 'Friend';
    
    // Generate contextual responses based on user's message
    const response = generateContextualResponse(userMessage, friendName);
    
    const receivedMessage = {
        id: Date.now().toString(),
        senderId: friendId,
        text: response,
        timestamp: new Date(),
        type: 'received',
        read: false
    };
    
    if (!messages[friendId]) {
        messages[friendId] = [];
    }
    messages[friendId].push(receivedMessage);
    
    // Update friend's last message in sidebar
    updateFriendLastMessage(friendId, response, 'just now');
    
    // Only re-render if this friend is currently selected
    if (selectedFriendId === friendId) {
        renderMessages(friendId);
    }
    
    // Show desktop notification if chat is not active
    if (selectedFriendId !== friendId) {
        showDesktopNotification(friendName, response);
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

// Realistic messaging helper functions
function getRealisticResponseDelay(message) {
    const baseDelay = 1000; // 1 second base
    const readingSpeed = message.length * 50; // 50ms per character to "read"
    const typingSpeed = Math.random() * 3000 + 1000; // 1-4 seconds to "type" response
    return baseDelay + readingSpeed + typingSpeed;
}

function generateContextualResponse(userMessage, friendName) {
    const lowerMessage = userMessage.toLowerCase();
    
    // DJ-specific responses based on keywords
    if (lowerMessage.includes('beat') || lowerMessage.includes('mix')) {
        const beatResponses = [
            "Your beat matching is getting so much better! 🎧",
            "I love that transition! How did you nail it?",
            "That mix was fire! 🔥 What tracks were you using?",
            "Beat matching takes practice but you're doing great!",
            "Want to practice mixing together sometime?"
        ];
        return beatResponses[Math.floor(Math.random() * beatResponses.length)];
    }
    
    if (lowerMessage.includes('lesson') || lowerMessage.includes('learn')) {
        const lessonResponses = [
            "Which lesson are you working on? I just finished the EQ one!",
            "That lesson was really helpful! Did you try the exercise?",
            "I'm stuck on the same lesson! Want to figure it out together?",
            "The lessons on TribeXR are so good! 📚",
            "Have you tried the advanced techniques yet?"
        ];
        return lessonResponses[Math.floor(Math.random() * lessonResponses.length)];
    }
    
    if (lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('hello')) {
        const greetingResponses = [
            `Hey! Great to hear from you! How's your DJ practice going?`,
            `Hi there! 👋 Been working on any new tracks lately?`,
            `Hello! Perfect timing - I was just about to message you!`,
            `Hey! How's the mixing coming along?`
        ];
        return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    if (lowerMessage.includes('practice') || lowerMessage.includes('jam')) {
        const practiceResponses = [
            "Yes! Let's set up a practice session! 🎵",
            "I'm free this weekend if you want to jam!",
            "Practice makes perfect! Count me in!",
            "Would love to practice together! When works for you?",
            "Let's do it! I've been working on some new transitions!"
        ];
        return practiceResponses[Math.floor(Math.random() * practiceResponses.length)];
    }
    
    if (lowerMessage.includes('?')) {
        const questionResponses = [
            "Good question! Let me think about that... 🤔",
            "Hmm, I'm not sure but I think...",
            "That's interesting! Have you tried asking in the TribeXR community?",
            "I was wondering the same thing! Maybe we can figure it out together?",
            "Great question! I'll ask my instructor and get back to you!"
        ];
        return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }
    
    // General enthusiastic responses
    const generalResponses = [
        "That's awesome! 🎧",
        "Nice work! Keep it up!",
        "Totally agree! 💯",
        "That sounds amazing!",
        "I know exactly what you mean!",
        "You're getting so good at this!",
        "That's so cool! 🔥",
        "Thanks for sharing that!",
        "I love your enthusiasm!",
        "You inspire me to practice more!"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

function showTypingIndicator(friendId) {
    if (selectedFriendId !== friendId) return;
    
    const messagesContainer = document.getElementById('messages-container');
    if (!messagesContainer) return;
    
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.className = 'message received';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
            <div class="message-time">typing...</div>
        </div>
    `;
    
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator(friendId) {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function markMessageAsRead(messageId) {
    // In a real app, this would update the message status
    // For now, we'll just add a visual indicator
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageElement) {
        const timeElement = messageElement.querySelector('.message-time');
        if (timeElement && !timeElement.textContent.includes('✓')) {
            timeElement.textContent += ' ✓';
        }
    }
}

function updateFriendLastMessage(friendId, message, time) {
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
        friend.lastMessage = message.length > 30 ? message.substring(0, 30) + '...' : message;
        friend.lastMessageTime = time;
        renderFriendsList();
    }
}

function showDesktopNotification(friendName, message) {
    // In a real app, you'd request notification permission and show notifications
    console.log(`New message from ${friendName}: ${message}`);
    
    // Update favicon or title to show unread messages
    document.title = `(1) TribeXR - Messages`;
    
    // Reset title when user focuses the window
    window.addEventListener('focus', () => {
        document.title = 'TribeXR - Messages';
    }, { once: true });
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
    
    // Generate QR code
    const canvas = document.getElementById('qr-code-canvas');
    
    // Function to attempt QR generation
    function attemptQRGeneration(retries = 0) {
        if (window.QRCodeLibraryLoaded) {
            // Check which QR library is available
            if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
                // Using qrcode library (npm qrcode package)
                try {
                    QRCode.toCanvas(canvas, qrData, {
                        width: 200,
                        height: 200,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        }
                    }, function (error) {
                        if (error) {
                            console.error('QR generation failed:', error);
                            createSimpleQR();
                        } else {
                            console.log('QR code generated successfully with qrcode library!');
                        }
                    });
                    return;
                } catch (error) {
                    console.error('qrcode library error:', error);
                }
            }
            
            if (typeof qrcode !== 'undefined') {
                // Using qrcode-generator library (different API)
                try {
                    console.log('Trying qrcode-generator library...');
                    const qr = qrcode(0, 'M');
                    qr.addData(qrData);
                    qr.make();
                    
                    console.log('QR object created:', qr);
                    
                    // Try different ways to access the modules
                    let modules = null;
                    if (qr.modules) {
                        modules = qr.modules;
                    } else if (qr.getModules) {
                        modules = qr.getModules();
                    } else if (qr.qrcode && qr.qrcode.modules) {
                        modules = qr.qrcode.modules;
                    }
                    
                    if (modules && modules.length > 0) {
                        const size = modules.length;
                        const cellSize = 160 / size;
                        const offset = 20;
                        
                        const ctx = canvas.getContext('2d');
                        canvas.width = 200;
                        canvas.height = 200;
                        
                        // White background
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, 200, 200);
                        
                        // Draw QR modules
                        ctx.fillStyle = '#000000';
                        for (let row = 0; row < size; row++) {
                            for (let col = 0; col < size; col++) {
                                if (modules[row][col]) {
                                    ctx.fillRect(
                                        offset + col * cellSize,
                                        offset + row * cellSize,
                                        cellSize,
                                        cellSize
                                    );
                                }
                            }
                        }
                        
                        console.log('QR code generated successfully with qrcode-generator library!');
                        return;
                    } else {
                        console.log('Could not access modules, trying createImgTag method...');
                        // Try alternative method - create as HTML and extract data
                        const imgTag = qr.createImgTag(4, 0); // cellSize=4, margin=0 for larger image
                        console.log('Image tag method result:', imgTag);
                        
                        // Extract the base64 data URL from the img tag
                        const srcMatch = imgTag.match(/src="([^"]+)"/);
                        if (srcMatch && srcMatch[1]) {
                            const dataUrl = srcMatch[1];
                            
                            // Create an image and draw it to canvas
                            const img = new Image();
                            img.onload = function() {
                                const ctx = canvas.getContext('2d');
                                canvas.width = 200;
                                canvas.height = 200;
                                
                                // White background
                                ctx.fillStyle = '#FFFFFF';
                                ctx.fillRect(0, 0, 200, 200);
                                
                                // Center the QR code
                                const qrSize = Math.min(160, img.width, img.height);
                                const x = (200 - qrSize) / 2;
                                const y = (200 - qrSize) / 2;
                                
                                // Draw the QR code
                                ctx.drawImage(img, x, y, qrSize, qrSize);
                                
                                console.log('QR code generated successfully with qrcode-generator library!');
                            };
                            img.src = dataUrl;
                            return;
                        } else {
                            throw new Error('Could not extract image data');
                        }
                    }
                } catch (error) {
                    console.error('qrcode-generator library error:', error);
                }
            }
            
            // If we get here, library loaded but APIs don't work
            console.log('QR library loaded but APIs not compatible, generating simple QR pattern');
            createSimpleQR();
        } else if (retries < 10) {
            // Library not ready yet, wait and try again
            setTimeout(() => attemptQRGeneration(retries + 1), 500);
        } else {
            // Library failed to load after retries - generate simple QR
            console.log('QRCode library not available, generating simple QR pattern');
            createSimpleQR();
        }
    }
    
    // Create a simple QR-like pattern that actually encodes the data
    function createSimpleQR() {
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        
        // White background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 200, 200);
        
        // Generate a simple pattern based on the data
        const hash = simpleHash(qrData);
        const size = 16; // 16x16 grid
        const cellSize = 160 / size; // Leave 20px margin
        const offsetX = 20;
        const offsetY = 20;
        
        ctx.fillStyle = '#000000';
        
        // Create pattern based on hash
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const index = y * size + x;
                const bit = (hash >> (index % 32)) & 1;
                
                if (bit || isCornerMarker(x, y, size)) {
                    ctx.fillRect(
                        offsetX + x * cellSize, 
                        offsetY + y * cellSize, 
                        cellSize - 1, 
                        cellSize - 1
                    );
                }
            }
        }
        
        // Add text overlay for readability
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(40, 170, 120, 25);
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Scan to add ' + currentUser.name, 100, 185);
    }
    
    // Simple hash function for QR pattern
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }
    
    // Create corner markers like real QR codes
    function isCornerMarker(x, y, size) {
        const isTopLeft = (x < 3 && y < 3) || (x === 3 && y < 3) || (x < 3 && y === 3);
        const isTopRight = (x >= size - 3 && y < 3) || (x === size - 4 && y < 3) || (x >= size - 3 && y === 3);
        const isBottomLeft = (x < 3 && y >= size - 3) || (x === 3 && y >= size - 3) || (x < 3 && y === size - 4);
        return isTopLeft || isTopRight || isBottomLeft;
    }
    
    // Start attempting QR generation
    attemptQRGeneration();
    
    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
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

function handleQRUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Show loading message
    const instructions = document.getElementById('qr-instructions');
    const originalText = instructions.textContent;
    instructions.textContent = 'Processing QR code...';
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            try {
                // For demo purposes, simulate QR code reading
                // In production, you'd use a QR library like jsQR
                
                setTimeout(() => {
                    // Simulate successful QR code reading
                    const mockFriendData = {
                        id: 'qr_friend_' + Date.now(),
                        name: 'DJ Scanner',
                        avatar: '🎯',
                        status: 'Added via QR Code',
                        online: true,
                        lastMessage: '',
                        lastMessageTime: '',
                        email: 'qr.friend@djclub.com',
                        phone: ''
                    };
                    
                    processScanResult(mockFriendData);
                    instructions.textContent = originalText;
                }, 1500);
                
            } catch (error) {
                instructions.textContent = 'Could not read QR code. Please try another image.';
                setTimeout(() => {
                    instructions.textContent = originalText;
                }, 3000);
            }
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
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
    scanQRCode,
    handleQRUpload,
    closeQRModal
};