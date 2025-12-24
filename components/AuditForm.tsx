import React, { useState } from 'react';
import { AuditRequest, LoadingState } from '../types';
import { ShieldAlert, Code2, Play, FileText } from 'lucide-react';

interface AuditFormProps {
  onSubmit: (data: AuditRequest) => void;
  loadingState: LoadingState;
}

const AuditForm: React.FC<AuditFormProps> = ({ onSubmit, loadingState }) => {
  const [projectType, setProjectType] = useState('');
  const [chain, setChain] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingState === LoadingState.ANALYZING) return;
    
    onSubmit({
      context: { projectType, chain, description },
      code
    });
  };

  const isAnalyzing = loadingState === LoadingState.ANALYZING;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Context Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <FileText size={20} />
          <h2 className="text-lg font-semibold tracking-wide">PROJECT CONTEXT</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Project Type</label>
            <input
              type="text"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              placeholder="e.g. DeFi Lending, DAO"
              className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Chain</label>
            <input
              type="text"
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              placeholder="e.g. Ethereum, Arbitrum"
              className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe what this contract is supposed to do..."
            className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors h-20 resize-none"
            required
          />
        </div>
      </div>

      {/* Code Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl flex flex-col h-[500px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Code2 size={20} />
            <h2 className="text-lg font-semibold tracking-wide">SOURCE CODE</h2>
          </div>
          <span className="text-xs font-mono text-gray-500">Paste Solidity / Bytecode</span>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your Solidity code here..."
          className="flex-1 w-full bg-gray-950 border border-gray-700 rounded p-4 font-mono text-sm text-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors resize-none leading-relaxed"
          spellCheck={false}
          required
        />
      </div>

      {/* Action Bar */}
      <div className="sticky bottom-6 z-10">
        <button
          type="submit"
          disabled={isAnalyzing || !code.trim()}
          className={`w-full flex items-center justify-center gap-3 p-4 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-[1.01] ${
            isAnalyzing 
              ? 'bg-gray-700 cursor-not-allowed opacity-80' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/20'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              <span className="animate-pulse">RUNNING SECURITY ANALYSIS...</span>
            </>
          ) : (
            <>
              <ShieldAlert size={20} />
              <span>INITIATE AUDIT SEQUENCE</span>
              <Play size={16} className="fill-current" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AuditForm;
