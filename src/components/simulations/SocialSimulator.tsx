import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, ShieldAlert, ShieldCheck, AlertTriangle, RefreshCcw, MoreVertical, Phone, Video, Gamepad2, MessageSquare } from 'lucide-react';

type Message = {
  id: string;
  sender: 'scammer' | 'player';
  text: string;
};

type Option = {
  text: string;
  nextNode: string;
};

type StoryNode = {
  id: string;
  scammerText: string;
  options?: Option[];
  endState?: 'win' | 'loss';
};

const storyNodes: Record<string, StoryNode> = {
  start: {
    id: 'start',
    scammerText: "Hey! 🎉 You've been selected as today's winner for the 10,000 V-Bucks daily giveaway! I'm an official Game Admin.",
    options: [
      { text: "Wow really?! How do I claim it?", nextNode: 'gullible_1' },
      { text: "I didn't enter a giveaway...", nextNode: 'skeptical_1' }
    ]
  },
  gullible_1: {
    id: 'gullible_1',
    scammerText: "I just need to verify your account before I deposit the coins. What is your login email and password?",
    options: [
      { text: "It's player1@email.com and my password is Password123", nextNode: 'loss_password' },
      { text: "Wait, real admins never ask for passwords. This is a scam.", nextNode: 'win_smart' }
    ]
  },
  skeptical_1: {
    id: 'skeptical_1',
    scammerText: "It's an automatic random draw for all active players! To claim it, just log in here: http://epic-games-rewards.net/claim",
    options: [
      { text: "Okay, I clicked it and typed my login.", nextNode: 'loss_phishing' },
      { text: "That URL looks completely fake. The real site is epicgames.com. I'm reporting you.", nextNode: 'win_report' }
    ]
  },
  loss_password: {
    id: 'loss_password',
    scammerText: "Thanks! Logging in now... Changing password... Your account is mine now lol.",
    endState: 'loss'
  },
  loss_phishing: {
    id: 'loss_phishing',
    scammerText: "Perfect. I can see your login details in my database now. Thanks for the free account! 👋",
    endState: 'loss'
  },
  win_smart: {
    id: 'win_smart',
    scammerText: "Whatever kid.",
    endState: 'win'
  },
  win_report: {
    id: 'win_report',
    scammerText: "Wait don't report me!",
    endState: 'win'
  }
};

