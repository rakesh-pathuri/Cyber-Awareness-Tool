import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Smartphone, Cloud, Server, Share2, Trash2, ShieldAlert, Upload, ArrowRight, AlertTriangle, RefreshCw, XCircle, Database } from 'lucide-react';

type Step = 'intro' | 'upload' | 'exif' | 'cloud' | 'delete' | 'postmortem';

export default function DigitalFootprintSimulator() {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [uploadProgress, setUploadProgress] = useState(0);

  const reset = () => {
    setCurrentStep('intro');
    setUploadProgress(0);
  };

  const simulateUpload = () => {
    setCurrentStep('upload');
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep('exif'), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 max-w-lg mx-auto text-center space-y-6">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
        <Camera className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">The Lifecycle of a Photo</h2>
      <p className="text-gray-600 leading-relaxed text-lg">
        When you post a picture online, what really happens? It's just one image... right? 
        Let's follow a single photo on its journey through the internet.
      </p>
      <button 
        onClick={simulateUpload}
        className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all flex items-center shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <Upload className="w-5 h-5 mr-2" />
        Post a Picture
      </button>
    </div>
  );

  const renderUpload = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Uploading to Social Media...</h3>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <motion.div 
          className="bg-blue-600 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${uploadProgress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <p className="text-gray-500 font-medium">{uploadProgress}% Complete</p>
      
      <div className="mt-12 w-64 h-64 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
        {uploadProgress < 100 ? (
           <Upload className="w-12 h-12 text-gray-400 animate-bounce" />
        ) : (
           <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Selfie" className="object-cover w-full h-full opacity-80" />
             <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
           </div>
        )}
      </div>
    </div>
  );

  const renderExif = () => (
    <div className="flex flex-col min-h-[500px] max-w-3xl mx-auto py-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6 text-red-500 mr-2" /> Hidden Secrets in Your Photo
        </h3>
        <p className="text-gray-600 mt-2">You just see a fun picture. But your phone hides secret info inside it!</p>
      </div>

      <div className="flex gap-8 items-center h-[350px]">
        {/* Photo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="w-1/2 rounded-xl overflow-hidden shadow-lg relative border-4 border-gray-900"
        >
          <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Selfie" className="w-full h-full object-cover" />
          
          {/* Scanning Effect */}
          <motion.div 
            className="absolute inset-0 bg-green-500/20 border-b-2 border-green-400"
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Arrow */}
        <div className="text-gray-400">
          <ArrowRight className="w-8 h-8" />
        </div>

        {/* Data Extraction */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className="w-1/2 bg-gray-900 rounded-xl p-5 text-green-400 font-mono text-xs shadow-2xl overflow-hidden h-full flex flex-col justify-center"
        >
          <div className="flex items-center text-gray-400 mb-4 pb-2 border-b border-gray-700">
            <Smartphone className="w-4 h-4 mr-2" /> <span>Secret Info Found</span>
          </div>
          <div className="space-y-3">
             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1 }} className="flex justify-between"><span>Device:</span> <span>iPhone 14 Pro</span></motion.div>
             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.5 }} className="flex justify-between"><span>OS:</span> <span>iOS 16.5</span></motion.div>
             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 2 }} className="flex justify-between"><span>Timestamp:</span> <span>2024-03-12 14:32:01</span></motion.div>
             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 2.5 }} className="flex justify-between text-yellow-400"><span>GPS Lat:</span> <span>28.6139° N</span></motion.div>
             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 3 }} className="flex justify-between text-yellow-400"><span>GPS Long:</span> <span>77.2090° E</span></motion.div>
             <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 3.5 }} className="flex justify-between text-red-400 font-bold mt-2 pt-2 border-t border-gray-800">
               <span>Location Match:</span> <span>Rohit's Home Address</span>
             </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setCurrentStep('cloud')}
          className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Next: Where does it go? &rarr;
        </button>
      </div>
    </div>
  );

  const renderCloud = () => (
    <div className="flex flex-col min-h-[500px] max-w-4xl mx-auto py-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
          <Cloud className="w-6 h-6 text-blue-500 mr-2" /> The Giant Copy Machine
        </h3>
        <p className="text-gray-600 mt-2">When you post a photo, it instantly gets copied to giant computers all over the world!</p>
      </div>

      <div className="relative flex justify-center items-center h-[300px]">
        {/* Source Photo */}
        <motion.div 
          className="absolute z-20 bg-white p-2 rounded-lg shadow-xl"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
        >
           <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Selfie" className="w-24 h-24 object-cover rounded" />
        </motion.div>

        {/* Datacenters */}
        <div className="absolute inset-0 flex justify-between items-center px-12">
           <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col items-center">
             <Server className="w-12 h-12 text-gray-700 mb-2" />
             <span className="text-sm font-bold">Main Computer (Mumbai)</span>
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} className="mt-4 border-2 border-blue-400 p-1 rounded bg-white">
               <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="w-12 h-12 object-cover rounded-sm opacity-80" />
             </motion.div>
           </motion.div>

           <motion.div initial={{ opacity: 0, y: -170 }} animate={{ opacity: 1, y: -120 }} transition={{ delay: 2 }} className="flex flex-col items-center">
             <Database className="w-12 h-12 text-gray-700 mb-2" />
             <span className="text-sm font-bold text-gray-500">Backup Computer (Singapore)</span>
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} className="mt-4 border-2 border-dashed border-gray-400 p-1 rounded bg-white">
               <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="w-12 h-12 object-cover rounded-sm opacity-50 grayscale" />
             </motion.div>
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }} className="flex flex-col items-center">
             <Share2 className="w-12 h-12 text-gray-700 mb-2" />
             <span className="text-sm font-bold text-gray-500">Fast Copies (Everywhere)</span>
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.5 }} className="mt-4 border-2 border-purple-400 p-1 rounded bg-white">
               <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="w-12 h-12 object-cover rounded-sm opacity-80" />
             </motion.div>
           </motion.div>
        </div>

        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ filter: 'drop-shadow(0 0 2px rgba(59,130,246,0.5))' }}>
           <motion.path d="M 450 150 L 150 150" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.5 }} />
           <motion.path d="M 450 150 L 450 70" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2, duration: 0.5 }} />
           <motion.path d="M 450 150 L 750 150" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 3, duration: 0.5 }} />
        </svg>
      </div>

      <div className="mt-12 text-center relative z-30">
        <button 
          onClick={() => setCurrentStep('delete')}
          className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Next: Deleting the photo &rarr;
        </button>
      </div>
    </div>
  );

  const renderDelete = () => (
    <div className="flex flex-col min-h-[500px] max-w-4xl mx-auto py-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
          <Trash2 className="w-6 h-6 text-red-500 mr-2" /> "Deleting" the Photo
        </h3>
        <p className="text-gray-600 mt-2">You regret posting it and click Delete. Let's see what happens.</p>
      </div>

      <div className="relative flex justify-center items-center h-[300px]">
        
        {/* Datacenters from previous step */}
        <div className="absolute inset-0 flex justify-between items-center px-12">
           <div className="flex flex-col items-center">
             <Server className="w-12 h-12 text-gray-700 mb-2" />
             <span className="text-sm font-bold">Main Computer (Mumbai)</span>
             
             {/* Deleted from Main */}
             <motion.div 
                initial={{ opacity: 1, scale: 1 }} 
                animate={{ opacity: 0.2, scale: 0.8 }} 
                transition={{ delay: 1 }}
                className="mt-4 border-2 border-red-500 p-1 rounded bg-white relative"
             >
               <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="w-12 h-12 object-cover rounded-sm grayscale" />
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute inset-0 flex items-center justify-center">
                 <XCircle className="w-8 h-8 text-red-600 bg-white rounded-full" />
               </motion.div>
             </motion.div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-red-500 text-xs font-bold mt-1">Deleted</motion.div>
           </div>

           <div className="flex flex-col items-center -translate-y-[120px]">
             <Database className="w-12 h-12 text-gray-700 mb-2" />
             <span className="text-sm font-bold text-gray-500">Backup Computer (Singapore)</span>
             <div className="mt-4 border-2 border-dashed border-gray-400 p-1 rounded bg-white relative">
               <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="w-12 h-12 object-cover rounded-sm opacity-50 grayscale" />
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute -top-2 -right-2">
                 <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
               </motion.div>
             </div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-yellow-600 text-xs font-bold mt-1">Kept for 30 Days</motion.div>
           </div>

           <div className="flex flex-col items-center">
             <Share2 className="w-12 h-12 text-gray-700 mb-2" />
             <span className="text-sm font-bold text-gray-500">Fast Copies (Everywhere)</span>
             <div className="mt-4 border-2 border-purple-400 p-1 rounded bg-white">
               <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80" className="w-12 h-12 object-cover rounded-sm opacity-80" />
             </div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-purple-600 text-xs font-bold mt-1 max-w-[120px] text-center">Saved everywhere</motion.div>
           </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => setCurrentStep('postmortem')}
          className="px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
        >
          View Conclusion
        </button>
      </div>
    </div>
  );

  const renderPostmortem = () => (
    <div className="flex flex-col items-center justify-center min-h-[500px] max-w-2xl mx-auto text-center space-y-8 py-12">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
        <AlertTriangle className="w-12 h-12" />
      </div>
      
      <h2 className="text-3xl font-black text-gray-900 tracking-tight">The Internet Never Forgets!</h2>
      
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-left space-y-4 w-full">
        <p className="text-gray-700 leading-relaxed text-lg font-medium">
          When you click 'Delete', it only disappears from the main computer. The copies are still out there!
        </p>
        <ul className="space-y-4 text-gray-600 mt-4">
          <li className="flex items-start">
            <RefreshCw className="w-5 h-5 text-yellow-500 mr-3 shrink-0 mt-0.5" />
            <span><strong>Backups:</strong> Companies keep extra copies just in case things break. Your deleted photo stays there for a long time.</span>
          </li>
          <li className="flex items-start">
            <Share2 className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
            <span><strong>Strangers:</strong> Other people and robots can save your picture the second you post it.</span>
          </li>
          <li className="flex items-start">
            <MapPin className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
            <span><strong>Secrets:</strong> Even if the photo is gone, apps still remember where you live and what phone you use so they can show you ads!</span>
          </li>
        </ul>
      </div>

      <button 
        onClick={reset}
        className="mt-6 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-full transition-all flex items-center shadow-lg"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Restart Simulation
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto min-h-[600px] relative flex flex-col">
      <div className="relative flex-1 flex flex-col z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex-1"
          >
            {currentStep === 'intro' && renderIntro()}
            {currentStep === 'upload' && renderUpload()}
            {currentStep === 'exif' && renderExif()}
            {currentStep === 'cloud' && renderCloud()}
            {currentStep === 'delete' && renderDelete()}
            {currentStep === 'postmortem' && renderPostmortem()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
