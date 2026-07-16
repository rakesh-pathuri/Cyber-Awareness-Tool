import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Search, AlertTriangle, ShieldAlert, ArrowLeft, ArrowRight, RotateCw, Globe, Camera, GraduationCap, Eye } from 'lucide-react';

type Provider = 'google' | 'instagram' | 'school';

interface RedFlag {
  id: string;
  title: string;
  description: string;
}

export default function FakeLoginSimulator() {
  const [provider, setProvider] = useState<Provider>('google');
  const [status, setStatus] = useState<'login' | 'revealed' | 'postmortem'>('login');
  const [activeFlag, setActiveFlag] = useState<string | null>(null);

  const handleAppChange = (newProvider: Provider) => {
    setProvider(newProvider);
    setStatus('login');
    setActiveFlag(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('revealed');
  };

  const getUrl = () => {
    if (provider === 'google') return 'accounts.g00gle-security.com/login';
    if (provider === 'instagram') return 'www.instargram.com/login';
    return 'student-portal.district12-updates.net/auth';
  };

  const getPadlockFlag = (): RedFlag => ({
    id: 'padlock',
    title: 'The Padlock Myth',
    description: 'Many people think the padlock means a site is safe. IT DOES NOT! The padlock only means your connection is encrypted. Anyone, including scammers, can get a padlock for free in 5 minutes. It just means your connection to the scammer is private.'
  });

  const getUrlFlag = (): RedFlag => {
    if (provider === 'google') return {
      id: 'url',
      title: 'Look-Alike Domain',
      description: 'Look closely: It says "g00gle-security.com" instead of "google.com". Scammers buy domains that look almost identical to the real ones to trick your eyes.'
    };
    if (provider === 'instagram') return {
      id: 'url',
      title: 'The Typo Trick',
      description: 'Notice the extra "r" in "instargram.com"? Our brains read words as a whole, so we often glaze right over missing or added letters.'
    };
    return {
      id: 'url',
      title: 'Urgency / Fake Subdomains',
      description: 'Scammers use long, complicated URLs like "district12-updates" to confuse you. Always look for the exact, official domain of your school.'
    };
  };

  const renderAppSwitcher = () => (
    <div className="flex flex-col space-y-2 bg-white p-2.5 rounded-2xl shadow-sm border border-black/5">
      <button 
        onClick={() => handleAppChange('google')}
        className={`flex items-center px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${provider === 'google' ? 'bg-blue-50 text-blue-600' : 'text-[#86868b] hover:bg-gray-50'}`}
      >
        <Globe className="w-5 h-5 mr-3" /> Google
      </button>
      <button 
        onClick={() => handleAppChange('instagram')}
        className={`flex items-center px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${provider === 'instagram' ? 'bg-pink-50 text-pink-600' : 'text-[#86868b] hover:bg-gray-50'}`}
      >
        <Camera className="w-5 h-5 mr-3" /> Social
      </button>
      <button 
        onClick={() => handleAppChange('school')}
        className={`flex items-center px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${provider === 'school' ? 'bg-purple-50 text-purple-600' : 'text-[#86868b] hover:bg-gray-50'}`}
      >
        <GraduationCap className="w-5 h-5 mr-3" /> School
      </button>
    </div>
  );

  const renderGoogleLogin = () => (
    <div className="flex flex-col items-center justify-center p-4 bg-white h-full rounded-b-lg">
      <div className="w-full max-w-[320px] border border-gray-300 rounded-lg p-6 flex flex-col items-center shadow-sm">
        <h1 className="text-[20px] font-medium text-[#202124] mb-1"><span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span></h1>
        <h2 className="text-[20px] font-normal text-[#202124] mb-1 mt-2">Sign in</h2>
        <p className="text-[14px] text-[#202124] mb-4 text-center">Verify it's you to continue</p>
        
        <form className="w-full" onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Email or phone" 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#1a73e8] focus:border-2 outline-none text-[14px]"
              required
            />
            <div className="text-[12px] text-[#1a73e8] font-medium mt-1.5 cursor-pointer">Forgot email?</div>
          </div>
          <div className="mb-5">
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#1a73e8] focus:border-2 outline-none text-[14px]"
              required
            />
          </div>
          <div className="flex justify-between items-center w-full mt-2">
            <div className="text-[13px] text-[#1a73e8] font-medium cursor-pointer">Create account</div>
            <button type="submit" className="bg-[#1a73e8] text-white px-5 py-1.5 rounded text-[13px] font-medium hover:bg-[#1557b0] transition-colors">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderInstagramLogin = () => (
    <div className="flex flex-col items-center justify-center p-4 bg-[#fafafa] h-full rounded-b-lg">
      <div className="w-full max-w-[320px] bg-white border border-gray-300 rounded-sm p-6 flex flex-col items-center">
        <h1 className="text-[28px] font-medium text-black mb-6 font-serif italic">Instagram</h1>
        
        <form className="w-full flex flex-col gap-2" onSubmit={handleLoginSubmit}>
          <input 
            type="text" 
            placeholder="Phone number, username, or email" 
            className="w-full px-2 py-2 bg-[#fafafa] border border-gray-300 rounded-sm text-[12px] focus:border-gray-400 outline-none"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-2 py-2 bg-[#fafafa] border border-gray-300 rounded-sm text-[12px] focus:border-gray-400 outline-none"
            required
          />
          <button type="submit" className="bg-[#0095f6] text-white w-full py-1.5 rounded-lg text-[13px] font-semibold mt-2 hover:bg-[#1877f2] transition-colors">
            Log in
          </button>
        </form>

        <div className="flex items-center w-full mt-4 mb-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-[#8e8e8e] text-[11px] font-semibold px-4">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <div className="text-[13px] text-[#385185] font-semibold mb-2 cursor-pointer">Log in with Facebook</div>
        <div className="text-[11px] text-[#00376b] cursor-pointer">Forgot password?</div>
      </div>
    </div>
  );

  const renderSchoolLogin = () => (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-900 h-full rounded-b-lg">
      <div className="w-full max-w-[320px] bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <GraduationCap className="w-6 h-6 text-blue-900" />
        </div>
        <h1 className="text-[18px] font-bold text-gray-900 mb-1 text-center">Student Portal</h1>
        <p className="text-[12px] text-gray-500 mb-5 text-center">Sign in to access your grades and schedule</p>
        
        <form className="w-full flex flex-col gap-3" onSubmit={handleLoginSubmit}>
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Student ID</label>
            <input 
              type="text" 
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-[13px] focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-[13px] focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button type="submit" className="bg-blue-900 text-white w-full py-2 rounded-md text-[13px] font-bold mt-1 hover:bg-blue-800 transition-colors shadow-md">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-row items-center justify-center gap-10 h-full scale-105 md:scale-110 lg:scale-[1.2] origin-center">
      
      {/* Left Sidebar: App Switcher */}
      <div className="flex-shrink-0">
        {renderAppSwitcher()}
      </div>

      {/* Middle Column: Fake Browser Window */}
      <div className="w-[420px] flex flex-col shrink-0 relative shadow-2xl rounded-lg overflow-hidden border border-gray-300 bg-white h-[440px]">
        
        {/* Fake Browser Chrome */}
        <div className="bg-[#dee1e6] px-3 py-2 flex items-center gap-3 border-b border-gray-300 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <ArrowLeft className="w-4 h-4" />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <RotateCw className="w-4 h-4" />
          </div>

          <div className="flex-1 bg-white rounded-full flex items-center px-3 py-1.5 shadow-sm border border-gray-200 relative">
            
            {/* The Padlock (Interactive in postmortem) */}
            <div 
              className={`flex items-center justify-center rounded transition-all mr-2 ${status === 'postmortem' ? 'cursor-pointer hover:bg-red-100 p-1 -ml-1 ring-2 ring-red-500 ring-offset-1' : ''} ${activeFlag === 'padlock' ? 'bg-red-100' : ''}`}
              onClick={() => status === 'postmortem' && setActiveFlag('padlock')}
            >
              <Lock className={`w-3.5 h-3.5 ${status === 'postmortem' ? 'text-red-600' : 'text-gray-500'}`} />
            </div>

            {/* The URL (Interactive in postmortem) */}
            <div 
              className={`text-[13px] tracking-tight truncate min-w-0 flex-1 transition-all ${status === 'postmortem' ? 'cursor-pointer hover:bg-red-100 rounded px-1 ring-2 ring-red-500' : 'text-gray-800'} ${activeFlag === 'url' ? 'bg-red-100 text-red-700 font-medium' : ''}`}
              onClick={() => status === 'postmortem' && setActiveFlag('url')}
            >
              {getUrl()}
            </div>
            
            <Search className="w-3.5 h-3.5 text-gray-400 ml-2 shrink-0" />

            {/* Pulsing Hint for Postmortem */}
            {status === 'postmortem' && !activeFlag && (
              <motion.div 
                className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg flex items-center z-50"
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45"></div>
                Click the Lock Icon (🔒) and Web Address
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-white overflow-y-auto">
          <div className={status === 'postmortem' ? 'opacity-30 pointer-events-none blur-sm transition-all duration-1000' : ''}>
            {provider === 'google' && renderGoogleLogin()}
            {provider === 'instagram' && renderInstagramLogin()}
            {provider === 'school' && renderSchoolLogin()}
          </div>

          {/* Reveal Overlay */}
          <AnimatePresence>
            {status === 'revealed' && (
              <motion.div 
                className="absolute inset-0 bg-red-600/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-white z-20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <ShieldAlert className="w-16 h-16 mb-4 text-white" />
                <h3 className="text-[32px] font-bold mb-2">You Got Phished!</h3>
                <p className="text-[16px] text-white/90 mb-8 leading-relaxed">
                  You just typed your credentials into a fake website controlled by hackers. Let's see how you could have spotted it.
                </p>
                <button 
                  onClick={() => setStatus('postmortem')}
                  className="px-8 py-3 bg-white text-red-600 rounded-full font-bold text-[16px] hover:bg-gray-100 transition-colors shadow-xl flex items-center"
                >
                  <Eye className="w-5 h-5 mr-2" /> View The Red Flags
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Instructions & Feedback */}
      <div className="flex-1 max-w-md flex flex-col justify-center">
        
        <div className="mb-8">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-3">Fake Login Simulator</h2>
          <p className="text-[16px] leading-relaxed text-[#86868b]">
            {status === 'login' && 'Pick a platform on the left and try typing anything into the login boxes. We never store credentials.'}
            {status === 'revealed' && 'Uh oh...'}
            {status === 'postmortem' && 'Click the highlighted red areas in the fake browser address bar to understand what tricked you.'}
          </p>
        </div>

        {/* Dynamic Explanation Panel */}
        <div className="h-[180px] relative">
          <AnimatePresence mode="wait">
            {status === 'postmortem' && activeFlag && (
              <motion.div 
                key={activeFlag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute inset-0 bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm flex flex-col"
              >
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 shrink-0" />
                  <span className="font-bold text-red-900 text-[15px]">{activeFlag === 'padlock' ? getPadlockFlag().title : getUrlFlag().title}</span>
                </div>
                <p className="text-[15px] text-[#1d1d1f] font-medium leading-relaxed">
                  {activeFlag === 'padlock' ? getPadlockFlag().description : getUrlFlag().description}
                </p>
              </motion.div>
            )}
            
            {status === 'login' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-start text-[14px] text-gray-400 italic"
              >
                Waiting for interaction...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
