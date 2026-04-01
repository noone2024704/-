import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Download, 
  TrendingDown, 
  TrendingUp,
  Users,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  isDown?: boolean;
}

function MetricCard({ title, value, trend, isDown }: MetricCardProps) {
  return (
    <div className="bg-surface-card p-6 rounded-xl border border-surface-border shadow-sm flex flex-col justify-between h-32">
      <p className="text-xs font-bold text-surface-muted uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-4">
        <h3 className="text-3xl font-bold text-secondary-800">{value}</h3>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-bold ${isDown ? 'text-success-500' : 'text-error-500'}`}>
            {trend}
            {isDown ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
          </div>
        )}
      </div>
    </div>
  );
}

const SEASON_DATA = [
  { month: '01月', status: 'off', label: '淡季' },
  { month: '02月', status: 'normal', label: '平销' },
  { month: '03月', status: 'normal', label: '平销' },
  { month: '04月', status: 'normal', label: '平销' },
  { month: '05月', status: 'normal', label: '平销' },
  { month: '06月', status: 'peak', label: '旺季' },
  { month: '07月', status: 'peak', label: '旺季' },
  { month: '08月', status: 'peak', label: '旺季' },
  { month: '09月', status: 'normal', label: '平销' },
  { month: '10月', status: 'normal', label: '平销' },
  { month: '11月', status: 'off', label: '淡季' },
  { month: '12月', status: 'off', label: '淡季' },
];

export function IndustryTrend() {
  const [activeTab, setActiveTab] = useState('insight');
  const [selectedYear, setSelectedYear] = useState('2025年');
  const [selectedMonth, setSelectedMonth] = useState('01月');
  const [selectedCategory, setSelectedCategory] = useState('全部类目');
  const [selectedPlatform, setSelectedPlatform] = useState('平台');

  const tabs = [
    { id: 'insight', label: '市场洞察', icon: Target },
    { id: 'trend', label: '市场趋势', icon: BarChart3 },
    { id: 'audience', label: '人群画像', icon: Users },
    { id: 'proportion', label: '类目占比', icon: PieChart },
  ];

  return (
    <div className="flex flex-col h-full bg-surface-bg/50">
      {/* Top Filter Bar */}
      <div className="p-4 bg-surface-card border-b border-surface-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-surface-border rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-surface-bg border-r border-surface-border text-xs font-bold text-surface-muted">平台</div>
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 text-sm outline-none bg-surface-card min-w-[100px]"
              >
                <option>全部平台</option>
                <option>天猫</option>
                <option>京东</option>
              </select>
            </div>

            <div className="flex items-center border border-surface-border rounded-lg overflow-hidden">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-sm outline-none bg-surface-card min-w-[140px]"
              >
                <option>全部类目</option>
                <option>卫浴用品</option>
                <option>家居百货</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-surface-border rounded-lg px-3 py-2 text-sm outline-none bg-surface-card"
              >
                <option>2025年</option>
                <option>2024年</option>
              </select>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-surface-border rounded-lg px-3 py-2 text-sm outline-none bg-surface-card"
              >
                <option>01月</option>
                <option>02月</option>
                <option>03月</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-secondary-100 rounded-lg border border-surface-border transition-colors">
                <ChevronLeft className="w-4 h-4 text-surface-muted" />
              </button>
              <button className="p-2 hover:bg-secondary-100 rounded-lg border border-surface-border transition-colors">
                <ChevronRight className="w-4 h-4 text-surface-muted" />
              </button>
              <button className="p-2 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-200 transition-colors">
                <Play className="w-4 h-4 text-primary-600 fill-primary-600" />
              </button>
            </div>

            <div className="text-xs text-surface-muted">
              ( 统计时间：2025年1月1日-1月31日 )
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-surface-border rounded-lg text-sm font-medium text-secondary-600 hover:bg-secondary-50 transition-all">
            <Download className="w-4 h-4" />
            导出表格
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4 bg-surface-card border-b border-surface-border">
        <div className="flex items-center gap-1 p-1 bg-secondary-100/50 rounded-xl w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all
                  ${isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                    : 'text-surface-muted hover:bg-surface-card hover:text-secondary-800'}
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6 space-y-8 custom-scrollbar">
        {/* Core Metrics Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-secondary-800 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary-600 rounded-full"></span>
            核心指标
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="销售额" value="3.58亿" />
            <MetricCard title="销售额同比" value="-17.27%" isDown trend="-17.27%" />
            <MetricCard title="支付买家数" value="256.89万" />
            <MetricCard title="支付买家数同比" value="-32.80%" isDown trend="-32.80%" />
          </div>
        </section>

        {/* Industry Peak/Off-Season Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-secondary-800 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary-600 rounded-full"></span>
            行业淡旺季
          </h2>
          <div className="bg-surface-card p-8 rounded-2xl border border-surface-border shadow-sm overflow-x-auto">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-13 gap-0 border border-surface-border rounded-xl overflow-hidden">
                {/* Header Row */}
                <div className="bg-surface-bg p-4 border-r border-surface-border flex items-center justify-center">
                  <span className="text-xs font-bold text-surface-muted uppercase tracking-widest">类目名称</span>
                </div>
                {SEASON_DATA.map((item, idx) => (
                  <div key={idx} className="bg-surface-bg p-4 border-r border-surface-border last:border-r-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-surface-muted whitespace-nowrap">2025年{item.month}</span>
                  </div>
                ))}

                {/* Data Row */}
                <div className="p-4 border-r border-surface-border border-t border-surface-border flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary-700">游泳池/游泳桶</span>
                </div>
                {SEASON_DATA.map((item, idx) => (
                  <div key={idx} className="p-2 border-r border-surface-border border-t border-surface-border last:border-r-0 flex items-center justify-center">
                    <div className={`
                      w-full py-2 rounded-lg text-[10px] font-bold text-center transition-all
                      ${item.status === 'peak' ? 'bg-error-500 text-white shadow-md shadow-error-200' : 
                        item.status === 'off' ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 
                        'bg-secondary-100 text-surface-muted'}
                    `}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
