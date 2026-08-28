import { useNavigate } from 'react-router-dom';
import { Presentation, GraduationCap, ChevronRight, ShieldCheck, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#f5f5f7] text-[#1d1d1f] font-sans flex flex-col selection:bg-blue-500/30">



      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-6 -mt-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mb-6 flex flex-col items-center"
        >
          <img src="/logo.png" alt="CAT Logo" className="w-24 h-24 object-contain mb-4" />
          <h1 className="text-[48px] leading-[1.05] font-semibold tracking-tight mb-2 text-[#1d1d1f]">
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

      {/* About & Mission Section */}
      <div className="w-full bg-white border-t border-black/5 py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-4">Empowering Students for a Safer Digital Future</h2>
            <p className="text-[19px] text-[#86868b] max-w-3xl mx-auto font-medium leading-relaxed">
              Raising awareness among the next generation to identify modern digital threats and stay safe online through gamified, interactive simulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* The Mission */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-[20px] font-semibold tracking-tight mb-3 text-[#1d1d1f]">The Mission</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">
                To replace boring lectures with interactive experiences. This community initiative provides a free, safe environment to help students recognize phishing, scams, and digital red flags.
              </p>
            </div>

            {/* Who It's For */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-[20px] font-semibold tracking-tight mb-3 text-[#1d1d1f]">Who It's For</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">
                Designed specifically for schools and educational institutions. The platform allows students to safely experience simulated threats in real-time, building digital awareness without requiring any technical background.
              </p>
            </div>

            {/* The Tool */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-[20px] font-semibold tracking-tight mb-3 text-[#1d1d1f]">The Cyber Awareness Tool</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">
                A custom-built, risk-free ecosystem packed with simulations. From fake social media logins to AI deepfakes, students become aware of real-world tricks simply by experiencing them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Minimalist Footer */}
      <footer className="w-full bg-[#fcfcfc] border-t border-black/5 relative overflow-hidden mt-auto">
        {/* Minimalist Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto w-full px-8 py-12 relative z-10">

          <div className="w-full flex justify-center items-center overflow-hidden py-4 select-none">
            <h1 className="text-[9vw] md:text-[7vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#1d1d1f]/10 to-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.05)' }}>
              CYBER AWARENESS TOOL
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-[12px] text-[#86868b] font-medium border-t border-black/5 pt-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} Rakesh Pathuri. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a onClick={() => navigate('/privacy')} className="cursor-pointer hover:text-[#1d1d1f] transition-colors">Privacy Policy</a>
              <a onClick={() => navigate('/terms')} className="cursor-pointer hover:text-[#1d1d1f] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
