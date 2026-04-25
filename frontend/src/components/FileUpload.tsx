"use client";
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

interface FileUploadProps {
  onUploadSuccess: (data: any) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData);
      onUploadSuccess(response.data);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Make sure the backend is running.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center border-dashed border-2 border-slate-700 hover:border-blue-500 transition-colors">
      <div className="bg-blue-500/10 p-4 rounded-full mb-4">
        <Upload className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Ingest Evidence</h3>
      <p className="text-slate-400 text-center mb-6">
        Upload whistleblower PDFs, emails, or medical billing records.
      </p>
      
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        onChange={handleFileChange}
        accept=".pdf"
      />
      
      <label 
        htmlFor="file-upload" 
        className="cursor-pointer bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg mb-4 flex items-center gap-2 transition-all"
      >
        {file ? <FileText className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
        {file ? file.name : "Select PDF"}
      </label>

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
          !file || isUploading 
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-500 text-white animate-glow'
        }`}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing with AI...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Process Document
          </>
        )}
      </button>
    </div>
  );
}
