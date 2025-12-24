import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';

interface AuditReportProps {
  report: string;
}

const AuditReport: React.FC<AuditReportProps> = ({ report }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
      <div className="bg-gray-950/50 p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-400">
          <Terminal size={18} />
          <span className="font-mono text-sm font-bold">REPORT_GENERATED_SUCCESSFULLY</span>
        </div>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500" />
        </div>
      </div>
      
      <div className="p-8 prose prose-invert prose-headings:font-bold prose-h2:text-indigo-400 prose-h3:text-gray-200 prose-code:text-indigo-300 prose-code:bg-gray-950 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
        <ReactMarkdown
          components={{
            h2: ({node, ...props}) => (
              <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mt-8 mb-4">
                <AlertTriangle size={24} className="text-indigo-500" />
                <h2 className="text-xl m-0" {...props} />
              </div>
            ),
            h3: ({node, ...props}) => {
                const text = String(props.children);
                let colorClass = "text-gray-200";
                let Icon = CheckCircle2;
                
                if (text.includes("CRITICAL")) {
                    colorClass = "text-red-500";
                    Icon = AlertTriangle;
                } else if (text.includes("MEDIUM") || text.includes("HIGH")) {
                    colorClass = "text-orange-400";
                    Icon = AlertTriangle;
                }

                return (
                    <h3 className={`text-lg font-mono ${colorClass} mt-6 mb-3 flex items-center gap-2`} {...props}>
                         <Icon size={18} />
                         {props.children}
                    </h3>
                )
            },
            ul: ({node, ...props}) => (
                <ul className="list-none space-y-2 pl-0" {...props} />
            ),
            li: ({node, ...props}) => (
                <li className="flex gap-2 items-start text-gray-300 pl-4 border-l-2 border-gray-800 hover:border-indigo-500 transition-colors" {...props} />
            ),
            pre: ({node, ...props}) => (
              <div className="mockup-code bg-gray-950 border border-gray-800 rounded-lg p-4 my-4 overflow-x-auto">
                <pre {...props} />
              </div>
            ),
            code: ({node, ...props}) => (
                <code className="font-mono text-sm text-indigo-300" {...props} />
            )
          }}
        >
          {report}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AuditReport;
