import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Fingerprint, MapPin, Camera, History, AlertTriangle, ShieldCheck, RefreshCcw, Map } from 'lucide-react';

export default function DigitalFootprintSimulator() {
  const [phase, setPhase] = useState<'search' | 'scanning' | 'results' | 'postmortem'>('search');
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const intervalRef = useRef<number | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const targetUsername = 'Rohit_Gamer2010';

  const runScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username) setUsername(targetUsername);
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setPhase('scanning');
    setScanLogs([]);

    const logs = [
      "INITIATING DEEP SCAN...",
      `> Target: ${username || targetUsername}`,
      "> Cross-referencing public gaming profiles...",
      "> Found 4 linked accounts (Steam, Xbox, PlayStation, Discord)",
      "> Correlating email addresses...",
      "> Real name identified: Rohit Kumar",
      "> Extracting images from public Instagram feed...",
      "> Analyzing EXIF metadata from 'dog_photo.jpg'...",
      "> WARNING: GPS coordinates found hidden in photo data.",
      "> Translating coordinates: 34.0522° N, 118.2437° W",
      "> Querying digital archives (Wayback Machine)...",
      "> Retrieving deleted posts from 2024...",
      "> 1 deleted post recovered.",
      "SCAN COMPLETE."
    ];

    let currentLog = 0;
    intervalRef.current = setInterval(() => {
      if (currentLog < logs.length) {
        // Double check that we don't push undefined if something goes wrong
        if (logs[currentLog]) {
          setScanLogs(prev => [...prev, logs[currentLog]]);
        }
        currentLog++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase('results'), 1500);
      }
    }, 400); // 400ms per line
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase('search');
    setUsername('');
    setScanLogs([]);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-gray-900 flex flex-col rounded-xl shadow-2xl border border-gray-800 overflow-hidden font-sans text-gray-100">
      
      {/* Header */}
      <div className="h-14 bg-black border-b border-gray-800 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Fingerprint className="w-6 h-6 text-blue-500" />
          <span className="font-black text-xl tracking-widest text-white">DEEPSCAN PRO</span>
          <span className="bg-red-900/50 text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded ml-2 border border-red-700/50">
            Employer Edition
          </span>
        </div>
        <div className="text-gray-500 text-xs font-mono">
          System.Status: ONLINE | Target.Mode: AGGRESSIVE
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        
        {/* PHASE 1: SEARCH */}
        <AnimatePresence>
          {phase === 'search' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-8"
              style={{ backgroundImage: 'radial-gradient(circle at center, #1f2937 0%, #111827 100%)' }}
            >
              <Fingerprint className="w-24 h-24 text-gray-700 mb-8" />
              <h2 className="text-3xl font-black mb-2 text-white">Digital Footprint Scanner</h2>
              <p className="text-gray-400 mb-8 text-center max-w-md">
                Enter a username or email to aggregate all public digital footprint data across the internet.
              </p>
              
              <form onSubmit={runScan} className="w-full max-w-lg relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., Rohit_Gamer2010"
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-6 font-bold flex items-center gap-2 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Scan
                </button>
              </form>

              <div className="mt-8 text-sm text-gray-500">
                Try searching for the suggested profile:{' '}
                <button 
                  onClick={() => {
                    setUsername(targetUsername);
                    setTimeout(() => runScan(), 100);
                  }}
                  className="text-blue-400 hover:text-blue-300 hover:underline font-mono"
                >
                  {targetUsername}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 2: SCANNING (Terminal) */}
        <AnimatePresence>
          {phase === 'scanning' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black p-8 font-mono flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                <Database className="w-6 h-6 text-blue-500 animate-pulse" />
                <h3 className="text-blue-400 font-bold text-lg">AGGREGATING DATA...</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {scanLogs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-2 text-sm ${log?.includes?.('WARNING') ? 'text-red-400' : log?.includes?.('COMPLETE') ? 'text-green-400 font-bold' : 'text-gray-300'}`}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 3: RESULTS DASHBOARD */}
        <AnimatePresence>
          {phase === 'results' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Fingerprint className="w-8 h-8 text-blue-500"/> Target Dossier
                </h2>
                <button 
                  onClick={() => setPhase('postmortem')}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-colors"
                >
                  <AlertTriangle className="w-5 h-5"/> Analyze Findings
                </button>
              </div>

              <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Left Panel: Profile */}
                <div className="w-1/3 bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col">
                  <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-3 border-4 border-gray-600 flex items-center justify-center overflow-hidden shrink-0">
                    <UserSilhouette />
                  </div>
                  <h3 className="text-center font-bold text-xl text-white mb-0.5 shrink-0">Rohit Kumar</h3>
                  <p className="text-center text-blue-400 font-mono text-xs mb-4 shrink-0">@{username || targetUsername}</p>
                  
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    <div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase mb-0.5">School</div>
                      <div className="text-gray-200 text-sm">Valley High School</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase mb-0.5">Location</div>
                      <div className="text-gray-200 text-sm">Los Angeles, CA</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase mb-0.5">Linked Accounts</div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="bg-[#5865F2]/20 text-[#5865F2] px-2 py-0.5 rounded text-[10px] font-bold">Discord</span>
                        <span className="bg-[#107C10]/20 text-[#107C10] px-2 py-0.5 rounded text-[10px] font-bold">Xbox Live</span>
                        <span className="bg-[#E1306C]/20 text-[#E1306C] px-2 py-0.5 rounded text-[10px] font-bold">Instagram</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: The Threats */}
                <div className="w-2/3 flex flex-col gap-4">
                  
                  {/* EXIF Data Threat */}
                  <div className="flex-[3] bg-gray-800 border border-gray-700 rounded-xl p-4 relative overflow-hidden flex gap-4 min-h-0">
                    <div className="w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-red-400 font-bold mb-2 shrink-0">
                        <Camera className="w-5 h-5"/> Hidden EXIF Metadata
                      </div>
                      <p className="text-xs text-gray-300 mb-3">
                        A public photo posted 3 days ago contained hidden GPS metadata, revealing the exact coordinates of the target's home address.
                      </p>
                      <div className="bg-black/50 p-2.5 rounded border border-gray-700 font-mono text-[10px] text-gray-400 space-y-1">
                        <div>Filename: IMG_4992.jpg</div>
                        <div>Device: iPhone 13 Pro</div>
                        <div className="text-red-400">Latitude: 34.052235</div>
                        <div className="text-red-400">Longitude: -118.243683</div>
                      </div>
                    </div>
                    <div className="w-1/2 bg-gray-900 rounded-lg border border-gray-700 relative overflow-hidden flex items-center justify-center shrink-0">
                      {/* Fake Map */}
                      <Map className="w-full h-full opacity-20 p-6 text-blue-500" />
                      <div className="absolute inset-0 bg-blue-900/10"></div>
                      <div className="absolute bg-red-500/20 w-24 h-24 rounded-full animate-ping"></div>
                      <MapPin className="absolute w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    </div>
                  </div>

                  {/* Archived Post Threat */}
                  <div className="flex-[2] bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col justify-center min-h-0">
                     <div className="flex justify-between items-start mb-2 shrink-0">
                       <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                         <History className="w-4 h-4"/> Archived Deleted Post
                       </div>
                       <span className="text-[10px] font-mono bg-black/50 px-2 py-1 rounded text-gray-400">Recovered via Wayback Machine</span>
                     </div>
                     <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 shrink-0">
                       <div className="flex items-center gap-2 mb-1.5">
                         <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden"><UserSilhouette /></div>
                         <span className="font-bold text-xs">Rohit Kumar</span>
                         <span className="text-gray-500 text-[10px]">@Rohit_Gamer2010 • Nov 14, 2024</span>
                       </div>
                       <p className="text-gray-300 text-xs">
                         Skipped work today to play video games lol don't tell my boss. So glad I called in "sick". 😷🎮
                       </p>
                     </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHASE 4: POSTMORTEM */}
        <AnimatePresence>
          {phase === 'postmortem' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-blue-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-white"
            >
              <ShieldCheck className="w-16 h-16 text-blue-400 mb-4 drop-shadow-lg" />
              <h2 className="text-4xl font-black mb-2 tracking-tighter text-center">THE INTERNET IS FOREVER</h2>
              <p className="text-lg mb-6 font-medium text-center max-w-2xl">
                Employers and colleges regularly perform searches just like this. Your digital footprint is your permanent record.
              </p>

              <div className="bg-black/40 border border-white/20 p-5 rounded-xl max-w-3xl w-full flex flex-col gap-4">
                
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-2.5 rounded-xl mt-1"><Camera className="w-5 h-5 text-red-400" /></div>
                  <div>
                    <strong className="block text-lg text-red-400 mb-1">Hidden Photo Data (EXIF)</strong>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      When you take a picture, your smartphone secretly embeds hidden metadata (EXIF data) inside the image file. This data includes the exact time, date, and GPS coordinates of where you were standing. If you post the original photo online, anyone can download it and extract your home address. <strong>Fix:</strong> Turn off location services for your camera app in your phone settings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 p-2.5 rounded-xl mt-1"><History className="w-5 h-5 text-yellow-400" /></div>
                  <div>
                    <strong className="block text-lg text-yellow-400 mb-1">Deleted Does Not Mean Gone</strong>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      You might delete an embarrassing post or photo, but the internet archives everything. Automated bots and websites like the "Wayback Machine" constantly take snapshots of the internet. Even apps with "disappearing" messages can easily be screenshotted by the person receiving them.
                    </p>
                  </div>
                </div>

              </div>

              <button 
                onClick={reset}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-full font-black text-base hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200"
              >
                <RefreshCcw className="w-5 h-5" />
                Run Another Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Helper component for generic user silhouette
function UserSilhouette() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-gray-500 opacity-50">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

