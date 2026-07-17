import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Search, ArrowRight, ShieldCheck, Database, Server, EyeOff } from 'lucide-react';

export default function FakeLoginSimulator() {
  const [fakeUsername, setFakeUsername] = useState('');
  const [fakePassword, setFakePassword] = useState('');
  const [realUsername, setRealUsername] = useState('');
  const [realPassword, setRealPassword] = useState('');
  
  const [status, setStatus] = useState<'playing' | 'stealing' | 'phished' | 'success'>('playing');

  const reset = () => {
    setStatus('playing');
    setFakeUsername('');
    setFakePassword('');
    setRealUsername('');
    setRealPassword('');
  };

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fakeUsername || !fakePassword) return;
    setStatus('stealing');
    
    setTimeout(() => {
      setStatus('phished');
    }, 3500);
  };

  const handleRealLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realUsername || !realPassword) return;
    setStatus('success');
  };

  const renderBrowser = (isFake: boolean) => {
    const url = isFake ? 'https://netf1ix.com/login' : 'https://netflix.com/login';
    const username = isFake ? fakeUsername : realUsername;
    const password = isFake ? fakePassword : realPassword;
    const setUsername = isFake ? setFakeUsername : setRealUsername;
    const setPassword = isFake ? setFakePassword : setRealPassword;
    const submitHandler = isFake ? handleFakeLogin : handleRealLogin;
    return (
      <div className="flex-1 flex flex-col shadow-2xl rounded-xl overflow-hidden border border-gray-300 bg-white min-w-[300px] min-h-[550px]">
        {/* Fake Browser Chrome */}
        <div className="bg-[#dee1e6] px-3 py-2 flex flex-col gap-2 border-b border-gray-300 shrink-0">
          <div className="flex gap-1.5 px-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          
          <div className="bg-white rounded-md flex items-center px-3 py-1.5 shadow-sm border border-gray-200">
            <Lock className="w-3.5 h-3.5 text-gray-400 mr-2" />
            <div className="text-[13px] tracking-tight truncate min-w-0 flex-1 font-mono text-gray-800">
              {url}
            </div>
            <Search className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />
          </div>
        </div>

        {/* Netflix Page */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white relative">
          <h2 className="text-3xl font-black tracking-tighter mb-8 text-[#e50914]">NETFLIX</h2>
          
          <form onSubmit={submitHandler} className="w-full max-w-[240px] space-y-4">
            <div className="space-y-3">
              <input 
                type="text" 
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Email or phone number"
                className="w-full px-4 py-3 rounded text-sm bg-[#333] border border-transparent text-white focus:outline-none focus:border-white transition-colors"
              />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded text-sm bg-[#333] border border-transparent text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 rounded font-bold text-white transition-opacity hover:opacity-90 bg-[#e50914] mt-2"
            >
              Sign In
            </button>
          </form>
          
          {isFake && (
             <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
               FAKE SITE!
             </div>
          )}
          {!isFake && (
             <div className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded">
               REAL SITE!
             </div>
          )}
        </div>
      </div>
    );
  };

  const renderStealAnimation = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gray-900 z-40 rounded-xl overflow-hidden flex flex-col items-center justify-center font-mono"
      >
        <div className="text-red-500 mb-8 font-bold text-xl flex items-center gap-2">
          <Database className="w-6 h-6" /> PASSWORD STOLEN!
        </div>
        
        <div className="flex items-center justify-center w-full px-8 gap-4 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-4 rounded border border-gray-700 w-1/3">
            <div className="text-gray-500 text-[10px] mb-2 uppercase">Fake Website (netf1ix.com)</div>
            <div className="text-white text-xs truncate">Email: {fakeUsername}</div>
            <div className="text-white text-xs truncate">Password: {fakePassword}</div>
          </div>
          
          <div className="flex-1 flex flex-col items-center">
             <div className="relative w-full h-0.5 bg-gray-700">
               <motion.div 
                 initial={{ left: 0, opacity: 1 }}
                 animate={{ left: "100%", opacity: 0 }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 -translate-y-1/2 w-4 h-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"
               />
             </div>
             <ArrowRight className="w-5 h-5 text-gray-600 mt-2" />
          </div>

          <div className="bg-red-950 p-4 rounded border border-red-900 w-1/3 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <div className="text-red-500 text-[10px] mb-2 uppercase flex items-center gap-1"><Server className="w-3 h-3"/> Hacker's Computer</div>
            <div className="text-red-300 text-xs truncate font-bold">Stealing your password...</div>
            <div className="text-red-300 text-xs truncate">GOT IT!</div>
          </div>
        </div>
        
        <p className="mt-10 text-gray-400 text-sm text-center max-w-md">
          The fake website just sent your secret password straight to the hacker's computer!
        </p>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col h-full items-center">
      
      <div className="mb-6 text-center shrink-0">
        <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-2">Spot the Fake!</h2>
        <p className="text-[16px] leading-relaxed text-[#86868b] max-w-2xl mx-auto">
          One of these websites is real, and one is a fake created by a hacker. Look closely at the web address at the top. What happens if you try to log into the fake one?
        </p>
      </div>

      <div className="flex-1 w-full flex flex-row items-center justify-center gap-8 relative pb-10 min-h-[550px]">
        
        {renderBrowser(false)}
        {renderBrowser(true)}

        {/* Overlays */}
        <AnimatePresence>
          {status === 'stealing' && renderStealAnimation()}

          {status === 'phished' && (
            <motion.div 
              className="absolute inset-0 bg-red-600/95 backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-6 text-center text-white z-50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <EyeOff className="w-16 h-16 mb-4" />
              <h3 className="text-[32px] font-bold mb-2">Oh No! You Got Tricked!</h3>
              <p className="text-[16px] text-white/90 mb-6 max-w-lg">
                You typed your password into a fake website <strong>netf1ix.com</strong> (it has a number '1' instead of an 'L'). Hackers make fake websites that look real so they can steal your passwords!
              </p>
              <div className="bg-black/20 p-4 rounded-lg mb-8 w-full max-w-md text-left">
                 <p className="text-xs text-red-200 uppercase font-bold mb-2">What the hacker stole:</p>
                 <p className="text-sm font-mono truncate">Email: {fakeUsername}</p>
                 <p className="text-sm font-mono truncate">Password: {fakePassword}</p>
              </div>
              <button 
                onClick={reset}
                className="px-8 py-3 bg-white text-red-600 rounded-full font-bold text-[16px] hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div 
              className="absolute inset-0 bg-green-500/95 backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-6 text-center text-white z-50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShieldCheck className="w-16 h-16 mb-4" />
              <h3 className="text-[32px] font-bold mb-2">Safe Login!</h3>
              <p className="text-[16px] text-white/90 mb-8 max-w-lg">
                Great job! You checked the web address and saw it was the real <strong>netflix.com</strong>. Always check the address before typing your password!
              </p>
              <button 
                onClick={reset}
                className="px-8 py-3 bg-white text-green-600 rounded-full font-bold text-[16px] hover:bg-gray-100 transition-colors shadow-lg"
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
