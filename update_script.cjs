const fs = require('fs');

const studentDataPath = './src/data/studentModuleData.ts';
let content = fs.readFileSync(studentDataPath, 'utf8');

const replacements = {
  'The Password Cracker': '1. Password Security',
  'Phishing Defense': '2. Phishing',
  'The Evil Twin': '3. Fake Login Portals',
  'Ransomware Attack': '4. Ransomware Simulator',
  'The Silent Observer (Spyware)': '5. Spyware & Permissions',
  'Browser Security': '6. Safe Browsing',
  'Public Wi-Fi Dangers': '7. Public WiFi Safety',
  'The USB Drop': '8. USB Attacks',
  'QR Code Stickers': '9. QR Code Scams',
  'Social Engineering': '10. Social Engineering & Catfishing',
  'Digital Footprint': '11. Digital Footprint',
  'AI & Deepfakes': '12. AI & Deepfakes',
  'Cyber Escape Room': '13. Cyber Escape Room',
  'Cyber Detective': '14. Cyber Detective',
  'Final Quiz': '15. Final Quiz'
};

for (const [oldTitle, newTitle] of Object.entries(replacements)) {
  content = content.replace(`title: '${oldTitle}'`, `title: '${newTitle}'`);
}

const introModule = `
  {
    id: 'module-0',
    title: '0. Introduction to Cybersecurity',
    estimatedTime: '5 mins',
    componentId: 'IntroSimulator',
    introduction: 'Welcome to the Cyber Awareness Lab! Cybersecurity is like locking your house, but for your phone, computer, and online accounts. Before we dive into specific attacks, lets understand the basics.',
    explanation: 'There are three main pillars of cybersecurity: Privacy (keeping data secret), Integrity (keeping data accurate), and Availability (keeping data online). It is also important to understand who the attackers are. Hackers are generally classified into three types:\\n\\n1. Black Hat Hackers: Malicious actors who break into systems to steal data, cause damage, or extort money.\\n2. White Hat Hackers: Ethical hackers hired by companies to test their security and find vulnerabilities before the bad guys do.\\n3. Grey Hat Hackers: Individuals who hack without permission but usually without malicious intent, often just to see if they can or to publicly expose flaws.',
    safetyTips: [
      'Remember that you are a target. Even if you think you have nothing worth stealing, your accounts can be used to scam others.',
      'Cybersecurity is everyone\\'s responsibility, not just the IT department.',
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
  },`;

content = content.replace('export const studentCurriculum: StudentModule[] = [', 'export const studentCurriculum: StudentModule[] = [' + introModule);

fs.writeFileSync(studentDataPath, content);
console.log('Done!');
