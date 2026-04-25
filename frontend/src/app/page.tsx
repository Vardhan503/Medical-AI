"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, FileSignature, BarChart3, ChevronRight } from 'lucide-react';
import ComplaintDraft from '@/components/ComplaintDraft';
import { AlertTriangle } from 'lucide-react';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [view, setView] = useState('app'); // 'app' or 'history'

  const handleUploadSuccess = (data: any) => {
    setAnalysisData(data);
    setActiveStep(2);
    setView('app');
  };

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <button onClick={() => { setView('app'); setActiveStep(1); }} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">CLAWBACK <span className="text-blue-500">AI</span></h1>
        </button>
        <nav className="flex gap-8 text-sm font-medium text-slate-400">
          <button onClick={() => setView('app')} className={`hover:text-white transition-colors ${view === 'app' ? 'text-white' : ''}`}>Dashboard</button>
          <button onClick={() => setView('history')} className={`hover:text-white transition-colors ${view === 'history' ? 'text-white' : ''}`}>History</button>
          <button className="hover:text-white transition-colors">Settings</button>
        </nav>
      </header>

      {view === 'history' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Investigation History</h2>
          <p className="text-slate-400">Previous evidence scans and flagged NPIs will appear here.</p>
          <div className="mt-8 border-t border-slate-800 pt-8 max-w-md mx-auto">
             <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
               <span className="text-sm font-mono">1376609297</span>
               <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Flagged</span>
               <span className="text-xs text-slate-500">2 mins ago</span>
             </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Hero / Steps */}
          <div className="mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-extrabold mb-4 gradient-text">
                Fraud Investigator Copilot
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Ingest whistleblower documents, extract entities with AI, and cross-reference against 
                massive Medicaid datasets to verify fraud.
              </p>
            </motion.div>

            <div className="flex justify-center items-center gap-4 mb-12">
              {[
                { id: 1, label: 'Ingest', icon: Search },
                { id: 2, label: 'Analyze', icon: BarChart3 },
                { id: 3, label: 'File', icon: FileSignature },
              ].map((step, idx) => (
                <React.Fragment key={step.id}>
                  <button 
                    onClick={() => { if (step.id < activeStep || (step.id === 2 && analysisData)) setActiveStep(step.id); }}
                    className={`flex items-center gap-2 transition-all ${activeStep === step.id ? 'text-blue-400' : (step.id <= activeStep || (step.id === 2 && analysisData)) ? 'text-slate-300 hover:text-white' : 'text-slate-500 cursor-not-allowed'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${activeStep === step.id ? 'border-blue-400 bg-blue-400/10' : 'border-slate-700'}`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold">{step.label}</span>
                  </button>
                  {idx < 2 && <ChevronRight className="w-4 h-4 text-slate-700" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            {activeStep === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-2xl mx-auto"
              >
                <FileUpload onUploadSuccess={handleUploadSuccess} />
              </motion.div>
            ) : activeStep === 2 ? (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                {analysisData?.extracted_npis?.length > 0 ? (
                  analysisData.extracted_npis.map((npi: string) => (
                    <ProviderAnalysis key={npi} npi={npi} />
                  ))
                ) : (
                  <div className="glass-card p-12 text-center">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No NPIs Found in Document</h3>
                    <p className="text-slate-400 mb-6">
                      Try our demo NPI: <button onClick={() => handleUploadSuccess({extracted_npis: ["1376609297"]})} className="text-blue-400 underline font-mono">1376609297</button>
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => setActiveStep(3)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <FileSignature className="w-5 h-5" />
                    Generate Draft FCA Complaint
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ComplaintDraft npi={analysisData?.extracted_npis?.[0] || "1376609297"} />
                <div className="mt-12 flex justify-center">
                   <button 
                    onClick={() => setActiveStep(1)}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Start New Investigation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
