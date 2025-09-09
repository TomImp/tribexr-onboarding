let currentStep = 0;
const steps = ['welcome', 'skill', 'genre', 'goals', 'frequency', 'lessons'];
let userProfile = {
    skill: null,
    genres: [],
    goals: null,
    frequency: null,
    personalizedLessons: [],
    completedOnboarding: false,
    djName: 'DJ Beginner',
    completedLessons: [],
    djScore: 0,
    completionPercentage: 0
};

// Load saved profile on page load
function loadUserProfile() {
    const savedProfile = localStorage.getItem('tribexr-user-profile');
    if (savedProfile) {
        userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
        return true;
    }
    return false;
}

// Save profile to localStorage
function saveUserProfile() {
    localStorage.setItem('tribexr-user-profile', JSON.stringify(userProfile));
}

// Clear profile (for reset)
function clearUserProfile() {
    localStorage.removeItem('tribexr-user-profile');
    userProfile = {
        skill: null,
        genres: [],
        goals: null,
        frequency: null,
        personalizedLessons: [],
        completedOnboarding: false
    };
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        // Save profile before moving to next step
        saveUserProfile();
        
        document.getElementById(`step-${steps[currentStep]}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step-${steps[currentStep]}`).classList.add('active');
        
        if (steps[currentStep] === 'lessons') {
            userProfile.completedOnboarding = true;
            generatePersonalizedPath();
            populateLessonsTable();
            updateProfileSummary();
            showMainNavigation();
            saveUserProfile();
        }
    }
}

function previousStep() {
    if (currentStep > 0) {
        document.getElementById(`step-${steps[currentStep]}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step-${steps[currentStep]}`).classList.add('active');
    }
}

function selectOption(category, element) {
    const parent = element.parentElement;
    const options = parent.querySelectorAll('.option-card, .option-list-item');
    
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    
    userProfile[category] = element.dataset.value;
    saveUserProfile(); // Save immediately
    
    setTimeout(() => nextStep(), 300);
}

function toggleOption(category, element) {
    element.classList.toggle('selected');
    
    if (category === 'genre') {
        const value = element.dataset.value;
        const index = userProfile.genres.indexOf(value);
        
        if (index > -1) {
            userProfile.genres.splice(index, 1);
        } else {
            userProfile.genres.push(value);
        }
        
        document.getElementById('genre-next').disabled = userProfile.genres.length === 0;
        saveUserProfile(); // Save immediately
    }
}

