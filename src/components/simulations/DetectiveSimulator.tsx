import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Timer, Award, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

type Scenario = {
  id: string;
  content: string;
  type: 'email' | 'sms' | 'browser';
  isSafe: boolean;
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    type: 'email',
    content: 'From: free-robux-admin@gmail.com\nSubject: Your Free Robux!\nClick here right now to claim your 10,000 Robux or your account will be deleted!',
    isSafe: false,
    explanation: 'Real game admins will never use a free Gmail address, and they never threaten to delete your account to make you hurry.'
  },
  {
    id: 's2',
    type: 'browser',
    content: 'URL: https://www.netflix.com/login\nPage says: "Welcome to Netflix. Please enter your Email and Password to watch movies."',
    isSafe: true,
    explanation: 'The website name is correct (netflix.com). This is the real login page.'
  },
  {
    id: 's3',
    type: 'sms',
    content: 'Postal Service: Your new phone delivery failed. Pay $2 for delivery here: http://post-office-delivery-fake.net',
    isSafe: false,
    explanation: 'The post office doesn\'t text you asking for money, and the link looks completely fake!'
  },
  {
    id: 's4',
    type: 'email',
    content: 'From: roblox-support@roblox.com\nSubject: Password Reset\nSomeone tried to log into your account. If this wasn\'t you, reset your password here: https://roblox.com/reset',
    isSafe: true,
    explanation: 'The sender email is really from roblox.com and the link goes to the real website.'
  },
  {
    id: 's5',
    type: 'browser',
    content: 'URL: http://free-vbucks.fortnite.com.fake-scam-site.net/\nPage says: "Enter your Epic Games password to get your V-Bucks."',
    isSafe: false,
    explanation: 'The real website is at the END of the link (\'fake-scam-site.net\'), not \'fortnite.com\'. This is a trick!'
  },
  {
    id: 's6',
    type: 'sms',
    content: 'Hey it\'s your friend Alex. I dropped my phone in the toilet. Can you text me your Netflix password so I can watch a movie?',
    isSafe: false,
    explanation: 'Hackers pretend to be your friends using new phone numbers. Never send passwords over text!'
  },
  {
    id: 's7',
    type: 'email',
    content: 'From: teacher@yourschool.edu\nSubject: Homework for Tomorrow\nPlease read chapter 4 for tomorrow\'s class. No reply needed.',
    isSafe: true,
    explanation: 'Emails from real school addresses that don\'t ask for passwords or have weird links are usually safe.'
  }
];

