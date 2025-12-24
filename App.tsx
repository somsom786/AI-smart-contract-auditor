import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, ChevronLeft } from 'lucide-react';
import AuditForm from './components/AuditForm';
import AuditReport from './components/AuditReport';
import { analyzeSmartContract } from './services/geminiService';
import { AuditRequest, LoadingState } from './types';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [report, setReport] = useState<string | null>(null);

  const handleAudit = async (data: AuditRequest) => {
    setLoadingState(LoadingState.ANALYZING);
    setReport(null);
    
    try {
      const result = await analyzeSmartContract(data);
      setReport(result);
      setLoadingState(LoadingState.COMPLETE);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
      setReport("## ❌ Audit Failed\n\nAn unexpected error occurred while connecting to the Sentinel core. Please verify your connection and try again.");
    }
  };

  const handleReset = () => {
    setReport(null);
    setLoadingState(LoadingState.IDLE);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black text-gray-200 font-sans">
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-25"></div>
              <ShieldCheck className="relative text-indigo-500" size={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">SENTINEL</h1>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Smart Contract Security Auditor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {loadingState === LoadingState.COMPLETE && (
                <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <RefreshCw size={14} />
                    <span>New Audit</span>
                </button>
             )}
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        
        {loadingState === LoadingState.IDLE && (
           <div className="mb-10 text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
                Identify Vulnerabilities.<br />Before They Exploit You.
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Paste your Solidity code below. Sentinel uses advanced AI reasoning to detect reentrancy, unchecked calls, and logic flaws in seconds.
              </p>
           </div>
        )}

        {/* View Switcher */}
        {!report ? (
          <AuditForm onSubmit={handleAudit} loadingState={loadingState} />
        ) : (
          <div className="space-y-6">
            <button 
                onClick={handleReset}
                className="group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-mono text-sm mb-4"
            >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                RETURN_TO_EDITOR
            </button>
            <AuditReport report={report} />
          </div>
        )}

      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 mt-10">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-xs text-gray-600 font-mono">
            <p>SENTINEL // SECURITY_RESEARCH_TOOL // V1.0.4</p>
            <p>POWERED BY GEMINI 1.5 PRO</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
