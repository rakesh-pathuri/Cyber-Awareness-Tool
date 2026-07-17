import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Settings, Camera, Mic, MapPin, Activity, Terminal, Copy, WifiOff, AlertTriangle, Fingerprint } from 'lucide-react';

type Status = 'app' | 'active' | 'settings' | 'revoked';

export default function SpywareSimulator() {
  const [status, setStatus] = useState<Status>('app');
  const [keyloggerLog, setKeyloggerLog] = useState<string[]>([]);
  const [clipboard, setClipboard] = useState<string>('N/A');
  const [locationLat, setLocationLat] = useState<number>(37.7749);
  const [locationLng, setLocationLng] = useState<number>(-122.4194);

  // Keylogger stream simulation
  useEffect(() => {
    if (status !== 'active') return;
    
    const keystrokes = [
      'Opened Browser...',
      'Navigating to: bank-of-america.com/login',
      'Input Username: rahul_sharma1999',
      'Input Password: *********',
      'Submitting login...',
      'Opened Messages...',
      'Typing: "Hey mom, my new number is..."'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < keystrokes.length) {
        const text = keystrokes[index];
        setKeyloggerLog(prev => {
          const newLog = [...prev, text];
          return newLog.length > 6 ? newLog.slice(newLog.length - 6) : newLog;
        });
        index++;
      } else {
        index = 0; // loop
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status]);

  // Location drift and Clipboard grab simulation
  useEffect(() => {
    if (status !== 'active') return;

    // Grab clipboard after 3 seconds
    const timeout = setTimeout(() => {
      setClipboard('Copied: 4111-2222-3333-4444 (VISA)');
    }, 3000);

    // Drift location slightly
    const interval = setInterval(() => {
      setLocationLat(prev => prev + (Math.random() - 0.5) * 0.0001);
      setLocationLng(prev => prev + (Math.random() - 0.5) * 0.0001);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [status]);

  const grantPermissions = () => {
    setStatus('active');
    setKeyloggerLog([]);
    setClipboard('Waiting for copy event...');
  };

  const openSettings = () => {
    if (status === 'active') setStatus('settings');
  };

  const revokePermissions = () => {
    setStatus('revoked');
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-row items-center justify-center gap-10 h-full">
      
      {/* Left Column: Fake Smartphone */}
      <div className="w-[300px] shrink-0 h-[550px] bg-black rounded-[40px] border-[12px] border-black relative overflow-hidden shadow-2xl flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-white relative pt-8 pb-4 flex flex-col overflow-y-auto custom-scrollbar">
          
          <AnimatePresence mode="wait">
            
            {(status === 'app' || status === 'active') && (
              <motion.div 
                key="screen-flashlight"
                className={`flex-1 flex flex-col items-center justify-center p-6 ${status === 'active' ? 'bg-yellow-100' : 'bg-white'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute top-8 right-4 cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors" onClick={openSettings}>
                  <Settings className="w-5 h-5 text-gray-700" />
                </div>
                
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg transition-colors ${status === 'active' ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-gray-200'}`}>
                  <Sun className={`w-12 h-12 ${status === 'active' ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <h2 className="text-[22px] font-bold text-gray-900 mb-2 text-center leading-tight">Super Bright Flashlight</h2>
                <p className="text-[14px] text-gray-500 text-center mb-8">The brightest flashlight app on the market.</p>
                
                <button 
                  className={`w-full py-3 rounded-full font-bold text-white text-[15px] shadow-md transition-colors ${status === 'active' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {status === 'active' ? 'FLASHLIGHT ON' : 'TURN ON'}
                </button>
              </motion.div>
            )}

            {status === 'settings' && (
              <motion.div 
                key="screen-settings"
                className="flex-1 bg-gray-50 flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center">
                  <h3 className="font-bold text-[16px] text-black">App Permissions</h3>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Mic className="w-5 h-5 text-blue-500" />
                      <span className="text-[14px] font-medium text-gray-800">Microphone</span>
                    </div>
                    <div className="w-10 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <span className="text-[14px] font-medium text-gray-800">Location</span>
                    </div>
                    <div className="w-10 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <button 
                    onClick={revokePermissions}
                    className="mt-6 w-full py-3 bg-red-100 text-red-600 rounded-xl font-bold text-[14px] border border-red-200 hover:bg-red-200 transition-colors"
                  >
                    Revoke All
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'revoked' && (
              <motion.div 
                key="screen-revoked"
                className="flex-1 bg-white flex flex-col items-center justify-center p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <WifiOff className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-[20px] font-bold text-gray-900 mb-2">Permissions Revoked</h3>
                <p className="text-[14px] text-gray-500">
                  The app can no longer access your data.
                </p>
                <button 
                  onClick={() => setStatus('app')}
                  className="mt-8 px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-[13px] font-bold hover:bg-gray-200"
                >
                  Reset App
                </button>
              </motion.div>
            )}
            
          </AnimatePresence>

          {/* Permission Overlay */}
          <AnimatePresence>
            {status === 'app' && (
              <motion.div 
                key="permission-modal"
                className="absolute inset-0 bg-black/50 z-20 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="bg-white rounded-t-3xl p-6 flex flex-col"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-[18px] font-bold text-black mb-3 leading-tight">Allow "Flashlight" to access:</h3>
                  <ul className="flex flex-col gap-3 mb-6">
                    <li className="flex items-center text-[14px] text-gray-700"><Camera className="w-4 h-4 mr-3 text-blue-500" /> Camera & Photos</li>
                    <li className="flex items-center text-[14px] text-gray-700"><Mic className="w-4 h-4 mr-3 text-red-500" /> Microphone</li>
                    <li className="flex items-center text-[14px] text-gray-700"><MapPin className="w-4 h-4 mr-3 text-green-500" /> Precise Location</li>
                    <li className="flex items-center text-[14px] text-gray-700"><Fingerprint className="w-4 h-4 mr-3 text-purple-500" /> Contact List</li>
                  </ul>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-[14px]">Deny</button>
                    <button onClick={grantPermissions} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold text-[14px]">Allow All</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Middle Column: Hacker Dashboard */}
      <div className="w-[450px] shrink-0 h-[550px] bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col font-mono text-green-500 relative">
        <div className="bg-[#111] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-500" />
            <span className="text-[12px] font-bold uppercase tracking-widest text-green-500">Hacker's Computer</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${(status === 'active' || status === 'settings') ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}></div>
        </div>

        {(status === 'active' || status === 'settings') ? (
          <div className="flex-1 p-4 grid grid-cols-2 gap-4">
            
            {/* Keylogger feed */}
            <div className="col-span-2 border border-green-900/50 bg-green-950/10 rounded-lg p-3.5 relative overflow-hidden flex flex-col">
              <h4 className="text-[10px] uppercase text-green-400/70 mb-2 flex items-center shrink-0"><Activity className="w-3 h-3 mr-1.5" /> Reading Your Messages</h4>
              <div className="text-[12px] leading-relaxed break-all overflow-hidden flex-1 relative">
                <div className="absolute inset-0 overflow-hidden flex flex-col justify-end">
                  {keyloggerLog.map((log, i) => (
                    <div key={i} className="mb-1 text-green-400">
                      <span className="text-green-700 mr-2">{'>'}</span> {log}
                    </div>
                  ))}
                  <div>
                    <motion.div 
                      className="w-2 h-3.5 bg-green-500 inline-block align-middle ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Tracker */}
            <div className="col-span-1 border border-green-900/50 bg-green-950/10 rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-center">
              <h4 className="text-[10px] uppercase text-green-400/70 mb-2 flex items-center"><MapPin className="w-3 h-3 mr-1.5" /> Location</h4>
              <div className="text-[12px] text-green-400 space-y-1">
                <div>LAT: {locationLat.toFixed(6)}</div>
                <div>LNG: {locationLng.toFixed(6)}</div>
              </div>
            </div>

            {/* Audio Intercept */}
            <div className="col-span-1 border border-green-900/50 bg-green-950/10 rounded-lg p-3.5 relative overflow-hidden flex flex-col justify-center">
              <h4 className="text-[10px] uppercase text-green-400/70 mb-2 flex items-center"><Mic className="w-3 h-3 mr-1.5" /> Audio Feed</h4>
              <div className="flex items-end justify-center gap-1 h-8 mt-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <motion.div 
                    key={i}
                    className="w-2 bg-red-500 rounded-t-sm"
                    animate={{ height: ['20%', '80%', '40%', '90%', '30%'] }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random(), repeatType: 'mirror' }}
                  />
                ))}
              </div>
            </div>

            {/* Clipboard Intercept */}
            <div className="col-span-2 border border-green-900/50 bg-green-950/10 rounded-lg p-3.5 relative overflow-hidden flex flex-col">
              <h4 className="text-[10px] uppercase text-green-400/70 mb-2 flex items-center"><Copy className="w-3 h-3 mr-1.5" /> Stealing Copied Text</h4>
              <div className="text-[12px] text-yellow-400 font-bold bg-yellow-900/20 p-2.5 rounded border border-yellow-900/50 flex-1 flex items-center overflow-hidden">
                <span className="truncate">{clipboard}</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-600">
            <WifiOff className="w-16 h-16 mb-4 opacity-50" />
            <div className="text-[20px] font-bold mb-3">NOT SPYING YET</div>
            <div className="text-[13px]">Waiting for you to click 'Allow'...</div>
          </div>
        )}
      </div>

      {/* Right Column: Instructions */}
      <div className="flex-1 max-w-sm flex flex-col justify-center">
        <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-4">The Invisible Spy!</h2>
        <p className="text-[16px] leading-relaxed text-[#86868b] mb-6">
          {status === 'app' && 'Look at this simple Flashlight app. Why does a flashlight need to use your microphone and camera? Click "Allow All" to see what happens.'}
          {status === 'active' && 'The "Invisible Spy" is now secretly tracking where you are, listening to your microphone, and reading every text message you type!'}
          {status === 'settings' && 'Go into your phone settings and turn off these permissions!'}
          {status === 'revoked' && 'Perfect! You stopped the spy. Never say "Allow" if an app asks for things it doesn\'t need!'}
        </p>

        <div className="h-[160px] relative">
          <AnimatePresence mode="wait">
            {status === 'active' && (
              <motion.div 
                key="action-active"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute inset-0 bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center"
              >
                <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
                <p className="text-[14px] font-semibold text-red-900 mb-2">
                  They are spying on you!
                </p>
                <p className="text-[13px] text-red-700 leading-tight">
                  Click the <Settings className="inline w-3.5 h-3.5 mx-1" /> Settings icon on the phone to stop them.
                </p>
              </motion.div>
            )}
            {status === 'settings' && (
              <motion.div 
                key="action-settings"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute inset-0 bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center"
              >
                <AlertTriangle className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-[14px] font-semibold text-blue-900 mb-2">
                  Turn Off Permissions
                </p>
                <p className="text-[13px] text-blue-700 leading-tight">
                  Click the red "Revoke All" button to kick the spy out!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

