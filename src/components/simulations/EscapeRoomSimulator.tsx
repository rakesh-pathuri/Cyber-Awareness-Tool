import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Wifi, Check, KeyRound } from 'lucide-react';

export default function EscapeRoomSimulator() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  
  // Stage 1 State
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  
  // Stage 2 State
  const [password, setPassword] = useState('');
  
  // Stage 3 State
  const [selectedWifi, setSelectedWifi] = useState<string | null>(null);

  const startEscape = () => setStage(1);

  const handleUrlSelect = (url: string) => {
    setSelectedUrl(url);
    if (url === 'http://secure-login.bank.com') {
      setTimeout(() => {
        setStage(2);
      }, 1500);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasLength = password.length >= 12;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    
    if (hasLength && hasSymbol && hasNumber && hasUpper) {
      setStage(3);
    }
  };

  const handleWifiSelect = (wifi: string) => {
    setSelectedWifi(wifi);
    if (wifi === 'Library_Guest_Secure') {
      setTimeout(() => {
        setStage(4);
      }, 1500);
    }
  };

  const reset = () => {
    setStage(0);
    setSelectedUrl(null);
    setPassword('');
    setSelectedWifi(null);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-slate-900 flex flex-col rounded-xl shadow-2xl border border-slate-700 overflow-hidden font-sans text-slate-100">
      
      {/* Header */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-yellow-500" />
          <span className="font-black text-xl tracking-widest text-white">CYBER ESCAPE ROOM</span>
        </div>
        <div className="flex gap-2">
          <div className={`w-3 h-3 rounded-full ${stage > 1 ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-slate-700'}`}></div>
          <div className={`w-3 h-3 rounded-full ${stage > 2 ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-slate-700'}`}></div>
          <div className={`w-3 h-3 rounded-full ${stage > 3 ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-slate-700'}`}></div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: INTRO */}
          {stage === 0 && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-900"
            >
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 border-4 border-slate-700 relative">
                <Lock className="w-12 h-12 text-slate-400" />
                <div className="absolute -inset-2 border-2 border-red-500/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-4">SYSTEM LOCKED</h2>
              <p className="text-slate-400 text-center max-w-lg mb-8">
                You are trapped inside the mainframe. To escape, you must solve three cybersecurity puzzles to acquire the access keys. 
                Work together with your class to crack the codes.
              </p>
              
              <button 
                onClick={startEscape}
                className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-xl font-black text-xl tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                INITIATE ESCAPE SEQUENCE
              </button>
            </motion.div>
          )}

          {/* STAGE 1: PHISHING PUZZLE */}
          {stage === 1 && (
            <motion.div 
              key="stage1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-yellow-500 mb-2">PUZZLE 1: The Phisher's Hook</h3>
                <p className="text-slate-300">Identify the <span className="font-bold text-red-400">FAKE</span> URL to extract the first key.</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto w-full">
                {[
                  { url: 'https://www.bank-login-secure.com', isFake: true },
                  { url: 'http://secure-login.bank.com', isFake: true }, // The trick one! HTTP instead of HTTPS
                  { url: 'https://login.banc.com', isFake: true },
                  { url: 'https://secure.bank.com/login', isFake: false }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleUrlSelect(item.url)}
                    disabled={selectedUrl !== null}
                    className={`w-full p-4 rounded-xl border-2 text-left font-mono text-lg transition-all ${
                      selectedUrl === item.url 
                        ? (item.url === 'http://secure-login.bank.com' ? 'border-green-500 bg-green-900/30 text-green-400' : 'border-red-500 bg-red-900/30 text-red-400')
                        : 'border-slate-700 bg-slate-800 hover:border-slate-500 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.url}
                    {selectedUrl === item.url && item.url === 'http://secure-login.bank.com' && (
                      <span className="float-right text-xs text-green-400 font-sans mt-1">✓ Correct (HTTP is not secure)</span>
                    )}
                    {selectedUrl === item.url && item.url !== 'http://secure-login.bank.com' && (
                      <span className="float-right text-xs text-red-400 font-sans mt-1">✗ Incorrect</span>
                    )}
                  </button>
                ))}

                {selectedUrl && selectedUrl !== 'http://secure-login.bank.com' && (
                  <button onClick={() => setSelectedUrl(null)} className="mt-4 text-slate-400 hover:text-white underline text-sm">
                    Try Again
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STAGE 2: PASSWORD PUZZLE */}
          {stage === 2 && (
            <motion.div 
              key="stage2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-yellow-500 mb-2">PUZZLE 2: The Brute Force Barrier</h3>
                <p className="text-slate-300">Construct a password strong enough to power up the terminal.</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
                <form onSubmit={handlePasswordSubmit} className="w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
                  <div className="mb-6 relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
                    <input 
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter strong password..."
                      className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white font-mono focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2 mb-8">
                    <Requirement met={password.length >= 12} text="At least 12 characters" />
                    <Requirement met={/[A-Z]/.test(password)} text="One uppercase letter" />
                    <Requirement met={/\d/.test(password)} text="One number" />
                    <Requirement met={/[!@#$%^&*(),.?":{}|<>]/.test(password)} text="One special symbol" />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!(password.length >= 12 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password))}
                  >
                    SUBMIT PASSWORD
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: WI-FI PUZZLE */}
          {stage === 3 && (
            <motion.div 
              key="stage3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-yellow-500 mb-2">PUZZLE 3: The Honeypot Trap</h3>
                <p className="text-slate-300">Select the <span className="font-bold text-green-400">SECURE</span> network to transmit the escape sequence.</p>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-4 max-w-xl mx-auto w-full">
                {[
                  { id: 'Free_Airport_WiFi', secure: false, type: 'open' },
                  { id: 'Starbucks_Guest_5G', secure: false, type: 'open' },
                  { id: 'Library_Guest_Secure', secure: true, type: 'secure' }, // Correct
                  { id: 'xfinitywifi', secure: false, type: 'open' }
                ].map((net, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWifiSelect(net.id)}
                    disabled={selectedWifi !== null}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                      selectedWifi === net.id
                        ? (net.secure ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30')
                        : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wifi className={selectedWifi === net.id ? (net.secure ? 'text-green-400' : 'text-red-400') : 'text-slate-400'} />
                      <span className={`font-bold ${selectedWifi === net.id ? (net.secure ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
                        {net.id}
                      </span>
                    </div>
                    {net.type === 'secure' ? <Lock className="w-4 h-4 text-slate-500" /> : <Unlock className="w-4 h-4 text-slate-500" />}
                  </button>
                ))}

                {selectedWifi && selectedWifi !== 'Library_Guest_Secure' && (
                  <div className="mt-4 text-center">
                    <p className="text-red-400 text-sm mb-2">Warning: Open networks can be intercepted!</p>
                    <button onClick={() => setSelectedWifi(null)} className="text-slate-400 hover:text-white underline text-sm">
                      Disconnect and Try Again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STAGE 4: ESCAPED */}
          {stage === 4 && (
            <motion.div 
              key="escaped"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-green-950/30"
            >
              <div className="w-24 h-24 bg-green-900/50 rounded-full flex items-center justify-center mb-6 border-4 border-green-500 relative">
                <Unlock className="w-12 h-12 text-green-400" />
                <div className="absolute -inset-2 border-2 border-green-500/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              </div>
              
              <h2 className="text-4xl font-black text-green-400 mb-4 tracking-widest text-center">SYSTEM UNLOCKED</h2>
              <p className="text-green-200/70 text-center max-w-lg mb-8 text-lg">
                Excellent work, team! You successfully identified the phishing trap, generated a robust security key, and securely transmitted the escape sequence.
              </p>
              
              <button 
                onClick={reset}
                className="text-slate-400 hover:text-white underline text-sm transition-colors"
              >
                Reset Simulation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Requirement({ met, text }: { met: boolean, text: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-400' : 'text-slate-400'}`}>
      {met ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-slate-600 rounded-full" />}
      <span>{text}</span>
    </div>
  );
}
