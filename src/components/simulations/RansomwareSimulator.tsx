import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, Image as ImageIcon, FileArchive, Download, Folder, Cloud, Skull, ShieldCheck, HardDrive } from 'lucide-react';

type Status = 'safe' | 'encrypting' | 'extortion' | 'restoring' | 'restored';

interface FileItem {
  id: number;
  name: string;
  type: 'doc' | 'image' | 'zip';
}

const initialFiles: FileItem[] = [
  { id: 1, name: 'History_Essay_FINAL.docx', type: 'doc' },
  { id: 2, name: 'Family_Vacation.jpg', type: 'image' },
  { id: 3, name: 'Minecraft_World.zip', type: 'zip' },
  { id: 4, name: 'Passwords.txt', type: 'doc' },
  { id: 5, name: 'Prom_Pictures.jpg', type: 'image' },
  { id: 6, name: 'College_App.pdf', type: 'doc' },
];

export default function RansomwareSimulator() {
  const [status, setStatus] = useState<Status>('safe');
  const [encryptedFiles, setEncryptedFiles] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  // Handle encryption animation
  useEffect(() => {
    if (status === 'encrypting') {
      let currentProgress = 0;
      let fileIndex = 0;
      
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        
        if (currentProgress % 15 === 0 && fileIndex < initialFiles.length) {
          const idToAdd = initialFiles[fileIndex].id;
          setEncryptedFiles(prev => [...prev, idToAdd]);
          fileIndex++;
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setStatus('extortion');
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [status]);

  // Handle restoration animation
  useEffect(() => {
    if (status === 'restoring') {
      let currentProgress = 0;
      let fileIndex = initialFiles.length - 1;
      
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        
        if (currentProgress % 15 === 0 && fileIndex >= 0 && fileIndex < initialFiles.length) {
          const idToRemove = initialFiles[fileIndex].id;
          setEncryptedFiles(prev => prev.filter(id => id !== idToRemove));
          fileIndex--;
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setStatus('restored');
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [status]);

  const triggerAttack = () => {
    if (status !== 'safe') return;
    setStatus('encrypting');
    setProgress(0);
    setEncryptedFiles([]);
  };

  const triggerRestore = () => {
    if (status !== 'extortion') return;
    setStatus('restoring');
    setProgress(0);
  };

  const reset = () => {
    setStatus('safe');
    setProgress(0);
    setEncryptedFiles([]);
  };

  const getFileIcon = (type: string, isEncrypted: boolean) => {
    if (isEncrypted) return <Lock className="w-8 h-8 text-red-500" />;
    switch (type) {
      case 'doc': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-green-500" />;
      case 'zip': return <FileArchive className="w-8 h-8 text-yellow-500" />;
      default: return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const getFileName = (name: string, isEncrypted: boolean) => {
    if (!isEncrypted) return name;
    // Generate a fake encrypted name
    const ext = name.split('.').pop();
    const hash = Math.random().toString(36).substring(2, 10);
    return `locked_${hash}.${ext}.ENC`;
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-row items-center justify-center gap-10 h-full scale-105 md:scale-110 lg:scale-[1.15] origin-center">
      
      {/* Left Sidebar: The Trap */}
      <div className="flex-shrink-0 w-[240px]">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <Download className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-[15px] font-bold text-gray-900 mb-1">Free Game Crack</h3>
          <p className="text-[12px] text-gray-500 mb-4">Minecraft_Bypass_v2.exe</p>
          <button 
            onClick={triggerAttack}
            disabled={status !== 'safe'}
            className={`w-full py-2.5 rounded-lg text-[13px] font-bold transition-all ${status === 'safe' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Download Now
          </button>
        </div>
      </div>

      {/* Middle Column: Fake File Explorer */}
      <div className="w-[480px] flex flex-col shrink-0 relative shadow-2xl rounded-lg overflow-hidden border border-gray-300 bg-white h-[400px]">
        
        {/* File Explorer Chrome */}
        <div className="bg-[#f3f4f6] px-4 py-2.5 flex items-center gap-3 border-b border-gray-300 shrink-0">
          <div className="flex items-center gap-2 text-gray-600 flex-1">
            <HardDrive className="w-4 h-4" />
            <span className="text-[13px] font-medium">Local Disk (C:)</span>
            <span className="text-gray-400 mx-1">/</span>
            <Folder className="w-4 h-4 text-blue-500" />
            <span className="text-[13px] font-medium">My Documents</span>
          </div>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          <div className="grid grid-cols-3 gap-6">
            {initialFiles.map(file => {
              const isEncrypted = encryptedFiles.includes(file.id);
              return (
                <div key={file.id} className="flex flex-col items-center text-center gap-2">
                  <div className={`p-3 rounded-lg ${isEncrypted ? 'bg-red-50' : 'bg-gray-50'}`}>
                    {getFileIcon(file.type, isEncrypted)}
                  </div>
                  <span className={`text-[11px] leading-tight break-all ${isEncrypted ? 'text-red-600 font-mono font-bold' : 'text-gray-700'}`}>
                    {getFileName(file.name, isEncrypted)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {status === 'encrypting' && (
            <motion.div 
              key="overlay-encrypting"
              className="absolute inset-x-0 bottom-0 bg-red-600 text-white p-4 flex flex-col border-t-4 border-red-800 z-10"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold uppercase tracking-wider flex items-center">
                  <Skull className="w-4 h-4 mr-2" /> Encrypting Files...
                </span>
                <span className="text-[13px] font-mono">{progress}%</span>
              </div>
              <div className="w-full bg-red-900 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
            </motion.div>
          )}

          {status === 'extortion' && (
            <motion.div 
              key="overlay-extortion"
              className="absolute inset-0 bg-[#7a0000] flex flex-col items-center justify-center p-6 text-center text-white z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Skull className="w-16 h-16 mb-4 text-white drop-shadow-md" />
              <h3 className="text-[28px] font-bold mb-2 tracking-tight">OOPS, YOUR FILES HAVE BEEN ENCRYPTED!</h3>
              <div className="bg-black/30 p-4 rounded-lg w-full mb-6">
                <p className="text-[13px] text-white/90 leading-relaxed mb-3">
                  All your photos, documents, and games have been encrypted with military-grade encryption. You cannot access them.
                </p>
                <p className="text-[13px] text-white font-bold">
                  Send $500 in Bitcoin within 24 hours or your files will be deleted forever.
                </p>
              </div>
            </motion.div>
          )}

          {status === 'restoring' && (
            <motion.div 
              key="overlay-restoring"
              className="absolute inset-x-0 bottom-0 bg-blue-600 text-white p-4 flex flex-col border-t-4 border-blue-800 z-30"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold uppercase tracking-wider flex items-center">
                  <Cloud className="w-4 h-4 mr-2" /> Restoring from Cloud Backup...
                </span>
                <span className="text-[13px] font-mono">{progress}%</span>
              </div>
              <div className="w-full bg-blue-900 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
            </motion.div>
          )}

          {status === 'restored' && (
            <motion.div 
              key="overlay-restored"
              className="absolute inset-0 bg-green-600/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ShieldCheck className="w-16 h-16 mb-4" />
              <h3 className="text-[28px] font-bold mb-2">Disaster Averted!</h3>
              <p className="text-[14px] text-white/90 mb-6">
                Because you had a backup, the ransomware lost all its power. You wiped the computer and restored your files for free.
              </p>
              <button 
                onClick={reset}
                className="px-6 py-2 bg-white text-green-700 rounded-full font-bold text-[13px] hover:bg-gray-100 shadow-lg"
              >
                Reset Simulator
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Instructions & Feedback */}
      <div className="flex-1 max-w-md flex flex-col justify-center">
        
        <div className="mb-6">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] mb-3">Ransomware Simulator</h2>
          <p className="text-[16px] leading-relaxed text-[#86868b]">
            {status === 'safe' && 'Click the sketchy download link on the left to see what a ransomware infection looks like in real time.'}
            {status === 'encrypting' && 'Ransomware acts like a digital padlock, scrambling your files so they cannot be opened.'}
            {status === 'extortion' && 'You are locked out. They want your money. But there is a secret weapon against ransomware...'}
            {status === 'restoring' && 'Wiping the hard drive and restoring clean files from the cloud...'}
            {status === 'restored' && 'Backups are the ultimate defense against digital extortion!'}
          </p>
        </div>

        {/* Dynamic Action Panel */}
        <div className="h-[120px] relative">
          <AnimatePresence mode="wait">
            {status === 'extortion' && (
              <motion.div 
                key="extortion"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute inset-0 bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center"
              >
                <Cloud className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-[13px] font-semibold text-blue-900 mb-3">
                  Wait! You have a Cloud Backup!
                </p>
                <button 
                  onClick={triggerRestore}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-[13px] hover:bg-blue-700 transition-colors shadow-md w-full"
                >
                  Restore Files For Free
                </button>
              </motion.div>
            )}

            {status === 'safe' && (
              <motion.div 
                key="safe"
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
