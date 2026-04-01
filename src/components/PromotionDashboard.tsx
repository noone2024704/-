import React, { useState, useMemo } from 'react';
import { Filter, Store, Calendar, BarChart3, TrendingUp, DollarSign, Target, MousePointerClick, Percent, Activity, Tag, ShoppingCart, Eye, LayoutDashboard, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { format, parseISO, isWithinInterval, subDays, startOfWeek, startOfMonth } from 'date-fns';
import { SHOPS, MOCK_DATA } from '../mockData';
import { SpendRoiChart } from './SpendRoiChart';
import { LinkTrendChart } from './LinkTrendChart';
import { StatCard } from './StatCard';
import { PromotionType } from '../types';

export function PromotionDashboard() {
  const [selectedShop, setSelectedShop] = useState<string>(SHOPS[0].id);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionType>('all');
  const [startDate, setStartDate] = useState<string>(format(subDays(new Date(), 7), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

  const setQuickDate = (type: 'yesterday' | 'week' | 'month' | 'custom') => {
    const today = new Date();
    let start = today;
    let end = today;

    if (type === 'custom') return;

    switch (type) {
      case 'yesterday':
        start = subDays(today, 1);
        end = subDays(today, 1);
        break;
      case 'week':
        start = startOfWeek(today, { weekStartsOn: 1 });
        end = today;
        break;
      case 'month':
        start = startOfMonth(today);
        end = today;
        break;
    }

    setStartDate(format(start, 'yyyy-MM-dd'));
    setEndDate(format(end, 'yyyy-MM-dd'));
  };

  const activeRange = useMemo(() => {
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');

    if (startDate === yesterday && endDate === yesterday) return 'yesterday';
    if (startDate === weekStart && endDate === format(new Date(), 'yyyy-MM-dd')) return 'week';
    if (startDate === monthStart && endDate === format(new Date(), 'yyyy-MM-dd')) return 'month';
    return 'custom';
  }, [startDate, endDate]);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const isShopMatch = item.shopId === selectedShop;
      const isPromotionMatch = selectedPromotion === 'all' || item.promotionType === selectedPromotion;
      const itemDate = parseISO(item.date);
      const isDateMatch = isWithinInterval(itemDate, {
        start: parseISO(startDate),
        end: parseISO(endDate),
      });
      return isShopMatch && isPromotionMatch && isDateMatch;
    });
  }, [selectedShop, selectedPromotion, startDate, endDate]);

  const totals = useMemo(() => {
    const spend = filteredData.reduce((acc, curr) => acc + curr.spend, 0);
    const clicks = filteredData.reduce((acc, curr) => acc + curr.clicks, 0);
    const impressions = filteredData.reduce((acc, curr) => acc + curr.impressions, 0);
    const conversions = filteredData.reduce((acc, curr) => acc + curr.conversions, 0);
    const cart = filteredData.reduce((acc, curr) => acc + curr.cart, 0);
    
    const avgRoi = filteredData.length > 0 
      ? filteredData.reduce((acc, curr) => acc + curr.roi, 0) / filteredData.length 
      : 0;
    
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
    const avgCpc = clicks > 0 ? spend / clicks : 0;

    return { spend, avgRoi, clicks, ctr, conversionRate, avgCpc, cart };
  }, [filteredData]);

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-surface-border sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-secondary-900">推广驾驶舱</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-wider">数据看板</span>
                <div className="w-1 h-1 bg-secondary-300 rounded-full"></div>
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">核心推广指标</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-bg border border-surface-border rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-surface-muted" />
              <span className="text-xs font-bold text-secondary-600 tabular-nums">
                {format(new Date(), 'yyyy / MM / dd')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-8 py-8 max-w-[1600px] mx-auto">
        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-4 mb-8 bg-surface-bg/50 border-surface-border/40"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Shop Filter */}
              <div className="space-y-1.5">
                <label className="data-label ml-1">所属店铺</label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-muted" />
                  <select 
                    value={selectedShop}
                    onChange={(e) => setSelectedShop(e.target.value)}
                    className="pl-9 pr-8 py-2 bg-surface-card border border-surface-border text-xs font-bold text-secondary-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all hover:border-primary-300 appearance-none cursor-pointer"
                  >
                    {SHOPS.map(shop => (
                      <option key={shop.id} value={shop.id}>{shop.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Promotion Type Filter */}
              <div className="space-y-1.5">
                <label className="data-label ml-1">推广类型</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-muted" />
                  <select 
                    value={selectedPromotion}
                    onChange={(e) => setSelectedPromotion(e.target.value as PromotionType)}
                    className="pl-9 pr-8 py-2 bg-surface-card border border-surface-border text-xs font-bold text-secondary-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all hover:border-primary-300 appearance-none cursor-pointer"
                  >
                    <option value="all">全部推广</option>
                    <option value="site_wide">货品全站推</option>
                    <option value="keyword">关键词推广</option>
                    <option value="audience">人群推广</option>
                    <option value="content">内容推广</option>
                  </select>
                </div>
              </div>

              <div className="h-10 w-[1px] bg-surface-border hidden lg:block"></div>

              {/* Date Filter */}
              <div className="space-y-1.5">
                <label className="data-label ml-1">时间范围</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-surface-card p-1 rounded-xl border border-surface-border shadow-sm">
                    {['yesterday', 'week', 'month', 'custom'].map((type) => (
                      <button 
                        key={type}
                        onClick={() => setQuickDate(type as any)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                          activeRange === type 
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-200' 
                            : 'text-surface-muted hover:bg-secondary-50'
                        }`}
                      >
                        {type === 'yesterday' ? '昨天' : type === 'week' ? '本周' : type === 'month' ? '本月' : '自定义'}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 bg-surface-card border border-surface-border rounded-xl px-3 py-1.5 shadow-sm">
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent border-none text-[11px] font-bold text-secondary-600 focus:ring-0 outline-none cursor-pointer"
                    />
                    <span className="text-surface-muted text-xs font-bold">—</span>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent border-none text-[11px] font-bold text-secondary-600 focus:ring-0 outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 group active:scale-95">
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>导出分析报告</span>
              </button>
              <p className="mt-2 text-[10px] font-bold text-secondary-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></span>
                数据实时更新中 • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <StatCard 
            title="支出" 
            value={`¥${totals.spend.toLocaleString()}`} 
            icon={<DollarSign className="w-4 h-4 text-primary-600" />}
            trend="+12.5%"
            color="brand"
          />
          <StatCard 
            title="平均投产 (ROI)" 
            value={totals.avgRoi.toFixed(2)} 
            icon={<Target className="w-4 h-4 text-success-600" />}
            trend="+5.2%"
            color="emerald"
          />
          <StatCard 
            title="点击量" 
            value={totals.clicks.toLocaleString()} 
            icon={<MousePointerClick className="w-4 h-4 text-blue-600" />}
            trend="+8.1%"
            color="blue"
          />
          <StatCard 
            title="平均点击率" 
            value={`${totals.ctr.toFixed(2)}%`} 
            icon={<Eye className="w-4 h-4 text-orange-600" />}
            trend="+1.2%"
            color="orange"
          />
          <StatCard 
            title="转化率" 
            value={`${totals.conversionRate.toFixed(2)}%`} 
            icon={<Percent className="w-4 h-4 text-violet-600" />}
            trend="+2.4%"
            color="violet"
          />
          <StatCard 
            title="平均点击单价" 
            value={`¥${totals.avgCpc.toFixed(2)}`} 
            icon={<Activity className="w-4 h-4 text-rose-600" />}
            trend="-1.2%"
            color="rose"
          />
          <StatCard 
            title="购物车" 
            value={totals.cart.toLocaleString()} 
            icon={<ShoppingCart className="w-4 h-4 text-cyan-600" />}
            trend="+15.3%"
            color="cyan"
          />
          <StatCard 
            title="链接总数" 
            value={filteredData.length.toString()} 
            icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
            trend="稳定"
            color="amber"
          />
        </div>

        {/* Main Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredData.length > 0 ? (
            selectedLinkId ? (
              <LinkTrendChart 
                linkId={selectedLinkId} 
                data={MOCK_DATA.filter(d => d.shopId === selectedShop)} 
                onBack={() => setSelectedLinkId(null)} 
              />
            ) : (
              <SpendRoiChart 
                data={filteredData} 
                onSelectLink={(id) => setSelectedLinkId(id)}
              />
            )
          ) : (
            <div className="premium-card p-24 flex flex-col items-center justify-center text-surface-muted">
              <BarChart3 className="w-16 h-16 mb-6 opacity-20" />
              <p className="text-lg font-medium">暂无数据</p>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
}
