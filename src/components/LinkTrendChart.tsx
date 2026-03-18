import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ArrowLeft, Check } from 'lucide-react';
import { DataPoint } from '../types';
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

interface LinkTrendChartProps {
  linkId: string;
  data: DataPoint[];
  onBack: () => void;
}

type MetricKey = 'spend' | 'roi' | 'clicks' | 'ctr' | 'conversionRate' | 'cpc' | 'cart';

interface MetricConfig {
  key: MetricKey;
  label: string;
  color: string;
  unit: string;
  formatter: (val: number) => string;
}

const METRICS: MetricConfig[] = [
  { key: 'spend', label: '支出', color: '#8b5cf6', unit: '¥', formatter: (val) => `¥${val.toLocaleString()}` },
  { key: 'roi', label: '投产 (ROI)', color: '#10b981', unit: '', formatter: (val) => val.toFixed(2) },
  { key: 'clicks', label: '点击量', color: '#3b82f6', unit: '', formatter: (val) => val.toLocaleString() },
  { key: 'ctr', label: '点击率', color: '#f59e0b', unit: '%', formatter: (val) => `${val.toFixed(2)}%` },
  { key: 'conversionRate', label: '转化率', color: '#ef4444', unit: '%', formatter: (val) => `${val.toFixed(2)}%` },
  { key: 'cpc', label: '点击单价', color: '#06b6d4', unit: '¥', formatter: (val) => `¥${val.toFixed(2)}` },
  { key: 'cart', label: '购物车', color: '#ec4899', unit: '', formatter: (val) => val.toLocaleString() },
];

export const LinkTrendChart: React.FC<LinkTrendChartProps> = ({ linkId, data, onBack }) => {
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>(['spend', 'roi']);

  // Filter and process data for the specific link
  const trendData = useMemo(() => {
    return data
      .filter(item => item.linkId === linkId)
      .map(item => ({
        ...item,
        ctr: item.impressions > 0 ? (item.clicks / item.impressions) * 100 : 0,
        conversionRate: item.clicks > 0 ? (item.conversions / item.clicks) * 100 : 0,
        cpc: item.clicks > 0 ? item.spend / item.clicks : 0,
      }))
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  }, [data, linkId]);

  const toggleMetric = (key: MetricKey) => {
    setSelectedMetrics(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key].slice(-4) // Limit to 4 metrics for readability
    );
  };

  const activeConfigs = METRICS.filter(m => selectedMetrics.includes(m.key));

  return (
    <div className="w-full premium-card p-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-500 hover:text-slate-800 border border-slate-200"
            title="返回对比视图"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              链接趋势分析: <span className="text-indigo-600 ml-2">{linkId}</span>
            </h3>
            <p className="text-sm text-slate-500 mt-2">点击下方指标切换展示趋势（最多选择4项）</p>
          </div>
        </div>
      </div>

      {/* Metric Selector Chips */}
      <div className="flex flex-wrap gap-3 mb-10">
        {METRICS.map((metric) => {
          const isActive = selectedMetrics.includes(metric.key);
          return (
            <button
              key={metric.key}
              onClick={() => toggleMetric(metric.key)}
              className={`
                flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border
                ${isActive 
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20 scale-105' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200 hover:text-slate-700'}
              `}
            >
              <div 
                className="w-2 h-2 rounded-full shadow-sm" 
                style={{ backgroundColor: metric.color }}
              />
              {metric.label}
              {isActive && <Check className="w-3.5 h-3.5 ml-1" />}
            </button>
          );
        })}
      </div>

      <div className="h-[480px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(str) => format(parseISO(str), 'MM/dd')}
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              dy={15}
            />
            
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/90 backdrop-blur-xl p-5 border border-slate-200 shadow-2xl rounded-2xl min-w-[200px]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                        {format(parseISO(label), 'yyyy / MM / dd')}
                      </p>
                      <div className="space-y-3">
                        {payload.map((entry: any) => {
                          const config = METRICS.find(m => m.key === entry.dataKey);
                          return (
                            <div key={entry.dataKey} className="flex justify-between items-center gap-6">
                              <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
                                <span className="text-xs font-medium text-slate-600">{entry.name}</span>
                              </div>
                              <span className="text-xs font-bold text-slate-900 tabular-nums">
                                {config?.formatter(entry.value)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <AnimatePresence>
              {activeConfigs.map((config) => (
                <Line
                  key={config.key}
                  type="monotone"
                  dataKey={config.key}
                  name={config.label}
                  stroke={config.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: config.color, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: config.color, shadow: '0 0 10px rgba(0,0,0,0.1)' }}
                  animationDuration={1200}
                />
              ))}
            </AnimatePresence>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
        {activeConfigs.map(config => {
          const latestValue = trendData.length > 0 ? trendData[trendData.length - 1][config.key as keyof typeof trendData[0]] : 0;
          return (
            <div key={config.key} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{config.label}</p>
              <p className="text-xl font-bold text-slate-800" style={{ color: config.color }}>
                {config.formatter(latestValue as number)}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-[11px] text-slate-400 text-center italic tracking-wide">
        “当前值”看板，是所选指标在最近一个数据点的具体数值。
      </p>
    </div>
  );
};
