import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <div className="fixed top-0 w-full h-12 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center px-8 z-50">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#86868b] hover:text-[#1d1d1f] transition-colors text-[14px] font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto pt-32 pb-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[40px] font-semibold tracking-tight mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-[15px] leading-relaxed text-[#424245]">
            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">1. Information We Collect</h2>
              <p>
                Cyber Awareness Tool is an educational platform. We do not collect personally identifiable information (PII) beyond what is strictly necessary for your session to function locally. Your progress and simulation data are stored locally on your device and are not transmitted to any external servers.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">2. How We Use Information</h2>
              <p>
                Any data generated during your use of the application is strictly used to provide the educational experience. It is not shared, sold, or used for marketing purposes under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">3. Local Storage</h2>
              <p>
                We use browser local storage to save your progress, settings, and generated tokens for the Teacher Dashboard. Clearing your browser data will result in the loss of this information.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">4. Changes to This Policy</h2>
              <p>
                We reserve the right to modify this Privacy Policy at any time. All updates will be reflected on this page.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
