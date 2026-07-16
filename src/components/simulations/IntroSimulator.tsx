import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function IntroSimulator() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-[#1d1d1f] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-4">The Cyber Landscape</h2>
        <p className="text-[#86868b] text-[17px] max-w-2xl mx-auto font-medium">
          Understand the players in the cybersecurity world. Not all hackers are the same, and your awareness is the first line of defense.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Black Hat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#f5f5f7] border border-black/5 p-6 rounded-2xl flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">Black Hat</h3>
          <p className="text-[#86868b] text-[15px] font-medium leading-relaxed">
            Malicious attackers who break into systems to steal data, cause damage, or extort money. They operate illegally and for personal gain.
          </p>
        </motion.div>

        {/* White Hat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#f5f5f7] border border-black/5 p-6 rounded-2xl flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">White Hat</h3>
          <p className="text-[#86868b] text-[15px] font-medium leading-relaxed">
            Ethical hackers hired by companies to test their security and find vulnerabilities before the bad guys do. They are the good guys.
          </p>
        </motion.div>

        {/* Grey Hat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#f5f5f7] border border-black/5 p-6 rounded-2xl flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-100 text-[#0066cc] rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Eye className="w-8 h-8" />
          </div>
          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">Grey Hat</h3>
          <p className="text-[#86868b] text-[15px] font-medium leading-relaxed">
            Individuals who hack without permission but usually without malicious intent, often just to see if they can or to publicly expose flaws.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 bg-[#f5f5f7] border border-black/5 p-8 rounded-2xl">
        <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-4 tracking-tight flex items-center">
          <Lock className="w-5 h-5 mr-2 text-[#0066cc]" /> The Three Pillars of Security (CIA Triad)
        </h3>
        <ul className="space-y-3 text-[15px] text-[#86868b] font-medium leading-relaxed">
          <li><strong className="text-[#1d1d1f]">Confidentiality (Privacy):</strong> Keeping data secret and only accessible to authorized people.</li>
          <li><strong className="text-[#1d1d1f]">Integrity:</strong> Keeping data accurate and preventing unauthorized changes.</li>
          <li><strong className="text-[#1d1d1f]">Availability:</strong> Ensuring systems and data are online and accessible when needed.</li>
        </ul>
      </div>
    </div>
  );
}