export default function DetectiveSimulator() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'review'>('intro');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentQueue, setCurrentQueue] = useState<Scenario[]>([]);
  const [history, setHistory] = useState<{ scenario: Scenario, guessedSafe: boolean, correct: boolean }[]>([]);

  // Initialize queue
  useEffect(() => {
    if (gameState === 'intro') {
      // Shuffle scenarios
      setCurrentQueue([...SCENARIOS].sort(() => Math.random() - 0.5));
    }
  }, [gameState]);

  // Timer logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === 'playing' && timeLeft > 0 && currentQueue.length > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 || (gameState === 'playing' && currentQueue.length === 0)) {
      setGameState('review');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, currentQueue]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setHistory([]);
  };

  const handleGuess = (guessIsSafe: boolean) => {
    if (currentQueue.length === 0) return;
    
    const current = currentQueue[0];
    const isCorrect = guessIsSafe === current.isSafe;
    
    if (isCorrect) {
      setScore(s => s + 100);
    } else {
      // Penalty for wrong answers
      setTimeLeft(t => Math.max(0, t - 5));
    }

    setHistory(prev => [...prev, { scenario: current, guessedSafe: guessIsSafe, correct: isCorrect }]);
    setCurrentQueue(prev => prev.slice(1));
  };

  const getRank = () => {
    const accuracy = history.length > 0 ? (history.filter(h => h.correct).length / history.length) * 100 : 0;
    if (score === SCENARIOS.length * 100) return 'Master Detective';
    if (score >= 400 && accuracy >= 80) return 'Smart Scout';
    if (score > 0) return 'Beginner Sleuth';
    return 'Easy Target';
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-slate-900 flex flex-col rounded-xl shadow-2xl border border-slate-700 overflow-hidden font-sans text-slate-100">
      
      {/* Header */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-500" />
          <span className="font-black text-xl tracking-widest text-white">SCAM DETECTIVE</span>
        </div>
        
        {gameState === 'playing' && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold text-sm uppercase">Score</span>
              <span className="text-2xl font-black text-blue-400 font-mono">{score}</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${timeLeft <= 10 ? 'bg-red-900/30 border-red-500/50 text-red-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-white'}`}>
              <Timer className="w-5 h-5" />
              <span className="text-xl font-black font-mono">0:{timeLeft.toString().padStart(2, '0')}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950">
        <AnimatePresence mode="wait">
          
          {/* INTRO */}
          {gameState === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 border border-blue-500/50">
                <ShieldAlert className="w-12 h-12 text-blue-400" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">SPEED ROUND</h2>
              <p className="text-slate-300 max-w-lg mb-8 text-lg">
                You have 60 seconds to spot the scams! Get it wrong and you lose 5 seconds. Trust your instincts!
              </p>
              <button 
                onClick={startGame}
                className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-xl font-black text-xl tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                START TIMER
              </button>
            </motion.div>
          )}

          {/* PLAYING */}
          {gameState === 'playing' && currentQueue.length > 0 && (
            <motion.div 
              key={currentQueue[0].id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              className="absolute inset-0 flex flex-col p-8"
            >
              <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
                
                <div className="flex-1 bg-slate-800 border border-slate-600 rounded-2xl p-8 shadow-2xl flex flex-col justify-center relative">
                  <div className="absolute top-4 left-4 bg-slate-700 px-3 py-1 rounded text-xs font-bold uppercase text-slate-300">
                    {currentQueue[0].type} INTERCEPT
                  </div>
                  
                  <p className="text-xl text-white font-mono whitespace-pre-wrap leading-relaxed">
                    {currentQueue[0].content}
                  </p>
                </div>

                <div className="flex gap-6 mt-8 h-24">
                  <button 
                    onClick={() => handleGuess(true)}
                    className="flex-1 bg-slate-800 hover:bg-green-900/40 border-2 border-slate-700 hover:border-green-500 rounded-2xl flex flex-col items-center justify-center group transition-all"
                  >
                    <ShieldCheck className="w-8 h-8 text-slate-400 group-hover:text-green-400 mb-1 transition-colors" />
                    <span className="font-black text-xl text-slate-300 group-hover:text-green-400 transition-colors">SAFE</span>
                  </button>
                  <button 
                    onClick={() => handleGuess(false)}
                    className="flex-1 bg-slate-800 hover:bg-red-900/40 border-2 border-slate-700 hover:border-red-500 rounded-2xl flex flex-col items-center justify-center group transition-all"
                  >
                    <AlertTriangle className="w-8 h-8 text-slate-400 group-hover:text-red-400 mb-1 transition-colors" />
                    <span className="font-black text-xl text-slate-300 group-hover:text-red-400 transition-colors">SUSPICIOUS</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* REVIEW */}
          {gameState === 'review' && (
            <motion.div 
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col p-6 overflow-hidden"
            >
              <div className="flex gap-8 h-full">
                {/* Left Panel: Score */}
                <div className="w-1/3 bg-slate-800 rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center text-center">
                  <Award className="w-20 h-20 text-yellow-500 mb-4" />
                  <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-1">Final Rank</h3>
                  <h2 className="text-3xl font-black text-white mb-8">{getRank()}</h2>
                  
                  <div className="text-6xl font-black text-blue-400 font-mono mb-2">{score}</div>
                  <div className="text-slate-400 font-bold uppercase text-sm mb-8">Total Score</div>

                  <button 
                    onClick={() => setGameState('intro')}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Play Again <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Right Panel: History */}
                <div className="w-2/3 flex flex-col h-full">
                  <h3 className="text-xl font-black text-white mb-4">How You Did</h3>
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {history.map((h, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${h.correct ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 mt-1">
                            {h.correct ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-mono line-clamp-1 mb-1">{h.scenario.content}</p>
                            <p className="text-sm text-slate-200">{h.scenario.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {history.length === 0 && (
                      <div className="text-slate-500 italic text-center mt-10">No scenarios analyzed.</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
