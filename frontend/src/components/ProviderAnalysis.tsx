"use client";
import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Activity } from 'lucide-react';
import axios from 'axios';

interface ProviderAnalysisProps {
  npi: string;
}

export default function ProviderAnalysis({ npi }: ProviderAnalysisProps) {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/analyze/${npi}`);
        setStats(response.data.stats);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [npi]);

  if (loading) return <div className="p-8 text-center">Crunching DuckDB stats...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="text-blue-400" />
          Analysis for NPI: <span className="text-blue-400">{npi}</span>
        </h2>
        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <DollarSign className="text-green-400 w-4 h-4" />
            <span className="text-sm">Total Potential Clawback: <span className="font-bold text-green-400">$1.2M</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, idx) => (
          <div key={idx} className={`glass-card p-6 border-l-4 ${item.z_score > 2 ? 'border-red-500' : 'border-blue-500'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono">{item.hcpcs}</span>
              {item.z_score > 2 && (
                <div className="flex items-center gap-1 text-red-400 text-xs font-bold uppercase">
                  <AlertTriangle className="w-3 h-3" />
                  Anomaly Detected
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Avg Paid/Line</span>
                <span className="font-bold">${item.avg_paid_per_line?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">National Avg</span>
                <span className="text-slate-300 font-medium">${item.national_avg?.toFixed(2)}</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-slate-400 text-xs block">Z-Score</span>
                    <span className={`text-lg font-bold ${item.z_score > 2 ? 'text-red-400' : 'text-blue-400'}`}>
                      {item.z_score?.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs block">Total Paid</span>
                    <span className="font-bold text-slate-200">${(item.total_paid / 1000).toFixed(1)}k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
