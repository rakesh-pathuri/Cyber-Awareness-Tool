import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Presentation, CheckCircle, Info, Star, PlayCircle, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { curriculum } from '../data/curriculum';
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

type ViewMode = 'preparation' | 'presentation';

const ScaleWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        // The intrinsic height of our largest simulators is around 550px.
        // We calculate how much we need to scale down to fit the container.
        const availableHeight = container.clientHeight;
        const availableWidth = container.clientWidth;
        
        // We want to fit a 1100x550 component perfectly without scrolling.
        const scaleY = (availableHeight - 60) / 550; // extra padding for height
        const scaleX = (availableWidth - 60) / 1100; // extra padding for width
        
        // Scale to fit the container perfectly
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <div 
        style={{ 
          width: 1100 * scale, 
          height: 550 * scale,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center', width: 1100, height: 550, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function TeacherDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>('module-0');
  const [viewMode, setViewMode] = useState<ViewMode>('preparation');
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitioningTo, setTransitioningTo] = useState<string | null>(null);

  const currentModuleIndex = curriculum.findIndex(item => item.id === activeId);
  const activeItem = curriculum[currentModuleIndex] || curriculum[0];

  const renderBulletList = (title: string, items: string[] | undefined, icon: React.ReactNode, colorClass: string) => {
    if (!items || items.length === 0) return null;
    return (
      <section className="mb-8">
        <h3 className={`text-[13px] uppercase tracking-wider font-bold mb-3 flex items-center ${colorClass}`}>
          {icon} <span className="ml-2">{title}</span>
        </h3>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className={`mr-3 mt-1 ${colorClass}`}>•</span>
              <span className="text-[15px] leading-relaxed text-[#1d1d1f]">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const handleNextSlide = () => {
    if (transitioningTo) return;
    if (slideIndex < (activeItem.slides?.length || 0) - 1) {
      setSlideIndex(prev => prev + 1);
    } else if (currentModuleIndex < curriculum.length - 1) {
      const nextModule = curriculum[currentModuleIndex + 1];
      setTransitioningTo(nextModule.title);
      setTimeout(() => {
        setActiveId(nextModule.id);
        setSlideIndex(0);
        setTransitioningTo(null);
      }, 1500);
    }
  };

  const handlePrevSlide = () => {
    if (transitioningTo) return;
    if (slideIndex > 0) {
      setSlideIndex(prev => prev - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = curriculum[currentModuleIndex - 1];
      setTransitioningTo(prevModule.title);
      setTimeout(() => {
        setActiveId(prevModule.id);
        setSlideIndex(Math.max(0, (prevModule.slides?.length || 1) - 1));
        setTransitioningTo(null);
      }, 1500);
    }
  };

  const renderPresentationMode = () => {
    const slides = activeItem.slides || [];
    const currentSlide = slides[slideIndex];

    if (!currentSlide) {
      return (
        <div className="absolute inset-0 bg-white flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <h1 className="text-[48px] font-semibold tracking-tight mb-4 text-[#1d1d1f] text-center">
              {activeItem.title.split('. ')[1]}
            </h1>
            <p className="text-[20px] text-[#86868b] max-w-2xl mx-auto text-center leading-relaxed">
              {activeItem.simulationDescription}
            </p>
            <p className="text-[14px] text-[#0066cc] mt-8 font-medium">
              (Slides for this module are currently being developed)
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-[#f5f5f7] flex flex-col overflow-hidden">
        
        {/* Top Navigation Bar - FIXED */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-8 shrink-0 z-50">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-[#0066cc] hover:text-[#004499] font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Home
          </button>

          <div className="flex bg-[#f5f5f7] p-1 rounded-lg border border-black/5 shadow-inner">
            <button
              onClick={() => setViewMode('preparation')}
              className={`flex items-center px-4 py-1.5 rounded-md text-[14px] font-medium transition-all ${
                viewMode === 'preparation' ? 'bg-white shadow-sm text-[#1d1d1f]' : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Preparation Mode
            </button>
            <button
              onClick={() => setViewMode('presentation')}
              className={`flex items-center px-4 py-1.5 rounded-md text-[14px] font-medium transition-all ${
                viewMode === 'presentation' ? 'bg-[#0066cc] shadow-sm text-white' : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <Presentation className="w-4 h-4 mr-2" /> Presentation Mode
            </button>
          </div>
          <div className="flex items-center space-x-2 text-[14px] font-semibold tracking-tight">
            <span className="text-[#1d1d1f]">{t('home.title')} |</span>
            <img src="/logo.jpg" alt="CAL Logo" className="w-6 h-6 rounded-md object-contain shadow-sm border border-black/5" />
          </div>
        </header>

        {/* Slideshow Content Area - STRICTLY CONFINED */}
        <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4 min-h-0 z-10">
          
          {/* Module Transition Overlay */}
          <AnimatePresence>
            {transitioningTo && (
              <motion.div 
                className="absolute inset-0 z-[100] bg-[#1d1d1f] flex flex-col items-center justify-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                 <p className="text-[14px] uppercase tracking-[0.2em] text-white/50 mb-4 font-bold">Up Next</p>
                 <h1 className="text-[48px] font-semibold tracking-tight">{transitioningTo}</h1>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <ScaleWrapper>
                {currentSlide.type === 'visual' && (
                  <div className="bg-white rounded-3xl p-16 shadow-sm border border-black/5 max-w-4xl w-full text-center">
                    <h2 className="text-[56px] font-semibold tracking-tight mb-8 text-[#1d1d1f] leading-tight">
                      {currentSlide.title}
                    </h2>
                    <p className="text-[28px] leading-relaxed text-[#86868b] font-medium whitespace-pre-wrap">
                      {currentSlide.content}
                    </p>
                  </div>
                )}

                {currentSlide.type === 'simulation' && currentSlide.componentId === 'PasswordSimulator' && (
                  <PasswordSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'PhishingSimulator' && (
                  <PhishingSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'FakeLoginSimulator' && (
                  <FakeLoginSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'RansomwareSimulator' && (
                  <RansomwareSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'SpywareSimulator' && (
                  <SpywareSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'BrowserSimulator' && (
                  <BrowserSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'WifiSimulator' && (
                  <WifiSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'USBSimulator' && (
                  <USBSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'QRSimulator' && (
                  <QRSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'SocialSimulator' && (
                  <SocialSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'DigitalFootprintSimulator' && (
                  <DigitalFootprintSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'AIDeepfakeSimulator' && (
                  <AIDeepfakeSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'EscapeRoomSimulator' && (
                  <EscapeRoomSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'DetectiveSimulator' && (
                  <DetectiveSimulator />
                )}
                {currentSlide.type === 'simulation' && currentSlide.componentId === 'QuizSimulator' && (
                  <QuizSimulator />
                )}
              </ScaleWrapper>
            </motion.div>
          </AnimatePresence>

        </main>

        {/* Slideshow Controls Bar */}
        <div className="h-16 bg-white border-t border-black/5 flex items-center justify-between px-8 shrink-0 z-50">
          <button
            onClick={handlePrevSlide}
            disabled={slideIndex === 0 && currentModuleIndex === 0}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              (slideIndex === 0 && currentModuleIndex === 0) ? 'text-[#86868b]/30 cursor-not-allowed' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Previous
          </button>

          <span className="text-[13px] font-bold tracking-widest uppercase text-[#86868b]">
            {activeItem.title.split('. ')[1]} • Slide {slideIndex + 1} of {slides.length}
          </span>

          <button
            onClick={handleNextSlide}
            disabled={slideIndex === slides.length - 1 && currentModuleIndex === curriculum.length - 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              (slideIndex === slides.length - 1 && currentModuleIndex === curriculum.length - 1) ? 'text-[#86868b]/30 cursor-not-allowed' : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
            }`}
          >
            Next <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans flex flex-col overflow-hidden">
      
      {/* Top Header */}
      <div className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-6 shrink-0 z-50">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-[#0066cc] font-medium text-[15px] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Home
        </button>

        {/* Mode Toggle Switch */}
        <div className="flex bg-[#f5f5f7] p-1 rounded-lg border border-black/5 shadow-inner">
          <button
            onClick={() => setViewMode('preparation')}
            className={`flex items-center px-6 py-1.5 rounded-md text-[13px] font-medium transition-all ${
              viewMode === 'preparation' 
                ? 'bg-white shadow-sm text-[#1d1d1f]' 
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" /> Preparation Mode
          </button>
          <button
            onClick={() => setViewMode('presentation')}
            className={`flex items-center px-6 py-1.5 rounded-md text-[13px] font-medium transition-all ${
              viewMode === 'presentation' 
                ? 'bg-[#0066cc] shadow-sm text-white' 
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Presentation className="w-4 h-4 mr-2" /> Presentation Mode
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[14px] font-semibold tracking-tight">
          <span className="text-[#1d1d1f]">{t('home.title')} |</span>
          <img src="/logo.jpg" alt="CAL Logo" className="w-6 h-6 rounded-md object-contain shadow-sm border border-black/5" />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <AnimatePresence>
          {viewMode === 'preparation' && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white border-r border-black/5 overflow-y-auto shrink-0"
            >
              <div className="p-6">
                <h2 className="text-[11px] uppercase tracking-wider text-[#86868b] font-bold mb-3 flex items-center">
                  <BookOpen className="w-3 h-3 mr-2" /> Educational Modules
                </h2>
                <div className="space-y-1 mb-8">
                  {curriculum.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => { setActiveId(item.id); setSlideIndex(0); }} 
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] transition-colors ${
                        activeId === item.id ? 'bg-[#f5f5f7] font-semibold text-[#0066cc]' : 'hover:bg-[#f5f5f7] text-[#1d1d1f]'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-[#f5f5f7]">
          
          {viewMode === 'preparation' ? (
            <div className="max-w-3xl mx-auto py-12 px-8">
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h1 className="text-[32px] font-semibold mb-2">{activeItem.title.split('. ')[1]}</h1>
                    <p className="text-[15px] font-medium text-[#0066cc] uppercase tracking-wider">
                      Module {activeItem.title.split('.')[0]}
                    </p>
                  </div>
                  {activeItem.duration && (
                    <div className="bg-[#f5f5f7] px-4 py-1.5 rounded-full text-[13px] font-semibold text-[#86868b]">
                      ⏱ {activeItem.duration}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {renderBulletList('Start With', activeItem.content.start, <PlayCircle className="w-4 h-4"/>, 'text-[#ff9500]')}
                  {renderBulletList('Teach', activeItem.content.teach, <Info className="w-4 h-4"/>, 'text-[#0066cc]')}
                  {renderBulletList('Discuss', activeItem.content.discuss, <Users className="w-4 h-4"/>, 'text-[#af52de]')}
                  {renderBulletList('Explain', activeItem.content.explain, <BookOpen className="w-4 h-4"/>, 'text-[#34c759]')}
                  {renderBulletList('Show', activeItem.content.show, <Presentation className="w-4 h-4"/>, 'text-[#ff3b30]')}
                  {renderBulletList('Golden Rule', activeItem.content.goldenRule, <Star className="w-4 h-4"/>, 'text-[#ffcc00]')}
                  {renderBulletList('Activity', activeItem.content.activity, <CheckCircle className="w-4 h-4"/>, 'text-[#ff2d55]')}
                  {renderBulletList('Questions', activeItem.content.questions, <Info className="w-4 h-4"/>, 'text-[#5856d6]')}
                </div>
              </div>
            </div>
          ) : (
            renderPresentationMode()
          )}
        </div>
      </div>
    </div>
  );
}
