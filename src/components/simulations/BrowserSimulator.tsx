import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, Search, Lock, X, AlertTriangle, ShieldAlert, MonitorDown, Plus, Download, AlertCircle, RefreshCcw, Globe } from 'lucide-react';

type PageState = 'google-home' | 'google-search' | 'scam-site' | 'safe-site' | 'postmortem';

export default function BrowserSimulator() {
  const [page, setPage] = useState<PageState>('google-home');
  const [url, setUrl] = useState('https://www.google.com');
  const [searchQuery, setSearchQuery] = useState('');
  const [scarewareActive, setScarewareActive] = useState(false);
  const [scarewareAudio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  useEffect(() => {
    if (scarewareActive) {
      scarewareAudio.loop = true;
      scarewareAudio.play().catch(() => {});
    } else {
      scarewareAudio.pause();
      scarewareAudio.currentTime = 0;
    }
    return () => {
      scarewareAudio.pause();
    };
  }, [scarewareActive, scarewareAudio]);

  const navigateTo = (newPage: PageState, newUrl: string) => {
    setPage(newPage);
    setUrl(newUrl);
    if (newPage === 'scam-site') {
      setTimeout(() => setScarewareActive(true), 2500); // trigger scareware after 2.5s
    } else {
      setScarewareActive(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('google-search', `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const triggerPostmortem = () => {
    setScarewareActive(false);
    setPage('postmortem');
  };

  const reset = () => {
    setScarewareActive(false);
    setSearchQuery('');
    navigateTo('google-home', 'https://www.google.com');
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden relative font-sans">
      
      {/* Fake Browser Chrome */}
      <div className="bg-[#dee1e6] flex flex-col shrink-0">
        {/* Tabs Area */}
        <div className="flex items-end px-3 pt-2 gap-2">
          <div className="flex gap-1.5 mb-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          
          <div className="bg-white rounded-t-lg px-4 py-2 text-[12px] flex items-center min-w-[200px] border-r border-l border-t border-gray-300 relative z-10">
            <Globe className="w-3 h-3 mr-2 text-gray-500" />
            <span className="truncate flex-1">
              {page.includes('google') ? 'Google' : page === 'scam-site' ? 'Free Downloads' : page === 'safe-site' ? 'Official Site' : 'Warning'}
            </span>
            <X className="w-3 h-3 text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer ml-2" />
          </div>
          
          <div className="p-2 text-gray-500 hover:bg-gray-300 rounded-full mb-1 cursor-pointer">
            <Plus className="w-4 h-4" />
          </div>
        </div>

        {/* URL Bar Area */}
        <div className="bg-white px-3 py-2 flex items-center gap-3 border-b border-gray-300 z-20">
          <div className="flex items-center gap-2 text-gray-500">
            <ArrowLeft className="w-4 h-4 cursor-pointer hover:bg-gray-100 rounded" onClick={() => navigateTo('google-home', 'https://www.google.com')} />
            <ArrowRight className="w-4 h-4 text-gray-300" />
            <RotateCw className="w-4 h-4 cursor-pointer hover:bg-gray-100 rounded" />
          </div>

          <div className="flex-1 bg-[#f1f3f4] rounded-full flex items-center px-4 py-1.5">
            <Lock className={`w-3.5 h-3.5 mr-2 ${page === 'scam-site' ? 'text-red-500' : 'text-gray-500'}`} />
            <div className={`text-[13px] tracking-tight truncate min-w-0 flex-1 ${page === 'scam-site' ? 'text-red-600' : 'text-gray-800'}`}>
              {url}
            </div>
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white overflow-y-auto overflow-x-hidden">
        
        <AnimatePresence mode="wait">
          
          {page === 'google-home' && (
            <motion.div 
              key="google-home"
              className="min-h-full flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="text-[72px] font-bold text-gray-800 tracking-tighter mb-8 flex items-center">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </div>
              <form onSubmit={handleSearch} className="w-full max-w-[584px]">
                <div className="w-full flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    className="flex-1 outline-none text-[16px]"
                    placeholder="Search Google or type a URL"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <MonitorDown className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => {setSearchQuery('Download Free Games'); handleSearch(new Event('submit') as any);}} />
                </div>
                <div className="flex justify-center gap-3 mt-6">
                  <button type="submit" className="px-4 py-2 bg-[#f8f9fa] border border-[#f8f9fa] hover:border-gray-300 text-[14px] text-gray-700 rounded transition-colors">Google Search</button>
                  <button type="button" className="px-4 py-2 bg-[#f8f9fa] border border-[#f8f9fa] hover:border-gray-300 text-[14px] text-gray-700 rounded transition-colors">I'm Feeling Lucky</button>
                </div>
              </form>
              <div className="mt-8 text-[13px] text-gray-600">
                Hint: Try searching for "Download Minecraft Free"
              </div>
            </motion.div>
          )}

          {page === 'google-search' && (
            <motion.div 
              key="google-search"
              className="min-h-full flex flex-col"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="px-36 py-4 text-[13px] text-gray-500 border-b border-gray-200">
                About 14,300,000 results (0.32 seconds)
              </div>
              
              <div className="px-36 py-6 flex flex-col gap-8 max-w-[800px]">
                
                {/* Malicious Sponsored Result */}
                <div className="group cursor-pointer" onClick={() => navigateTo('scam-site', 'http://free-games-download-now-no-virus.biz/dl/minecraft')}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[12px] text-black bg-gray-100 px-1.5 py-0.5 rounded">Sponsored</span>
                    <span className="text-[12px] text-gray-600">http://free-games-download-now-no-virus.biz › dl</span>
                  </div>
                  <h3 className="text-[20px] text-[#1a0dab] group-hover:underline mb-1">Minecraft 100% Free Download - No Virus Guaranteed</h3>
                  <p className="text-[14px] text-[#4d5156] leading-snug">
                    Download the latest version of Minecraft absolutely free. No credit card required. Fast download speeds. Click here to get your free copy now before this offer expires!
                  </p>
                </div>

                {/* Safe Organic Result */}
                <div className="group cursor-pointer" onClick={() => navigateTo('safe-site', 'https://www.minecraft.net/en-us/download')}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">M</div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#202124]">Minecraft</span>
                      <span className="text-[12px] text-gray-600">https://www.minecraft.net › download</span>
                    </div>
                  </div>
                  <h3 className="text-[20px] text-[#1a0dab] group-hover:underline mb-1">Download Minecraft | Minecraft</h3>
                  <p className="text-[14px] text-[#4d5156] leading-snug">
                    Download Minecraft for Windows, Mac, and Linux. Download server software for Java and Bedrock, and begin playing Minecraft with your friends.
                  </p>
                </div>

                {/* Another Organic Result */}
                <div className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] text-gray-600">https://en.wikipedia.org › wiki › Minecraft</span>
                  </div>
                  <h3 className="text-[20px] text-[#1a0dab] group-hover:underline mb-1">Minecraft - Wikipedia</h3>
                  <p className="text-[14px] text-[#4d5156] leading-snug">
                    Minecraft is a sandbox video game developed by Mojang Studios. The game was created by Markus "Notch" Persson in the Java programming language.
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {page === 'scam-site' && (
            <motion.div 
              key="scam-site"
              className="min-h-[600px] bg-[#f4f4f4] relative overflow-hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="max-w-4xl mx-auto p-8 pt-12 flex flex-col items-center">
                <h1 className="text-[42px] font-black text-red-600 text-center mb-4 uppercase tracking-tighter drop-shadow-sm">
                  YOUR DOWNLOAD IS READY!!!
                </h1>
                <p className="text-xl font-bold mb-8 text-gray-800">File: Setup_Minecraft_Free_Crack.exe (3.2 MB)</p>
                
                {/* Fake Download Button */}
                <button 
                  onClick={triggerPostmortem}
                  className="bg-green-500 hover:bg-green-600 text-white font-black text-3xl py-6 px-16 rounded-full shadow-[0_10px_0_rgb(21,128,61)] active:shadow-[0_0px_0_rgb(21,128,61)] active:translate-y-[10px] transition-all flex items-center gap-4 animate-bounce"
                >
                  <Download className="w-10 h-10" />
                  DOWNLOAD NOW
                </button>
                
                <p className="text-gray-500 text-sm mt-6 mb-12">100% Virus Free • Fast Download • Secure</p>

                {/* Malvertising Banners */}
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="bg-yellow-100 border border-yellow-300 p-4 text-center cursor-pointer hover:bg-yellow-200" onClick={triggerPostmortem}>
                    <p className="font-bold text-red-600 mb-2">WARNING: Your drivers are out of date!</p>
                    <button className="bg-red-500 text-white px-4 py-1 text-sm font-bold">Update Now</button>
                  </div>
                  <div className="bg-blue-100 border border-blue-300 p-4 text-center cursor-pointer hover:bg-blue-200" onClick={triggerPostmortem}>
                    <p className="font-bold text-blue-800 mb-2">You are the 1,000,000th visitor!</p>
                    <button className="bg-blue-600 text-white px-4 py-1 text-sm font-bold">Claim Prize</button>
                  </div>
                </div>
              </div>

              {/* Scareware Popup Overlay */}
              <AnimatePresence>
                {scarewareActive && (
                  <motion.div 
                    className="absolute inset-0 bg-red-600/90 z-50 flex items-center justify-center p-8 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border-4 border-red-500 flex flex-col">
                      <div className="bg-red-600 text-white p-3 font-bold flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5" />
                          Windows Defender Security Center
                        </div>
                        <X className="w-5 h-5 opacity-50 cursor-not-allowed" />
                      </div>
                      <div className="p-6 text-center">
                        <h2 className="text-3xl font-black text-red-600 mb-4 uppercase">System Infected!</h2>
                        <p className="text-gray-700 font-bold mb-4 text-lg">
                          Trojan_Spyware_Zeus.exe detected!
                        </p>
                        <p className="text-gray-600 mb-6 text-sm">
                          Your passwords, browser history, and credit card information are being stolen. Do not close this window or reboot your computer.
                        </p>
                        <div className="bg-yellow-100 border border-yellow-300 p-4 mb-6 text-lg font-bold">
                          Call Microsoft Support Immediately: <br/>
                          <span className="text-2xl text-blue-600">+91 1800-123-4567</span>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button className="bg-gray-200 text-gray-800 px-4 py-2 font-bold cursor-not-allowed opacity-50">Cancel</button>
                          <button className="bg-blue-600 text-white px-6 py-2 font-bold" onClick={triggerPostmortem}>Scan Now</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {page === 'safe-site' && (
            <motion.div 
              key="safe-site"
              className="min-h-full flex items-center justify-center bg-[#1d1d1d] text-white"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Official Minecraft Site</h1>
                <p className="text-gray-400">You successfully navigated to the legitimate website. Safe browsing!</p>
                <button onClick={reset} className="mt-8 px-6 py-2 bg-green-600 rounded text-white font-bold hover:bg-green-700">Go Back to Google</button>
              </div>
            </motion.div>
          )}

          {page === 'postmortem' && (
            <motion.div 
              key="postmortem"
              className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-start pt-8 pb-4 px-4 overflow-y-auto text-white"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="max-w-2xl text-center flex flex-col items-center mt-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
                <h2 className="text-3xl font-bold mb-2 text-white">You fell for the trap.</h2>
                <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                  You clicked on a malicious sponsored search result, leading to a site designed to infect your computer.
                </p>
                
                <div className="text-left w-full bg-white/10 rounded-xl p-4 mb-5 border border-white/20">
                  <h3 className="font-bold text-base mb-2 text-blue-400 border-b border-white/20 pb-2">The Red Flags:</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="bg-red-500/20 text-red-400 p-1.5 rounded mt-0.5"><AlertTriangle className="w-4 h-4" /></div>
                      <div>
                        <strong className="block text-white text-[15px]">Sponsored Results</strong>
                        <span className="text-[13px] text-gray-400">Scammers pay Google to put their malicious websites at the top of the search results for popular keywords like "free download".</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-red-500/20 text-red-400 p-1.5 rounded mt-0.5"><Lock className="w-4 h-4" /></div>
                      <div>
                        <strong className="block text-white text-[15px]">Sketchy URL</strong>
                        <span className="text-[13px] text-gray-400">The website address was clearly not the official source (minecraft.net).</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-red-500/20 text-red-400 p-1.5 rounded mt-0.5"><ShieldAlert className="w-4 h-4" /></div>
                      <div>
                        <strong className="block text-white text-[15px]">Tech Support Scam / Scareware</strong>
                        <span className="text-[13px] text-gray-400">The popup was fake. Microsoft and Apple will NEVER show a popup in your browser telling you to call a phone number.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}

