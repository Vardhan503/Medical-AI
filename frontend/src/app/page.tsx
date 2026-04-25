"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, FileSignature, BarChart3, ChevronRight } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ProviderAnalysis from '@/components/ProviderAnalysis';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleUploadSuccess = (data: any) => {
    setAnalysisData(data);
    setActiveStep(2);
  };

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">CLAWBACK <span className="text-blue-500">AI</span></h1>
        </div>
        <nav className="flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="hover:text-white transition-colors">History</a>
          <a href="#" className="hover:text-white transition-colors">Settings</a>
        </nav>
      </header>

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
              <div className={`flex items-center gap-2 ${activeStep === step.id ? 'text-blue-400' : 'text-slate-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${activeStep === step.id ? 'border-blue-400 bg-blue-400/10' : 'border-slate-700'}`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="font-bold">{step.label}</span>
              </div>
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
        ) : (
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
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
