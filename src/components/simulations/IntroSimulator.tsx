import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function IntroSimulator() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-[#1d1d1f] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.02]">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-4">Welcome to Cyber World!</h2>
        <p className="text-[#86868b] text-[17px] max-w-2xl mx-auto font-medium">
          Learn about the different people on the internet. Knowing who they are is your best shield!
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
          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">The Bad Hackers (Black Hat)</h3>
          <p className="text-[#86868b] text-[15px] font-medium leading-relaxed">
            These are the bad guys. They break into games and accounts to steal things, ruin games, or be mean.
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
          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">The Good Hackers (White Hat)</h3>
          <p className="text-[#86868b] text-[15px] font-medium leading-relaxed">
            These are the good guys! They work for game companies to find holes and fix them before the bad hackers get in.
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
          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 tracking-tight">The Show-Offs (Grey Hat)</h3>
          <p className="text-[#86868b] text-[15px] font-medium leading-relaxed">
            They break into places just to show off that they can, but they usually don't steal anything.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 bg-[#f5f5f7] border border-black/5 p-8 rounded-2xl">
        <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-4 tracking-tight flex items-center">
          <Lock className="w-5 h-5 mr-2 text-[#0066cc]" /> The Three Golden Rules of Security
        </h3>
        <ul className="space-y-3 text-[15px] text-[#86868b] font-medium leading-relaxed">
          <li><strong className="text-[#1d1d1f]">Keep It Secret (Privacy):</strong> Don't let anyone see your passwords or personal stuff.</li>
          <li><strong className="text-[#1d1d1f]">Keep It Safe (Integrity):</strong> Don't let anyone change your game saves or account.</li>
          <li><strong className="text-[#1d1d1f]">Keep It Working (Availability):</strong> Make sure your games and devices don't get broken by viruses.</li>
        </ul>
      </div>
    </div>
  );
}
