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
      <div className="max-w-4xl mx-auto pt-32 pb-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <img src="/logo.png" alt="CAT Logo" className="w-16 h-16 rounded-xl object-contain shadow-sm border border-black/5 mb-6" />
            <h1 className="text-[40px] font-semibold tracking-tight">Terms of Service</h1>
          </div>
          
          <div className="space-y-10 text-[15px] leading-relaxed text-[#424245]">
            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Cyber Awareness Tool ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">2. Educational Purpose</h2>
              <p className="mb-4">
                The Cyber Awareness Tool is designed <strong>strictly for educational and awareness purposes</strong>. The simulated cyber attacks, including but not limited to phishing, ransomware, spyware, and AI deepfakes, are safe, isolated environments meant to demonstrate cybersecurity concepts.
              </p>
              <p>
                The Service is entirely simulated and poses absolutely no threat to your device, network, or data.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">3. User Conduct and Ethics</h2>
              <p className="mb-4">
                You agree to use the knowledge and techniques learned from this application responsibly and ethically. The creators and maintainers of the Cyber Awareness Tool are not responsible for any misuse, illegal application, or malicious use of the concepts demonstrated within this platform.
              </p>
              <p>
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>In any way that violates any applicable local, state, national, or international law.</li>
                <li>To exploit, harm, or attempt to exploit or harm minors in any way.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">4. Intellectual Property</h2>
              <p>
                The Service and its original content, features, functionality, and visual design are and will remain the exclusive property of the Cyber Awareness Tool creators and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the creators.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">5. Termination</h2>
              <p>
                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">6. Limitation of Liability</h2>
              <p>
                In no event shall the Cyber Awareness Tool, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">7. "As Is" and "As Available" Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
