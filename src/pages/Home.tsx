import { useNavigate } from 'react-router-dom';
import { Presentation, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#f5f5f7] text-[#1d1d1f] font-sans flex flex-col selection:bg-blue-500/30">
      
      {/* Global Header / Nav */}
      <div className="fixed top-0 w-full h-12 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-8 z-50">
        <div className="flex items-center space-x-2 text-[14px] font-semibold tracking-tight">
          <img src="/logo.jpg" alt="CAL Logo" className="w-6 h-6 rounded-md object-contain shadow-sm border border-black/5" />
          <span className="text-[#86868b]">| {t('home.title')}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-32 px-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mb-12"
        >
          <h1 className="text-[48px] leading-[1.05] font-semibold tracking-tight mb-3 text-[#1d1d1f]">
            {t('home.title')}
          </h1>
          <p className="text-[19px] leading-relaxed text-[#86868b] max-w-2xl mx-auto font-medium tracking-tight">
            {t('home.subtitle')}
          </p>
          <p className="text-[13px] mt-2 text-[#86868b]/70 max-w-2xl mx-auto font-medium tracking-tight">
            Note: These are not real, just educational simulations.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Student Mode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => navigate('/student')}
            className="cursor-pointer group relative bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col items-center text-center overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-black/[0.02]"
          >
            <GraduationCap className="w-12 h-12 text-[#0066cc] mb-5" strokeWidth={1.5} />
            <h2 className="text-[24px] font-semibold mb-2 tracking-tight">{t('home.student_mode')}</h2>
            <p className="text-[#86868b] text-[15px] mb-8 flex-grow leading-relaxed">
              {t('home.student_desc')}
            </p>
            <div className="flex items-center text-[#0066cc] text-[15px] font-medium group-hover:underline decoration-1 underline-offset-4">
              Get Started <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>

          {/* Teacher Mode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => navigate('/teacher')}
            className="cursor-pointer group relative bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col items-center text-center overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-black/[0.02]"
          >
            <Presentation className="w-12 h-12 text-[#0066cc] mb-5" strokeWidth={1.5} />
            <h2 className="text-[24px] font-semibold mb-2 tracking-tight">{t('home.teacher_mode')}</h2>
            <p className="text-[#86868b] text-[15px] mb-8 flex-grow leading-relaxed">
              {t('home.teacher_desc')}
            </p>
            <div className="flex items-center text-[#0066cc] text-[15px] font-medium group-hover:underline decoration-1 underline-offset-4">
              Launch Dashboard <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Actual Minimalist Footer */}
      <footer className="w-full bg-[#fcfcfc] border-t border-black/5 relative overflow-hidden mt-auto">
        
        {/* Minimalist Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto w-full px-8 py-16 relative z-10">
          
          <div className="flex flex-col items-center justify-center mb-16 border-b border-black/5 pb-12 text-center">
            <div className="flex items-center space-x-2 text-[14px] font-semibold tracking-tight mb-4">
              <img src="/logo.jpg" alt="CAL Logo" className="w-8 h-8 rounded-md object-contain shadow-sm border border-black/5" />
              <span className="text-[#1d1d1f] tracking-tight text-lg">Cyber Awareness Lab</span>
            </div>
            <p className="text-[14px] text-[#86868b] max-w-sm leading-relaxed font-medium">
              Explore interactive simulations and modules to build your cyber awareness.
            </p>
          </div>

          {/* Giant Subtle Typography */}
          <div className="w-full flex justify-center items-center overflow-hidden py-2 select-none">
            <h1 className="text-[9vw] md:text-[7vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#1d1d1f]/10 to-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.05)' }}>
              CYBER AWARENESS LAB
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-[12px] text-[#86868b] font-medium">
            <p>© {new Date().getFullYear()} Rakesh Pathuri. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a onClick={() => navigate('/privacy')} className="cursor-pointer hover:text-[#1d1d1f] transition-colors">Privacy</a>
              <a onClick={() => navigate('/terms')} className="cursor-pointer hover:text-[#1d1d1f] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
