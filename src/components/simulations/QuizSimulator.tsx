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
    question: "You receive an email from 'IT Support' saying your account will be deleted in 24 hours unless you click a link to verify your password. What should you do?",
    options: [
      "Click the link and quickly verify your password to save your account.",
      "Reply to the email and ask if it's real.",
      "Ignore the email and directly contact your IT department using their known phone number or official portal.",
      "Forward it to all your coworkers to warn them."
    ],
    correctAnswerIndex: 2,
    explanation: "This is a classic phishing attempt using extreme urgency. Never click the link. Always verify directly through official channels."
  },
  {
    id: 2,
    question: "Which of the following makes a strong, secure password?",
    options: [
      "Your pet's name followed by '123' (e.g., Fluffy123).",
      "A short, easy-to-remember word.",
      "A long passphrase (12+ characters) that combines unexpected words, numbers, and symbols.",
      "The same password you use for your Netflix account."
    ],
    correctAnswerIndex: 2,
    explanation: "Length is the most important factor in password security. Using a long, unique passphrase with mixed characters is the best defense."
  },
  {
    id: 3,
    question: "You are at a coffee shop and see an open Wi-Fi network called 'Free_Coffee_Shop_WiFi'. Is it safe to log into your bank account on this network?",
    options: [
      "Yes, as long as the coffee shop looks legitimate.",
      "Yes, if the website has a padlock icon.",
      "No, open public networks are easily intercepted by attackers. You should use a VPN or cellular data instead.",
      "No, because coffee shop Wi-Fi is usually too slow."
    ],
    correctAnswerIndex: 2,
    explanation: "Open, unencrypted Wi-Fi networks can be sniffed by attackers on the same network. Never access sensitive accounts without a VPN on public Wi-Fi."
  },
  {
    id: 4,
    question: "You receive a frantic voicemail from your 'grandson' saying he is in jail and needs you to wire $5,000 immediately for bail. His voice sounds exactly like him. What is the most likely scenario?",
    options: [
      "He is actually in jail and needs your help.",
      "It is a prank call from his friends.",
      "It is an AI voice cloning scam. Scammers cloned his voice from a social media video.",
      "The phone company made a mistake connecting the call."
    ],
    correctAnswerIndex: 2,
    explanation: "AI voice cloning is cheap and easy. Scammers only need a few seconds of audio to fake a voice. Always use a family 'Safe Word' to verify."
  },
  {
    id: 5,
    question: "What does the padlock icon next to a website URL actually mean?",
    options: [
      "The website is 100% safe and trustworthy.",
      "The website cannot have viruses.",
      "Your connection to the website is encrypted and private from eavesdroppers.",
      "The website is owned by a verified company."
    ],
    correctAnswerIndex: 2,
    explanation: "The padlock only means the connection is encrypted (HTTPS). Scammers can easily get a padlock for their fake, malicious websites."
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
          <span className="font-black text-xl tracking-widest text-white">FINAL ASSESSMENT</span>
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

              <h1 className="text-4xl font-black text-white mb-2">CERTIFICATE OF COMPLETION</h1>
              <p className="text-xl text-slate-400 mb-8">Cyber Awareness Lab</p>

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full mb-8 flex justify-center items-center gap-8 shadow-xl">
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-400 uppercase mb-1">Final Score</div>
                  <div className="text-4xl font-black text-emerald-400 font-mono">{score} / {QUESTIONS.length}</div>
                </div>
                <div className="h-16 w-px bg-slate-700"></div>
                <div className="text-left">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Zero Trust</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Verify First</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold">Stay Secure</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={reset}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold"
              >
                <RefreshCcw className="w-4 h-4" /> Retake Assessment
              </button>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
