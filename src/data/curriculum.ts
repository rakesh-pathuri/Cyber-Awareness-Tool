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
        '"Cyber safety is like locking the front door to your house, but for your games, phone, and online stuff!"'
      ],
      teach: [
        'The Golden Rules: Keep your stuff Secret, keep it Safe, and keep it Working.',
        'Your Online Self: Bad guys want your game accounts and social media to trick your friends.',
        'The Danger: Hackers don\'t just steal money, they want to pretend to be you!',
        'Hackers: Some are Bad (Black Hat), some are Good (White Hat) who help fix things!'
      ],
      discuss: [
        'Ask the class: "What would happen if you couldn\'t log into your favorite game today? How would you feel?"'
      ]
    },
    simulationDescription: 'A fun visual guide to keeping your digital life safe.',
    slides: [
      {
        id: 'm0-s1',
        type: 'visual',
        title: 'What is Cybersecurity?',
        content: 'It means locking your digital doors. Just like you lock your house to keep bad guys out, you need to lock your phone and games!'
      },
      {
        id: 'm0-s2',
        type: 'visual',
        title: 'You Are a Target',
        content: 'Hackers want your accounts! They use them to trick your friends into thinking they are you.'
      },
      {
        id: 'm0-s3',
        type: 'visual',
        title: 'Types of Hackers',
        content: 'Not all hackers are bad!\n• Black Hat: The bad guys who steal.\n• White Hat: The good guys who protect us.\n• Grey Hat: The show-offs.'
      }
    ]
  },
  {
    id: 'module-1',
    title: '1. Password Security',
    duration: '15 min',
    content: {
      teach: [
        'The Guessing Game: Hacker robots can guess short passwords like "123456" in one second!',
        'Long is Strong: A long phrase with silly words is much harder for robots to guess.',
        'Don\'t Reuse: If a hacker finds your password on one site, they will try it on your games too.',
        'Password Managers: These are locked safes that remember your hard passwords for you.'
      ],
      goldenRule: [
        'Long passwords win! "Purple-Cat-Runs-Fast" is way better than a short password with crazy symbols.'
      ]
    },
    simulationDescription: 'Interactive password strength meter utilizing cracking estimations.',
    slides: [
      {
        id: 'm1-s1',
        type: 'visual',
        title: 'The Problem with "123456"',
        content: 'Hackers use super-fast robots to guess millions of simple passwords every second. "123456" is cracked instantly!'
      },
      {
        id: 'm1-s2',
        type: 'visual',
        title: 'Length vs. Complexity',
        content: 'A long secret phrase (like "Purple-Cat-Runs-Over-Clouds") is way harder for hacker robots to guess than a short password with symbols.'
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
        'The Mind Game: Phishing tries to scare you or make you super excited so you forget to be careful.',
        'Sneaky Tricks: Scammers look at what you post online to make their fake messages look real.',
        'Always Check: Never click weird links, and always check who REALLY sent the message.'
      ],
      explain: [
        'Two-Step Login is your best shield! Even if a hacker gets your password, they can\'t get in without your phone.'
      ]
    },
    simulationDescription: 'Interactive fake email client requiring users to identify red flags.',
    slides: [
      {
        id: 'm2-s1',
        type: 'visual',
        title: 'The Human Exploit',
        content: 'Hackers try to trick your brain, not your computer! They scare you or promise free stuff so you click links without thinking.'
      },
      {
        id: 'm2-s2',
        type: 'visual',
        title: 'Spotting the Fakes',
        content: 'Don\'t trust the name on the message! Always check the real email address, and never click links you aren\'t sure about.'
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
        'The Lock Myth: The little lock icon doesn\'t mean a website is safe. Fake websites have locks too!',
        'Fake Names: Scammers make spelling mistakes on purpose (like g00gle.com) to trick you.',
        'The Trap: If you type your password on a fake site, you are giving it straight to the hacker.'
      ]
    },
    simulationDescription: 'Pixel-perfect replication of major login portals demonstrating credential interception.',
    slides: [
      {
        id: 'm3-s1',
        type: 'visual',
        title: 'The Padlock Myth',
        content: 'The lock icon just means your messages are hidden, but fake hacker websites can have locks too!'
      },
      {
        id: 'm3-s2',
        type: 'visual',
        title: 'Look-alike Domains',
        content: 'Hackers build fake websites that look real. Always check the website name for sneaky typos (like "g00gle.com").'
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
        'Digital Locks: Ransomware is a virus that locks all your games and pictures until you pay.',
        'How it spreads: You get it from clicking bad links or downloading fake free games.',
        'The Best Defense: Backups! If you have copies of your stuff saved somewhere else, the hackers lose.'
      ]
    },
    simulationDescription: 'Visual demonstration of file encryption and extortion messaging.',
    slides: [
      {
        id: 'm4-s1',
        type: 'visual',
        title: 'Digital Extortion',
        content: 'Ransomware is a virus that locks up all your games and pictures and demands money to give them back.'
      },
      {
        id: 'm4-s2',
        type: 'visual',
        title: 'The Ultimate Defense: Backups',
        content: 'If you have extra copies of your games and pictures saved somewhere safe, the hackers can\'t hurt you.'
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
        'Hidden Spies: Spyware is a sneaky virus that watches your screen and listens to your microphone.',
        'App Access: Why would a simple flashlight app need to look at your contacts or location?',
        'Taking Control: Check your phone settings and turn off things apps don\'t really need.'
      ]
    },
    simulationDescription: 'Simulated dashboard displaying live, unauthorized data extraction (camera, clipboard, keystrokes).',
    slides: [
      {
        id: 'm5-s1',
        type: 'visual',
        title: 'Hidden Spies',
        content: 'Spyware is a sneaky virus that watches what you type, tracks where you go, and can even turn on your camera!'
      },
      {
        id: 'm5-s2',
        type: 'visual',
        title: 'The Permission Exploit',
        content: 'Why does a Flashlight app need your location? Think before you click "Allow" when an app asks for your stuff.'
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
        'The "Free" Trap: Downloading fake free games or movies is the easiest way to get a virus.',
        'Fake Ads: Never click flashing "Download" buttons or pop-ups that say you have a virus.',
        'Browser Tools: Be careful what extra tools you add to your browser, they can spy on you.'
      ]
    },
    simulationDescription: 'Interactive mock browser illustrating Malvertising, Drive-by Downloads, and dangerous extensions.',
    slides: [
      {
        id: 'm6-s1',
        type: 'visual',
        title: 'The True Cost of "Free"',
        content: 'Downloading fake free games or illegal movies is the fastest way to get a bad virus on your computer.'
      },
      {
        id: 'm6-s2',
        type: 'visual',
        title: 'Scam Ads and Extensions',
        content: 'Never click a pop-up that says you have a virus. It\'s a trick! And be careful adding tools to your browser.'
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
        'Snooping: Open Wi-Fi is like shouting your secrets. Anyone nearby can hear what you send.',
        'Fake Wi-Fi: Hackers set up fake Wi-Fi spots with names like "Free Cafe Wi-Fi" to trick you.',
        'Magic Tunnels: A VPN is a secret tunnel that hides your stuff on open Wi-Fi.'
      ]
    },
    simulationDescription: 'Visualizer showing plaintext packet interception vs encrypted VPN tunneling.',
    slides: [
      {
        id: 'm7-s1',
        type: 'visual',
        title: 'Digital Eavesdropping',
        content: 'Open Wi-Fi without a password is like shouting your secrets in a crowded room. Hackers can listen to what you do online.'
      },
      {
        id: 'm7-s2',
        type: 'visual',
        title: 'The Evil Twin Attack',
        content: 'Hackers make fake Wi-Fi spots named "Free Wi-Fi". If you connect, they can see your passwords.'
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
        'The "Lost" Flash Drive: Never plug a random USB drive into your computer, it could have a virus!',
        'Robot Hackers: Bad USB drives pretend to be keyboards and type virus commands super fast.'
      ]
    },
    simulationDescription: 'Simulated terminal executing a payload upon virtual USB insertion.',
    slides: [
      {
        id: 'm8-s1',
        type: 'visual',
        title: 'Curiosity Killed the Computer',
        content: 'Hackers leave bad USB sticks on the ground hoping you will plug them into your computer. Don\'t do it!'
      },
      {
        id: 'm8-s2',
        type: 'visual',
        title: 'Keyboards in Disguise',
        content: 'Bad USB sticks pretend to be keyboards and type hacker commands in a blink of an eye.'
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
        'Hidden Links: You can\'t read a QR code with your eyes, so you don\'t know where it takes you!',
        'Sticker Swaps: Hackers put fake QR stickers over real ones to trick you.'
      ]
    },
    simulationDescription: 'Virtual mobile device interface for scanning and analyzing malicious QR matrices.',
    slides: [
      {
        id: 'm9-s1',
        type: 'visual',
        title: 'Hidden Links',
        content: 'You can\'t read the squares in a QR code, so you don\'t know what bad website it might take you to.'
      },
      {
        id: 'm9-s2',
        type: 'visual',
        title: 'Sticker Swaps',
        content: 'Hackers put fake QR stickers over real ones at stores. Always check if it\'s a fake sticker!'
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
        'Fake Friends: People online might pretend to be someone else to trick you.',
        'Stranger Danger: You never really know who you are talking to in a game.',
        'Too Much Info: Don\'t share your school or daily routine, hackers use that against you.'
      ]
    },
    simulationDescription: 'Interactive narrative demonstrating a live social engineering chat attack.',
    slides: [
      {
        id: 'm10-s1',
        type: 'visual',
        title: 'Catfishing & Fake Profiles',
        content: 'It\'s super easy to make a fake profile online. That kid in your game might be a hacker trying to trick you.'
      },
      {
        id: 'm10-s2',
        type: 'visual',
        title: 'The Danger of Oversharing',
        content: 'If you post everything about your life online, bad guys can use that info to pretend they are your friend.'
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
        'The Internet is Forever: Even deleted messages and pictures can be saved by someone else.',
        'Future Bosses: Your future boss or teacher will see what you post online.',
        'Hidden GPS: When you take a picture, your phone secretly hides exactly where you were in the photo!'
      ]
    },
    simulationDescription: 'Search tool that aggregates simulated public data to show what an employer sees.',
    slides: [
      {
        id: 'm11-s1',
        type: 'visual',
        title: 'The Internet is Forever',
        content: 'There are no true disappearing messages. Screenshots last forever, and someone can always save your picture.'
      },
      {
        id: 'm11-s2',
        type: 'visual',
        title: 'Hidden GPS Data',
        content: 'When you take a photo, your phone hides exactly where you were standing inside the picture file!'
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
        'Seeing is NOT Believing: Computers can generate fake pictures that look totally real.',
        'Voice Cloning: Hackers can use a computer to sound exactly like you on a phone call.',
        'Think First: Don\'t believe crazy videos you see online, always check if they are real.'
      ]
    },
    simulationDescription: 'Interactive game comparing real vs AI-generated media. Cases include voice cloning, fake disaster images, and fake giveaways.',
    slides: [
      {
        id: 'm12-s1',
        type: 'visual',
        title: 'Seeing is No Longer Believing',
        content: 'Computers can generate super real-looking fake pictures and videos. You can\'t trust everything you see anymore.'
      },
      {
        id: 'm12-s2',
        type: 'visual',
        title: 'Voice Cloning Scams',
        content: 'Hackers only need a 3-second video to copy your voice and use it to trick your family.'
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
        'Teamwork Time! Work together to solve fun puzzles and escape the computer!'
      ]
    },
    simulationDescription: 'Multi-stage interactive puzzle requiring applied security principles.',
    slides: [
      {
        id: 'm13-s1',
        type: 'visual',
        title: 'The Cyber Escape Room',
        content: 'You are trapped! Work as a team to spot scams, unlock passwords, and escape the room.'
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
        'Speed Round: Quickly guess if a link is "Safe" or a "Scam" before time runs out!'
      ]
    },
    simulationDescription: 'High-speed classification game evaluating threat indicators.',
    slides: [
      {
        id: 'm14-s1',
        type: 'visual',
        title: 'Cyber Detective',
        content: 'You have 60 seconds to spot the scams! Trust your gut and guess fast!'
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
        'Let\'s review what we learned and see who remembers the golden rules!'
      ]
    },
    simulationDescription: 'Fun, multi-level awareness assessment.',
    slides: [
      {
        id: 'm15-s1',
        type: 'visual',
        title: 'Final Quiz',
        content: 'Let\'s see what you remember! Time to show off your new hacker-stopping skills.'
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
