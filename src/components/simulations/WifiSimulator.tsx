import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Terminal, Wifi, Lock, Unlock, User, Key, ArrowRight, Activity } from 'lucide-react';

interface Packet {
  id: string;
  time: string;
  isEncrypted: boolean;
  rawData: string;
}

export default function WifiSimulator() {
  const [vpnEnabled, setVpnEnabled] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [packets, setPackets] = useState<Packet[]>([]);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success'>('idle');
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [packets]);

  const generateEncryptedPayload = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 48; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    const timeString = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });
    
    let newPacket: Packet;
    if (vpnEnabled) {
      newPacket = {
        id: Math.random().toString(36).substr(2, 9),
        time: timeString,
        isEncrypted: true,
        rawData: `[MAGIC_TUNNEL] Locked message: ${generateEncryptedPayload()}`
      };
    } else {
      newPacket = {
        id: Math.random().toString(36).substr(2, 9),
        time: timeString,
        isEncrypted: false,
        rawData: `[SHOUTING] I am logging in! My username="${username}" password="${password}"`
      };
    }

    setPackets(prev => [...prev, newPacket]);
    setLoginStatus('success');
    setTimeout(() => {
      setLoginStatus('idle');
      setUsername('');
      setPassword('');
    }, 2000);
  };

  return (
    <div className="w-[1100px] mx-auto flex flex-row items-center justify-center gap-10 h-[550px] font-sans">
      
      {/* Left Column: Victim Smartphone */}
      <div className="w-[300px] shrink-0 h-[550px] bg-black rounded-[40px] border-[12px] border-black relative overflow-hidden shadow-2xl flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
        </div>

        <div className="flex-1 bg-gray-50 flex flex-col pt-8 relative">
          
          {/* Status Bar */}
          <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-black" />
              {vpnEnabled && <div className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-bold text-[9px] uppercase">VPN</div>}
            </div>
          </div>

          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <h3 className="text-[13px] font-bold text-black flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-orange-500" />
              Connected to: "Starbucks_Guest"
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">Open Wi-Fi (No Password)</p>
          </div>

          <div className="p-4 flex flex-col gap-4">
            
            {/* VPN Toggle */}
            <div className={`p-4 rounded-2xl flex flex-col gap-3 transition-colors duration-300 ${vpnEnabled ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-white border border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className={`w-6 h-6 ${vpnEnabled ? 'text-white' : 'text-gray-400'}`} />
                  <div>
                    <h4 className={`text-[15px] font-bold ${vpnEnabled ? 'text-white' : 'text-gray-800'}`}>Magic Tunnel (VPN)</h4>
                    <p className={`text-[11px] ${vpnEnabled ? 'text-blue-200' : 'text-gray-500'}`}>
                      {vpnEnabled ? 'Your secrets are locked in a safe' : 'Everyone can see your secrets!'}
                    </p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <div 
                  className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${vpnEnabled ? 'bg-white/20 justify-end' : 'bg-gray-300 justify-start'}`}
                  onClick={() => setVpnEnabled(!vpnEnabled)}
                >
                  <motion.div 
                    layout
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Fake Bank App */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mt-2">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
              </div>
              <h4 className="text-center text-[16px] font-bold text-gray-800 mb-5">GlobalTrust Bank</h4>
              
              <AnimatePresence mode="wait">
                {loginStatus === 'idle' ? (
                  <motion.form 
                    key="login-form"
                    onSubmit={handleLogin}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Key className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!username || !password}
                      className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-bold text-[14px] shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      Login Securely
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="login-success"
                    className="flex flex-col items-center justify-center py-6 text-emerald-600"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mb-3"></div>
                    <p className="text-[14px] font-bold">Authenticating...</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>

      {/* Middle Column: The Connection / Tunnel */}
      <div className="w-[120px] flex flex-col items-center justify-center shrink-0">
        <AnimatePresence mode="wait">
          {vpnEnabled ? (
            <motion.div 
              key="tunnel-encrypted"
              className="flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full h-16 bg-blue-500/20 rounded-full border-2 border-blue-500/50 flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <ShieldCheck className="w-6 h-6 text-blue-500 z-10" />
                <motion.div 
                  className="absolute inset-0 bg-blue-400/20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
              <p className="text-[12px] font-bold text-blue-600 uppercase mt-3 tracking-widest text-center">Magic<br/>Tunnel</p>
            </motion.div>
          ) : (
            <motion.div 
              key="tunnel-plaintext"
              className="flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full flex items-center justify-center gap-2 text-red-500">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ x: [0, 40, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>
              <p className="text-[12px] font-bold text-red-600 uppercase mt-4 tracking-widest text-center">Shouting to<br/>Everyone</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Hacker Dashboard */}
      <div className="w-[480px] shrink-0 h-[550px] bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col font-mono relative">
        <div className="bg-[#111] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-[12px] font-bold uppercase tracking-widest text-gray-300">Hacker's Wi-Fi Antenna</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-green-500">
            <Activity className="w-3 h-3 animate-pulse" />
            LISTENING
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0a] text-[12px] leading-relaxed break-all relative">
          
          <div className="text-gray-500 mb-4">
            Turning on Hacker Antenna...<br/>
            Listening to everyone at Starbucks...<br/>
            Waiting for someone to type a password...<br/>
            ==================================================
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {packets.map((packet) => (
                <motion.div 
                  key={packet.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded border ${
                    packet.isEncrypted 
                      ? 'bg-blue-950/20 border-blue-900/50 text-blue-400' 
                      : 'bg-red-950/20 border-red-900/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 text-[10px] uppercase opacity-70 border-b border-current pb-1">
                    <span>{packet.time}</span>
                    <span className="flex items-center gap-1">
                      {packet.isEncrypted ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      {packet.isEncrypted ? 'LOCKED' : 'UNLOCKED (DANGER!)'}
                    </span>
                  </div>
                  <div className="mt-2 font-bold tracking-tight">
                    {packet.rawData}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endOfMessagesRef} />
          </div>

        </div>
      </div>

    </div>
  );
}
