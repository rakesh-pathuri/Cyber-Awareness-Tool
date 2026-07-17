import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Image as ImageIcon, Sparkles, UserCircle, ShieldCheck, ChevronRight, Eye, AlertTriangle, Lock, Video } from 'lucide-react';

type Phase = 'intro' | 'what-is-ai' | 'what-is-deepfake' | 'demo' | 'safety';

export default function AIDeepfakeSimulator() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [demoState, setDemoState] = useState<'real' | 'fake'>('real');

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 text-center space-y-6 max-w-2xl mx-auto px-6">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4 border-4 border-purple-200 shadow-lg">
        <BrainCircuit className="w-12 h-12 text-purple-600" />
      </div>
      <h2 className="text-4xl font-black text-gray-900 tracking-tight">AI & Deepfakes</h2>
      <p className="text-xl text-gray-600 leading-relaxed font-medium">
        You've probably heard people talking about "AI" and "Deepfakes" on the news or on YouTube. But what are they, really?
      </p>
      <button 
        onClick={() => setPhase('what-is-ai')}
        className="mt-8 bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-full font-black text-xl flex items-center gap-3 shadow-xl transition-transform hover:scale-105"
      >
        Let's Find Out! <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );

  const renderWhatIsAI = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 text-center max-w-3xl mx-auto px-6">
      <div className="flex gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl flex flex-col items-center w-48">
           <ImageIcon className="w-12 h-12 text-blue-500 mb-4" />
           <span className="text-gray-700 font-bold">Millions of Pictures</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl flex flex-col items-center w-48 mt-8">
           <BrainCircuit className="w-16 h-16 text-purple-600 mb-4 animate-pulse" />
           <span className="text-gray-900 font-black text-lg">Robot Brain</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl flex flex-col items-center w-48">
           <Video className="w-12 h-12 text-pink-500 mb-4" />
           <span className="text-gray-700 font-bold">Millions of Videos</span>
        </div>
      </div>

      <h2 className="text-3xl font-black text-gray-900 mb-6">What is AI?</h2>
      <p className="text-lg text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
        AI stands for <strong>Artificial Intelligence</strong>. Think of it like a super-fast, giant computer brain. 
        Scientists feed this brain millions of pictures, books, and voices. Because it has seen so much, 
        it can easily create brand new pictures or copy voices almost instantly!
      </p>

      <button 
        onClick={() => setPhase('what-is-deepfake')}
        className="mt-10 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105 shadow-lg"
      >
        So what is a Deepfake? <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderWhatIsDeepfake = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 text-center max-w-3xl mx-auto px-6">
      <div className="relative mb-8">
        <UserCircle className="w-32 h-32 text-gray-300" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute inset-0 bg-purple-100 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-purple-300"
        >
           <Sparkles className="w-16 h-16 text-purple-500" />
        </motion.div>
      </div>

      <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Deepfake?</h2>
      <p className="text-lg text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
        A <strong>Deepfake</strong> is when someone uses that smart AI brain to copy a real person. 
        They can take a picture of someone's face and swap it onto a completely different body. This makes a fake picture or video that looks totally real, even if it never actually happened!
      </p>

      <button 
        onClick={() => setPhase('demo')}
        className="mt-10 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105 shadow-lg"
      >
        See an Example <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderDemo = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-black text-gray-900 mb-2">Face Swap Deepfake Demo</h2>
      <p className="text-gray-500 mb-10">See how easily AI can take a face and put it on a completely different body!</p>

      <div className="flex w-full gap-8">
        
        {/* Toggle Controls */}
        <div className="w-1/3 flex flex-col gap-4">
          <button 
            onClick={() => setDemoState('real')}
            className={`p-4 rounded-xl border-2 font-bold text-lg flex items-center justify-between transition-all ${demoState === 'real' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm'}`}
          >
            <div className="flex items-center gap-3"><UserCircle className="w-6 h-6" /> Original Animal</div>
            {demoState === 'real' && <ShieldCheck className="w-5 h-5 text-blue-600" />}
          </button>

          <button 
            onClick={() => setDemoState('fake')}
            className={`p-4 rounded-xl border-2 font-bold text-lg flex items-center justify-between transition-all ${demoState === 'fake' ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm'}`}
          >
            <div className="flex items-center gap-3"><BrainCircuit className="w-6 h-6" /> AI Deepfake</div>
            {demoState === 'fake' && <AlertTriangle className="w-5 h-5 text-red-600" />}
          </button>
        </div>

        {/* Player / Image Viewer */}
        <div className="flex-1 bg-gray-50 border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-[350px]">
          
          <AnimatePresence mode="wait">
            {demoState === 'real' ? (
              <motion.div 
                key="real"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full h-full"
              >
                <div className="flex-1 w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
                   <img src="/assets/original_puppy.png" alt="Real Dog" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 font-bold text-blue-700 bg-blue-100 px-4 py-1.5 rounded-full text-sm">
                  Original Photo: A Cute Puppy
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="fake"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full h-full"
              >
                <div className="flex-1 w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
                   <img src="/assets/puppy_lion_deepfake.png" alt="Fake Lion Dog" className="w-full h-full object-cover" />
                   
                   {/* Scanning Effect Overlay */}
                   <motion.div 
                     className="absolute inset-0 bg-red-500/10 border-b-2 border-red-500"
                     initial={{ height: '0%' }}
                     animate={{ height: '100%' }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                   />
                </div>
                <div className="mt-4 font-bold text-red-700 bg-red-100 px-4 py-1.5 rounded-full text-sm flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" /> Fake Photo: Puppy's Face on a Lion!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>

      <button 
        onClick={() => setPhase('safety')}
        className="mt-10 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105 shadow-lg"
      >
        How to Stay Safe <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderSafety = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 text-center max-w-4xl mx-auto px-6">
      <ShieldCheck className="w-20 h-20 text-green-500 mb-6 drop-shadow-md" />
      <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">How to Protect Yourself</h2>
      
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl text-left">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-green-200">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">1. The Family Password</h3>
          <p className="text-gray-600">
            Agree on a secret word with your parents. If someone ever calls asking for money or claiming to be in an emergency, ask for the password. If they don't know it, hang up!
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl text-left">
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-yellow-200">
            <Eye className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">2. Look for Glitches</h3>
          <p className="text-gray-600">
            AI still makes mistakes. In videos or photos, look closely at hands (too many fingers?), teeth, and shadows. If things look blurry or unnatural, it might be a Deepfake.
          </p>
        </div>
      </div>

      <button 
        onClick={() => setPhase('intro')}
        className="mt-10 bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-transform shadow-sm"
      >
        Start Over
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto min-h-[600px] flex flex-col font-sans text-gray-900 relative">
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex-1"
          >
            {phase === 'intro' && renderIntro()}
            {phase === 'what-is-ai' && renderWhatIsAI()}
            {phase === 'what-is-deepfake' && renderWhatIsDeepfake()}
            {phase === 'demo' && renderDemo()}
            {phase === 'safety' && renderSafety()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
