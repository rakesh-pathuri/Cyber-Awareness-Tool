import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Terms() {
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
          <h1 className="text-[40px] font-semibold tracking-tight mb-8">Terms of Service</h1>
          
          <div className="space-y-8 text-[15px] leading-relaxed text-[#424245]">
            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Cyber Awareness Lab, you accept and agree to be bound by the terms and provision of this agreement. This application is provided as an educational tool for learning about cybersecurity concepts.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">2. Educational Purpose</h2>
              <p>
                Cyber Awareness Lab is designed strictly for educational and awareness purposes. The simulated attacks (e.g., phishing, ransomware) are safe environments meant to demonstrate concepts and are completely harmless to your device.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">3. User Responsibility</h2>
              <p>
                You agree to use the knowledge gained from this application responsibly and ethically. The creators of Cyber Awareness Lab are not responsible for any misuse of the information provided within the platform.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">4. Warranty Disclaimer</h2>
              <p>
                This application is provided "as is" without any representations or warranties, express or implied. Cyber Awareness Lab makes no representations or warranties in relation to this application or the educational information provided.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
