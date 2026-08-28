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
      <div className="max-w-4xl mx-auto pt-32 pb-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <img src="/logo.png" alt="CAT Logo" className="w-16 h-16 rounded-xl object-contain shadow-sm border border-black/5 mb-6" />
            <h1 className="text-[40px] font-semibold tracking-tight">Privacy Policy</h1>
          </div>
          
          <div className="space-y-10 text-[15px] leading-relaxed text-[#424245]">
            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">1. Introduction</h2>
              <p className="mb-4">
                Welcome to the Cyber Awareness Tool ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how your information is handled when you access or use our educational cybersecurity platform.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">2. Information Collection and Use</h2>
              <p className="mb-4">
                The Cyber Awareness Tool is designed as a standalone, privacy-first educational platform. <strong>We do not collect, transmit, or store any Personally Identifiable Information (PII).</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>No Account Required:</strong> You do not need to create an account to use the simulations.</li>
                <li><strong>No Progress Tracking:</strong> We do not save or track your module progress. Each time you visit or refresh, the application starts fresh.</li>
                <li><strong>No Analytics:</strong> We do not use third-party tracking or analytics software to monitor your behavior.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">3. Local Storage and Cookies</h2>
              <p>
                The application relies exclusively on your browser's local memory (Local Storage or Session Storage) to facilitate real-time interactions, such as generating temporary access codes for the Teacher Dashboard. 
              </p>
              <p className="mt-4">
                This data remains entirely on your device and is never transmitted to an external server. You can clear this data at any time by clearing your browser's cache and local storage.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">4. Educational Simulations</h2>
              <p>
                Our platform includes interactive simulations of cyber threats (e.g., phishing, spyware, ransomware). These simulations are strictly educational and harmless. Any input you provide (e.g., typing into a simulated fake login page) is processed instantly on your local device and is immediately discarded. It is never logged or saved.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">5. Data Security</h2>
              <p>
                We value your trust in providing us your information. However, since we do not collect or store any user data externally, there is no risk of data breach or unauthorized access to your personal information through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">6. Children's Privacy</h2>
              <p>
                The Cyber Awareness Tool is intended for educational purposes and is safe for users of all ages, including children under 13. Because we do not collect any personal data, we are fully compliant with the Children's Online Privacy Protection Act (COPPA).
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">8. Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact the development team through our official support channels.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
