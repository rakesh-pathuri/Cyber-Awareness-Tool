import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Camera, MessageCircle, ShieldCheck, Info, Lock, EyeOff, Server, ArrowRight, Database } from 'lucide-react';

type AppType = 'gmail' | 'instagram' | 'whatsapp';

interface RedFlag {
  id: string;
  text: string;
  explanation: string;
}

export default function PhishingSimulator() {
  const [activeApp, setActiveApp] = useState<AppType>('gmail');
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'login' | 'stealing' | 'phished' | 'success'>('playing');
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null);

  const [fakeUsername, setFakeUsername] = useState('');
  const [fakePassword, setFakePassword] = useState('');

  const reset = () => {
    setFoundFlags([]);
    setStatus('playing');
    setActiveExplanation(null);
    setFakeUsername('');
    setFakePassword('');
  };

  const handleAppChange = (app: AppType) => {
    setActiveApp(app);
    reset();
  };

  const handleFlagClick = (flag: RedFlag) => {
    if (status !== 'playing') return;
    if (!foundFlags.includes(flag.id)) {
      const newFlags = [...foundFlags, flag.id];
      setFoundFlags(newFlags);
      setActiveExplanation(flag.explanation);
      
      const totalFlags = 
        activeApp === 'gmail' ? 3 :
        activeApp === 'instagram' ? 2 : 3;

      if (newFlags.length === totalFlags) {
        setStatus('success');
      }
    }
  };

  const handleLinkClick = () => {
    if (status !== 'playing') return;
    setStatus('login');
  };

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fakeUsername || !fakePassword) return;
    setStatus('stealing');
    
    setTimeout(() => {
      setStatus('phished');
    }, 3500);
  };

  const renderAppSwitcher = () => (
    <div className="flex flex-col space-y-2 bg-white p-2.5 rounded-2xl shadow-sm border border-black/5">
      <button 
        onClick={() => handleAppChange('gmail')}
        className={`flex items-center px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${activeApp === 'gmail' ? 'bg-[#ea4335]/10 text-[#ea4335]' : 'text-[#86868b] hover:bg-gray-50'}`}
      >
        <Mail className="w-5 h-5 mr-3" /> Mail
      </button>
      <button 
        onClick={() => handleAppChange('instagram')}
        className={`flex items-center px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${activeApp === 'instagram' ? 'bg-[#e1306c]/10 text-[#e1306c]' : 'text-[#86868b] hover:bg-gray-50'}`}
      >
        <Camera className="w-5 h-5 mr-3" /> Social
      </button>
      <button 
        onClick={() => handleAppChange('whatsapp')}
        className={`flex items-center px-5 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${activeApp === 'whatsapp' ? 'bg-[#25d366]/10 text-[#25d366]' : 'text-[#86868b] hover:bg-gray-50'}`}
      >
        <MessageCircle className="w-5 h-5 mr-3" /> Chat
      </button>
    </div>
  );

  const getFlagClass = (id: string) => {
    return foundFlags.includes(id) 
      ? "bg-green-100 text-green-800 outline outline-2 outline-green-500 rounded px-1 cursor-default transition-all"
      : "hover:bg-red-50 hover:text-red-600 rounded px-1 cursor-pointer transition-colors";
  };

  const renderGmail = () => {
    const flags = {
      sender: { id: 'g-sender', text: 'billing@netf1ix-security.com', explanation: 'Look closely at the email address. It has a number "1" instead of an "l". Always check the spelling!' },
      greeting: { id: 'g-greet', text: 'Dear Customer', explanation: 'Real companies know your name. "Dear Customer" is a huge warning sign that it\'s a fake.' },
      urgency: { id: 'g-urgency', text: 'suspended in 24 hours', explanation: 'Hackers try to scare you so you panic and click without thinking.' }
    };

    return (
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/[0.04] overflow-hidden text-left w-full mx-auto max-w-lg">
        <div className="bg-[#f2f2f2] px-4 py-3 border-b border-gray-200 flex items-center">
          <Mail className="text-[#5f6368] w-4 h-4 mr-3" />
          <span className="text-[#202124] text-[15px] font-medium">Action Required: Payment Declined</span>
        </div>
        
        <div className="px-4 py-3 flex items-start">
          <div className="w-8 h-8 rounded-full bg-[#ea4335] text-white flex items-center justify-center font-bold text-sm mr-3 shrink-0">N</div>
          <div>
            <div className="flex items-baseline flex-wrap">
              <span className="font-bold text-[14px] text-[#202124] mr-1">Netflix Support</span>
              <span className="text-[11px] text-[#5f6368]">&lt;</span>
              <span 
                className={`text-[12px] font-mono text-[#5f6368] ${getFlagClass(flags.sender.id)}`}
                onClick={() => handleFlagClick(flags.sender)}
              >
                {flags.sender.text}
              </span>
              <span className="text-[11px] text-[#5f6368]">&gt;</span>
            </div>
            <div className="text-[11px] text-[#5f6368] mt-0.5">To: me</div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-1 text-[#3c4043] text-[13px] leading-relaxed">
          <p className="mb-3">
            <span 
              className={getFlagClass(flags.greeting.id)}
              onClick={() => handleFlagClick(flags.greeting)}
            >
              {flags.greeting.text}
            </span>,
          </p>
          <p className="mb-3">
            We were unable to process your latest payment. Your subscription will be <span 
              className={getFlagClass(flags.urgency.id)}
              onClick={() => handleFlagClick(flags.urgency)}
            >
              {flags.urgency.text}
            </span> unless you update your billing information immediately.
          </p>
          <div className="mt-4">
            <button 
              onClick={handleLinkClick}
              className="bg-[#ea4335] hover:bg-[#d93025] text-white px-5 py-2 rounded font-medium transition-colors text-[13px]"
            >
              Update Payment Details
            </button>
          </div>
          <p className="mt-4 text-[11px] text-[#5f6368]">
            This is an automated message. Please do not reply.
          </p>
        </div>
      </div>
    );
  };

  const renderInstagram = () => {
    const flags = {
      emotion: { id: 'i-emotion', text: "omg i can't believe they posted this picture of you 😱😱", explanation: 'Hackers try to shock or scare you so you click their links fast.' },
      link: { id: 'i-link', text: 'http://instargram-login.com/photo/892', explanation: 'Look closely! It says "instargram" with an extra "r". It\'s a fake link!' }
    };

    return (
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden w-[350px] mx-auto flex flex-col min-h-[400px]">
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-center relative shrink-0">
          <span className="font-semibold text-[#262626] text-[15px]">@rohit_kumar99</span>
        </div>
        
        <div className="flex-1 bg-white p-4 flex flex-col justify-end">
          <div className="flex items-end mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px] mr-2 shrink-0">
              <div className="w-full h-full bg-white rounded-full border border-white overflow-hidden">
                <div className="w-full h-full bg-gray-200"></div>
              </div>
            </div>
            <div className="bg-[#efefef] rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] text-[14px] text-[#262626]">
              <span 
                className={getFlagClass(flags.emotion.id)}
                onClick={() => handleFlagClick(flags.emotion)}
              >
                {flags.emotion.text}
              </span>
              <br /><br />
              <span 
                className={`text-[#00376b] font-medium break-all cursor-pointer hover:underline ${getFlagClass(flags.link.id)}`}
                onClick={() => {
                  handleFlagClick(flags.link);
                  if (!foundFlags.includes(flags.link.id)) handleLinkClick();
                }}
              >
                {flags.link.text}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-white shrink-0">
          <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-[14px] text-gray-400">
            Message...
          </div>
        </div>
      </div>
    );
  };

  const renderWhatsApp = () => {
    const flags = {
      sender: { id: 'w-sender', text: '+1 (555) 019-8372', explanation: 'If Apple was really giving out prizes, it wouldn\'t come from a random, unknown phone number.' },
      offer: { id: 'w-offer', text: 'win a FREE iPhone 15 Pro Max!', explanation: 'If it sounds too good to be true, it is a trick. Nobody gives away free $1200 phones!' },
      link: { id: 'w-link', text: 'http://tinyurl.com/free-ip15', explanation: 'Hackers use weird short links so you can\'t see the real, dangerous website name.' }
    };

    return (
      <div className="bg-[#efeae2] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden w-[350px] mx-auto flex flex-col min-h-[400px]">
        <div className="bg-[#008069] px-4 py-3 flex items-center relative shrink-0 text-white">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden flex items-center justify-center">
            <span className="text-gray-500 text-xs">?</span>
          </div>
          <div>
            <div 
              className={`font-medium text-[15px] ${getFlagClass(flags.sender.id)}`}
              onClick={() => handleFlagClick(flags.sender)}
            >
              {flags.sender.text}
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-end">
          <div className="bg-white rounded-lg rounded-tl-sm px-2.5 py-2 max-w-[85%] shadow-sm relative">
            <p className="text-[14px] text-[#111b21] leading-snug">
              Congratulations! You've been selected to <span 
                className={getFlagClass(flags.offer.id)}
                onClick={() => handleFlagClick(flags.offer)}
              >
                {flags.offer.text}
              </span> 📱✨
              <br /><br />
              Claim your prize immediately before it expires: 
              <br />
              <span 
                className={`text-[#027eb5] cursor-pointer hover:underline ${getFlagClass(flags.link.id)}`}
                onClick={() => {
                  handleFlagClick(flags.link);
                  if (!foundFlags.includes(flags.link.id)) handleLinkClick();
                }}
              >
                {flags.link.text}
              </span>
            </p>
            <div className="text-[10px] text-gray-400 text-right mt-1">10:42 AM</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFakeLogin = () => {
    const urls = {
      gmail: 'https://netf1ix-billing-update.com/login',
      instagram: 'https://instargram-login.com/auth',
      whatsapp: 'https://apple-prize-claim-portal.com/login'
    };

    const themes = {
      gmail: { bg: 'bg-black', text: 'text-white', brand: 'NETFLIX', primary: 'bg-[#e50914]' },
      instagram: { bg: 'bg-white', text: 'text-black', brand: 'Instagram', primary: 'bg-[#0095f6]' },
      whatsapp: { bg: 'bg-black', text: 'text-white', brand: 'Apple ID', primary: 'bg-[#007aff]' }
    };

    const theme = themes[activeApp];
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 bg-white z-30 rounded-xl overflow-hidden flex flex-col shadow-2xl border border-gray-200"
      >
        <div className="bg-gray-100 border-b border-gray-300 p-2 flex flex-col gap-2 shrink-0">
          <div className="flex gap-1.5 px-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="bg-white rounded-md mx-2 px-3 py-1 flex items-center border border-gray-200">
            <Lock className="w-3 h-3 text-gray-400 mr-2" />
            <span className="text-xs text-gray-600 font-mono flex-1 truncate">{urls[activeApp]}</span>
          </div>
        </div>

        <div className={`flex-1 flex flex-col items-center justify-center p-6 ${theme.bg} ${theme.text}`}>
          <h2 className={`text-2xl font-black tracking-tighter mb-8 ${activeApp === 'gmail' ? 'text-[#e50914]' : ''}`}>{theme.brand}</h2>
          
          <form onSubmit={handleFakeLogin} className="w-full max-w-xs space-y-4">
            <div className="space-y-3">
              <input 
                type="text" 
                required
                value={fakeUsername}
                onChange={e => setFakeUsername(e.target.value)}
                placeholder="Email or phone number"
                className="w-full px-4 py-3 rounded text-sm bg-gray-50 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="password" 
                required
                value={fakePassword}
                onChange={e => setFakePassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded text-sm bg-gray-50 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button 
              type="submit"
              className={`w-full py-3 rounded font-bold text-white transition-opacity hover:opacity-90 ${theme.primary}`}
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 flex items-center text-xs text-gray-500 opacity-60">
            <Info className="w-3 h-3 mr-1" /> This is a simulation. Do not enter real passwords.
          </div>
        </div>
      </motion.div>
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
        
        <div className="flex items-center justify-center w-full px-6 gap-2">
          <div className="bg-gray-800 p-3 rounded border border-gray-700 w-1/3">
            <div className="text-gray-500 text-[10px] mb-2 uppercase">Fake Website</div>
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
             <ArrowRight className="w-4 h-4 text-gray-600 mt-2" />
          </div>

          <div className="bg-red-950 p-3 rounded border border-red-900 w-1/3 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <div className="text-red-500 text-[10px] mb-2 uppercase flex items-center gap-1"><Server className="w-3 h-3"/> Hacker's Computer</div>
            <div className="text-red-300 text-xs truncate font-bold">Saving your password...</div>
            <div className="text-red-300 text-xs truncate">GOT IT!</div>
          </div>
        </div>
        
        <p className="mt-10 text-gray-400 text-xs text-center px-4">
          The fake website just sent your secret password straight to the hacker's computer!
        </p>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-row items-center justify-center gap-10 h-full scale-105 md:scale-110 lg:scale-[1.2] origin-center">
      
      <div className="flex-shrink-0">
        {renderAppSwitcher()}
      </div>

      <div className="w-[420px] flex flex-col shrink-0 relative min-h-[500px]">
          {activeApp === 'gmail' && renderGmail()}
          {activeApp === 'instagram' && renderInstagram()}
          {activeApp === 'whatsapp' && renderWhatsApp()}
          
          <AnimatePresence>
            {status === 'login' && renderFakeLogin()}
            {status === 'stealing' && renderStealAnimation()}

            {status === 'phished' && (
              <motion.div 
                className="absolute inset-0 bg-red-600/95 backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-6 text-center text-white z-50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <EyeOff className="w-12 h-12 mb-3" />
                <h3 className="text-[24px] font-bold mb-2">Oh No! You Got Tricked!</h3>
                <p className="text-[14px] text-white/90 mb-4">
                  The link took you to a fake website made by a hacker to steal your password!
                </p>
                <div className="bg-black/20 p-3 rounded-lg mb-6 w-full text-left">
                   <p className="text-xs text-red-200 uppercase font-bold mb-1">What the hacker stole:</p>
                   <p className="text-sm font-mono truncate">Email: {fakeUsername}</p>
                   <p className="text-sm font-mono truncate">Password: {fakePassword}</p>
                </div>
                <button 
                  onClick={reset}
                  className="px-6 py-2 bg-white text-red-600 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div 
                className="absolute inset-0 bg-green-500/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 text-center text-white z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <ShieldCheck className="w-12 h-12 mb-3" />
                <h3 className="text-[24px] font-bold mb-2">Safe!</h3>
                <p className="text-[14px] text-white/90 mb-6">
                  Awesome job finding all the tricks. You stayed safe!
                </p>
                <button 
                  onClick={reset}
                  className="px-6 py-2 bg-white text-green-600 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Reset Simulation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
      </div>

      <div className="flex-1 max-w-md flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-3">Phishing Simulator</h2>
          <p className="text-[16px] leading-relaxed text-[#86868b]">
            Tap the <span className="font-semibold text-red-500">"Red Flags"</span> in the messages on the left. Don't click the main button/link until you find them all!
          </p>
        </div>

        <div className="h-[140px] relative">
          <AnimatePresence mode="wait">
            {activeExplanation && status === 'playing' && (
              <motion.div 
                key={activeExplanation}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute inset-0 bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <Info className="w-5 h-5 text-blue-600 mr-2 shrink-0" />
                  <span className="font-semibold text-blue-900 text-[14px] uppercase tracking-wider">Hacker Trick Found!</span>
                </div>
                <p className="text-[15px] text-[#1d1d1f] font-medium leading-relaxed">
                  {activeExplanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