function generatePersonalizedPath() {
    const pathContainer = document.getElementById('lesson-path');
    
    // Check if we already have saved personalized lessons
    if (userProfile.personalizedLessons && userProfile.personalizedLessons.length > 0) {
        renderPersonalizedPath(userProfile.personalizedLessons);
        return;
    }
    
    const skillLessons = getSkillBasedLessons(userProfile.skill);
    const goalLessons = getGoalBasedLessons(userProfile.goals);
    
    let lessonFlow = [];
    
    if (userProfile.skill === 'first-timer' || userProfile.skill === 'beginner') {
        lessonFlow = [
            { 
                title: 'Welcome to DJing', 
                description: 'Introduction to the world of DJing',
                type: 'Video Tutorial',
                difficulty: 'easy',
                duration: '10 mins',
                lessonIndex: 0
            },
            {
                title: 'Understanding DJ Equipment',
                description: 'Learn about CDJs, mixers, and controllers',
                type: 'Interactive Lesson',
                difficulty: 'easy',
                duration: '15 mins',
                lessonIndex: 1
            },
            {
                title: 'Introduction to Beats and Bars',
                description: 'Learn the foundation of music structure',
                type: 'Practice Exercise',
                difficulty: 'easy',
                duration: '12 mins',
                lessonIndex: 2
            }
        ];
    } else if (userProfile.skill === 'intermediate') {
        lessonFlow = [
            {
                title: 'Manual Beat Matching on CDJ-2000',
                description: 'Perfect your timing without sync',
                type: 'Practice Exercise',
                difficulty: 'medium',
                duration: '18 mins',
                lessonIndex: 7
            },
            {
                title: 'Bass Swapping in Tech House',
                description: 'Advanced EQ techniques for seamless mixing',
                type: 'Interactive Lesson',
                difficulty: 'medium',
                duration: '20 mins',
                lessonIndex: 13
            },
            {
                title: 'Harmonic Mixing Basics',
                description: 'Use key matching to create perfect blends',
                type: 'Masterclass',
                difficulty: 'medium',
                duration: '25 mins',
                lessonIndex: 28
            }
        ];
    } else {
        lessonFlow = [
            {
                title: 'Creative Looping in Techno',
                description: 'Advanced loop techniques for dynamic sets',
                type: 'Masterclass',
                difficulty: 'hard',
                duration: '30 mins',
                lessonIndex: 33
            },
            {
                title: 'Reading the Crowd',
                description: 'Master the psychology of crowd energy',
                type: 'Video Tutorial',
                difficulty: 'hard',
                duration: '25 mins',
                lessonIndex: 34
            },
            {
                title: 'Peak Time Energy Management',
                description: 'Control the dance floor like a pro',
                type: 'Workshop',
                difficulty: 'hard',
                duration: '35 mins',
                lessonIndex: 36
            }
        ];
    }
    
    if (userProfile.goals === 'become-pro') {
        lessonFlow.push({
            title: 'Building Your DJ Brand',
            description: 'Marketing and networking for DJs',
            type: 'Career Guide',
            difficulty: 'medium',
            duration: '20 mins',
            lessonIndex: 47
        });
    }
    
    let pathHTML = '';
    lessonFlow.forEach((lesson, index) => {
        const difficultyClass = lesson.difficulty;
        const isCompleted = userProfile.completedLessons.includes(lesson.lessonIndex);
        const completionStatus = isCompleted ? 'completed' : '';
        const buttonText = isCompleted ? 'Completed ✓' : 'Start Lesson';
        const buttonClass = isCompleted ? 'btn-completed' : 'btn-primary';
        
        pathHTML += `
            <div class="lesson-step ${completionStatus}">
                <div class="lesson-info">
                    <div class="lesson-title-row">
                        <div class="step-number ${isCompleted ? 'completed' : ''}">${index + 1}</div>
                        <h4>${lesson.title}</h4>
                    </div>
                    <p>${lesson.description}</p>
                    <div class="lesson-button-container">
                        <button class="lesson-start-btn ${buttonClass}" onclick="handleLessonButton(${lesson.lessonIndex}, this)">${buttonText}</button>
                    </div>
                    <div class="lesson-meta">
                        <span class="meta-badge">${lesson.type}</span>
                        <span class="meta-badge ${difficultyClass}">${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}</span>
                        <span class="meta-badge">${lesson.duration}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    pathContainer.innerHTML = pathHTML;
    
    // Apply horizontal layout for the first 3 lessons if they exist
    if (lessonFlow.length >= 3) {
        pathContainer.classList.add('horizontal');
    } else {
        pathContainer.classList.remove('horizontal');
    }
    
    // Save the generated lesson flow
    userProfile.personalizedLessons = lessonFlow;
    saveUserProfile();
}

// Helper function to render saved personalized path
function renderPersonalizedPath(lessonFlow) {
    const pathContainer = document.getElementById('lesson-path');
    let pathHTML = '';
    lessonFlow.forEach((lesson, index) => {
        const difficultyClass = lesson.difficulty;
        const isCompleted = userProfile.completedLessons.includes(lesson.lessonIndex);
        const completionStatus = isCompleted ? 'completed' : '';
        const buttonText = isCompleted ? 'Completed ✓' : 'Start Lesson';
        const buttonClass = isCompleted ? 'btn-completed' : 'btn-primary';
        
        pathHTML += `
            <div class="lesson-step ${completionStatus}">
                <div class="lesson-info">
                    <div class="lesson-title-row">
                        <div class="step-number ${isCompleted ? 'completed' : ''}">${index + 1}</div>
                        <h4>${lesson.title}</h4>
                    </div>
                    <p>${lesson.description}</p>
                    <div class="lesson-button-container">
                        <button class="lesson-start-btn ${buttonClass}" onclick="handleLessonButton(${lesson.lessonIndex || 0}, this)">${buttonText}</button>
                    </div>
                    <div class="lesson-meta">
                        <span class="meta-badge">${lesson.type}</span>
                        <span class="meta-badge ${difficultyClass}">${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}</span>
                        <span class="meta-badge">${lesson.duration}</span>
                    </div>
                </div>
            </div>
        `;
    });
    pathContainer.innerHTML = pathHTML;
    
    // Apply horizontal layout for the first 3 lessons if they exist
    if (lessonFlow.length >= 3) {
        pathContainer.classList.add('horizontal');
    } else {
        pathContainer.classList.remove('horizontal');
    }
}

function getSkillBasedLessons(skill) {
    const skillMap = {
        'first-timer': ['intro', 'basics', 'equipment'],
        'beginner': ['counting', 'beatmatching', 'basic-mixing'],
        'intermediate': ['eq', 'effects', 'harmonic-mixing'],
        'advanced': ['scratching', 'advanced-effects', 'performance']
    };
    return skillMap[skill] || [];
}

function getGoalBasedLessons(goal) {
    const goalMap = {
        'have-fun': ['party-mixing', 'popular-tracks'],
        'learn': ['theory', 'techniques', 'practice'],
        'become-pro': ['performance', 'branding', 'networking']
    };
    return goalMap[goal] || [];
}

function populateLessonsTable() {
    const tbody = document.getElementById('lessons-tbody');
    let tableHTML = '';
    
    // Get saved lesson ratings
    const savedRatings = localStorage.getItem('lessonRatings');
    const lessonRatings = savedRatings ? JSON.parse(savedRatings) : {};
    
    lessons.forEach((lesson, index) => {
        const difficultyDots = createDifficultyIndicator(lesson.difficulty);
        const userRating = createUserRating(lessonRatings[index], lessonRatings);
        
        tableHTML += `
            <tr>
                <td>${lesson.name}</td>
                <td><span class="skill-badge">${lesson.skill}</span></td>
                <td>${difficultyDots}</td>
                <td>${lesson.equipment}</td>
                <td>${lesson.genre}</td>
                <td><div class="rating">${userRating}</div></td>
                <td><button class="btn-small ${userProfile.completedLessons.includes(index) ? 'btn-completed' : ''}" onclick="handleLessonTableButton(${index}, this)">${userProfile.completedLessons.includes(index) ? '✓' : 'Start'}</button></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

function createDifficultyIndicator(difficulty) {
    const levels = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    const level = levels[difficulty] || 1;
    let dots = '';
    
    for (let i = 1; i <= 3; i++) {
        dots += `<span class="difficulty-dot ${i <= level ? 'filled' : ''}"></span>`;
    }
    
    return `<div class="difficulty-indicator">${dots}</div>`;
}

function createUserRating(rating, lessonRatings) {
    if (!rating) {
        return '<span class="no-rating">Not rated</span>';
    }
    
    // Calculate overall percentage
    const allRatings = Object.values(lessonRatings);
    const upRatings = allRatings.filter(r => r === 'up').length;
    const percentage = allRatings.length > 0 ? Math.round((upRatings / allRatings.length) * 100) : 0;
    
    if (rating === 'up') {
        return `<span class="user-rating thumbs-up">👍 ${percentage}%</span>`;
    } else if (rating === 'down') {
        return `<span class="user-rating thumbs-down">👎 ${percentage}%</span>`;
    }
    
    return '<span class="no-rating">Not rated</span>';
}

function filterLessons(filter) {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    const tbody = document.getElementById('lessons-tbody');
    let filteredLessons = [...lessons];
    
    if (filter === 'recommended') {
        filteredLessons = lessons.filter(lesson => {
            const genreMatch = userProfile.genres.some(g => 
                lesson.genre.toLowerCase().includes(g.toLowerCase())
            );
            const skillMatch = lesson.skill.toLowerCase().includes(userProfile.skill);
            return genreMatch || skillMatch;
        });
    } else if (filter === 'equipment') {
        filteredLessons.sort((a, b) => a.equipment.localeCompare(b.equipment));
    } else if (filter === 'skill') {
        filteredLessons.sort((a, b) => {
            const skillOrder = ['Counting Beats', 'Beat Matching', 'EQs', 'Effects', 'Scratching'];
            return skillOrder.indexOf(a.skill) - skillOrder.indexOf(b.skill);
        });
    }
    
    // Get saved lesson ratings  
    const savedRatings = localStorage.getItem('lessonRatings');
    const lessonRatings = savedRatings ? JSON.parse(savedRatings) : {};
    
    let tableHTML = '';
    filteredLessons.forEach(lesson => {
        const originalIndex = lessons.indexOf(lesson);
        const difficultyDots = createDifficultyIndicator(lesson.difficulty);
        const userRating = createUserRating(lessonRatings[originalIndex], lessonRatings);
        
        tableHTML += `
            <tr>
                <td>${lesson.name}</td>
                <td><span class="skill-badge">${lesson.skill}</span></td>
                <td>${difficultyDots}</td>
                <td>${lesson.equipment}</td>
                <td>${lesson.genre}</td>
                <td><div class="rating">${userRating}</div></td>
                <td><button class="btn-small ${userProfile.completedLessons.includes(originalIndex) ? 'btn-completed' : ''}" onclick="handleLessonTableButton(${originalIndex}, this)">${userProfile.completedLessons.includes(originalIndex) ? '✓' : 'Start'}</button></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = tableHTML;
}

function restartOnboarding() {
    // Clear saved profile
    clearUserProfile();
    
    currentStep = 0;
    
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById('step-welcome').classList.add('active');
    
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    
    // Hide main navigation to avoid double logos
    hideMainNavigation();
    
    // Reset genre button state
    const genreNextBtn = document.getElementById('genre-next');
    if (genreNextBtn) {
        genreNextBtn.disabled = true;
    }
}

function startLearning() {
    // Open first recommended lesson
    openLesson(0);
}

function openLesson(lessonIndex) {
    window.location.href = `lesson-viewer.html?lesson=${lessonIndex}`;
}

// Enhanced button handlers for lesson completion states
function handleLessonButton(lessonIndex, buttonElement) {
    const isCompleted = userProfile.completedLessons.includes(lessonIndex);
    
    if (isCompleted) {
        // Show retake options
        showRetakeDialog(lessonIndex, buttonElement);
    } else {
        // Open lesson normally
        openLesson(lessonIndex);
    }
}

function handleLessonTableButton(lessonIndex, buttonElement) {
    const isCompleted = userProfile.completedLessons.includes(lessonIndex);
    
    if (isCompleted) {
        // Show retake options
        showRetakeDialog(lessonIndex, buttonElement);
    } else {
        // Open lesson normally
        openLesson(lessonIndex);
    }
}

function showRetakeDialog(lessonIndex, buttonElement) {
    const lessonName = lessons[lessonIndex]?.name || `Lesson ${lessonIndex + 1}`;
    const confirmed = confirm(`You've completed "${lessonName}".\n\nWould you like to retake this lesson?`);
    
    if (confirmed) {
        openLesson(lessonIndex);
    }
}

// Initialize app on page load
function initializeApp() {
    const hasProfile = loadUserProfile();
    
    // Initialize Early Adopter achievement
    initializeEarlyAdopterAchievement();
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const skipToLessons = urlParams.get('skipToLessons') === 'true';
    
    if ((hasProfile && userProfile.completedOnboarding) || skipToLessons) {
        // Skip to lessons page and restore selections
        currentStep = 5; // lessons step
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        document.getElementById('step-lessons').classList.add('active');
        
        // Restore UI selections
        restoreUserSelections();
        
        // Generate or restore personalized path
        generatePersonalizedPath();
        populateLessonsTable();
        
        // Update profile summary
        updateProfileSummary();
        
        // Show main navigation
        showMainNavigation();
        
        // Clean up URL
        if (skipToLessons) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else if (hasProfile && !userProfile.completedOnboarding) {
        // Partial profile exists, restore selections but start fresh
        restoreUserSelections();
        // Don't change the current step - let user start normally
    }
    // If no profile at all, just show welcome screen (default)
}

// Restore user selections in the UI
function restoreUserSelections() {
    // Restore skill selection
    if (userProfile.skill) {
        const skillElement = document.querySelector(`[data-value="${userProfile.skill}"]`);
        if (skillElement) skillElement.classList.add('selected');
    }
    
    // Restore genre selections
    if (userProfile.genres && userProfile.genres.length > 0) {
        userProfile.genres.forEach(genre => {
            const genreElement = document.querySelector(`[data-value="${genre}"]`);
            if (genreElement) genreElement.classList.add('selected');
        });
        
        // Enable genre next button
        const genreNextBtn = document.getElementById('genre-next');
        if (genreNextBtn) {
            genreNextBtn.disabled = false;
        }
    }
    
    // Restore goals selection
    if (userProfile.goals) {
        const goalsElement = document.querySelector(`[data-value="${userProfile.goals}"]`);
        if (goalsElement) goalsElement.classList.add('selected');
    }
    
    // Restore frequency selection
    if (userProfile.frequency) {
        const frequencyElement = document.querySelector(`[data-value="${userProfile.frequency}"]`);
        if (frequencyElement) frequencyElement.classList.add('selected');
    }
}

// Profile management functions
function showProfile() {
    const profileText = `Your DJ Profile:
    
• DJ Name: ${userProfile.djName || 'DJ Beginner'}
• Experience Level: ${userProfile.skill ? userProfile.skill.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
• Music Genres: ${userProfile.genres && userProfile.genres.length > 0 ? userProfile.genres.map(g => g.replace('-', ' ')).join(', ') : 'Not set'}
• Goals: ${userProfile.goals ? userProfile.goals.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
• Practice Frequency: ${userProfile.frequency ? userProfile.frequency.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
• DJ Score: ${userProfile.djScore || 0} points
• Progress: ${userProfile.completionPercentage || 0}% complete
• Achievements: ${userProfile.achievements ? userProfile.achievements.length : 0} earned`;

    alert(profileText);
}


function editProfile() {
    const confirmEdit = confirm('This will take you back to the onboarding questions to update your preferences. Continue?');
    if (confirmEdit) {
        // Keep the profile but mark as incomplete so they can edit
        userProfile.completedOnboarding = false;
        saveUserProfile();
        
        // Go back to first question
        currentStep = 1;
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        document.getElementById('step-skill').classList.add('active');
    }
}

function updateProfileSummary() {
    const summaryElement = document.getElementById('profile-summary');
    if (summaryElement && userProfile.completedOnboarding) {
        const skillText = userProfile.skill ? userProfile.skill.replace('-', ' ') : 'any level';
        const genreText = userProfile.genres && userProfile.genres.length > 0 ? 
            userProfile.genres.slice(0, 2).map(g => g.replace('-', ' ')).join(' & ') : 'all genres';
        
        summaryElement.innerHTML = `
            <div class="profile-stats">
                <span>Personalized for ${skillText} level, focusing on ${genreText}</span>
                <div class="stats-row">
                    <span class="stat"><strong>DJ Score:</strong> ${userProfile.djScore} points</span>
                    <span class="stat"><strong>Progress:</strong> ${userProfile.completionPercentage}% complete</span>
                </div>
            </div>
        `;
    }
}

// Function to mark lesson as completed and update score
function markLessonCompleted(lessonIndex) {
    if (!userProfile.completedLessons.includes(lessonIndex)) {
        userProfile.completedLessons.push(lessonIndex);
        const pointsEarned = 10; // 10 points per lesson
        userProfile.djScore += pointsEarned;
        const previousPercentage = userProfile.completionPercentage;
        userProfile.completionPercentage = Math.round((userProfile.completedLessons.length / 50) * 100); // 50 total lessons
        
        // Trigger celebration animations
        triggerLessonCompletionCelebration(lessonIndex, pointsEarned);
        
        // Check for milestones and achievements
        checkForAchievements(previousPercentage, userProfile.completionPercentage);
        
        saveUserProfile();
        updateProfileSummary();
        
        // Regenerate the personalized path to show updated completion status
        if (userProfile.personalizedLessons) {
            renderPersonalizedPath(userProfile.personalizedLessons);
        }
    }
}

// Debug function to reset profile completely
function resetProfile() {
    clearUserProfile();
    currentStep = 0;
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById('step-welcome').classList.add('active');
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    hideMainNavigation();
    alert('Profile reset! You can now start fresh.');
}

// Main navigation functions
function showMainNavigation() {
    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
        mainNav.style.display = 'flex';
    }
}

function hideMainNavigation() {
    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
        mainNav.style.display = 'none';
    }
}

function showSection(sectionName) {
    // Hide all main sections
    document.querySelectorAll('.main-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section and activate tab
    if (sectionName === 'learn') {
        document.getElementById('step-lessons').style.display = 'block';
        document.getElementById('learn-tab').classList.add('active');
    } else if (sectionName === 'play') {
        document.getElementById('section-play').style.display = 'block';
        document.getElementById('play-tab').classList.add('active');
    } else if (sectionName === 'perform') {
        document.getElementById('section-perform').style.display = 'block';
        document.getElementById('perform-tab').classList.add('active');
    }
}

// Celebration and Achievement Functions
function triggerLessonCompletionCelebration(lessonIndex, pointsEarned) {
    // Find the lesson step element and apply celebration animation
    const lessonSteps = document.querySelectorAll('.lesson-step');
    const personalizedLessonIndex = userProfile.personalizedLessons?.findIndex(lesson => lesson.lessonIndex === lessonIndex);
    
    if (personalizedLessonIndex !== -1 && lessonSteps[personalizedLessonIndex]) {
        const lessonElement = lessonSteps[personalizedLessonIndex];
        lessonElement.classList.add('just-completed');
        
        // Remove the class after animation
        setTimeout(() => {
            lessonElement.classList.remove('just-completed');
        }, 800);
    }
    
    // Create confetti particles
    createConfetti();
    
    // Show score popup
    showScorePopup(pointsEarned);
    
    // Apply celebration animation to score display
    const scoreElement = document.querySelector('.dj-score-container strong');
    if (scoreElement) {
        scoreElement.classList.add('score-increase');
        setTimeout(() => {
            scoreElement.classList.remove('score-increase');
        }, 600);
    }
}

function createConfetti() {
    const colors = ['#FFD700', '#FF6347', '#32CD32', '#FF69B4', '#00BFFF'];
    const confettiContainer = document.body;
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 2500);
    }
}

function showScorePopup(pointsEarned) {
    const scoreContainer = document.querySelector('.dj-score-container');
    if (scoreContainer) {
        const popup = document.createElement('div');
        popup.className = 'score-popup';
        popup.textContent = `+${pointsEarned}`;
        scoreContainer.appendChild(popup);
        
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 2000);
    }
}

function checkForAchievements(previousPercentage, currentPercentage) {
    const achievements = [
        { threshold: 10, title: "First Steps", icon: "🎵", message: "Completed your first lesson!" },
        { threshold: 25, title: "Getting Warmed Up", icon: "🔥", message: "25% progress - you're on fire!" },
        { threshold: 50, title: "Halfway Hero", icon: "⭐", message: "50% complete - amazing progress!" },
        { threshold: 75, title: "DJ Master", icon: "👑", message: "75% complete - you're becoming a pro!" },
        { threshold: 100, title: "DJ Legend", icon: "🏆", message: "100% complete - you're a legend!" }
    ];
    
    achievements.forEach(achievement => {
        if (previousPercentage < achievement.threshold && currentPercentage >= achievement.threshold) {
            showAchievementNotification(achievement);
            
            // Save achievement to profile
            if (!userProfile.achievements) {
                userProfile.achievements = [];
            }
            
            if (!userProfile.achievements.some(a => a.title === achievement.title)) {
                userProfile.achievements.push({
                    ...achievement,
                    dateEarned: new Date().toISOString()
                });
            }
        }
    });
    
    // Special achievements based on lesson count
    const lessonCount = userProfile.completedLessons.length;
    const specialAchievements = [
        { count: 1, title: "First Lesson", icon: "🎧", message: "Welcome to your DJ journey!" },
        { count: 5, title: "Quick Learner", icon: "⚡", message: "5 lessons completed!" },
        { count: 10, title: "Dedicated Student", icon: "📚", message: "10 lessons mastered!" },
        { count: 20, title: "Skill Builder", icon: "🛠️", message: "20 lessons conquered!" }
    ];
    
    specialAchievements.forEach(achievement => {
        if (lessonCount === achievement.count) {
            showAchievementNotification(achievement);
            
            if (!userProfile.achievements) {
                userProfile.achievements = [];
            }
            
            if (!userProfile.achievements.some(a => a.title === achievement.title)) {
                userProfile.achievements.push({
                    ...achievement,
                    dateEarned: new Date().toISOString()
                });
            }
        }
    });
}

function showAchievementNotification(achievement) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.achievement-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <span class="achievement-icon">${achievement.icon}</span>
        <div>
            <div style="font-size: 16px; margin-bottom: 4px;">${achievement.title}</div>
            <div style="font-size: 14px; opacity: 0.9;">${achievement.message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Enhanced updateProfileSummary with achievement display
function updateProfileSummaryEnhanced() {
    const summaryElement = document.getElementById('profile-summary');
    if (summaryElement && userProfile.completedOnboarding) {
        const skillText = userProfile.skill ? userProfile.skill.replace('-', ' ') : 'any level';
        const genreText = userProfile.genres && userProfile.genres.length > 0 ? 
            userProfile.genres.slice(0, 2).map(g => g.replace('-', ' ')).join(' & ') : 'all genres';
        
        const achievementCount = userProfile.achievements ? userProfile.achievements.length : 0;
        const djName = userProfile.djName || 'DJ Beginner';
        
        summaryElement.innerHTML = `
            <div class="profile-stats">
                <div class="dj-score-container">
                    <span>Welcome back, ${djName}! Personalized for ${skillText} level, focusing on ${genreText}</span>
                </div>
                <div class="stats-row">
                    <span class="stat dj-score-container"><strong>DJ Score:</strong> ${userProfile.djScore} points</span>
                    <span class="stat"><strong>Progress:</strong> ${userProfile.completionPercentage}% complete</span>
                    <span class="stat"><strong>Achievements:</strong> ${achievementCount} earned</span>
                </div>
            </div>
        `;
    }
}

// Override the original updateProfileSummary
function updateProfileSummary() {
    updateProfileSummaryEnhanced();
}

// Demo function to test celebrations (can be removed in production)
function triggerDemoCelebration() {
    triggerLessonCompletionCelebration(0, 10);
    checkForAchievements(0, 25);
}

// Achievement Modal Functions
function showAchievements() {
    const modal = document.getElementById('achievement-modal');
    const achievementsList = document.getElementById('achievements-list');
    
    const allAchievements = getAllPossibleAchievements();
    const userAchievements = userProfile.achievements || [];
    
    let achievementsHTML = '<div class="achievement-grid">';
    
    allAchievements.forEach(achievement => {
        const isEarned = userAchievements.some(ua => ua.title === achievement.title);
        const earnedAchievement = userAchievements.find(ua => ua.title === achievement.title);
        const cardClass = isEarned ? 'achievement-card earned' : 'achievement-card locked';
        const dateText = isEarned ? `Earned: ${formatDate(earnedAchievement.dateEarned)}` : 'Not yet earned';
        
        achievementsHTML += `
            <div class="${cardClass}">
                <span class="achievement-icon-large">${achievement.icon}</span>
                <h3>${achievement.title}</h3>
                <p>${achievement.message}</p>
                <div class="achievement-date">${dateText}</div>
            </div>
        `;
    });
    
    if (userAchievements.length === 0) {
        achievementsHTML = `
            <div class="no-achievements">
                <span class="achievement-icon-large">🏆</span>
                <h3>No achievements yet</h3>
                <p>Complete lessons to earn your first achievement!</p>
            </div>
        `;
    }
    
    achievementsHTML += '</div>';
    achievementsList.innerHTML = achievementsHTML;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeAchievements() {
    const modal = document.getElementById('achievement-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function getAllPossibleAchievements() {
    return [
        // Progress-based achievements
        { threshold: 10, title: "First Steps", icon: "🎵", message: "Completed your first lesson!" },
        { threshold: 25, title: "Getting Warmed Up", icon: "🔥", message: "25% progress - you're on fire!" },
        { threshold: 50, title: "Halfway Hero", icon: "⭐", message: "50% complete - amazing progress!" },
        { threshold: 75, title: "DJ Master", icon: "👑", message: "75% complete - you're becoming a pro!" },
        { threshold: 100, title: "DJ Legend", icon: "🏆", message: "100% complete - you're a legend!" },
        
        // Lesson count achievements
        { count: 1, title: "First Lesson", icon: "🎧", message: "Welcome to your DJ journey!" },
        { count: 5, title: "Quick Learner", icon: "⚡", message: "5 lessons completed!" },
        { count: 10, title: "Dedicated Student", icon: "📚", message: "10 lessons mastered!" },
        { count: 20, title: "Skill Builder", icon: "🛠️", message: "20 lessons conquered!" },
        
        // Special achievements (can be extended)
        { special: true, title: "Early Adopter", icon: "🌟", message: "Joined the TribeXR DJ Academy!" }
    ];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('achievement-modal');
    if (e.target === modal) {
        closeAchievements();
    }
});

// Initialize user with Early Adopter achievement
function initializeEarlyAdopterAchievement() {
    if (!userProfile.achievements) {
        userProfile.achievements = [];
    }
    
    if (!userProfile.achievements.some(a => a.title === "Early Adopter")) {
        userProfile.achievements.push({
            title: "Early Adopter",
            icon: "🌟",
            message: "Joined the TribeXR DJ Academy!",
            dateEarned: new Date().toISOString()
        });
        saveUserProfile();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeApp);