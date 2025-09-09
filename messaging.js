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

// Export functions for potential integration with other parts of the app
window.TribeMessaging = {
    selectFriend,
    sendMessage,
    loadFriends,
    renderFriendsList
};