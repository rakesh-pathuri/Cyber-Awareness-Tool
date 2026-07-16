import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Image as ImageIcon, Mic, MessageSquare, AlertTriangle, CheckCircle, XCircle, ChevronRight, ShieldCheck, RefreshCcw } from 'lucide-react';

type Challenge = {
  id: string;
  type: 'image' | 'audio' | 'text';
  title: string;
  content: string;
  imageUrl?: string;
  isFake: boolean;
  explanation: string;
  tells: string[];
};

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    type: 'audio',
    title: 'Urgent Voicemail',
    content: '"Grandma? It\'s me. I was in a car accident and I\'m in jail. Please wire $5,000 for bail right now. Don\'t tell Mom and Dad, please. I\'m scared."',
    isFake: true,
    explanation: 'This is a Voice Cloning scam. Scammers only need 3 seconds of someone\'s voice (from a TikTok or Instagram video) to clone it using AI.',
    tells: ['Creates false sense of extreme urgency', 'Asks for untraceable payment (wire transfer/gift cards)', 'Demands secrecy ("Don\'t tell Mom")']
  },
  {
    id: 'c2',
    type: 'image',
    title: 'News Photo: "Shark in Flooded Street"',
    content: 'A viral photo of a massive Great White Shark swimming down a flooded suburban street during a hurricane.',
    imageUrl: '/images/fake_shark.png',
    isFake: true,
    explanation: 'AI image generators struggle with physics and context. While glancing at it seems real, looking closely reveals it\'s AI generated.',
    tells: ['The lighting on the shark does not match the cloudy environment', 'The water ripples around the shark are unnatural', 'The scale of the shark is completely wrong compared to the cars']
  },
  {
    id: 'c3',
    type: 'text',
    title: 'Message from a friend',
    content: '"Hey! I know it\'s late but I got locked out of my bank account. Can you Venmo me $50 for a cab home? I\'ll pay you back tomorrow at school."',
    isFake: false,
    explanation: 'This is a common social engineering tactic, but the message itself isn\'t AI generated. However, it still requires VERIFICATION before acting.',
    tells: ['Always call the friend on the phone to verify it\'s actually them before sending money!']
  },
  {
    id: 'c4',
    type: 'image',
    title: 'YouTuber Console Giveaway',
    content: 'A YouTube thumbnail showing a famous gamer giving away free PS5 consoles to anyone who clicks the link.',
    imageUrl: '/images/fake_giveaway.png',
    isFake: true,
    explanation: 'This is a Deepfake/AI image scam. Scammers use AI to clone famous creators to endorse fake giveaways and steal information.',
    tells: ['The person\'s face has a slightly robotic, plastic texture', 'The text on the boxes might be misspelled or strange', 'Too good to be true offer']
  }
];

export default function AIDeepfakeSimulator() {
  const [phase, setPhase] = useState<'intro' | 'game' | 'postmortem'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const currentChallenge = CHALLENGES[currentIndex];

  const handleGuess = (guessIsFake: boolean) => {
    setSelectedAnswer(guessIsFake);
    setShowResult(true);
    if (guessIsFake === currentChallenge.isFake) {
      setScore(s => s + 1);
    }
  };

  const nextChallenge = () => {
    if (currentIndex < CHALLENGES.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      setPhase('postmortem');
    }
  };

  const reset = () => {
    setPhase('intro');
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-slate-900 flex flex-col rounded-xl shadow-2xl border border-slate-700 overflow-hidden font-sans text-slate-100">
      
      {/* Header */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-purple-500" />
          <span className="font-black text-xl tracking-widest text-white">SYNTH-DETECT</span>
          <span className="bg-purple-900/50 text-purple-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded ml-2 border border-purple-700/50">
            v2.4 AI Analysis
          </span>
        </div>
        {phase === 'game' && (
          <div className="text-slate-400 text-sm font-bold bg-slate-900 px-4 py-1 rounded-full border border-slate-800">
            Score: <span className="text-purple-400">{score}</span> / {CHALLENGES.length}
          </div>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
        
        {/* INTRO */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-24 h-24 bg-purple-900/30 rounded-full flex items-center justify-center mb-8 border-4 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <BrainCircuit className="w-12 h-12 text-purple-400" />
              </div>
              <h2 className="text-4xl font-black mb-4 text-white">Can You Spot The Deepfake?</h2>
              <p className="text-xl text-slate-300 max-w-2xl mb-12">
                Generative AI makes it easier than ever to create fake audio, images, and video. You will be presented with 4 scenarios. Your job is to determine if they are REAL or FAKE.
              </p>
              <button 
                onClick={() => setPhase('game')}
                className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-full font-black text-xl flex items-center gap-3 shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-transform hover:scale-105"
              >
                Start Detection <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GAME PHASE */}
        <AnimatePresence mode="wait">
          {phase === 'game' && (
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col p-5"
            >
              <div className="text-purple-400 font-bold mb-3 flex justify-between items-center text-sm shrink-0">
                <span>Case File #{currentIndex + 1}</span>
                <span className="text-slate-500">{currentIndex + 1} of {CHALLENGES.length}</span>
              </div>
              
              <div className="flex-1 flex gap-5 overflow-hidden">
                {/* Media Preview Area */}
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col relative overflow-hidden shadow-inner min-h-0">
                  {/* Fake media player top bar */}
                  <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                    <div className="mx-auto text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                      {currentChallenge.type === 'audio' ? 'voicemail.mp3' : currentChallenge.type === 'image' ? 'attachment.jpg' : 'message.txt'}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center p-4 text-center overflow-y-auto">
                    {currentChallenge.type === 'audio' && <Mic className="w-12 h-12 text-slate-600 mb-3 shrink-0" />}
                    {currentChallenge.type === 'image' && !currentChallenge.imageUrl && <ImageIcon className="w-12 h-12 text-slate-600 mb-3 shrink-0" />}
                    {currentChallenge.type === 'image' && currentChallenge.imageUrl && (
                      <img src={currentChallenge.imageUrl} alt={currentChallenge.title} className="max-h-40 object-contain rounded-xl border border-slate-700 mb-3 shadow-lg shrink-0" />
                    )}
                    {currentChallenge.type === 'text' && <MessageSquare className="w-12 h-12 text-slate-600 mb-3 shrink-0" />}
                    
                    <h3 className="text-xl font-bold text-white mb-3 shrink-0">{currentChallenge.title}</h3>
                    
                    {currentChallenge.type === 'audio' ? (
                       <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-full relative group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">▶</div>
                            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                               <div className="w-1/3 h-full bg-blue-400"></div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">0:14 / 0:42</div>
                          </div>
                          <p className="text-sm italic text-slate-300">Transcript: {currentChallenge.content}</p>
                       </div>
                    ) : (
                       <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-full">
                          <p className="text-sm text-slate-200">{currentChallenge.content}</p>
                       </div>
                    )}
                  </div>
                </div>

                {/* Interaction Area */}
                <div className="w-72 flex flex-col justify-center gap-3 shrink-0 min-h-0">
                  {!showResult ? (
                    <>
                      <h3 className="text-xl font-black text-center mb-2">Make Your Call</h3>
                      <button 
                        onClick={() => handleGuess(false)}
                        className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 text-white p-5 rounded-2xl font-black text-lg transition-all hover:border-green-500 hover:text-green-400"
                      >
                        ✅ REAL
                      </button>
                      <button 
                        onClick={() => handleGuess(true)}
                        className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 text-white p-5 rounded-2xl font-black text-lg transition-all hover:border-red-500 hover:text-red-400"
                      >
                        ❌ FAKE / AI
                      </button>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex flex-col h-full overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-3 shrink-0">
                        {selectedAnswer === currentChallenge.isFake ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                        <h3 className="font-black text-lg">
                          {selectedAnswer === currentChallenge.isFake ? 'CORRECT' : 'INCORRECT'}
                        </h3>
                      </div>

                      <div className="flex-1 overflow-y-auto pr-1">
                        <div className="mb-3">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Truth:</span>
                          <span className={`font-black text-sm ${currentChallenge.isFake ? 'text-red-400' : 'text-green-400'}`}>
                            {currentChallenge.isFake ? 'It is AI Generated (FAKE)' : 'It is REAL'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 mb-4">{currentChallenge.explanation}</p>
                        
                        {currentChallenge.tells.length > 0 && (
                          <div className="mb-4">
                            <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">The "Tells":</span>
                            <ul className="space-y-1.5">
                              {currentChallenge.tells.map((tell, idx) => (
                                <li key={idx} className="text-[10px] leading-tight text-slate-300 flex gap-1.5 items-start bg-slate-900 p-1.5 rounded border border-slate-700">
                                  <AlertTriangle className="w-3 h-3 text-yellow-500 shrink-0 mt-0.5" />
                                  <span>{tell}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 shrink-0 border-t border-slate-700 mt-2">
                        <button 
                          onClick={nextChallenge}
                          className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* POSTMORTEM */}
        <AnimatePresence>
          {phase === 'postmortem' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-white"
            >
              <ShieldCheck className="w-16 h-16 text-purple-400 mb-4 drop-shadow-lg" />
              <h2 className="text-4xl font-black mb-2 text-center">TRUST, BUT VERIFY.</h2>
              <p className="text-lg mb-6 font-medium text-center text-slate-300 max-w-2xl">
                You scored {score} out of {CHALLENGES.length}. AI is getting so good that relying on your eyes and ears is no longer enough.
              </p>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl max-w-3xl w-full flex flex-col gap-4 shadow-xl">
                
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-700"><Mic className="w-6 h-6 text-blue-400" /></div>
                  <div>
                    <strong className="block text-xl text-blue-400 mb-1">Create a "Safe Word"</strong>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Voice cloning is the #1 tool for scammers targeting families. Have a secret family password. If someone calls claiming to be a family member in an emergency and needing money, ask them for the safe word. If they don't know it, hang up immediately.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-700"><ImageIcon className="w-6 h-6 text-pink-400" /></div>
                  <div>
                    <strong className="block text-xl text-pink-400 mb-1">Look for Glitches</strong>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      For AI images and videos, always zoom in on hands, teeth, and background text. AI struggles with physics—shadows might go the wrong direction, text will look like a made-up language, and hands often have too many fingers.
                    </p>
                  </div>
                </div>

              </div>

              <button 
                onClick={reset}
                className="mt-8 flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-black text-lg transition-colors hover:scale-105 transform duration-200"
              >
                <RefreshCcw className="w-5 h-5" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
