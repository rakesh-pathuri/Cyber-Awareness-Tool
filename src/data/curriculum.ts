export type SlideType = 'visual' | 'simulation';

export interface SlideData {
  id: string;
  type: SlideType;
  title: string;
  content?: string;
  componentId?: string;
}

export interface CurriculumItem {
  id: string;
  title: string;
  duration?: string;
  content: {
    start?: string[];
    teach?: string[];
    discuss?: string[];
    activity?: string[];
    goldenRule?: string[];
    explain?: string[];
    show?: string[];
    questions?: string[];
  };
  simulationDescription: string;
  slides: SlideData[];
}

export const curriculum: CurriculumItem[] = [
  {
    id: 'module-0',
    title: '0. Introduction to Cybersecurity',
    duration: '10 min',
    content: {
      start: [
        '"Cybersecurity is like locking your house, but for your phone, computer, and online accounts."'
      ],
      teach: [
        'The Three Pillars: Keep your data Secret (Privacy), keep it Accurate (Integrity), and keep it Online (Availability).',
        'Your Digital Identity: Explain that their online identity (gaming accounts, social media profiles, location data) is highly valuable to scammers.',
        'The Threat: Attackers don\'t just want your money; they want to use your trusted profile to trick your friends and family.',
        'Types of Hackers: Explain the difference between Black Hat (malicious attackers), White Hat (ethical hackers who help secure systems), and Grey Hat hackers.'
      ],
      discuss: [
        'Ask the class: "What would happen if you lost access to your main email or gaming account right now? How would it affect your day?"'
      ]
    },
    simulationDescription: 'A brief, visual introduction to protecting your digital life.',
    slides: [
      {
        id: 'm0-s1',
        type: 'visual',
        title: 'What is Cybersecurity?',
        content: 'It is the practice of locking your digital doors. Just like you wouldn\'t leave your front door wide open, you shouldn\'t leave your phone, social media, or gaming accounts unprotected.'
      },
      {
        id: 'm0-s2',
        type: 'visual',
        title: 'You Are a Target',
        content: 'Hackers want your accounts. Even if you have no money, your trusted social media profile can be used to launch scams against your friends and family.'
      },
      {
        id: 'm0-s3',
        type: 'visual',
        title: 'Types of Hackers',
        content: 'Not all hackers are bad!\n• Black Hat: Malicious attackers who steal and destroy.\n• White Hat: Ethical hackers who help secure systems.\n• Grey Hat: Those who hack without permission but usually without malicious intent.'
      }
    ]
  },
  {
    id: 'module-1',
    title: '1. Password Security',
    duration: '15 min',
    content: {
      teach: [
        'The Guessing Game: Explain that hackers use supercomputers to guess thousands of passwords per second. "123456" and "password" are cracked instantly.',
        'The Power of Length: Explain why a long phrase made of normal words is actually much harder for a computer to guess than a short password with crazy symbols.',
        'No Reusing: Explain that if a gaming website gets hacked, the attackers will immediately try your password on your Instagram and email.',
        'Password Managers: Introduce them as digital vaults that remember the hard stuff for you.'
      ],
      goldenRule: [
        'Length defeats complexity! A 4-word passphrase (like Purple-Cat-Runs-Fast) is vastly superior to a short, complex password.'
      ]
    },
    simulationDescription: 'Interactive password strength meter utilizing cracking estimations.',
    slides: [
      {
        id: 'm1-s1',
        type: 'visual',
        title: 'The Problem with "123456"',
        content: 'Hackers don\'t sit at a keyboard guessing passwords. They use automated programs that can test millions of common passwords every second.'
      },
      {
        id: 'm1-s2',
        type: 'visual',
        title: 'Length vs. Complexity',
        content: 'A long Passphrase (like "Purple-Cat-Runs-Over-Clouds") is mathematically much harder for a computer to crack than a short complex password (like "P@ssw0rd!").'
      },
      {
        id: 'm1-s3',
        type: 'simulation',
        title: 'Password Strength Simulator',
        componentId: 'PasswordSimulator'
      }
    ]
  },
  {
    id: 'module-2',
    title: '2. Phishing',
    duration: '20 min',
    content: {
      teach: [
        'The Mind Game: Explain that phishing relies on fear, urgency, or extreme excitement (like winning a fake giveaway) to make you stop thinking critically.',
        'Targeted Scams: Explain how scammers look at your public social media to craft highly believable, personalized messages.',
        'The Verification Rule: Teach them to always check the sender\'s true email address and hover over links to see where they really go.'
      ],
      explain: [
        'Two-Factor Authentication (2FA) is your ultimate safety net. Even if you fall for a scam and give away your password, 2FA can stop the attacker.'
      ]
    },
    simulationDescription: 'Interactive fake email client requiring users to identify red flags.',
    slides: [
      {
        id: 'm2-s1',
        type: 'visual',
        title: 'The Human Exploit',
        content: 'Phishing tricks your brain, not your computer. Scammers manufacture extreme urgency ("Your account will be deleted!") or extreme excitement ("You won an iPhone!") to make you click without thinking.'
      },
      {
        id: 'm2-s2',
        type: 'visual',
        title: 'Spotting the Fakes',
        content: 'Never trust the Display Name. Always verify the actual email address. Always hover over a link to see its true destination before clicking it.'
      },
      {
        id: 'm2-s3',
        type: 'simulation',
        title: 'Phishing Inbox Simulator',
        componentId: 'PhishingSimulator'
      }
    ]
  },
  {
    id: 'module-3',
    title: '3. Fake Login Portals',
    duration: '15 min',
    content: {
      teach: [
        'The Padlock Myth: Explain that the little padlock icon next to a website URL only means your connection is private. It DOES NOT mean the website is safe or real.',
        'Look-alike Domains: Show how attackers use typos (like instargam.com) to trick users into typing their passwords into fake sites.',
        'The Theft: Explain that hitting "Login" on a fake site simply sends your username and password straight to the scammer.'
      ]
    },
    simulationDescription: 'Pixel-perfect replication of major login portals demonstrating credential interception.',
    slides: [
      {
        id: 'm3-s1',
        type: 'visual',
        title: 'The Padlock Myth',
        content: 'The padlock icon only means your connection is encrypted so nobody can spy on you. It does NOT guarantee that the website itself is trustworthy or safe.'
      },
      {
        id: 'm3-s2',
        type: 'visual',
        title: 'Look-alike Domains',
        content: 'Scammers build fake login screens that look perfectly real. Always check the web address carefully for sneaky typos (like "g00gle.com" instead of "google.com").'
      },
      {
        id: 'm3-s3',
        type: 'simulation',
        title: 'Credential Theft Simulator',
        componentId: 'FakeLoginSimulator'
      }
    ]
  },
  {
    id: 'module-4',
    title: '4. Ransomware Simulator',
    duration: '15 min',
    content: {
      teach: [
        'Digital Extortion: Explain ransomware as a digital lock that scrambles all your photos, homework, and games until you pay a ransom.',
        'How it Spreads: It usually comes from sketchy downloads, cracked games, or bad email attachments.',
        'The Ultimate Defense: Backups! If you have your important files saved somewhere else (like the cloud or a disconnected hard drive), a ransomware attack is just a minor inconvenience.'
      ]
    },
    simulationDescription: 'Visual demonstration of file encryption and extortion messaging.',
    slides: [
      {
        id: 'm4-s1',
        type: 'visual',
        title: 'Digital Extortion',
        content: 'Ransomware is a virus that acts like a digital padlock. It scrambles every photo, game, and file on your computer and demands money to unlock them.'
      },
      {
        id: 'm4-s2',
        type: 'visual',
        title: 'The Ultimate Defense: Backups',
        content: 'If you have copies of your important files saved in the cloud or on an unplugged USB drive, ransomware loses its power over you.'
      },
      {
        id: 'm4-s3',
        type: 'simulation',
        title: 'Ransomware Simulator',
        componentId: 'RansomwareSimulator'
      }
    ]
  },
  {
    id: 'module-5',
    title: '5. Spyware & Permissions',
    duration: '15 min',
    content: {
      teach: [
        'Hidden Spies: Explain that spyware secretly monitors what you type, watches your screen, and listens to your microphone.',
        'App Permissions: Ask the class why a simple Flashlight app or Calculator would ever need permission to access their contacts, location, and microphone.',
        'Taking Control: Teach students to check their phone settings and turn off unnecessary permissions for random apps.'
      ]
    },
    simulationDescription: 'Simulated dashboard displaying live, unauthorized data extraction (camera, clipboard, keystrokes).',
    slides: [
      {
        id: 'm5-s1',
        type: 'visual',
        title: 'Hidden Spies',
        content: 'Spyware runs invisibly in the background. It can record your keystrokes, track your location, and even quietly turn on your microphone or camera.'
      },
      {
        id: 'm5-s2',
        type: 'visual',
        title: 'The Permission Exploit',
        content: 'Why does a simple Flashlight app need permission to access your Location and Microphone? Always think critically before hitting "Allow" on app permissions.'
      },
      {
        id: 'm5-s3',
        type: 'simulation',
        title: 'Spyware Extraction Dashboard',
        componentId: 'SpywareSimulator'
      }
    ]
  },
  {
    id: 'module-6',
    title: '6. Safe Browsing',
    duration: '15 min',
    content: {
      teach: [
        'The Dangers of "Free": Explain that downloading pirated movies or cracked games is one of the easiest ways to get infected with malware.',
        'Malicious Ads: Teach them never to click on flashing "Download" buttons or pop-ups that claim their device has a virus.',
        'Browser Extensions: Explain that adding random extensions to their browser gives those tools the power to read everything they do online.'
      ]
    },
    simulationDescription: 'Interactive mock browser illustrating Malvertising, Drive-by Downloads, and dangerous extensions.',
    slides: [
      {
        id: 'm6-s1',
        type: 'visual',
        title: 'The True Cost of "Free"',
        content: 'Downloading pirated software, movie torrents, or cracked video games is one of the fastest ways to invite serious malware onto your computer.'
      },
      {
        id: 'm6-s2',
        type: 'visual',
        title: 'Scam Ads and Extensions',
        content: 'Never click a pop-up that claims your computer is infected. Additionally, be very careful with Browser Extensions—they can read everything you do online.'
      },
      {
        id: 'm6-s3',
        type: 'simulation',
        title: 'Browser Threat Sandbox',
        componentId: 'BrowserSimulator'
      }
    ]
  },
  {
    id: 'module-7',
    title: '7. Public WiFi Safety',
    duration: '10 min',
    content: {
      teach: [
        'Eavesdropping: Explain that open WiFi networks (like at a cafe or airport) broadcast data through the air, meaning anyone nearby can potentially "listen in".',
        'Evil Twins: Describe how scammers set up fake WiFi hotspots with real-sounding names (like "Starbucks Free WiFi") to trick people into connecting.',
        'VPNs: Explain that a Virtual Private Network (VPN) creates a secure tunnel for your data, making it unreadable to anyone trying to spy on the network.'
      ]
    },
    simulationDescription: 'Visualizer showing plaintext packet interception vs encrypted VPN tunneling.',
    slides: [
      {
        id: 'm7-s1',
        type: 'visual',
        title: 'Digital Eavesdropping',
        content: 'When you connect to an open, password-free WiFi network, your data is broadcast through the air. Anyone sitting nearby with the right software can "listen in" on what you are doing.'
      },
      {
        id: 'm7-s2',
        type: 'visual',
        title: 'The Evil Twin Attack',
        content: 'Attackers can set up their own WiFi hotspot and name it something trustworthy like "Airport_Guest_Network". If you connect, they control your entire internet session.'
      },
      {
        id: 'm7-s3',
        type: 'simulation',
        title: 'Network Interception Simulator',
        componentId: 'WifiSimulator'
      }
    ]
  },
  {
    id: 'module-8',
    title: '8. USB Attacks',
    duration: '10 min',
    content: {
      teach: [
        'The "Lost" Flash Drive: Ask the class what they would do if they found a USB drive labeled "Final Exams" in the hallway. Explain why plugging it in is dangerous.',
        'Keyboards in Disguise: Explain that modern attack USBs (like the Rubber Ducky) pretend to be keyboards and type malicious commands incredibly fast as soon as they are plugged in.'
      ]
    },
    simulationDescription: 'Simulated terminal executing a payload upon virtual USB insertion.',
    slides: [
      {
        id: 'm8-s1',
        type: 'visual',
        title: 'Curiosity Killed the Computer',
        content: 'One of the easiest ways to hack a network is to drop an infected USB flash drive in the hallway and wait for a curious student to plug it into their laptop.'
      },
      {
        id: 'm8-s2',
        type: 'visual',
        title: 'Keyboards in Disguise',
        content: 'Malicious USB drives often pretend to be keyboards. The moment you plug them in, they type thousands of malicious commands in the blink of an eye.'
      },
      {
        id: 'm8-s3',
        type: 'simulation',
        title: 'USB Payload Simulator',
        componentId: 'USBSimulator'
      }
    ]
  },
  {
    id: 'module-9',
    title: '9. QR Code Scams',
    duration: '10 min',
    content: {
      teach: [
        'Hidden Links: Explain that QR codes are just fast ways to type URLs, but because humans can\'t read the squares, you don\'t know where it\'s taking you until it\'s too late.',
        'Sticker Swaps: Warn students about scammers putting fake QR stickers over real ones on parking meters or restaurant tables to steal payment info.'
      ]
    },
    simulationDescription: 'Virtual mobile device interface for scanning and analyzing malicious QR matrices.',
    slides: [
      {
        id: 'm9-s1',
        type: 'visual',
        title: 'Hidden Links',
        content: 'Because you cannot read the squares in a QR code, you have no idea what website it is taking you to until after you scan it.'
      },
      {
        id: 'm9-s2',
        type: 'visual',
        title: 'Sticker Swaps',
        content: 'Scammers print out fake QR codes and stick them over legitimate ones at parking meters and restaurants. Always check if the code is a sticker placed over the real one.'
      },
      {
        id: 'm9-s3',
        type: 'simulation',
        title: 'QR Code Scanner Simulator',
        componentId: 'QRSimulator'
      }
    ]
  },
  {
    id: 'module-10',
    title: '10. Social Engineering & Catfishing',
    duration: '15 min',
    content: {
      teach: [
        'Catfishing: Explain how people create entirely fake personas online to manipulate teens emotionally or trick them into sending money or embarrassing photos.',
        'The Stranger Danger rule: Emphasize that you never truly know who is on the other side of the screen in a game lobby or chat room.',
        'Oversharing: Discuss why posting your daily routine, school name, or exact location gives scammers the puzzle pieces they need to trick you.'
      ]
    },
    simulationDescription: 'Interactive narrative demonstrating a live social engineering chat attack.',
    slides: [
      {
        id: 'm10-s1',
        type: 'visual',
        title: 'Catfishing & Fake Profiles',
        content: 'It is incredibly easy to create a fake persona online. Someone claiming to be a teenager in a gaming lobby could be an adult scammer trying to build your trust.'
      },
      {
        id: 'm10-s2',
        type: 'visual',
        title: 'The Danger of Oversharing',
        content: 'If you post your school, your hobbies, and your daily routine online, scammers can use those puzzle pieces to trick you into believing they know you.'
      },
      {
        id: 'm10-s3',
        type: 'simulation',
        title: 'Live Chat Simulator',
        componentId: 'SocialSimulator'
      }
    ]
  },
  {
    id: 'module-11',
    title: '11. Digital Footprint',
    duration: '15 min',
    content: {
      teach: [
        'The Internet is Forever: Explain that even apps with "disappearing" messages can be screenshotted, and deleted posts are often archived by other websites.',
        'College & Jobs: Remind them that college admissions officers and future bosses will Google their names and look at their public social media.',
        'Hidden Photo Data (EXIF): Teach them a cool fact—when you take a picture, your phone secretly hides the exact GPS location and time inside the photo file itself!'
      ]
    },
    simulationDescription: 'Search tool that aggregates simulated public data to show what an employer sees.',
    slides: [
      {
        id: 'm11-s1',
        type: 'visual',
        title: 'The Internet is Forever',
        content: 'There is no such thing as a truly disappearing message. Screenshots last forever, and deleted posts are often saved in digital archives.'
      },
      {
        id: 'm11-s2',
        type: 'visual',
        title: 'Hidden GPS Data',
        content: 'When you take a photo, your smartphone secretly embeds hidden metadata (EXIF data) inside the image, which can reveal the exact GPS coordinates of where you were standing.'
      },
      {
        id: 'm11-s3',
        type: 'simulation',
        title: 'Digital Footprint Scanner',
        componentId: 'DigitalFootprintSimulator'
      }
    ]
  },
  {
    id: 'module-12',
    title: '12. AI & Deepfakes',
    duration: '15 min',
    content: {
      teach: [
        'Seeing is No Longer Believing: Explain that AI can now generate photorealistic images and videos that never actually happened.',
        'Voice Cloning: Explain the "Grandparent Scam" where scammers use 3 seconds of a teen\'s voice from TikTok to call their grandparents, faking an emergency to steal money.',
        'Critical Thinking: Teach them to be highly skeptical of shocking videos or news online, and to always double-check with trusted sources.'
      ]
    },
    simulationDescription: 'Interactive game comparing real vs AI-generated media. Cases include voice cloning, fake disaster images, and fake giveaways.',
    slides: [
      {
        id: 'm12-s1',
        type: 'visual',
        title: 'Seeing is No Longer Believing',
        content: 'Artificial Intelligence can now generate incredibly realistic images and videos of events that never actually happened. You can no longer trust everything you see.'
      },
      {
        id: 'm12-s2',
        type: 'visual',
        title: 'Voice Cloning Scams',
        content: 'With just a 3-second clip of your voice from a social media video, scammers can clone your voice and call your family, faking an emergency to steal money.'
      },
      {
        id: 'm12-s3',
        type: 'simulation',
        title: 'Real vs AI Simulator',
        componentId: 'AIDeepfakeSimulator'
      }
    ]
  },
  {
    id: 'module-13',
    title: '13. Cyber Escape Room',
    content: {
      activity: [
        'Teamwork Time! The class will work together to solve a series of fun cyber puzzles to "escape" the simulation.'
      ]
    },
    simulationDescription: 'Multi-stage interactive puzzle requiring applied security principles.',
    slides: [
      {
        id: 'm13-s1',
        type: 'visual',
        title: 'The Cyber Escape Room',
        content: 'You have been locked out! Work together as a team to spot the scams, unlock the passwords, and escape the digital room.'
      },
      {
        id: 'm13-s2',
        type: 'simulation',
        title: 'Escape Room Interface',
        componentId: 'EscapeRoomSimulator'
      }
    ]
  },
  {
    id: 'module-14',
    title: '14. Cyber Detective',
    content: {
      activity: [
        'Rapid Fire Challenge: Students will have to quickly identify whether a link, message, or scenario is "Safe" or "Suspicious" before the timer runs out.'
      ]
    },
    simulationDescription: 'High-speed classification game evaluating threat indicators.',
    slides: [
      {
        id: 'm14-s1',
        type: 'visual',
        title: 'Cyber Detective',
        content: 'You have 60 seconds. Trust your instincts and quickly classify the incoming messages as Safe or Suspicious before the timer runs out!'
      },
      {
        id: 'm14-s2',
        type: 'simulation',
        title: 'Detective Dashboard',
        componentId: 'DetectiveSimulator'
      }
    ]
  },
  {
    id: 'module-15',
    title: '15. Final Quiz',
    content: {
      questions: [
        'A quick recap of the most important lessons to ensure the students remember the golden rules of digital safety.'
      ]
    },
    simulationDescription: 'Fun, multi-level awareness assessment.',
    slides: [
      {
        id: 'm15-s1',
        type: 'visual',
        title: 'Final Quiz',
        content: 'Let\'s see what you remember! Time to put your new cybersecurity awareness skills to the ultimate test.'
      },
      {
        id: 'm15-s2',
        type: 'simulation',
        title: 'Assessment Engine',
        componentId: 'QuizSimulator'
      }
    ]
  }
];
