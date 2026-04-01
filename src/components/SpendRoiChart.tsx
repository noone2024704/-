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
    <div className="w-full premium-card overflow-hidden">
      <div className="p-6 border-b border-surface-border bg-surface-bg/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-secondary-800 tracking-tight">花费与投产对比分析</h3>
          <p className="text-xs text-surface-muted mt-1">按花费金额降序排列，点击行查看趋势详情</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="data-label">花费</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="data-label">ROI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-error-500 rounded-full"></div>
            <span className="data-label">预警 (ROI &lt; 3.5)</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-surface-border">
              <th className="px-6 py-4 text-left data-label w-[140px]">链接 ID</th>
              <th className="px-6 py-4 text-right data-label w-[120px]">花费金额</th>
              <th className="px-6 py-4 text-center data-label">对比分析 (Spend vs ROI)</th>
              <th className="px-6 py-4 text-left data-label w-[140px]">ROI 表现</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border/50">
            {sortedData.map((item, index) => {
              const isLowRoi = item.roi < 3.5;
              return (
                <motion.tr 
                  key={item.linkId}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => onSelectLink(item.linkId)}
                  className={`group cursor-pointer transition-colors ${
                    isLowRoi ? 'bg-error-50/30 hover:bg-error-50/60' : 'hover:bg-secondary-50/80'
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-mono font-bold tracking-tight ${
                      isLowRoi ? 'text-error-700' : 'text-surface-muted group-hover:text-primary-600'
                    }`}>
                      {item.linkId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-bold text-primary-600 tabular-nums">
                      ¥{item.spend.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center h-4 max-w-[400px] mx-auto">
                      <div className="flex-1 h-full bg-secondary-100/50 rounded-l-sm overflow-hidden flex justify-end">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.spend / maxSpend) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary-400 group-hover:bg-primary-500 transition-colors"
                        />
                      </div>
                      <div className="w-[2px] h-full bg-surface-card z-10" />
                      <div className="flex-1 h-full bg-secondary-100/50 rounded-r-sm overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.roi / maxRoi) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full transition-colors ${
                            isLowRoi ? 'bg-error-400 group-hover:bg-error-500' : 'bg-success-400 group-hover:bg-success-500'
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold tabular-nums ${isLowRoi ? 'text-error-600' : 'text-success-600'}`}>
                        {item.roi.toFixed(2)}
                      </span>
                      {isLowRoi && (
                        <AlertTriangle className="w-3 h-3 text-error-500" />
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="py-20 text-center text-surface-muted">
          <p className="text-sm">暂无对比数据</p>
        </div>
      )}
    </div>
  );
};
