"use client";
import React, { useState, useEffect } from 'react';
import { FileText, Download, Copy, Check, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ComplaintDraftProps {
  npi: string;
}

export default function ComplaintDraft({ npi }: ComplaintDraftProps) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generate = async () => {
      try {
        // In a real app, we'd pass the actual anomalies found
        const response = await axios.post(`http://localhost:8000/generate-complaint?npi=${npi}`, []);
        setDraft(response.data.complaint_draft);
      } catch (error) {
        console.error("Generation failed", error);
        setDraft("Error generating complaint. Please check if the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    generate();
  }, [npi]);

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="text-blue-400" />
          Draft FCA Complaint
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all text-sm font-medium"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Text"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all text-sm font-medium">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="glass-card p-8 min-h-[400px] relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-lg font-medium text-slate-300">AI is synthesizing legal complaint...</p>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-serif text-slate-300 leading-relaxed text-sm">
            {draft}
          </pre>
        )}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
        <p className="text-yellow-400 text-xs italic text-center">
          Notice: This is an AI-generated draft for investigative purposes only. 
          Consult with legal counsel before filing any official complaints.
        </p>
      </div>
    </div>
  );
}
