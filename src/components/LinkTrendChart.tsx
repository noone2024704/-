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
    <div className="w-full premium-card overflow-hidden">
      <div className="p-6 border-b border-surface-border bg-surface-bg/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-surface-card hover:bg-secondary-50 rounded-xl transition-all text-surface-muted hover:text-primary-600 border border-surface-border shadow-sm group"
            title="返回对比视图"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-secondary-800 tracking-tight">链接趋势分析</h3>
              <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-bold rounded-md border border-primary-100 font-mono">
                {linkId}
              </span>
            </div>
            <p className="text-[10px] font-bold text-surface-muted uppercase tracking-wider mt-1">点击下方指标切换展示趋势（最多选择4项）</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Metric Selector Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {METRICS.map((metric) => {
            const isActive = selectedMetrics.includes(metric.key);
            return (
              <button
                key={metric.key}
                onClick={() => toggleMetric(metric.key)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border
                  ${isActive 
                    ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-200' 
                    : 'bg-surface-card text-surface-muted hover:bg-secondary-50 border-surface-border hover:text-secondary-700'}
                `}
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : ''}`} 
                  style={!isActive ? { backgroundColor: metric.color } : {}}
                />
                {metric.label}
                {isActive && <Check className="w-3 h-3 ml-1" />}
              </button>
            );
          })}
        </div>

        <div className="h-[400px] w-full bg-surface-bg/30 rounded-2xl border border-surface-border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(0,0,0,0.03)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => format(parseISO(str), 'MM/dd')}
                tick={{ fontSize: 10, fill: 'var(--color-surface-muted)', fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              
              <YAxis 
                tick={{ fontSize: 10, fill: 'var(--color-surface-muted)', fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-surface-card/90 backdrop-blur-xl p-4 border border-surface-border shadow-2xl rounded-2xl min-w-[180px]">
                        <p className="data-label mb-3 border-b border-surface-border pb-2">
                          {format(parseISO(label), 'yyyy / MM / dd')}
                        </p>
                        <div className="space-y-2.5">
                          {payload.map((entry: any) => {
                            const config = METRICS.find(m => m.key === entry.dataKey);
                            return (
                              <div key={entry.dataKey} className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                  <span className="text-[11px] font-medium text-secondary-600">{entry.name}</span>
                                </div>
                                <span className="text-[11px] font-bold text-secondary-900 tabular-nums">
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
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: config.color, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 5, strokeWidth: 0, fill: config.color }}
                    animationDuration={1000}
                  />
                ))}
              </AnimatePresence>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeConfigs.map(config => {
            const latestValue = trendData.length > 0 ? trendData[trendData.length - 1][config.key as keyof typeof trendData[0]] : 0;
            return (
              <div key={config.key} className="p-4 bg-surface-card rounded-xl border border-surface-border shadow-sm">
                <p className="data-label mb-1.5 opacity-60">{config.label}</p>
                <p className="text-lg font-bold text-secondary-900 tabular-nums">
                  {config.formatter(latestValue as number)}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-[10px] text-surface-muted text-center font-medium tracking-wide">
          * 数据更新至所选范围的最后一天
        </p>
      </div>
    </div>
  );
};
