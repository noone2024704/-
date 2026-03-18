import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { DataPoint } from '../types';
import { AlertTriangle } from 'lucide-react';

interface SpendRoiChartProps {
  data: DataPoint[];
  onSelectLink: (linkId: string) => void;
}

export const SpendRoiChart: React.FC<SpendRoiChartProps> = ({ data, onSelectLink }) => {
  // Sort data by spend descending as requested
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.spend - a.spend);
  }, [data]);

  const maxSpend = useMemo(() => Math.max(...data.map(d => d.spend), 1), [data]);
  const maxRoi = useMemo(() => Math.max(...data.map(d => d.roi), 1), [data]);

  return (
    <div className="w-full premium-card p-8">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">花费与投产对比分析</h3>
          <p className="text-sm text-slate-500 mt-2">按花费金额从高到低排序，点击行查看该链接趋势波动</p>
        </div>
        <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
            <span className="text-indigo-600">花费 (Spend)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></div>
            <span className="text-emerald-600">投产 (ROI)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
            <span className="text-red-600">危险预警 (ROI &lt; 3.5)</span>
          </div>
        </div>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-[120px_100px_1fr_120px] gap-6 mb-6 px-4 border-b border-slate-100 pb-4">
        <div className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">链接 ID</div>
        <div className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">花费金额</div>
        <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">对比分析 (花费 vs ROI)</div>
        <div className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">ROI 表现</div>
      </div>

      {/* Data Rows */}
      <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {sortedData.map((item, index) => {
          const isLowRoi = item.roi < 3.5;
          return (
            <motion.div 
              key={item.linkId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => onSelectLink(item.linkId)}
              className={`grid grid-cols-[120px_100px_1fr_120px] gap-6 items-center group p-3 rounded-xl transition-all cursor-pointer border ${
                isLowRoi 
                  ? 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300' 
                  : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              {/* Link ID (Far Left) */}
              <div className="text-left">
                <span className={`text-[11px] font-mono font-bold transition-colors tracking-tight ${
                  isLowRoi ? 'text-red-700' : 'text-slate-500 group-hover:text-indigo-600'
                }`}>
                  {item.linkId}
                </span>
              </div>

              {/* Spend Value (Left of the bar) */}
              <div className="text-right">
                <span className="text-xs font-bold text-indigo-600 tabular-nums">
                  ¥{item.spend.toLocaleString()}
                </span>
              </div>

              {/* Bars Container (Spend and ROI bars touching in the middle) */}
              <div className="flex items-center h-5">
                {/* Spend Bar (Grows right to left) */}
                <div className="flex-1 h-full bg-slate-100 rounded-l-lg overflow-hidden flex justify-end">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.spend / maxSpend) * 100}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-indigo-500 group-hover:bg-indigo-600 transition-colors"
                  />
                </div>
                
                {/* Center Divider */}
                <div className="w-[1px] h-full bg-slate-200 z-10" />

                {/* ROI Bar (Grows left to right) */}
                <div className="flex-1 h-full bg-slate-100 rounded-r-lg overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.roi / maxRoi) * 100}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-emerald-500 group-hover:bg-emerald-600 transition-colors"
                  />
                </div>
              </div>

              {/* ROI Value (Far Right) */}
              <div className="text-left flex items-center gap-3">
                <span className={`text-xs font-bold tabular-nums ${isLowRoi ? 'text-red-600' : 'text-emerald-600'}`}>
                  {item.roi.toFixed(2)}
                </span>
                {isLowRoi && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-red-500"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {sortedData.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          <p>暂无对比数据</p>
        </div>
      )}
    </div>
  );
};
