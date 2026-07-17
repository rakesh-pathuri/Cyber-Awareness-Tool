import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { studentCurriculum, type StudentModule } from '../data/studentModuleData';

// Import Simulators
import IntroSimulator from '../components/simulations/IntroSimulator';
import PasswordSimulator from '../components/simulations/PasswordSimulator';
import PhishingSimulator from '../components/simulations/PhishingSimulator';
import FakeLoginSimulator from '../components/simulations/FakeLoginSimulator';
import RansomwareSimulator from '../components/simulations/RansomwareSimulator';
import SpywareSimulator from '../components/simulations/SpywareSimulator';
import BrowserSimulator from '../components/simulations/BrowserSimulator';
import WifiSimulator from '../components/simulations/WifiSimulator';
import USBSimulator from '../components/simulations/USBSimulator';
import QRSimulator from '../components/simulations/QRSimulator';
import SocialSimulator from '../components/simulations/SocialSimulator';
import DigitalFootprintSimulator from '../components/simulations/DigitalFootprintSimulator';
import AIDeepfakeSimulator from '../components/simulations/AIDeepfakeSimulator';
import EscapeRoomSimulator from '../components/simulations/EscapeRoomSimulator';
import DetectiveSimulator from '../components/simulations/DetectiveSimulator';
import QuizSimulator from '../components/simulations/QuizSimulator';

const getSimulatorComponent = (componentId: string) => {
  switch (componentId) {
    case 'IntroSimulator': return <IntroSimulator />;
    case 'PasswordSimulator': return <PasswordSimulator />;
    case 'PhishingSimulator': return <PhishingSimulator />;
    case 'FakeLoginSimulator': return <FakeLoginSimulator />;
    case 'RansomwareSimulator': return <RansomwareSimulator />;
    case 'SpywareSimulator': return <SpywareSimulator />;
    case 'BrowserSimulator': return <BrowserSimulator />;
    case 'WifiSimulator': return <WifiSimulator />;
    case 'USBSimulator': return <USBSimulator />;
    case 'QRSimulator': return <QRSimulator />;
    case 'SocialSimulator': return <SocialSimulator />;
    case 'DigitalFootprintSimulator': return <DigitalFootprintSimulator />;
    case 'AIDeepfakeSimulator': return <AIDeepfakeSimulator />;
    case 'EscapeRoomSimulator': return <EscapeRoomSimulator />;
    case 'DetectiveSimulator': return <DetectiveSimulator />;
    case 'QuizSimulator': return <QuizSimulator />;
    default: return <div className="p-8 text-white">Simulator component not found: {componentId}</div>;
  }
};

type ViewState = 'grid' | 'module';
type ModuleStep = 'intro' | 'simulation' | 'explanation' | 'tips' | 'quiz';

const MODULE_STEPS: ModuleStep[] = ['intro', 'simulation', 'explanation', 'tips', 'quiz'];

