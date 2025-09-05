const lessons = [
    // Welcome to DJing
    {
        name: "Welcome to DJing",
        skill: "Introduction",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=huU40BIH2lA"
    },
    {
        name: "Understanding DJ Equipment",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=MXw4DnEJYLI"
    },
    // Beginner - Counting Beats and Bars
    {
        name: "Introduction to Beats and Bars",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=ZqGUt1U8gPo"
    },
    {
        name: "Counting 4/4 Time in House Music",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=P2s2dxhpcd4"
    },
    {
        name: "Understanding BPM in EDM",
        skill: "Counting Beats",
        difficulty: "Easy",
        equipment: "Any",
        genre: "EDM",
        rating: 5,
        link: "https://www.youtube.com/watch?v=PfNkgcbOyPk"
    },
    {
        name: "Techno Rhythm Patterns",
        skill: "Counting Beats",
        difficulty: "Medium",
        equipment: "Any",
        genre: "Techno",
        rating: 4,
        link: "https://www.youtube.com/watch?v=g47xmHiQg4"
    },
    
    // Beat Matching
    {
        name: "Beat Matching Basics with CDJ-3000",
        skill: "Beat Matching",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=PVYy5ipshe8"
    },
    {
        name: "Manual Beat Matching on CDJ-2000",
        skill: "Beat Matching",
        difficulty: "Medium",
        equipment: "CDJ-2000",
        genre: "Tech House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=Mnp8hQElYp8"
    },
    {
        name: "Beat Matching Hip Hop Tracks",
        skill: "Beat Matching",
        difficulty: "Medium",
        equipment: "DDJ-FLX4",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=M9a6tTPFEqw"
    },
    {
        name: "Advanced Beat Matching with Vinyl",
        skill: "Beat Matching",
        difficulty: "Hard",
        equipment: "Turntables",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=IPMaEb_CBLU"
    },
    {
        name: "Beat Grid Analysis in rekordbox",
        skill: "Beat Matching",
        difficulty: "Easy",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=tFXw5FL6P7o"
    },
    
    // EQ Techniques
    {
        name: "EQ Basics on DJM-900NXS2",
        skill: "EQs",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=J-_j3-YsCN0"
    },
    {
        name: "Creative EQ Mixing in House",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DJM-900NXS2",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=tHNiVCqHvj4"
    },
    {
        name: "Bass Swapping in Tech House",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DJM-A9",
        genre: "Tech House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=Dmb5GmLkbrY"
    },
    {
        name: "3-Band EQ Mastery",
        skill: "EQs",
        difficulty: "Hard",
        equipment: "DJM-V10",
        genre: "Techno",
        rating: 5,
        link: "https://www.youtube.com/watch?v=1xhTHnSnnyg"
    },
    {
        name: "EQ Transitions for EDM Drops",
        skill: "EQs",
        difficulty: "Medium",
        equipment: "DDJ-FLX10",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=s2QCwH4m4no"
    },
    
    // Effects
    {
        name: "Introduction to DJ Effects",
        skill: "Effects",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=IJ2YnIR9wp4"
    },
    {
        name: "Using Reverb and Delay",
        skill: "Effects",
        difficulty: "Medium",
        equipment: "DJM-900NXS2",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=FhjEEMJO9a0"
    },
    {
        name: "Color FX on Pioneer Mixers",
        skill: "Effects",
        difficulty: "Easy",
        equipment: "DJM-900NXS2",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=h_JlrW9QkRI"
    },
    {
        name: "Beat FX for Techno",
        skill: "Effects",
        difficulty: "Hard",
        equipment: "DJM-V10",
        genre: "Techno",
        rating: 4,
        link: "https://www.youtube.com/watch?v=Cl84tMA_FeU"
    },
    {
        name: "Creative Filter Use in EDM",
        skill: "Effects",
        difficulty: "Medium",
        equipment: "DDJ-FLX6",
        genre: "EDM",
        rating: 5,
        link: "https://www.youtube.com/watch?v=iIojtzbuPM4"
    },
    
    // Scratching
    {
        name: "Baby Scratch Fundamentals",
        skill: "Scratching",
        difficulty: "Easy",
        equipment: "Turntables",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=GwRKdXImmYo"
    },
    {
        name: "Chirp Scratch Technique",
        skill: "Scratching",
        difficulty: "Medium",
        equipment: "DDJ-REV7",
        genre: "Hip Hop / R&B",
        rating: 4,
        link: "https://www.youtube.com/watch?v=8FMoLxADxZk"
    },
    {
        name: "Transform Scratch Mastery",
        skill: "Scratching",
        difficulty: "Hard",
        equipment: "DDJ-REV7",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=2lWStxRZP3A"
    },
    {
        name: "Scratch Patterns for EDM",
        skill: "Scratching",
        difficulty: "Medium",
        equipment: "DDJ-SX3",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=mbjL3rIxeLo"
    },
    
    // Mixing Techniques
    {
        name: "Smooth Transitions in House",
        skill: "Mixing",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=CTiFony36zs"
    },
    {
        name: "Energy Building in Tech House",
        skill: "Mixing",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "Tech House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=svCiiP_bROA"
    },
    {
        name: "Harmonic Mixing Basics",
        skill: "Mixing",
        difficulty: "Medium",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=gHnWc06EA10"
    },
    {
        name: "Long Blend Techno Mixing",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "Techno",
        rating: 4,
        link: "https://www.youtube.com/watch?v=22XjZKJS69E"
    },
    {
        name: "Quick Mix Techniques for Commercial",
        skill: "Mixing",
        difficulty: "Easy",
        equipment: "DDJ-FLX4",
        genre: "Commercial",
        rating: 4,
        link: "https://www.youtube.com/watch?v=9bCCFLOpwOs"
    },
    
    // Loop and Cue Points
    {
        name: "Setting Hot Cues Effectively",
        skill: "Cue Points",
        difficulty: "Easy",
        equipment: "CDJ-3000",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=TwvquKO7ytw"
    },
    {
        name: "Loop Roll Techniques",
        skill: "Loops",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=m6oiL4L-HnM"
    },
    {
        name: "Creative Looping in Techno",
        skill: "Loops",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "Techno",
        rating: 5,
        link: "https://www.youtube.com/watch?v=sa4hGzYdHwM"
    },
    
    // Performance Techniques
    {
        name: "Reading the Crowd",
        skill: "Performance",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=xi-X2lE6EqQ"
    },
    {
        name: "Building a DJ Set Structure",
        skill: "Performance",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=hjkTkb-_7mQ"
    },
    {
        name: "Peak Time Energy Management",
        skill: "Performance",
        difficulty: "Hard",
        equipment: "Any",
        genre: "House",
        rating: 4,
        link: "https://www.youtube.com/watch?v=leNKbsS9TVM"
    },
    
    // Equipment Specific
    {
        name: "DDJ-FLX4 Complete Guide",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "DDJ-FLX4",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=KViP_3jpcfw"
    },
    {
        name: "CDJ-3000 Advanced Features",
        skill: "Equipment",
        difficulty: "Medium",
        equipment: "CDJ-3000",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=EF7p8X8act0"
    },
    {
        name: "DJM-A9 Mixer Deep Dive",
        skill: "Equipment",
        difficulty: "Medium",
        equipment: "DJM-A9",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=5qtiHGjTa8M"
    },
    {
        name: "XDJ-XZ All-in-One Setup",
        skill: "Equipment",
        difficulty: "Easy",
        equipment: "XDJ-XZ",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=5Kvs4IM2zEU"
    },
    
    // Software
    {
        name: "rekordbox DJ Basics",
        skill: "Software",
        difficulty: "Easy",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=OqBw8LM8H4w"
    },
    {
        name: "Serato DJ Pro Fundamentals",
        skill: "Software",
        difficulty: "Easy",
        equipment: "Serato",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=7L2TilBwpjE"
    },
    {
        name: "Track Analysis and Preparation",
        skill: "Software",
        difficulty: "Medium",
        equipment: "rekordbox",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=PH3glx97IGI"
    },
    
    // Genre Specific Advanced
    {
        name: "Deep House Journey Building",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "House",
        rating: 5,
        link: "https://www.youtube.com/watch?v=2wrFSje4S1Y"
    },
    {
        name: "Techno Layering Techniques",
        skill: "Mixing",
        difficulty: "Hard",
        equipment: "Model 1 Mixer",
        genre: "Techno",
        rating: 5,
        link: "https://www.youtube.com/watch?v=RlVtyYqga-c"
    },
    {
        name: "Hip Hop Turntablism",
        skill: "Scratching",
        difficulty: "Hard",
        equipment: "Turntables",
        genre: "Hip Hop / R&B",
        rating: 5,
        link: "https://www.youtube.com/watch?v=p8HWriRwyoo"
    },
    {
        name: "EDM Festival Mixing",
        skill: "Performance",
        difficulty: "Hard",
        equipment: "CDJ-3000",
        genre: "EDM",
        rating: 4,
        link: "https://www.youtube.com/watch?v=0KjfKBO3zAg"
    },
    
    // Business and Career
    {
        name: "Building Your DJ Brand",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=fAH0GMYwY1M"
    },
    {
        name: "Social Media for DJs",
        skill: "Business",
        difficulty: "Easy",
        equipment: "Any",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=tYAm0TV9XxA"
    },
    {
        name: "Getting Your First Gigs",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=ffPQPMtvz8c"
    },
    {
        name: "DJ Contracts and Riders",
        skill: "Business",
        difficulty: "Hard",
        equipment: "Any",
        genre: "All Genres",
        rating: 4,
        link: "https://www.youtube.com/watch?v=n2wqARCauoE"
    },
    {
        name: "Recording and Streaming Sets",
        skill: "Business",
        difficulty: "Medium",
        equipment: "Any",
        genre: "All Genres",
        rating: 5,
        link: "https://www.youtube.com/watch?v=oYqCcmanzzI"
    }
];