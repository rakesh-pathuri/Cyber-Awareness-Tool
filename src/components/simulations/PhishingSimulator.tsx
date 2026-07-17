import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Camera, MessageCircle, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

type AppType = 'gmail' | 'instagram' | 'whatsapp';

interface RedFlag {
  id: string;
  text: string;
  explanation: string;
}

export default function PhishingSimulator() {
  const [activeApp, setActiveApp] = useState<AppType>('gmail');
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'phished' | 'success'>('playing');
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null);

  const reset = () => {
    setFoundFlags([]);
    setStatus('playing');
    setActiveExplanation(null);
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
    setStatus('phished');
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
      sender: { id: 'g-sender', text: 'billing@netf1ix-security.com', explanation: 'Look closely at the domain. It uses the number "1" instead of an "l" (netf1ix). Always check the exact email address!' },
      greeting: { id: 'g-greet', text: 'Dear Customer', explanation: 'Legitimate companies know your name. Generic greetings like "Dear Customer" are a major red flag.' },
      urgency: { id: 'g-urgency', text: 'suspended in 24 hours', explanation: 'Scammers manufacture extreme urgency to make you panic and click without thinking critically.' }
    };

    return (
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/[0.04] overflow-hidden text-left w-full mx-auto max-w-lg">
        {/* Gmail Header */}
        <div className="bg-[#f2f2f2] px-4 py-3 border-b border-gray-200 flex items-center">
          <Mail className="text-[#5f6368] w-4 h-4 mr-3" />
          <span className="text-[#202124] text-[15px] font-medium">Action Required: Payment Declined</span>
        </div>
        
        {/* Email Metadata */}
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

        {/* Email Body */}
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
      emotion: { id: 'i-emotion', text: 'omg i can\'t believe they posted this picture of you 😱😱', explanation: 'Scammers exploit extreme emotions (fear, shock, curiosity) to bypass your logical thinking.' },
      link: { id: 'i-link', text: 'http://instargram-login.com/photo/892', explanation: 'Hovering or inspecting the link reveals it goes to "instargram-login.com" instead of the real app.' }
    };

    return (
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden w-[350px] mx-auto flex flex-col h-[400px]">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-center relative shrink-0">
          <span className="font-semibold text-[#262626] text-[15px]">@rohit_kumar99</span>
        </div>
        
        {/* Chat Area */}
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
                className={`text-[#00376b] font-medium break-all ${getFlagClass(flags.link.id)}`}
                onClick={() => handleFlagClick(flags.link)}
              >
                {flags.link.text}
              </span>
            </div>
          </div>
        </div>
        
        {/* Input */}
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
      sender: { id: 'w-sender', text: '+1 (555) 019-8372', explanation: 'If a massive company like Apple were running a contest, it would not come from an unsaved, random phone number.' },
      offer: { id: 'w-offer', text: 'win a FREE iPhone 15 Pro Max!', explanation: 'If an offer is too good to be true, it is. Nobody is giving away $1200 phones for free.' },
      link: { id: 'w-link', text: 'http://tinyurl.com/free-ip15', explanation: 'Scammers use URL shorteners (like bit.ly or tinyurl) to hide the true, malicious destination of the link.' }
    };

    return (
      <div className="bg-[#efeae2] rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden w-[350px] mx-auto flex flex-col h-[400px]">
        {/* Header */}
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
        
        {/* Chat Area */}
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
                className={`text-[#027eb5] ${getFlagClass(flags.link.id)}`}
                onClick={() => handleFlagClick(flags.link)}
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

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-row items-center justify-center gap-10 h-full scale-105 md:scale-110 lg:scale-[1.2] origin-center">
      
      {/* Left Sidebar: App Switcher */}
      <div className="flex-shrink-0">
        {renderAppSwitcher()}
      </div>

      {/* Middle Column: Interactive Simulator */}
      <div className="w-[420px] flex flex-col shrink-0 relative">
          {activeApp === 'gmail' && renderGmail()}
          {activeApp === 'instagram' && renderInstagram()}
          {activeApp === 'whatsapp' && renderWhatsApp()}
          
          {/* Overlays */}
          <AnimatePresence>
            {status === 'phished' && (
              <motion.div 
                className="absolute inset-0 bg-red-600/95 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 text-center text-white z-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertTriangle className="w-12 h-12 mb-3" />
                <h3 className="text-[24px] font-bold mb-2">You Got Phished!</h3>
                <p className="text-[14px] text-white/90 mb-6">
                  You clicked the malicious link before identifying all the red flags.
                </p>
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
                <h3 className="text-[24px] font-bold mb-2">Threat Neutralized!</h3>
                <p className="text-[14px] text-white/90 mb-6">
                  Excellent detective work. You avoided the scam.
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

      {/* Right Column: Instructions & Feedback */}
      <div className="flex-1 max-w-md flex flex-col justify-center">
        
        <div className="mb-8">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-3">Phishing Simulator</h2>
          <p className="text-[16px] leading-relaxed text-[#86868b]">
            Tap the <span className="font-semibold text-red-500">"Red Flags"</span> in the messages on the left. Don't click the main button/link until you find them all!
          </p>
        </div>

        {/* Dynamic Explanation Panel (Fixed height container so layout doesn't shift) */}
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
                  <span className="font-semibold text-blue-900 text-[14px] uppercase tracking-wider">Scam Tactic Identified</span>
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