const ScaleWrapper = ({ children, baseHeight = 560 }: { children: React.ReactNode, baseHeight?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const availableHeight = container.clientHeight;
        const availableWidth = container.clientWidth;
        
        const scaleY = availableHeight / baseHeight;
        const scaleX = availableWidth / 1120;
        
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [baseHeight]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        style={{ 
          width: 1120 * scale, 
          height: baseHeight * scale,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', width: 1120, height: baseHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  const { t } = useTranslation();
  const [viewState, setViewState] = useState<ViewState>('grid');
  const [activeModule, setActiveModule] = useState<StudentModule | null>(null);
  const [currentStep, setCurrentStep] = useState<ModuleStep>('intro');
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [shuffledMiniQuizOptions, setShuffledMiniQuizOptions] = useState<{option: string, originalIndex: number}[]>([]);

  const handleModuleSelect = (mod: StudentModule) => {
    setActiveModule(mod);
    setViewState('module');
    setCurrentStep('intro');
    setQuizSelectedOption(null);
    setQuizScore(null);
    
    if (mod.miniQuiz && mod.miniQuiz.length > 0) {
      const originalOptions = mod.miniQuiz[0].options;
      const optionsWithIndices = originalOptions.map((opt, idx) => ({ option: opt, originalIndex: idx }));
      const shuffled = optionsWithIndices.sort(() => Math.random() - 0.5);
      setShuffledMiniQuizOptions(shuffled);
    } else {
      setShuffledMiniQuizOptions([]);
    }
  };

  const handleBackToGrid = () => {
    setViewState('grid');
    setActiveModule(null);
  };

  const nextStep = () => {
    const currentIndex = MODULE_STEPS.indexOf(currentStep);
    if (currentIndex < MODULE_STEPS.length - 1) {
      setCurrentStep(MODULE_STEPS[currentIndex + 1]);
    } else {
      handleBackToGrid();
    }
  };

  const prevStep = () => {
    const currentIndex = MODULE_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(MODULE_STEPS[currentIndex - 1]);
    }
  };

  const handleQuizSelect = (idx: number) => {
    setQuizSelectedOption(idx);
    if (activeModule) {
      const selectedItem = shuffledMiniQuizOptions[idx];
      const isCorrect = selectedItem.originalIndex === activeModule.miniQuiz[0].correctAnswerIndex;
      setQuizScore(isCorrect ? 1 : 0);
    }
  };

  if (viewState === 'grid') {
    return (
      <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-blue-500/30">
        <header className="bg-white/80 backdrop-blur-xl border-b border-black/5 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#1d1d1f]">
              <button 
                onClick={() => window.history.back()}
                className="w-8 h-8 mr-2 rounded-full hover:bg-[#f5f5f7] flex items-center justify-center text-[#86868b] hover:text-[#0066cc] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <img src="/logo.jpg" alt="CAL Logo" className="w-8 h-8 rounded-md object-contain shadow-sm border border-black/5" />
              <span className="text-[19px] font-semibold tracking-tight">| {t('home.title')}</span>
            </div>
            <div className="flex items-center gap-4 text-[13px] font-medium text-[#86868b]">
              <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {studentCurriculum.length} Modules</div>
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> ~45 Mins</div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="text-[40px] leading-tight font-semibold text-[#1d1d1f] tracking-tight mb-4">{t('home.title')} - {t('home.student_mode')}</h1>
            <p className="text-[19px] text-[#86868b] font-medium">{t('home.student_desc')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentCurriculum.map((mod, idx) => (
              <motion.button
                key={mod.id}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleModuleSelect(mod)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-black/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 cursor-pointer hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all flex flex-col text-left group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-5 w-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#0066cc] flex items-center justify-center font-semibold text-xl border border-black/5 shrink-0">
                    {idx}
                  </div>
                  <div className="flex items-center gap-1 text-[#86868b] text-[11px] font-bold uppercase tracking-wider bg-[#f5f5f7] px-2.5 py-1 rounded-md border border-black/5 shrink-0">
                    <Clock className="w-3 h-3" /> {mod.estimatedTime}
                  </div>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 leading-tight group-hover:text-[#0066cc] transition-colors tracking-tight">{mod.title}</h3>
                <p className="text-[15px] text-[#86868b] line-clamp-3 mt-auto leading-relaxed font-medium">
                  {mod.introduction}
                </p>
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!activeModule) return null;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] font-sans flex flex-col selection:bg-blue-500/30">
      
      <header className="h-16 bg-white border-b border-black/5 flex flex-row items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBackToGrid}
            className="w-10 h-10 rounded-full hover:bg-[#f5f5f7] flex items-center justify-center text-[#86868b] hover:text-[#0066cc] transition-colors"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-[14px] font-semibold tracking-tight">
            <img src="/logo.jpg" alt="CAL Logo" className="w-6 h-6 rounded-md object-contain shadow-sm border border-black/5" />
            <span className="text-[#1d1d1f]">| {t('home.title')}</span>
          </div>
        </div>
        <div className="text-[14px] font-semibold text-[#86868b] hidden sm:block pr-4">
          {activeModule.title}
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden bg-[#f5f5f7] z-10">
        <AnimatePresence mode="wait">
          
          {/* INTRO */}
          {currentStep === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12">
                <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
                  <h2 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight mb-6">Introduction</h2>
                  <div className="prose prose-lg max-w-none text-[#1d1d1f] font-medium leading-relaxed">
                    <p>{activeModule.introduction}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SIMULATION */}
          {currentStep === 'simulation' && (
            <motion.div 
              key="sim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 ${activeModule.componentId === 'IntroSimulator' ? 'overflow-y-auto' : 'overflow-hidden bg-[#f5f5f7]'}`}
            >
              {activeModule.componentId === 'IntroSimulator' ? (
                <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12">
                  {getSimulatorComponent(activeModule.componentId)}
                </div>
              ) : (
                <ScaleWrapper baseHeight={560}>
                  {getSimulatorComponent(activeModule.componentId)}
                </ScaleWrapper>
              )}
            </motion.div>
          )}

          {/* EXPLANATION */}
          {currentStep === 'explanation' && (
            <motion.div 
              key="exp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12">
                <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
                  <h2 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight mb-6">How It Works</h2>
                  <div className="prose prose-lg max-w-none text-[#1d1d1f] font-medium leading-relaxed">
                    <p className="whitespace-pre-wrap">{activeModule.explanation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TIPS */}
          {currentStep === 'tips' && (
            <motion.div 
              key="tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12">
                <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
                  <h2 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight mb-6">Key Takeaways</h2>
                  <ul className="space-y-4">
                    {activeModule.safetyTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start bg-[#f5f5f7] p-5 rounded-2xl border border-black/5">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[13px] font-bold mt-0.5 shrink-0 mr-4">
                          {idx + 1}
                        </div>
                        <span className="text-[17px] text-[#1d1d1f] font-medium leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {currentStep === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 overflow-y-auto"
            >
              <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12">
                <div className="max-w-3xl mx-auto w-full bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
                  <div className="mb-8">
                    <span className="text-[#0066cc] font-bold uppercase tracking-wider text-[13px]">Knowledge Check</span>
                    <h2 className="text-[28px] font-semibold text-[#1d1d1f] mt-3 leading-tight tracking-tight">
                      {activeModule.miniQuiz[0].question}
                    </h2>
                  </div>

                  <div className="space-y-3 mb-8">
                    {shuffledMiniQuizOptions.map((item, idx) => {
                      const isCorrect = item.originalIndex === activeModule.miniQuiz[0].correctAnswerIndex;
                      const isSelected = idx === quizSelectedOption;
                      let styleClass = "bg-[#f5f5f7] border-black/5 hover:border-black/20 text-[#1d1d1f]";
                      
                      if (quizScore !== null) {
                        if (isCorrect) styleClass = "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm";
                        else if (isSelected) styleClass = "bg-red-50 border-red-500 text-red-700 shadow-sm";
                        else styleClass = "bg-[#f5f5f7] border-black/5 text-[#86868b] opacity-50";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizSelect(idx)}
                          disabled={quizScore !== null}
                          className={`w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center font-medium ${styleClass}`}
                        >
                          <span className="text-[17px]">{item.option}</span>
                          {quizScore !== null && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                        </button>
                      )
                    })}
                  </div>

                  {quizScore !== null && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`p-6 rounded-2xl border ${quizScore === 1 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}
                    >
                      <h4 className={`font-semibold mb-2 text-[17px] ${quizScore === 1 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {quizScore === 1 ? 'Correct!' : 'Incorrect'}
                      </h4>
                      <p className="text-[#1d1d1f] font-medium leading-relaxed">{activeModule.miniQuiz[0].explanation}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="h-16 bg-white border-t border-black/5 flex items-center justify-between px-8 shrink-0 z-50">
        <button
          onClick={prevStep}
          disabled={currentStep === 'intro'}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            currentStep === 'intro' ? 'text-[#86868b]/30 cursor-not-allowed' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Previous
        </button>
        
        <span className="text-[13px] font-bold tracking-widest uppercase text-[#86868b]">
          Step {MODULE_STEPS.indexOf(currentStep) + 1} / {MODULE_STEPS.length}
        </span>

        <button
          onClick={nextStep}
          disabled={currentStep === 'quiz' && quizScore === null}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            (currentStep === 'quiz' && quizScore === null) ? 'text-[#86868b]/30 cursor-not-allowed' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
          }`}
        >
          {currentStep === 'quiz' ? 'Complete' : 'Next'} <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </footer>
    </div>
  );
}