export default function SocialSimulator() {
  const [phase, setPhase] = useState<'playing' | 'postmortem'>('playing');
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [endResult, setEndResult] = useState<'win' | 'loss' | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showOptions]);

  // Initial load effect
  useEffect(() => {
    if (currentNodeId === 'start' && messages.length === 0) {
      triggerScammerMessage('start');
    }
  }, []);

  const triggerScammerMessage = (nodeId: string) => {
    setShowOptions(false);
    setIsTyping(true);
    const node = storyNodes[nodeId];
    
    // Simulate typing delay based on message length
    const delay = Math.max(1500, node.scammerText.length * 30);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'scammer', text: node.scammerText }]);
      
      if (node.endState) {
        setEndResult(node.endState);
        setTimeout(() => setPhase('postmortem'), 2000);
      } else {
        setTimeout(() => setShowOptions(true), 500);
      }
    }, delay);
  };

  const handleOptionSelect = (option: Option) => {
    setShowOptions(false);
    // Add player message
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'player', text: option.text }]);
    
    // Trigger next node
    setCurrentNodeId(option.nextNode);
    triggerScammerMessage(option.nextNode);
  };

  const reset = () => {
    setPhase('playing');
    setMessages([]);
    setCurrentNodeId('start');
    setEndResult(null);
    setShowOptions(false);
    setIsTyping(false);
    setTimeout(() => triggerScammerMessage('start'), 500);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-[#313338] flex flex-row rounded-xl shadow-2xl border border-gray-900 overflow-hidden font-sans relative text-gray-100">
      
      {/* Sidebar (Servers/Channels simulation) */}
      <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2 border-r border-gray-900 shrink-0">
        <div className="w-12 h-12 bg-[#5865F2] rounded-[16px] flex items-center justify-center cursor-pointer mb-2">
          <Gamepad2 className="w-7 h-7 text-white" />
        </div>
        <div className="w-8 h-[2px] bg-gray-700 rounded-full mb-2"></div>
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:rounded-[16px] transition-all">
          <span className="text-white font-bold">LFG</span>
        </div>
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:rounded-[16px] transition-all">
          <span className="text-white font-bold">FN</span>
        </div>
      </div>

      {/* DMs List Sidebar */}
      <div className="w-[240px] bg-[#2b2d31] flex flex-col shrink-0 border-r border-gray-800">
        <div className="h-12 border-b border-gray-900 shadow-sm flex items-center px-4 font-bold text-sm">
          Direct Messages
        </div>
        <div className="p-2 flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 p-2 rounded hover:bg-[#3f4147] cursor-pointer bg-[#3f4147] group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#2b2d31]"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="font-semibold text-gray-200 truncate">Admin_Support</div>
              <div className="text-xs text-gray-400 truncate">Playing: V-Bucks Generator</div>
            </div>
          </div>
        </div>
        {/* User Profile Area */}
        <div className="h-[52px] bg-[#232428] flex items-center px-2 gap-2">
           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
             Y
           </div>
           <div className="flex-1 text-sm font-bold">You (Target)</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#313338] relative">
        
        {/* Chat Header */}
        <div className="h-12 border-b border-gray-900 flex items-center px-4 justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-bold text-xl">@</span>
            <span className="font-bold text-white">Admin_Support</span>
            <span className="bg-[#5865F2] text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ml-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3"/> APP
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Phone className="w-5 h-5 cursor-pointer hover:text-gray-200" />
            <Video className="w-5 h-5 cursor-pointer hover:text-gray-200" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-gray-200" />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          
          {/* Chat Beginning Warning */}
          <div className="flex flex-col items-center justify-center text-center mt-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-3xl mb-4">
              A
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin_Support</h2>
            <p className="text-gray-400 text-sm">This is the beginning of your direct message history.</p>
          </div>

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.sender === 'player' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center text-white font-bold ${msg.sender === 'scammer' ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' : 'bg-blue-500'}`}>
                  {msg.sender === 'scammer' ? 'A' : 'Y'}
                </div>
                <div className={`flex flex-col ${msg.sender === 'player' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-white">
                      {msg.sender === 'scammer' ? 'Admin_Support' : 'You'}
                    </span>
                    <span className="text-xs text-gray-400">Today at 12:00 PM</span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${msg.sender === 'player' ? 'bg-[#5865F2] text-white rounded-tr-none' : 'bg-[#2b2d31] text-gray-200 rounded-tl-none border border-gray-700'}`}>
                    {msg.text.includes('http') ? (
                      <span>
                        {msg.text.split('http')[0]}
                        <a href="#" className="text-blue-400 hover:underline">http{msg.text.split('http')[1]}</a>
                      </span>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex shrink-0 items-center justify-center text-black font-bold">
                  A
                </div>
                <div className="flex flex-col items-start max-w-[70%]">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-white">Admin_Support</span>
                  </div>
                  <div className="px-4 py-3 bg-[#2b2d31] text-gray-200 rounded-2xl rounded-tl-none border border-gray-700 flex gap-1 items-center">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input / Options */}
        <div className="p-4 pt-0 shrink-0 relative">
          <div className="bg-[#383a40] rounded-lg p-2 min-h-[44px] flex flex-col justify-center border border-[#383a40] focus-within:border-gray-500 transition-colors">
            
            <AnimatePresence>
              {showOptions ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col gap-2"
                >
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3"/> Choose your reply:
                  </div>
                  {storyNodes[currentNodeId].options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className="text-left px-4 py-2 bg-[#2b2d31] hover:bg-[#4752c4] hover:text-white rounded text-sm text-gray-300 transition-colors border border-gray-700 flex items-center justify-between group"
                    >
                      {option.text}
                      <Send className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              ) : (
                <div className="flex items-center text-gray-500 px-2 select-none">
                  Message @Admin_Support...
                </div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* POSTMORTEM OVERLAY */}
      <AnimatePresence>
        {phase === 'postmortem' && endResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute inset-0 ${endResult === 'loss' ? 'bg-red-900/95' : 'bg-emerald-900/95'} backdrop-blur-md z-50 flex flex-col items-center justify-center p-12 text-white`}
          >
            {endResult === 'loss' ? (
              <>
                <ShieldAlert className="w-20 h-20 text-yellow-400 mb-6 drop-shadow-lg" />
                <h2 className="text-5xl font-black mb-4 tracking-tighter">ACCOUNT STOLEN!</h2>
                <p className="text-xl mb-8 font-medium">You got tricked by a fake friend!</p>
              </>
            ) : (
              <>
                <ShieldCheck className="w-20 h-20 text-emerald-400 mb-6 drop-shadow-lg" />
                <h2 className="text-5xl font-black mb-4 tracking-tighter">YOU ARE SAFE!</h2>
                <p className="text-xl mb-8 font-medium">Awesome! You spotted the trick and stopped the hacker.</p>
              </>
            )}

            <div className="bg-black/40 border border-white/20 p-6 rounded-2xl max-w-2xl w-full flex flex-col gap-4">
              <h3 className={`font-bold ${endResult === 'loss' ? 'text-yellow-400' : 'text-emerald-400'} text-xl border-b border-white/10 pb-2`}>
                {endResult === 'loss' ? 'The Tricks You Missed' : 'The Tricks You Spotted'}
              </h3>
              
              <ul className="space-y-4 mt-2">
                <li className="flex gap-4 items-start">
                  <div className="bg-white/10 p-2 rounded-lg mt-1"><User className="w-5 h-5 text-white" /></div>
                  <div>
                    <strong className="block text-lg">Fake Boss</strong>
                    <p className="text-gray-300 text-sm">
                      The hacker pretended to be an "Admin" so you would trust them. Real game admins will NEVER ask for your password or give away free money in a chat.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="bg-white/10 p-2 rounded-lg mt-1"><AlertTriangle className="w-5 h-5 text-white" /></div>
                  <div>
                    <strong className="block text-lg">Too Good To Be True</strong>
                    <p className="text-gray-300 text-sm">
                      Winning 10,000 V-Bucks for free is a trick! Hackers use free stuff to make you excited so you forget to be careful.
                    </p>
                  </div>
                </li>

                {currentNodeId === 'loss_password' && (
                  <li className="flex gap-4 items-start">
                    <div className="bg-white/10 p-2 rounded-lg mt-1"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
                    <div>
                      <strong className="block text-lg text-red-400">Never Share Passwords</strong>
                      <p className="text-gray-300 text-sm">
                        You typed your password! NEVER tell anyone your password, not even your friends or the game admins.
                      </p>
                    </div>
                  </li>
                )}
                
                {currentNodeId === 'loss_phishing' && (
                  <li className="flex gap-4 items-start">
                    <div className="bg-white/10 p-2 rounded-lg mt-1"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
                    <div>
                      <strong className="block text-lg text-red-400">Fake Website Links</strong>
                      <p className="text-gray-300 text-sm">
                        You clicked a bad link! The hacker made a fake website to steal your password when you typed it in: <code className="bg-black/50 px-1 rounded">epic-games-rewards.net</code>.
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <button 
              onClick={reset}
              className={`mt-8 flex items-center gap-2 px-8 py-4 bg-white ${endResult === 'loss' ? 'text-red-900' : 'text-emerald-900'} rounded-full font-black text-lg hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200`}
            >
              <RefreshCcw className="w-6 h-6" />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
