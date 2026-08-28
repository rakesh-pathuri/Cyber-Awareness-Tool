import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Return early if not mobile, to avoid mounting the complex DOM
  if (!isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9999] bg-[#f5f5f7] flex flex-col items-center justify-center p-6 text-[#1d1d1f] font-sans selection:bg-blue-500/30 overflow-hidden"
      >
        {/* Minimalist Grid Pattern Background (like the footer) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center w-full max-w-lg text-center"
        >
          {/* Logo */}
          <div className="mb-10">
            <img 
              src="/logo.png" 
              alt="CAT Logo" 
              className="w-24 h-24 rounded-2xl object-contain shadow-md border border-black/5 bg-white p-2" 
            />
          </div>
          
          <h2 className="text-[36px] leading-tight font-bold tracking-tight text-[#1d1d1f] mb-4">
            Screen Too Narrow
          </h2>
          
          <p className="text-[17px] text-[#86868b] leading-relaxed font-medium max-w-md">
            Cyber Awareness Tool is optimized for wider screens to provide the best learning experience. 
            <br/><br/>
            Please use a device with a wider aspect ratio screen.
          </p>
        </motion.div>

        {/* Copyright at the bottom */}
        <div className="absolute bottom-6 w-full text-center text-[12px] text-[#86868b] font-medium pointer-events-none">
          <p>© {new Date().getFullYear()} Rakesh Pathuri. All rights reserved.</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
