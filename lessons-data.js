const lessons = [
    // Beginner - Counting Beats and Bars
    {
        name: "Introduction to Beats and Bars",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder1"
    },
    {
        name: "Counting 4/4 Time in House Music",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "House",
        rating: 4,
        link: "https://youtube.com/placeholder2"
    },
    {
        name: "Understanding BPM in EDM",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "EDM",
        rating: 5,
        link: "https://youtube.com/placeholder3"
    },
    {
        name: "Techno Rhythm Patterns",
        skill: "Counting Beats",
        difficulty: "Medium",
        equipment: "Any",
        genre: "Techno",
        rating: 4,
        link: "https://youtube.com/placeholder4"
    },
    
    // Beat Matching
    {
        name: "Beat Matching Basics with CDJ-3000",
        skill: "Beat Matching",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://youtube.com/placeholder5"
    },
    {
        name: "Manual Beat Matching on CDJ-2000",
        skill: "Beat Matching",
        difficulty: "Medium",
        equipment: "CDJ-2000",
        genre: "Tech House",
        rating: 4,
        link: "https://youtube.com/placeholder6"
    },
    {
        name: "Beat Matching Hip Hop Tracks",
        skill: "Beat Matching",
        difficulty: "Medium",
        equipment: "DDJ-FLX4",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://youtube.com/placeholder7"
    },
    {
        name: "Advanced Beat Matching with Vinyl",
        skill: "Beat Matching",
        difficulty: "Hard",
        equipment: "Turntables",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder8"
    },
    {
        name: "Beat Grid Analysis in rekordbox",
        skill: "Beat Matching",
        difficulty: "Easy",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 4,
        link: "https://youtube.com/placeholder9"
    },
    
    // EQ Techniques
    {
        name: "EQ Basics on DJM-900NXS2",
        skill: "EQs",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder10"
    },
    {
        name: "Creative EQ Mixing in House",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DJM-900NXS2",
        genre: "House",
        rating: 4,
        link: "https://youtube.com/placeholder11"
    },
    {
        name: "Bass Swapping in Tech House",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DJM-A9",
        genre: "Tech House",
        rating: 5,
        link: "https://youtube.com/placeholder12"
    },
    {
        name: "3-Band EQ Mastery",
        skill: "EQs",
        difficulty: "Hard",
        equipment: "DJM-V10",
        genre: "Techno",
        rating: 5,
        link: "https://youtube.com/placeholder13"
    },
    {
        name: "EQ Transitions for EDM Drops",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DDJ-FLX10",
        genre: "EDM",
        rating: 4,
        link: "https://youtube.com/placeholder14"
    },
    
    // Effects
    {
        name: "Introduction to DJ Effects",
        skill: "Effects",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder15"
    },
    {
        name: "Using Reverb and Delay",
        skill: "Effects",
        difficulty: "Medium",
        equipment: "DJM-900NXS2",
        genre: "House",
        rating: 4,
        link: "https://youtube.com/placeholder16"
    },
    {
        name: "Color FX on Pioneer Mixers",
        skill: "Effects",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder17"
    },
    {
        name: "Beat FX for Techno",
        skill: "Effects",
        difficulty: "Hard",
        equipment: "DJM-V10",
        genre: "Techno",
        rating: 4,
        link: "https://youtube.com/placeholder18"
    },
    {
        name: "Creative Filter Use in EDM",
        skill: "Effects",
        difficulty: "Medium",
        equipment: "DDJ-FLX6",
        genre: "EDM",
        rating: 5,
        link: "https://youtube.com/placeholder19"
    },
    
    // Scratching
    {
        name: "Baby Scratch Fundamentals",
        skill: "Scratching",
        difficulty: "Easy",
        equipment: "Turntables",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://youtube.com/placeholder20"
    },
    {
        name: "Chirp Scratch Technique",
        skill: "Scratching",
        difficulty: "Medium",
        equipment: "DDJ-REV7",
        genre: "Hip Hop / R&B",
        rating: 4,
        link: "https://youtube.com/placeholder21"
    },
    {
        name: "Transform Scratch Mastery",
        skill: "Scratching",
        difficulty: "Hard",
        equipment: "DDJ-REV7",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://youtube.com/placeholder22"
    },
    {
        name: "Scratch Patterns for EDM",
        skill: "Scratching",
        difficulty: "Medium",
        equipment: "DDJ-SX3",
        genre: "EDM",
        rating: 4,
        link: "https://youtube.com/placeholder23"
    },
    
    // Mixing Techniques
    {
        name: "Smooth Transitions in House",
        skill: "Mixing",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://youtube.com/placeholder24"
    },
    {
        name: "Energy Building in Tech House",
        skill: "Mixing",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "Tech House",
        rating: 5,
        link: "https://youtube.com/placeholder25"
    },
    {
        name: "Harmonic Mixing Basics",
        skill: "Mixing",
        difficulty: "Medium",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder26"
    },
    {
        name: "Long Blend Techno Mixing",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "Techno",
        rating: 4,
        link: "https://youtube.com/placeholder27"
    },
    {
        name: "Quick Mix Techniques for Commercial",
        skill: "Mixing",
        difficulty: "Easy",
        equipment: "DDJ-FLX4",
        genre: "Commercial",
        rating: 4,
        link: "https://youtube.com/placeholder28"
    },
    
    // Loop and Cue Points
    {
        name: "Setting Hot Cues Effectively",
        skill: "Cue Points",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder29"
    },
    {
        name: "Loop Roll Techniques",
        skill: "Loops",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "EDM",
        rating: 4,
        link: "https://youtube.com/placeholder30"
    },
    {
        name: "Creative Looping in Techno",
        skill: "Loops",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "Techno",
        rating: 5,
        link: "https://youtube.com/placeholder31"
    },
    
    // Performance Techniques
    {
        name: "Reading the Crowd",
        skill: "Performance",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder32"
    },
    {
        name: "Building a DJ Set Structure",
        skill: "Performance",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder33"
    },
    {
        name: "Peak Time Energy Management",
        skill: "Performance",
        difficulty: "Hard",
        equipment: "Any",
        genre: "House",
        rating: 4,
        link: "https://youtube.com/placeholder34"
    },
    
    // Equipment Specific
    {
        name: "DDJ-FLX4 Complete Guide",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "DDJ-FLX4",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder35"
    },
    {
        name: "CDJ-3000 Advanced Features",
        skill: "Equipment",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder36"
    },
    {
        name: "DJM-A9 Mixer Deep Dive",
        skill: "Equipment",
        difficulty: "Medium",
        equipment: "DJM-A9",
        genre: "All Genres",
        rating: 4,
        link: "https://youtube.com/placeholder37"
    },
    {
        name: "XDJ-XZ All-in-One Setup",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "XDJ-XZ",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder38"
    },
    
    // Software
    {
        name: "rekordbox DJ Basics",
        skill: "Software",
        difficulty: "Easy",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder39"
    },
    {
        name: "Serato DJ Pro Fundamentals",
        skill: "Software",
        difficulty: "Easy",
        equipment: "Serato",
        genre: "All Genres",
        rating: 4,
        link: "https://youtube.com/placeholder40"
    },
    {
        name: "Track Analysis and Preparation",
        skill: "Software",
        difficulty: "Medium",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder41"
    },
    
    // Genre Specific Advanced
    {
        name: "Deep House Journey Building",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://youtube.com/placeholder42"
    },
    {
        name: "Techno Layering Techniques",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "Model 1 Mixer",
        genre: "Techno",
        rating: 5,
        link: "https://youtube.com/placeholder43"
    },
    {
        name: "Hip Hop Turntablism",
        skill: "Scratching",
        difficulty: "Hard",
        equipment: "Turntables",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://youtube.com/placeholder44"
    },
    {
        name: "EDM Festival Mixing",
        skill: "Performance",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "EDM",
        rating: 4,
        link: "https://youtube.com/placeholder45"
    },
    
    // Business and Career
    {
        name: "Building Your DJ Brand",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder46"
    },
    {
        name: "Social Media for DJs",
        skill: "Business",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 4,
        link: "https://youtube.com/placeholder47"
    },
    {
        name: "Getting Your First Gigs",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder48"
    },
    {
        name: "DJ Contracts and Riders",
        skill: "Business",
        difficulty: "Hard",
        equipment: "Any",
        genre: "All Genres",
        rating: 4,
        link: "https://youtube.com/placeholder49"
    },
    {
        name: "Recording and Streaming Sets",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://youtube.com/placeholder50"
    }
];