const lessons = [
    // Beginner - Counting Beats and Bars
    {
        name: "Introduction to Beats and Bars",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=sTSA_sWGM44"
    },
    {
        name: "Counting 4/4 Time in House Music",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=lDK9QqIzhwk"
    },
    {
        name: "Understanding BPM in EDM",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "EDM",
        rating: 5,
        link: "https://www.youtube.com/watch?v=Wga5A6R9BJg"
    },
    {
        name: "Techno Rhythm Patterns",
        skill: "Counting Beats",
        difficulty: "Medium",
        equipment: "Any",
        genre: "Techno",
        rating: 4,
        link: "https://www.youtube.com/watch?v=2_-AiYz5VQU"
    },
    
    // Beat Matching
    {
        name: "Beat Matching Basics with CDJ-3000",
        skill: "Beat Matching",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ"
    },
    {
        name: "Manual Beat Matching on CDJ-2000",
        skill: "Beat Matching",
        difficulty: "Medium",
        equipment: "CDJ-2000",
        genre: "Tech House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=6p0DAz_30qQ"
    },
    {
        name: "Beat Matching Hip Hop Tracks",
        skill: "Beat Matching",
        difficulty: "Medium",
        equipment: "DDJ-FLX4",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=ZNlXhEO2lM8"
    },
    {
        name: "Advanced Beat Matching with Vinyl",
        skill: "Beat Matching",
        difficulty: "Hard",
        equipment: "Turntables",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=Cvjz2_dFbmE"
    },
    {
        name: "Beat Grid Analysis in rekordbox",
        skill: "Beat Matching",
        difficulty: "Easy",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=eqFZ5l3PIWA"
    },
    
    // EQ Techniques
    {
        name: "EQ Basics on DJM-900NXS2",
        skill: "EQs",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=QEK7zj_QXz8"
    },
    {
        name: "Creative EQ Mixing in House",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DJM-900NXS2",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=NVHdPMIr6ak"
    },
    {
        name: "Bass Swapping in Tech House",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DJM-A9",
        genre: "Tech House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=fILMfnH_6fQ"
    },
    {
        name: "3-Band EQ Mastery",
        skill: "EQs",
        difficulty: "Hard",
        equipment: "DJM-V10",
        genre: "Techno",
        rating: 5,
        link: "https://www.youtube.com/watch?v=0-2Uo8g61lE"
    },
    {
        name: "EQ Transitions for EDM Drops",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DDJ-FLX10",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=m10KBeYFNsE"
    },
    
    // Effects
    {
        name: "Introduction to DJ Effects",
        skill: "Effects",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=yYqJ6Jow3is"
    },
    {
        name: "Using Reverb and Delay",
        skill: "Effects",
        difficulty: "Medium",
        equipment: "DJM-900NXS2",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=Y0i5_h4pMxc"
    },
    {
        name: "Color FX on Pioneer Mixers",
        skill: "Effects",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=3rKhunJ1aM8"
    },
    {
        name: "Beat FX for Techno",
        skill: "Effects",
        difficulty: "Hard",
        equipment: "DJM-V10",
        genre: "Techno",
        rating: 4,
        link: "https://www.youtube.com/watch?v=1zXuX_XpKp8"
    },
    {
        name: "Creative Filter Use in EDM",
        skill: "Effects",
        difficulty: "Medium",
        equipment: "DDJ-FLX6",
        genre: "EDM",
        rating: 5,
        link: "https://www.youtube.com/watch?v=aRsWk4JZa5k"
    },
    
    // Scratching
    {
        name: "Baby Scratch Fundamentals",
        skill: "Scratching",
        difficulty: "Easy",
        equipment: "Turntables",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=C7KyBu15ZGk"
    },
    {
        name: "Chirp Scratch Technique",
        skill: "Scratching",
        difficulty: "Medium",
        equipment: "DDJ-REV7",
        genre: "Hip Hop / R&B",
        rating: 4,
        link: "https://www.youtube.com/watch?v=t9vLv0CYgQY"
    },
    {
        name: "Transform Scratch Mastery",
        skill: "Scratching",
        difficulty: "Hard",
        equipment: "DDJ-REV7",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=SFe7_RrVKGc"
    },
    {
        name: "Scratch Patterns for EDM",
        skill: "Scratching",
        difficulty: "Medium",
        equipment: "DDJ-SX3",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=7KXjzB5J4oE"
    },
    
    // Mixing Techniques
    {
        name: "Smooth Transitions in House",
        skill: "Mixing",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=qJIF6YeMhQE"
    },
    {
        name: "Energy Building in Tech House",
        skill: "Mixing",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "Tech House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=QwYKQ9I4Uv0"
    },
    {
        name: "Harmonic Mixing Basics",
        skill: "Mixing",
        difficulty: "Medium",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=gvMTcvgTZFs"
    },
    {
        name: "Long Blend Techno Mixing",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "Techno",
        rating: 4,
        link: "https://www.youtube.com/watch?v=2_-AiYz5VQU"
    },
    {
        name: "Quick Mix Techniques for Commercial",
        skill: "Mixing",
        difficulty: "Easy",
        equipment: "DDJ-FLX4",
        genre: "Commercial",
        rating: 4,
        link: "https://www.youtube.com/watch?v=vW21KiHSRCo"
    },
    
    // Loop and Cue Points
    {
        name: "Setting Hot Cues Effectively",
        skill: "Cue Points",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=N0MrHczj-0I"
    },
    {
        name: "Loop Roll Techniques",
        skill: "Loops",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=X1Hi6d4edz8"
    },
    {
        name: "Creative Looping in Techno",
        skill: "Loops",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "Techno",
        rating: 5,
        link: "https://www.youtube.com/watch?v=7vTzWbK-VKo"
    },
    
    // Performance Techniques
    {
        name: "Reading the Crowd",
        skill: "Performance",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=KhfDbTI4BqM"
    },
    {
        name: "Building a DJ Set Structure",
        skill: "Performance",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=9x2NaGkl6BI"
    },
    {
        name: "Peak Time Energy Management",
        skill: "Performance",
        difficulty: "Hard",
        equipment: "Any",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=9iHW7Sg1vdQ"
    },
    
    // Equipment Specific
    {
        name: "DDJ-FLX4 Complete Guide",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "DDJ-FLX4",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=vCadcBR95oU"
    },
    {
        name: "CDJ-3000 Advanced Features",
        skill: "Equipment",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=P7hi6ajAhJg"
    },
    {
        name: "DJM-A9 Mixer Deep Dive",
        skill: "Equipment",
        difficulty: "Medium",
        equipment: "DJM-A9",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=CfihYWRWRTg"
    },
    {
        name: "XDJ-XZ All-in-One Setup",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "XDJ-XZ",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=T7QCSJJbv1g"
    },
    
    // Software
    {
        name: "rekordbox DJ Basics",
        skill: "Software",
        difficulty: "Easy",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=XsFneCExKlc"
    },
    {
        name: "Serato DJ Pro Fundamentals",
        skill: "Software",
        difficulty: "Easy",
        equipment: "Serato",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=h5X4DUwggOE"
    },
    {
        name: "Track Analysis and Preparation",
        skill: "Software",
        difficulty: "Medium",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=W8r-tXRLazs"
    },
    
    // Genre Specific Advanced
    {
        name: "Deep House Journey Building",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=0OTGkNTqJP8"
    },
    {
        name: "Techno Layering Techniques",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "Model 1 Mixer",
        genre: "Techno",
        rating: 5,
        link: "https://www.youtube.com/watch?v=7nJRGARveVc"
    },
    {
        name: "Hip Hop Turntablism",
        skill: "Scratching",
        difficulty: "Hard",
        equipment: "Turntables",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=3rQvblU3w4w"
    },
    {
        name: "EDM Festival Mixing",
        skill: "Performance",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=hJdh5rg4X3s"
    },
    
    // Business and Career
    {
        name: "Building Your DJ Brand",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=I2r_qjQgGxI"
    },
    {
        name: "Social Media for DJs",
        skill: "Business",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=0mW2xDKzWQI"
    },
    {
        name: "Getting Your First Gigs",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=yRjKQgLFFT8"
    },
    {
        name: "DJ Contracts and Riders",
        skill: "Business",
        difficulty: "Hard",
        equipment: "Any",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=nL9VdJ0rSgc"
    },
    {
        name: "Recording and Streaming Sets",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=L3wKzyIN1yk"
    }
];