import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

const COMMON_PASSWORDS = ['123456', 'password', 'qwerty', '12345678', '111111', 'admin', 'cricket123'];

const PASSPHRASE_WORDS = [
  ['Purple', 'Giant', 'Happy', 'Flying', 'Silent', 'Dancing'],
  ['Cat', 'Dragon', 'Pizza', 'Robot', 'Monkey', 'Panda'],
  ['Runs', 'Jumps', 'Sleeps', 'Eats', 'Drives', 'Sings'],
  ['Over', 'Under', 'Around', 'Through', 'Behind', 'Near'],
  ['Clouds', 'Mountains', 'Rivers', 'Stars', 'Castles', 'Cities']
];

export default function PasswordSimulator() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0); // 0-100
  const [crackTime, setCrackTime] = useState('Instantly');
  const [feedback, setFeedback] = useState('Type a password to test it.');
  const [isDictionary, setIsDictionary] = useState(false);

  const calculateStrength = (pwd: string) => {
    if (!pwd) {
      setStrength(0);
      setCrackTime('Instantly');
      setFeedback('Type a password to test it.');
      setIsDictionary(false);
      return;
    }

    const lowerPwd = pwd.toLowerCase();
    const isCommon = COMMON_PASSWORDS.some(cp => lowerPwd.includes(cp));
    
    if (isCommon) {
      setStrength(5);
      setCrackTime('Instantly');
      setFeedback('Dictionary Attack: Hackers test common passwords in milliseconds.');
      setIsDictionary(true);
      return;
    }

    setIsDictionary(false);

    let score = 0;
    if (pwd.length > 4) score += 10;
    if (pwd.length > 7) score += 20;
    if (pwd.length > 11) score += 30;
    if (pwd.length > 15) score += 20;

    if (/[A-Z]/.test(pwd)) score += 5;
    if (/[a-z]/.test(pwd)) score += 5;
    if (/[0-9]/.test(pwd)) score += 5;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 5;

    setStrength(Math.min(100, score));

    if (score < 20) {
      setCrackTime('Instantly');
      setFeedback('Brute Force: A computer can guess this immediately.');
    } else if (score < 40) {
      setCrackTime('A few minutes');
      setFeedback('A bit better, but still easily cracked by automated tools.');
    } else if (score < 60) {
      setCrackTime('Several days');
      setFeedback('Getting stronger, but a dedicated hacker could break it.');
    } else if (score < 80) {
      setCrackTime('Hundreds of years');
      setFeedback('Strong! It would take centuries for a normal computer to guess this.');
    } else {
      setCrackTime('Trillions of years');
      setFeedback('Unbreakable. This is a highly secure password/passphrase.');
    }
  };

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const generatePassphrase = () => {
    const phrase = PASSPHRASE_WORDS.map(list => list[Math.floor(Math.random() * list.length)]).join('-');
    setPassword(phrase);
  };

  const getProgressColor = () => {
    if (strength < 20) return 'bg-[#ff3b30]';
    if (strength < 40) return 'bg-[#ff9500]';
    if (strength < 80) return 'bg-[#34c759]';
    return 'bg-[#0066cc]';
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center h-full scale-105 md:scale-125 origin-center">
      
      {/* Simulation Header */}
      <div className="text-center mb-2">
        <h2 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f] mb-1">Password Strength Simulator</h2>
        <p className="text-[14px] text-[#86868b] max-w-lg mx-auto">
          Type a password below to see how an attacker's computer views it. Notice how length defeats complexity.
        </p>
      </div>

      {/* Main Interactive Area */}
      <div className="w-full bg-white rounded-xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-black/[0.02]">
        
        {/* Input */}
        <div className="relative mb-3">
          <input 
            type="text" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password to test..."
            className="w-full text-center text-[20px] font-medium p-2.5 rounded-lg border-2 border-black/5 focus:border-[#0066cc] focus:ring-0 outline-none transition-all placeholder:text-[#86868b]/40 font-mono"
            autoComplete="off"
          />
        </div>

        {/* Results Data */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-[#f5f5f7] p-3 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#86868b] mb-0.5">Time to Crack</span>
            <span className={`text-[18px] font-bold ${strength < 40 ? 'text-[#ff3b30]' : 'text-[#34c759]'}`}>
              {crackTime}
            </span>
          </div>
          <div className="bg-[#f5f5f7] p-3 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#86868b] mb-0.5">Characters</span>
            <span className="text-[18px] font-bold text-[#1d1d1f]">
              {password.length}
            </span>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-3">
          <div className="h-1.5 w-full bg-[#f5f5f7] rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${strength}%` }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
            />
          </div>
          
          <div className="flex items-start mt-2 bg-blue-50 p-2.5 rounded-lg">
            {isDictionary ? (
              <ShieldAlert className="w-4 h-4 text-[#ff3b30] shrink-0 mr-2 mt-0.5" />
            ) : strength > 60 ? (
              <ShieldCheck className="w-4 h-4 text-[#34c759] shrink-0 mr-2 mt-0.5" />
            ) : (
              <Zap className="w-4 h-4 text-[#ff9500] shrink-0 mr-2 mt-0.5" />
            )}
            <p className="text-[13px] font-medium text-[#1d1d1f] leading-snug">
              {feedback}
            </p>
          </div>
        </div>

        {/* Passphrase Generator */}
        <div className="text-center mt-2 border-t border-black/5 pt-3">
          <button 
            onClick={generatePassphrase}
            className="inline-flex items-center px-4 py-2 bg-[#1d1d1f] text-white rounded-full font-medium text-[13px] hover:bg-[#000000] transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Generate Passphrase
          </button>
        </div>

      </div>
    </div>
  );
}
