export type StudentModule = {
  id: string;
  title: string;
  thumbnailUrl?: string; // Optional: for the grid view
  estimatedTime: string;
  componentId: string;
  introduction: string;
  explanation: string;
  safetyTips: string[];
  miniQuiz: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
};

export const studentCurriculum: StudentModule[] = [
  {
    id: 'module-0',
    title: '0. Introduction to Cybersecurity',
    estimatedTime: '5 mins',
    componentId: 'IntroSimulator',
    introduction: 'Welcome to the Cyber Awareness Lab! Cybersecurity is like locking your house, but for your phone, computer, and online accounts. Before we dive into specific attacks, lets understand the basics.',
    explanation: 'There are three main pillars of cybersecurity: Privacy (keeping data secret), Integrity (keeping data accurate), and Availability (keeping data online). It is also important to understand who the attackers are. Hackers are generally classified into three types:\n\n1. Black Hat Hackers: Malicious actors who break into systems to steal data, cause damage, or extort money.\n2. White Hat Hackers: Ethical hackers hired by companies to test their security and find vulnerabilities before the bad guys do.\n3. Grey Hat Hackers: Individuals who hack without permission but usually without malicious intent, often just to see if they can or to publicly expose flaws.',
    safetyTips: [
      'Remember that you are a target. Even if you think you have nothing worth stealing, your accounts can be used to scam others.',
      'Cybersecurity is everyone\'s responsibility, not just the IT department.',
      'Stay vigilant. The landscape of cyber threats is constantly evolving.'
    ],
    miniQuiz: [
      {
        question: 'What is a White Hat hacker?',
        options: [
          'A malicious attacker who steals data for profit.',
          'An ethical hacker who helps organizations find and fix security vulnerabilities.',
          'A hacker who only targets government networks.',
          'Someone who wears a white hat.'
        ],
        correctAnswerIndex: 1,
        explanation: 'White Hat hackers use their skills for good, helping to secure systems and protect against Black Hat hackers.'
      }
    ]
  },
  {
    id: 'module-1',
    title: '1. Password Security',
    estimatedTime: '5-10 mins',
    componentId: 'PasswordSimulator',
    introduction: 'Welcome to your first lesson in cybersecurity! In this module, you will learn how hackers use automated tools to guess passwords. You will see firsthand why "password123" is a terrible idea and how to create a password that can withstand a brute-force attack.',
    explanation: 'A brute-force attack is a method where hackers use powerful computers to guess every possible combination of letters, numbers, and symbols until they find your password. A simple 8-character lowercase password can be cracked almost instantly. By increasing the length and adding complexity (numbers, uppercase letters, and symbols), you exponentially increase the time it takes to crack the password, making it mathematically impossible for hackers to guess.',
    safetyTips: [
      'Use at least 12 characters for your passwords. Length is more important than complexity.',
      'Use a mix of uppercase, lowercase, numbers, and symbols.',
      'Never reuse passwords across different accounts. If one site gets breached, all your accounts are at risk.',
      'Use a password manager to securely generate and store unique passwords for every site.'
    ],
    miniQuiz: [
      {
        question: 'Which of the following passwords is the most secure against a brute-force attack?',
        options: [
          'Summer2023!',
          'dog',
          'correct horse battery staple',
          'P@ssw0rd'
        ],
        correctAnswerIndex: 2,
        explanation: 'Length is the most critical factor. "correct horse battery staple" is 28 characters long and would take trillions of years to crack, despite not having complex symbols.'
      }
    ]
  },
  {
    id: 'module-2',
    title: '2. Phishing',
    estimatedTime: '10-15 mins',
    componentId: 'PhishingSimulator',
    introduction: 'Phishing is the #1 way hackers gain access to secure systems. They don\'t hack the computer; they hack the human. In this simulation, you will step into the shoes of a security analyst and learn how to spot the subtle clues that reveal a fake email.',
    explanation: 'Phishing emails are designed to trick you into revealing sensitive information (like passwords or credit card numbers) or installing malware. Attackers often create a false sense of urgency, impersonate authority figures (like your boss or IT department), or use generic greetings. The most reliable way to spot a phishing attempt is to carefully inspect the sender\'s email address and hover over any links to see their true destination.',
    safetyTips: [
      'Always check the sender\'s actual email address, not just the display name.',
      'Hover over links before clicking them to reveal the actual URL.',
      'Be extremely suspicious of emails demanding urgent action or threatening consequences.',
      'If in doubt, never click the link. Navigate to the website directly by typing the address into your browser.'
    ],
    miniQuiz: [
      {
        question: 'You receive an urgent email from "PayPal Support" stating your account will be suspended in 24 hours. The sender address is "support@paypal-security-update.com". What should you do?',
        options: [
          'Click the link to verify your account immediately.',
          'Reply to the email and ask if it is real.',
          'Ignore the email or log into PayPal directly by typing paypal.com in your browser.',
          'Forward it to your friends.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The sender domain "paypal-security-update.com" is fake. Legitimate companies will not pressure you with 24-hour ultimatums. Always go directly to the source.'
      }
    ]
  },
  {
    id: 'module-3',
    title: '3. Fake Login Portals',
    estimatedTime: '10 mins',
    componentId: 'FakeLoginSimulator',
    introduction: 'Have you ever clicked a link and ended up on a page that looks exactly like Google or Microsoft, but something felt... off? Welcome to the world of Evil Twins. Learn how attackers perfectly clone legitimate websites to steal your credentials.',
    explanation: 'A Fake Login or "Evil Twin" attack involves creating a pixel-perfect replica of a legitimate login page. When you enter your username and password into the fake page, it is sent directly to the attacker. These pages are often hosted on domains that look very similar to the real thing (e.g., g00gle.com instead of google.com). This is known as "typosquatting".',
    safetyTips: [
      'Always verify the URL in the address bar before typing your password.',
      'Look for the padlock icon and HTTPS, though remember that scammers can get padlocks too!',
      'Use a password manager. They will refuse to autofill your password on a fake domain.',
      'Enable Two-Factor Authentication (2FA) so that even if a hacker steals your password, they cannot log in.'
    ],
    miniQuiz: [
      {
        question: 'Why is relying on the padlock icon (HTTPS) not enough to guarantee a website is safe?',
        options: [
          'Because HTTPS only encrypts the connection, it doesn\'t mean the site itself is legitimate. Scammers can get HTTPS certificates too.',
          'Because the padlock icon is easily faked with an image.',
          'Because HTTPS stands for "Hyper Text Transfer Protocol Simple".',
          'Because browsers often hide the padlock.'
        ],
        correctAnswerIndex: 0,
        explanation: 'HTTPS guarantees that your connection to the website is private, but it does NOT mean the website is run by a trustworthy entity. A scammer can create a secure connection to their fake website.'
      }
    ]
  },
  {
    id: 'module-4',
    title: '4. Ransomware Simulator',
    estimatedTime: '15 mins',
    componentId: 'RansomwareSimulator',
    introduction: 'Imagine turning on your computer to find that every single file—your photos, documents, and projects—is locked, and a hacker is demanding $1,000 in Bitcoin to unlock them. This is Ransomware.',
    explanation: 'Ransomware is a type of malicious software designed to block access to a computer system until a sum of money is paid. It encrypts your files using complex algorithms. Ransomware is typically spread through phishing emails containing malicious attachments or links, or by exploiting vulnerabilities in unpatched software. Once infected, the only guaranteed way to recover your data (without paying criminals) is to restore from an offline backup.',
    safetyTips: [
      'Maintain regular, offline backups of your most important files (e.g., on an external hard drive that is unplugged when not in use).',
      'Never open unexpected email attachments, especially ZIP files or Office documents that ask you to "Enable Macros".',
      'Keep your operating system and all software updated to patch security vulnerabilities.',
      'Use reputable antivirus/endpoint protection software.'
    ],
    miniQuiz: [
      {
        question: 'What is the most reliable defense against losing your data to a ransomware attack?',
        options: [
          'Having a strong password.',
          'Using a VPN.',
          'Having recent, offline backups of your files.',
          'Paying the ransom immediately.'
        ],
        correctAnswerIndex: 2,
        explanation: 'If your files are encrypted by ransomware, having an offline backup means you can simply wipe the computer and restore your files without paying the hackers.'
      }
    ]
  },
  {
    id: 'module-5',
    title: '5. Spyware & Permissions',
    estimatedTime: '10 mins',
    componentId: 'SpywareSimulator',
    introduction: 'Not all malware announces its presence. Spyware operates silently in the background, watching your screen, logging your keystrokes, and activating your webcam without the green light ever turning on.',
    explanation: 'Spyware is malicious software that secretly monitors and collects information about you without your consent. It can record your keystrokes (keyloggers) to steal passwords, capture screenshots, and even record audio and video. Spyware is often bundled with "free" software downloaded from untrustworthy sites, or installed via malicious browser extensions.',
    safetyTips: [
      'Only download software from official sources and reputable app stores.',
      'Be extremely careful with free software or pirated games, as they are common carriers of spyware.',
      'Review the permissions requested by apps and browser extensions.',
      'Cover your webcam when not in use.'
    ],
    miniQuiz: [
      {
        question: 'How is spyware fundamentally different from ransomware?',
        options: [
          'Spyware is only on mobile phones; ransomware is on computers.',
          'Spyware tries to remain hidden and steal data silently, while ransomware makes its presence known and demands money.',
          'Spyware is a type of hardware, ransomware is software.',
          'Spyware is legal, ransomware is illegal.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The goal of spyware is stealth—the longer it stays hidden, the more data it can steal. Ransomware, conversely, relies on alerting you so you will pay the ransom.'
      }
    ]
  },
  {
    id: 'module-6',
    title: '6. Safe Browsing',
    estimatedTime: '10 mins',
    componentId: 'BrowserSimulator',
    introduction: 'Your web browser is your primary window to the internet, making it a prime target for attackers. In this module, we will explore the dangers of malicious extensions and pop-ups.',
    explanation: 'Malicious browser extensions can read all the data on the websites you visit, inject ads, and steal login credentials. Even seemingly harmless extensions like "Free PDF Converter" or "Custom Cursors" can be sold to bad actors who update them with malicious code. Additionally, fake "Your PC is infected!" pop-ups are a common tactic to trick users into calling fake tech support centers.',
    safetyTips: [
      'Keep your browser updated to the latest version.',
      'Minimize the number of extensions you install. Only install extensions from highly trusted developers with many reviews.',
      'Periodically review and remove extensions you no longer use.',
      'Never call a phone number that appears in a terrifying browser pop-up.'
    ],
    miniQuiz: [
      {
        question: 'You are browsing the web and a full-screen red warning appears saying "CRITICAL ALERT: Your PC has 5 viruses! Call Microsoft Support at 1-800-XXX-XXXX immediately." What is happening?',
        options: [
          'Your computer has 5 viruses and you should call the number.',
          'It is a Tech Support Scam. It is just a webpage designed to look scary. You should close the tab.',
          'Microsoft detected a breach in your network.',
          'Your antivirus software has expired.'
        ],
        correctAnswerIndex: 1,
        explanation: 'This is a classic Tech Support Scam. Microsoft will never display full-screen pop-ups with phone numbers. You can simply close the browser tab to escape it.'
      }
    ]
  },
  {
    id: 'module-7',
    title: '7. Public WiFi Safety',
    estimatedTime: '10 mins',
    componentId: 'WifiSimulator',
    introduction: 'Working from a coffee shop sounds great, until you realize the person at the next table is intercepting all your network traffic. Learn why open Wi-Fi networks are inherently dangerous.',
    explanation: 'When you connect to an open, unencrypted public Wi-Fi network, your data is transmitted over the air in cleartext. Anyone else on that network with simple software can "sniff" the traffic and intercept unencrypted data, including session cookies and passwords. Attackers can also set up "Evil Twin" hotspots—fake networks with names like "Free Starbucks WiFi" that you connect to, routing all your traffic through the attacker\'s machine.',
    safetyTips: [
      'Avoid conducting sensitive activities (like online banking) on public Wi-Fi.',
      'Always use a Virtual Private Network (VPN) on public networks to encrypt your traffic.',
      'Turn off "Auto-connect to Wi-Fi" on your devices.',
      'When possible, use your smartphone\'s cellular hotspot instead of public Wi-Fi.'
    ],
    miniQuiz: [
      {
        question: 'What is the primary risk of using an open, password-less public Wi-Fi network?',
        options: [
          'The internet speed will be too slow for streaming.',
          'Your internet provider will charge you extra fees.',
          'Data transmitted over the network is unencrypted and can be intercepted by others on the same network.',
          'Your device battery will drain faster.'
        ],
        correctAnswerIndex: 2,
        explanation: 'Open networks do not encrypt data over the air. A hacker sitting nearby can use a packet sniffer to capture your traffic.'
      }
    ]
  },
  {
    id: 'module-8',
    title: '8. USB Attacks',
    estimatedTime: '5 mins',
    componentId: 'USBSimulator',
    introduction: 'You find a USB drive labeled "Q3 Bonuses & Salaries" in the parking lot. Do you plug it in? This module explores the physical vectors of cyber attacks.',
    explanation: 'The "USB Drop" is a classic social engineering attack. Attackers leave infected USB drives in public places, hoping human curiosity will compel someone to plug it into a corporate computer. These drives can contain malicious files that install backdoors, or they can be "Rubber Duckies"—devices that look like USB drives but are actually programmed keyboards that inject malicious commands the millisecond they are plugged in.',
    safetyTips: [
      'Never plug an untrusted or found USB drive into your computer.',
      'If you find a USB drive at work, hand it to your IT department immediately.',
      'Do not use random USB charging stations in public places (airports, cafes) as they can be rigged to steal data (Juice Jacking). Use a power outlet with your own adapter.',
      'Disable Autorun/Autoplay features on your operating system.'
    ],
    miniQuiz: [
      {
        question: 'What is a "Rubber Ducky" in the context of cybersecurity?',
        options: [
          'A rubber toy used to debug code.',
          'A malicious device disguised as a USB flash drive that acts as a keyboard to rapidly inject malicious commands.',
          'A type of waterproof hard drive.',
          'A nickname for a novice hacker.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A Rubber Ducky registers as a keyboard when plugged in, allowing it to bypass many security controls and execute hundreds of keystrokes per second to compromise the machine.'
      }
    ]
  },
  {
    id: 'module-9',
    title: '9. QR Code Scams',
    estimatedTime: '10 mins',
    componentId: 'QRSimulator',
    introduction: 'QR codes are everywhere—on parking meters, restaurant tables, and posters. But how do you know where they actually go? Welcome to Quishing (QR Phishing).',
    explanation: 'Attackers print malicious QR codes on stickers and place them over legitimate QR codes (e.g., on a parking meter). When you scan the code to pay for parking, you are directed to a fake website that steals your credit card information. Because humans cannot read QR codes, they provide the perfect camouflage for malicious URLs.',
    safetyTips: [
      'Inspect physical QR codes carefully. Look for signs of tampering, such as a sticker placed over the original code.',
      'Use your phone\'s built-in camera app to scan codes, as it will usually display a preview of the URL before navigating to it.',
      'If you scan a code to pay for something and the website looks strange or lacks HTTPS, do not enter your payment information.',
      'Avoid scanning random QR codes found on the street or in unsolicited mail.'
    ],
    miniQuiz: [
      {
        question: 'You scan a QR code on a parking meter to pay for your spot. What should you do before entering your credit card details?',
        options: [
          'Enter the details as quickly as possible so you don\'t get a ticket.',
          'Verify the URL in your browser to ensure it is the official city parking website and not a fake domain.',
          'Connect to public Wi-Fi to ensure the transaction goes through fast.',
          'Take a picture of the meter.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Always verify the destination URL. Scammers stick fake QR codes on meters to direct victims to phishing sites that steal credit card data.'
      }
    ]
  },
  {
    id: 'module-10',
    title: '10. Social Engineering & Catfishing',
    estimatedTime: '15 mins',
    componentId: 'SocialSimulator',
    introduction: 'Hackers know that it is often easier to trick a human than to break through a firewall. In this module, you will learn how attackers manipulate human psychology to bypass security.',
    explanation: 'Social engineering involves manipulating people into giving up confidential information or performing actions that compromise security. This can happen over the phone (Vishing), via text messages (Smishing), or in person. Attackers exploit human emotions like fear (urgent demands), greed (lottery scams), curiosity (clickbait), or helpfulness (pretending to be a coworker in distress).',
    safetyTips: [
      'Verify the identity of anyone asking for sensitive information, regardless of how they contacted you.',
      'Never provide passwords, 2FA codes, or financial details over the phone if you did not initiate the call.',
      'Be skeptical of unsolicited requests that create a sense of urgency or fear.',
      'Establish a "Safe Word" with your family to verify identities in emergency situations.'
    ],
    miniQuiz: [
      {
        question: 'You receive a text message containing a 6-digit code, followed by a phone call from someone claiming to be your bank. They say there is fraud on your account and they need the 6-digit code sent to your phone to verify your identity. What do you do?',
        options: [
          'Give them the code; they are from the bank and trying to help.',
          'Refuse to give the code, hang up, and call the official number on the back of your bank card.',
          'Give them a fake code to see what they do.',
          'Read the code to them very slowly.'
        ],
        correctAnswerIndex: 1,
        explanation: 'This is a common scam. The attacker is trying to log into your account and triggered a 2FA code to your phone. They are calling to trick you into giving them the code they need to complete the login.'
      }
    ]
  },
  {
    id: 'module-11',
    title: '11. Digital Footprint',
    estimatedTime: '10 mins',
    componentId: 'DigitalFootprintSimulator',
    introduction: 'Every time you post, comment, or check in online, you leave a trail. This digital footprint can be used by attackers to craft highly convincing, personalized attacks against you.',
    explanation: 'Open Source Intelligence (OSINT) refers to the collection of publicly available information. Attackers scrape social media, public records, and forums to build a profile on their targets. If you post about your pet "Fluffy", your favorite sports team, and your high school graduation year, an attacker has everything they need to guess your security questions or craft a spear-phishing email that you will trust.',
    safetyTips: [
      'Review the privacy settings on all your social media accounts. Limit visibility to friends only.',
      'Do not overshare personal details like your address, phone number, or travel plans.',
      'Be aware that anything you post online can be permanent, even if you delete it later.',
      'Do not use personal information (pets, kids names, birthdays) in your passwords or security questions.'
    ],
    miniQuiz: [
      {
        question: 'Why is posting about your upcoming vacation dates on a public social media profile a security risk?',
        options: [
          'It makes your friends jealous.',
          'It uses too much internet bandwidth.',
          'It tells criminals exactly when your house will be empty, making you a target for physical burglary.',
          'It violates the terms of service of most platforms.'
        ],
        correctAnswerIndex: 2,
        explanation: 'Oversharing location and travel plans is a major physical security risk. Always wait until you return home to post vacation photos.'
      }
    ]
  },
  {
    id: 'module-12',
    title: '12. AI & Deepfakes',
    estimatedTime: '15 mins',
    componentId: 'AIDeepfakeSimulator',
    introduction: 'Seeing is no longer believing. Generative AI makes it possible to create incredibly realistic fake images, videos, and audio. Learn how to spot synthetic media before you fall victim to a deepfake scam.',
    explanation: 'Deepfakes use artificial intelligence to manipulate or generate visual and audio content with a high potential to deceive. Attackers use AI voice cloning to impersonate executives or family members in "emergency" phone scams. They generate fake images to spread disinformation. While the technology is improving rapidly, there are still "tells"—glitches, unnatural movements, or illogical details—that can help you spot a fake.',
    safetyTips: [
      'Look for unnatural eye movements, weird skin textures, or mismatched audio sync in videos.',
      'In AI-generated images, look for strange hands (too many fingers), blurred backgrounds, or nonsensical text on signs.',
      'If you receive an urgent phone call from a loved one asking for money, verify it by hanging up and calling them back, or ask a question only they would know.',
      'Be highly critical of sensational or shocking media; verify the source through reputable news outlets.'
    ],
    miniQuiz: [
      {
        question: 'What is a common "tell" or mistake frequently found in AI-generated images?',
        options: [
          'The images are always in black and white.',
          'Distorted or unnatural hands, extra fingers, or nonsensical background text.',
          'The images take up huge amounts of hard drive space.',
          'AI images always have a watermark.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Current generative AI models often struggle with complex anatomy like hands, and they usually generate gibberish instead of coherent text.'
      }
    ]
  },
  {
    id: 'module-13',
    title: '13. Cyber Escape Room',
    estimatedTime: '20 mins',
    componentId: 'EscapeRoomSimulator',
    introduction: 'Put all your skills to the test in this interactive Escape Room. You will need to identify phishing links, construct strong passwords, and navigate network traps to break free.',
    explanation: 'Cybersecurity requires a holistic approach. An attacker only needs one vulnerability to compromise a system—a weak password, a gullible click, or an unsecured network. Defense in Depth is the concept of using multiple layers of security so that if one fails, others are there to protect the system.',
    safetyTips: [
      'Always maintain situational awareness when operating online.',
      'Apply the principles of Zero Trust: never trust, always verify.',
      'Security is a continuous process, not a one-time setup.',
      'When in doubt, stop and ask an expert.'
    ],
    miniQuiz: [
      {
        question: 'What does the concept of "Defense in Depth" mean in cybersecurity?',
        options: [
          'Hiding your computer in the basement.',
          'Using a single, impenetrable firewall to block all attacks.',
          'Employing multiple layers of security controls (passwords, 2FA, encryption, antivirus) so if one fails, others remain.',
          'Attacking hackers back to defend your network.'
        ],
        correctAnswerIndex: 2,
        explanation: 'Defense in Depth ensures there is no single point of failure. If an attacker guesses your password, 2FA provides a second layer of defense.'
      }
    ]
  },
  {
    id: 'module-14',
    title: '14. Cyber Detective',
    estimatedTime: '10 mins',
    componentId: 'DetectiveSimulator',
    introduction: 'Speed and accuracy are essential when dealing with a barrage of daily threats. In this rapid-fire challenge, test your instincts by quickly classifying scenarios as Safe or Suspicious.',
    explanation: 'As you navigate the digital world, you must develop an intuition for danger. Scammers use mass automated attacks, bombarding you with hundreds of phishing emails and smishing texts. Training your brain to instantly recognize the red flags—urgency, unexpected requests for sensitive data, and mismatched domains—will help you filter out the noise and stay safe.',
    safetyTips: [
      'Trust your instincts; if something feels "too good to be true" or "urgent", it usually is a scam.',
      'Slow down. Attackers want you to act quickly in a panic. Take a breath before clicking.',
      'Report suspicious emails to your IT department to protect others.',
      'Keep your spam filters turned on.'
    ],
    miniQuiz: [
      {
        question: 'Why do scammers almost always try to create a false sense of extreme urgency in their messages?',
        options: [
          'Because they are impatient.',
          'To force you into a panic state, causing you to make rash decisions without thinking critically or verifying the request.',
          'Because internet providers delete slow emails.',
          'To show how important they are.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Panic overrides critical thinking. By imposing an artificial deadline ("Account suspended in 2 hours!"), they hope you will react emotionally rather than logically.'
      }
    ]
  },
  {
    id: 'module-15',
    title: '15. Final Quiz',
    estimatedTime: '10 mins',
    componentId: 'QuizSimulator',
    introduction: 'You have reached the end of the Cyber Awareness Lab! It is time to prove you have mastered the golden rules of cybersecurity and earn your Certificate of Completion.',
    explanation: 'Cybersecurity is everyone\'s responsibility. By applying the principles you have learned in these modules—using strong passwords, recognizing phishing, securing your devices, and verifying identities—you protect not only yourself, but also your family and your organization from devastating cyber attacks.',
    safetyTips: [
      'Stay vigilant and continue learning, as cyber threats constantly evolve.',
      'Share your knowledge with family and friends to help keep them safe.',
      'Make security a habit, not an afterthought.',
      'Congratulations on completing the training!'
    ],
    miniQuiz: [
      {
        question: 'What is the most important takeaway from this entire curriculum?',
        options: [
          'Antivirus software catches 100% of all threats.',
          'Cybersecurity is only the IT department\'s problem.',
          'You are the strongest line of defense. A cautious, informed human is better than any firewall.',
          'You should never use the internet again.'
        ],
        correctAnswerIndex: 2,
        explanation: 'Technology can only do so much. The vast majority of breaches involve a human element. Your awareness and critical thinking are the ultimate defense.'
      }
    ]
  }
];
