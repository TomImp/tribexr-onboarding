let currentStep = 0;
const steps = ['welcome', 'skill', 'genre', 'goals', 'frequency', 'lessons'];
let userProfile = {
    skill: null,
    genres: [],
    goals: null,
    frequency: null,
    personalizedLessons: [],
    completedOnboarding: false
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
                duration: '5 mins'
            },
            {
                title: 'Understanding DJ Equipment',
                description: 'Learn about CDJs, mixers, and controllers',
                type: 'Interactive Lesson',
                difficulty: 'easy',
                duration: '15 mins'
            },
            {
                title: 'Counting Beats and Bars',
                description: 'Master the foundation of music structure',
                type: 'Practice Exercise',
                difficulty: 'easy',
                duration: '20 mins'
            }
        ];
    } else if (userProfile.skill === 'intermediate') {
        lessonFlow = [
            {
                title: 'Advanced Beat Matching',
                description: 'Perfect your timing and transitions',
                type: 'Practice Exercise',
                difficulty: 'medium',
                duration: '25 mins'
            },
            {
                title: 'EQ Mastery',
                description: 'Learn to blend tracks seamlessly',
                type: 'Interactive Lesson',
                difficulty: 'medium',
                duration: '20 mins'
            },
            {
                title: 'Creating Your First Mix',
                description: 'Put it all together in a mini set',
                type: 'Project',
                difficulty: 'medium',
                duration: '30 mins'
            }
        ];
    } else {
        lessonFlow = [
            {
                title: 'Advanced Mixing Techniques',
                description: 'Harmonic mixing and creative transitions',
                type: 'Masterclass',
                difficulty: 'hard',
                duration: '30 mins'
            },
            {
                title: 'Performance Psychology',
                description: 'Reading the crowd and building energy',
                type: 'Video Tutorial',
                difficulty: 'hard',
                duration: '25 mins'
            },
            {
                title: 'Live Performance Workshop',
                description: 'Prepare for your next gig',
                type: 'Workshop',
                difficulty: 'hard',
                duration: '45 mins'
            }
        ];
    }
    
    if (userProfile.goals === 'become-pro') {
        lessonFlow.push({
            title: 'Building Your DJ Brand',
            description: 'Marketing and networking for DJs',
            type: 'Career Guide',
            difficulty: 'medium',
            duration: '20 mins'
        });
    }
    
    let pathHTML = '';
    lessonFlow.forEach((lesson, index) => {
        const difficultyClass = lesson.difficulty;
        pathHTML += `
            <div class="lesson-step">
                <div class="step-number">${index + 1}</div>
                <div class="lesson-info">
                    <h4>${lesson.title}</h4>
                    <p>${lesson.description}</p>
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
        pathHTML += `
            <div class="lesson-step">
                <div class="step-number">${index + 1}</div>
                <div class="lesson-info">
                    <h4>${lesson.title}</h4>
                    <p>${lesson.description}</p>
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
    
    lessons.forEach((lesson, index) => {
        const difficultyDots = createDifficultyIndicator(lesson.difficulty);
        const ratingStars = createRatingStars(lesson.rating);
        
        tableHTML += `
            <tr>
                <td>${lesson.name}</td>
                <td><span class="skill-badge">${lesson.skill}</span></td>
                <td>${difficultyDots}</td>
                <td>${lesson.equipment}</td>
                <td>${lesson.genre}</td>
                <td><div class="rating">${ratingStars}</div></td>
                <td><button class="btn-small" onclick="openLesson(${index})">Start</button></td>
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

function createRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star">${i <= rating ? '★' : '☆'}</span>`;
    }
    return stars;
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
    
    let tableHTML = '';
    filteredLessons.forEach(lesson => {
        const originalIndex = lessons.indexOf(lesson);
        const difficultyDots = createDifficultyIndicator(lesson.difficulty);
        const ratingStars = createRatingStars(lesson.rating);
        
        tableHTML += `
            <tr>
                <td>${lesson.name}</td>
                <td><span class="skill-badge">${lesson.skill}</span></td>
                <td>${difficultyDots}</td>
                <td>${lesson.equipment}</td>
                <td>${lesson.genre}</td>
                <td><div class="rating">${ratingStars}</div></td>
                <td><button class="btn-small" onclick="openLesson(${originalIndex})">Start</button></td>
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
    window.open(`lesson-viewer.html?lesson=${lessonIndex}`, '_blank');
}

// Initialize app on page load
function initializeApp() {
    const hasProfile = loadUserProfile();
    
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
    
• Experience Level: ${userProfile.skill ? userProfile.skill.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
• Music Genres: ${userProfile.genres && userProfile.genres.length > 0 ? userProfile.genres.map(g => g.replace('-', ' ')).join(', ') : 'Not set'}
• Goals: ${userProfile.goals ? userProfile.goals.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}
• Practice Frequency: ${userProfile.frequency ? userProfile.frequency.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not set'}`;

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
        
        summaryElement.textContent = `Personalized for ${skillText} level, focusing on ${genreText}`;
    }
}

// Debug function to reset profile completely
function resetProfile() {
    clearUserProfile();
    currentStep = 0;
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById('step-welcome').classList.add('active');
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    alert('Profile reset! You can now start fresh.');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeApp);