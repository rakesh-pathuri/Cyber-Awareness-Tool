import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, CheckCircle2, XCircle, Award, RefreshCcw, ShieldCheck, ChevronRight } from 'lucide-react';

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "You get an email saying your game account will be deleted if you don't click a link right now. What should you do?",
    options: [
      "Click the link and quickly verify your password to save your account.",
      "Reply to the email and ask if it's real.",
      "Don't click! Tell a parent or teacher to help you check if it's real.",
      "Forward it to all your coworkers to warn them."
    ],
    correctAnswerIndex: 2,
    explanation: "Hackers try to scare you so you act fast. Never click strange links!"
  },
  {
    id: 2,
    question: "What makes a super strong password?",
    options: [
      "Your pet's name followed by '123' (e.g., Fluffy123).",
      "A short, easy-to-remember word.",
      "A long secret phrase with weird words, numbers, and symbols (like PurpleMonkey45!).",
      "The same password you use for your Netflix account."
    ],
    correctAnswerIndex: 2,
    explanation: "Long passwords are the hardest for hacker robots to guess!"
  },
  {
    id: 3,
    question: "You see a free Wi-Fi at a cafe. Should you log into your game on it?",
    options: [
      "Yes, as long as the coffee shop looks legitimate.",
      "Yes, if the website has a padlock icon.",
      "No way! Hackers on the same Wi-Fi can see your passwords.",
      "No, because coffee shop Wi-Fi is usually too slow."
    ],
    correctAnswerIndex: 2,
    explanation: "Open Wi-Fi is like shouting your secrets in a crowded room. Use a Magic Tunnel (VPN) if you have to use it!"
  },
  {
    id: 4,
    question: "You hear a video online of someone famous saying they are giving away free stuff. Their voice sounds super real. What is it?",
    options: [
      "They are actually giving away free stuff.",
      "It is just a prank video.",
      "It's an AI fake! Hackers used a computer to copy their voice.",
      "The video is a mistake."
    ],
    correctAnswerIndex: 2,
    explanation: "Computers can easily fake voices and faces now. Don't believe everything you see or hear online!"
  },
  {
    id: 5,
    question: "What does the little lock icon next to a website name mean?",
    options: [
      "The website is 100% safe and trustworthy.",
      "The website cannot have viruses.",
      "Your messages to the website are locked in a safe.",
      "The website is owned by a verified company."
    ],
    correctAnswerIndex: 2,
    explanation: "The lock just means your messages are hidden, but fake hacker websites can have locks too!"
  }
];

export default function QuizSimulator() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIdx];

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelectedOption(idx);
    setShowAnswer(true);
    
    if (idx === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(i => i + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-slate-900 flex flex-col rounded-xl shadow-2xl border border-slate-700 overflow-hidden font-sans text-slate-100">
      
      {/* Header */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-emerald-500" />
          <span className="font-black text-xl tracking-widest text-white">FINAL QUIZ</span>
        </div>
        {!isFinished && (
          <div className="text-sm font-bold text-slate-400">
            Question {currentQuestionIdx + 1} of {QUESTIONS.length}
          </div>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 p-8">
        <AnimatePresence mode="wait">
          
          {!isFinished ? (
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col max-w-4xl mx-auto"
            >
              <h2 className="text-xl font-bold text-white mb-4 leading-relaxed shrink-0">
                {currentQuestion.question}
              </h2>

              <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 pb-2">
                {currentQuestion.options.map((option, idx) => {
                  let buttonStyle = "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500";
                  let icon = null;

                  if (showAnswer) {
                    if (idx === currentQuestion.correctAnswerIndex) {
                      buttonStyle = "bg-emerald-900/30 border-emerald-500/50 text-emerald-400";
                      icon = <CheckCircle2 className="w-5 h-5 shrink-0" />;
                    } else if (idx === selectedOption) {
                      buttonStyle = "bg-red-900/30 border-red-500/50 text-red-400";
                      icon = <XCircle className="w-5 h-5 shrink-0" />;
                    } else {
                      buttonStyle = "bg-slate-900/50 border-slate-800 text-slate-600 opacity-50";
                    }
                  } else {
                    if (selectedOption === idx) {
                      buttonStyle = "bg-blue-900/30 border-blue-500 text-blue-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showAnswer}
                      className={`text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between group gap-4 shrink-0 ${buttonStyle}`}
                    >
                      <span className="text-sm leading-snug">{option}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {showAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-4 border-t border-slate-700 flex gap-4 items-start shrink-0"
                >
                  <div className="flex-1">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-emerald-400 mr-2">Explanation:</span>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  <button 
                    onClick={nextQuestion}
                    className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

            </motion.div>
          ) : (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full"></div>
                <div className="relative w-32 h-32 bg-slate-800 border-4 border-emerald-500 rounded-full flex items-center justify-center">
                  <Award className="w-16 h-16 text-emerald-400" />
                </div>
              </div>

              <h1 className="text-4xl font-black text-white mb-2">YOU BEAT THE HACKERS!</h1>
              <p className="text-xl text-slate-400 mb-8">Cyber Awareness Tool</p>

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full mb-8 flex justify-center items-center gap-8 shadow-xl">
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-400 uppercase mb-1">Final Score</div>
                  <div className="text-4xl font-black text-emerald-400 font-mono">{score} / {QUESTIONS.length}</div>
                </div>
                <div className="h-16 w-px bg-slate-700"></div>
                <div className="text-left">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Trust No Stranger</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Think Before Clicking</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Keep Secrets Safe</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={reset}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold"
              >
                <RefreshCcw className="w-4 h-4" /> Play Again
              </button>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
