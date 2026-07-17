import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ArrowRight, AlertTriangle, CreditCard, Lock, RefreshCcw, Smartphone, Search, ShieldCheck } from 'lucide-react';

export default function QRSimulator() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'prompt' | 'browser' | 'postmortem'>('idle');
  const [isStickerPeeled, setIsStickerPeeled] = useState(false);
  const [isHoveringSticker, setIsHoveringSticker] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  // Determine which URL and outcome we get based on whether the sticker was peeled
  const scannedUrl = isStickerPeeled ? 'CityParking.com/pay' : 'c1typark1ng-payments.net/pay';
  const isMalicious = !isStickerPeeled;

  const handleScan = () => {
    setPhase('scanning');
    setTimeout(() => {
      setPhase('prompt');
    }, 2000);
  };

  const handleOpenLink = () => {
    setPhase('browser');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setPhase('postmortem');
    }, 500);
  };

  const reset = () => {
    setPhase('idle');
    setCardNumber('');
    setIsStickerPeeled(false);
  };

  return (
    <div className="w-[1100px] mx-auto h-[550px] bg-gray-900 flex flex-row rounded-xl shadow-2xl border border-gray-800 overflow-hidden font-sans relative">
      
      {/* Left Column: The Real World (Parking Meter Sign) */}
      <div className="w-1/2 bg-gray-800 border-r border-gray-700 flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, #374151 0%, #111827 100%)' }}>
        
        {/* Fake Concrete Background Texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

        <div className="relative z-10 w-full max-w-sm bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transform -rotate-2">
          {/* Sign Header */}
          <div className="bg-blue-600 text-white p-6 text-center border-b-[8px] border-yellow-400">
            <h2 className="text-3xl font-black tracking-tight uppercase">City Parking</h2>
            <p className="text-blue-100 font-bold mt-1 tracking-widest">ZONE 842-A</p>
          </div>
          
          {/* Sign Body */}
          <div className="p-8 flex flex-col items-center bg-gray-50">
            <p className="text-gray-800 text-center font-bold text-lg mb-6 leading-tight">
              SCAN TO PAY ONLINE AT<br/>
              <span className="text-blue-600 text-xl font-black">CityParking.com</span>
            </p>
            
            {/* The QR Code Area */}
            <div className="relative w-48 h-48 mb-2">
              
              {/* The ORIGINAL, legitimate QR Code (bottom layer) */}
              <div className="absolute inset-0 bg-blue-50 border-4 border-blue-200 flex items-center justify-center p-2 rounded">
                <QrCode className="w-full h-full text-blue-700" />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-900 opacity-20 transform -rotate-45 text-2xl tracking-widest pointer-events-none">ORIGINAL</div>
              </div>

              {/* The MALICIOUS STICKER (top layer) */}
              <AnimatePresence>
                {!isStickerPeeled && (
                  <motion.div 
                    initial={{ y: 0, opacity: 1, rotate: 1 }}
                    exit={{ y: 100, opacity: 0, rotate: 25 }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={() => setIsHoveringSticker(true)}
                    onMouseLeave={() => setIsHoveringSticker(false)}
                    onClick={() => setIsStickerPeeled(true)}
                    className="absolute inset-[-4px] bg-white shadow-lg border border-gray-300 cursor-pointer flex items-center justify-center p-3 z-10"
                    style={{ transformOrigin: 'top right' }}
                  >
                    <QrCode className="w-full h-full text-black" />
                    
                    {/* Peel corner visual */}
                    <motion.div 
                      animate={{ 
                        borderBottomWidth: isHoveringSticker ? '35px' : '15px',
                        borderLeftWidth: isHoveringSticker ? '35px' : '15px',
                      }}
                      className="absolute top-0 right-0 w-0 h-0 border-solid border-gray-200 shadow-[-2px_2px_4px_rgba(0,0,0,0.2)]"
                      style={{ 
                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: '#f3f4f6', // matches bg-gray-100
                        borderLeftColor: 'transparent',
                      }}
                    ></motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Helper Text */}
            <AnimatePresence mode="wait">
              {!isStickerPeeled ? (
                <motion.p key="hint" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-yellow-600 text-xs font-bold mt-2 animate-pulse flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3"/> Try clicking the corner to peel the sticker
                </motion.p>
              ) : (
                <motion.p key="peeled" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-emerald-600 text-xs font-bold mt-2 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3"/> Malicious sticker removed!
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-gray-500 text-xs mt-4 font-medium">Do not leave valuables in vehicle.</p>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 font-medium text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Physical environment
        </div>
      </div>

      {/* Right Column: The Smartphone */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center p-8 relative">
        
        {/* The Phone Hardware Frame */}
        <div className="w-[320px] h-[480px] bg-black rounded-[3rem] p-3 shadow-2xl relative border-[4px] border-gray-800">
          
          {/* Phone Screen */}
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
            
            <AnimatePresence mode="wait">
              {/* CAMERA PHASE */}
              {(phase === 'idle' || phase === 'scanning' || phase === 'prompt') && (
                <motion.div 
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col bg-gray-900"
                >
                  {/* Camera Header */}
                  <div className="h-16 bg-black flex items-center justify-between px-6 z-10 pt-4">
                    <span className="text-yellow-400 text-xs font-bold tracking-widest">PHOTO</span>
                  </div>

                  {/* Camera Viewfinder */}
                  <div className="flex-1 relative flex items-center justify-center bg-gray-800 overflow-hidden">
                    {/* Simulated blurry background of the sign */}
                    <div className="absolute inset-0 bg-blue-900/20 filter blur-xl scale-150"></div>
                    
                    {/* Viewfinder brackets */}
                    <div className="relative w-48 h-48">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-400"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-400"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-400"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-400"></div>
                      
                      {/* Fake blurred QR code inside viewfinder */}
                      <div className="absolute inset-4 flex items-center justify-center rounded">
                         <QrCode className={`w-32 h-32 ${isStickerPeeled ? 'text-blue-400/50' : 'text-white/30'}`} />
                      </div>

                      {/* Scanning Laser Animation */}
                      {phase === 'scanning' && (
                        <motion.div 
                          initial={{ top: '10%' }}
                          animate={{ top: '90%' }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                          className="absolute left-0 right-0 h-1 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,1)] z-20"
                        ></motion.div>
                      )}
                    </div>
                  </div>

                  {/* Camera Controls / Prompts */}
                  <div className="h-32 bg-black flex flex-col items-center justify-center p-4 relative z-10">
                    {phase === 'idle' ? (
                      <button 
                        onClick={handleScan}
                        className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <div className="w-12 h-12 bg-white rounded-full"></div>
                      </button>
                    ) : phase === 'prompt' ? (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`absolute bottom-full mb-4 w-[90%] rounded-2xl p-4 shadow-xl cursor-pointer transition-colors flex flex-col ${isMalicious ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-emerald-500 hover:bg-emerald-400'}`}
                        onClick={handleOpenLink}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-black text-sm flex items-center gap-1"><Search className="w-4 h-4"/> Safari</span>
                          <ArrowRight className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-black/80 text-xs font-mono break-all leading-tight">{scannedUrl}</span>
                        <span className="text-black font-semibold text-sm mt-1">Tap here to go to link</span>
                      </motion.div>
                    ) : (
                      <div className="text-yellow-400 font-bold animate-pulse text-sm">Scanning code...</div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* BROWSER PHASE (Phishing or Safe) */}
              {phase === 'browser' && (
                <motion.div 
                  key="browser"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col bg-white"
                >
                  {/* Fake Browser Chrome */}
                  <div className="bg-gray-100 pt-10 pb-2 px-4 border-b border-gray-300">
                    <div className="bg-gray-200 rounded-lg flex items-center justify-center p-2 gap-1 mx-2">
                      <Lock className={`w-3 h-3 ${isMalicious ? 'text-gray-500' : 'text-emerald-600'}`} />
                      <span className={`text-xs font-mono ${isMalicious ? 'text-gray-700' : 'text-emerald-700'}`}>{scannedUrl}</span>
                    </div>
                  </div>

                  {/* Payment Site */}
                  <div className="flex-1 overflow-y-auto bg-gray-50 p-6 flex flex-col items-center">
                    <div className={`${isMalicious ? 'bg-blue-600' : 'bg-blue-800'} text-white w-full p-4 rounded-t-lg text-center mb-6 shadow-md`}>
                      <h3 className="font-bold text-xl uppercase tracking-tight">City Parking</h3>
                      <p className="text-xs opacity-80">Secure Payment Portal</p>
                    </div>

                    {isMalicious && (
                      <div className="w-full bg-red-100 text-red-800 p-2 text-[10px] text-center mb-4 rounded border border-red-200 font-bold">
                        Notice: Unusually high payment processing volume.
                      </div>
                    )}

                    <div className="w-full bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-4">
                      <div className="flex justify-between border-b pb-2 mb-4 text-sm">
                        <span className="text-gray-500">Zone</span>
                        <span className="font-bold">842-A</span>
                      </div>
                      <div className="flex justify-between border-b pb-2 mb-4 text-sm">
                        <span className="text-gray-500">Amount Due</span>
                        <span className="font-bold text-blue-600">$15.00</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitPayment} className="w-full">
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-700 mb-1">CREDIT CARD NUMBER</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm pl-8 focus:outline-none focus:border-blue-500" 
                            placeholder="**** **** **** ****"
                          />
                          <CreditCard className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                        </div>
                      </div>
                      <div className="flex gap-4 mb-6">
                        <div className="w-1/2">
                          <label className="block text-xs font-bold text-gray-700 mb-1">EXP</label>
                          <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="MM/YY" />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                          <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none" placeholder="123" />
                        </div>
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
                      >
                        PAY $15.00
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 font-medium text-sm flex items-center gap-2">
          <Smartphone className="w-4 h-4" /> Victim's Phone
        </div>
      </div>

      {/* POSTMORTEM OVERLAY */}
      <AnimatePresence>
        {phase === 'postmortem' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute inset-0 ${isMalicious ? 'bg-red-900/95' : 'bg-emerald-900/95'} backdrop-blur-md z-50 flex flex-col items-center justify-center p-12 text-white`}
          >
            {isMalicious ? (
              <>
                <AlertTriangle className="w-20 h-20 text-yellow-400 mb-6 drop-shadow-lg" />
                <h2 className="text-5xl font-black mb-4 tracking-tighter">PASSWORD STOLEN!</h2>
                <p className="text-xl mb-8 font-medium">You just got tricked by a fake sticker!</p>
              </>
            ) : (
              <>
                <ShieldCheck className="w-20 h-20 text-emerald-400 mb-6 drop-shadow-lg" />
                <h2 className="text-5xl font-black mb-4 tracking-tighter">YOU ARE SAFE!</h2>
                <p className="text-xl mb-8 font-medium">Awesome! You peeled off the fake sticker and found the real code.</p>
              </>
            )}

            <div className="bg-black/40 border border-white/20 p-6 rounded-2xl max-w-2xl w-full flex flex-col gap-4">
              <h3 className={`font-bold ${isMalicious ? 'text-yellow-400' : 'text-emerald-400'} text-xl border-b border-white/10 pb-2`}>
                {isMalicious ? 'The Trap' : 'How You Won'}
              </h3>
              
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-2 rounded-lg mt-1"><QrCode className="w-5 h-5 text-white" /></div>
                <div>
                  <strong className="block text-lg">The Trap</strong>
                  <p className="text-gray-300 text-sm">
                    {isMalicious 
                      ? 'A hacker printed a fake QR code on a sticker and put it right over the real one.' 
                      : 'You saw the sticker peeling and took it off to find the real QR code hiding underneath!'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start mt-2">
                <div className="bg-white/10 p-2 rounded-lg mt-1"><Search className="w-5 h-5 text-white" /></div>
                <div>
                  <strong className="block text-lg">The {isMalicious ? 'Clue' : 'Good Clue'}</strong>
                  <p className="text-gray-300 text-sm">
                    {isMalicious 
                      ? <>The real sign said <span className="text-blue-300 font-mono bg-blue-900/30 px-1 rounded">CityParking.com</span>, but the fake sticker sent your phone to a scammer's website: <span className="text-red-400 font-mono bg-red-900/30 px-1 rounded">c1typark1ng-payments.net</span>.</>
                      : <>By scanning the real code, it took you to the safe and correct website: <span className="text-emerald-300 font-mono bg-emerald-900/30 px-1 rounded">CityParking.com/pay</span>.</>}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={reset}
              className={`mt-8 flex items-center gap-2 px-8 py-4 bg-white ${isMalicious ? 'text-red-900' : 'text-emerald-900'} rounded-full font-black text-lg hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200`}
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
