import React, { useState, useMemo } from 'react';
import { Filter, Store, Calendar, BarChart3, TrendingUp, DollarSign, Target, MousePointerClick, Percent, Activity, Tag, ShoppingCart, Eye, Menu, LayoutDashboard, ClipboardList, Image as ImageIcon, Sparkles, Wand2, Download, Trash2, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SHOPS, MOCK_DATA, PRODUCT_LIBRARY } from './mockData';
import { SpendRoiChart } from './components/SpendRoiChart';
import { LinkTrendChart } from './components/LinkTrendChart';
import { Sidebar } from './components/Sidebar';
import { StrategyMap } from './components/StrategyMap';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { PlanningDirection } from './components/PlanningDirection';
import { IndustryTrend } from './components/IndustryTrend';
import { format, parseISO, isWithinInterval, startOfToday, subDays, startOfWeek, startOfMonth } from 'date-fns';
import { PromotionType } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [selectedShop, setSelectedShop] = useState<string>(SHOPS[0].id);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionType>('all');
  const [startDate, setStartDate] = useState<string>(format(subDays(new Date(), 7), 'yyyy-MM-dd')); // Default to last 7 days for better trend
  const [endDate, setEndDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [sharedStrategyWords, setSharedStrategyWords] = useState<string[]>([]);
  const [sharedCategory, setSharedCategory] = useState<string>('泳池');
  const [productName, setProductName] = useState<string>('');
  const [requester, setRequester] = useState<string>('张三');
  const [submissionTime, setSubmissionTime] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [styleReferenceImage, setStyleReferenceImage] = useState<string | null>(null);
  const [productReferenceImage, setProductReferenceImage] = useState<string | null>(null);
  const [layoutReferenceImage, setLayoutReferenceImage] = useState<string | null>(null);

  const setQuickDate = (type: 'yesterday' | 'week' | 'month' | 'custom') => {
    const today = new Date();
    let start = today;
    let end = today;

    if (type === 'custom') {
      // For custom, we don't change the dates, just allow the user to use the inputs
      return;
    }

    switch (type) {
      case 'yesterday':
        start = subDays(today, 1);
        end = subDays(today, 1);
        break;
      case 'week':
        start = startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-indigo-100 flex justify-center">
      <div className="w-full max-w-[1600px] flex bg-white shadow-2xl shadow-slate-200/50">
        {/* Sidebar */}
        <Sidebar activeId={activePage} onNavigate={setActivePage} />

        <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {activePage === 'dashboard' ? (
          <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold tracking-tight text-slate-800">推广驾驶舱</h1>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                  <span className="text-xs font-medium text-slate-400">数据看板 / 核心推广指标</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono text-slate-500 tracking-widest uppercase bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    {format(new Date(), 'yyyy / MM / dd')}
                  </div>
                </div>
              </div>
            </header>

            <main className="w-full px-6 py-8">
              {/* Filters Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-6 mb-8"
              >
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full border border-slate-200">
                      <Filter className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">筛选条件</span>
                  </div>

                  <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

                  {/* Shop Filter */}
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-slate-400" />
                    <select 
                      value={selectedShop}
                      onChange={(e) => setSelectedShop(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none transition-all hover:bg-white"
                    >
                      {SHOPS.map(shop => (
                        <option key={shop.id} value={shop.id}>{shop.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Promotion Type Filter */}
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <select 
                      value={selectedPromotion}
                      onChange={(e) => setSelectedPromotion(e.target.value as PromotionType)}
                      className="bg-slate-50 border border-slate-200 text-sm text-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none transition-all hover:bg-white"
                    >
                      <option value="all">全部推广</option>
                      <option value="site_wide">货品全站推</option>
                      <option value="keyword">关键词推广</option>
                      <option value="audience">人群推广</option>
                      <option value="content">内容推广</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button 
                        onClick={() => setQuickDate('yesterday')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeRange === 'yesterday' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        昨天
                      </button>
                      <button 
                        onClick={() => setQuickDate('week')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeRange === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        本周
                      </button>
                      <button 
                        onClick={() => setQuickDate('month')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeRange === 'month' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        本月
                      </button>
                      <button 
                        onClick={() => setQuickDate('custom')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeRange === 'custom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        自定义
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1 px-3">
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent border-none text-sm text-slate-700 focus:ring-0 outline-none p-1"
                        />
                        <span className="text-slate-400 text-xs font-bold">/</span>
                        <input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent border-none text-sm text-slate-700 focus:ring-0 outline-none p-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
                <StatCard 
                  title="支出" 
                  value={`¥${totals.spend.toLocaleString()}`} 
                  icon={<DollarSign className="w-4 h-4 text-indigo-600" />}
                  trend="+12.5%"
                  color="indigo"
                />
                <StatCard 
                  title="平均投产 (ROI)" 
                  value={totals.avgRoi.toFixed(2)} 
                  icon={<Target className="w-4 h-4 text-emerald-600" />}
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
                      data={MOCK_DATA.filter(d => d.shopId === selectedShop)} // Show trend across all dates for this shop
                      onBack={() => setSelectedLinkId(null)} 
                    />
                  ) : (
                    <SpendRoiChart 
                      data={filteredData} 
                      onSelectLink={(id) => setSelectedLinkId(id)}
                    />
                  )
                ) : (
                  <div className="premium-card p-24 flex flex-col items-center justify-center text-slate-400">
                    <BarChart3 className="w-16 h-16 mb-6 opacity-20" />
                    <p className="text-lg font-medium">暂无数据</p>
                  </div>
                )}
              </motion.div>
            </main>
          </>
        ) : activePage === 'image_space' ? (
            <>
              {/* Header for Image Space */}
              <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold tracking-tight text-slate-800">生图空间</h1>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                  <span className="text-xs font-medium text-slate-400">创意实验室 / AI 视觉创作</span>
                </div>
              </div>
            </header>
            <main className="flex-1 p-6 overflow-auto bg-[#F8FAFC]">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                  {/* Left Column: Demand Submission Form (1/4) */}
                  <div className="lg:col-span-1 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                    >
                      {/* Form Header */}
                      <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <ClipboardList className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h2 className="text-sm font-bold text-slate-800">需求提报</h2>
                            <p className="text-[10px] text-slate-400 font-medium">定义生成需求</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 space-y-6">
                        {/* Section 1: Basic Metadata */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-indigo-500 rounded-full"></div>
                            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">基础信息</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">需求人</label>
                              <select 
                                value={requester}
                                onChange={(e) => setRequester(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all hover:border-slate-300"
                              >
                                <option>张三</option>
                                <option>李四</option>
                                <option>王五</option>
                                <option>赵六</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">提报时间</label>
                              <input 
                                type="date"
                                value={submissionTime}
                                onChange={(e) => setSubmissionTime(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all hover:border-slate-300"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">产品类目</label>
                              <select 
                                value={sharedCategory}
                                onChange={(e) => setSharedCategory(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all hover:border-slate-300"
                              >
                                <option>泳池</option>
                                <option>泳圈</option>
                                <option>皮划艇</option>
                                <option>床垫</option>
                                <option>泡澡桶</option>
                                <option>洗脚桶</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">产品名称</label>
                              <div className="relative group">
                                <input 
                                  type="text" 
                                  readOnly
                                  value={productName}
                                  onClick={() => setIsProductModalOpen(true)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer hover:bg-white hover:border-indigo-300" 
                                  placeholder="选择产品" 
                                />
                                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Content & Strategy */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-indigo-500 rounded-full"></div>
                            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">内容策略</h3>
                          </div>
                          <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">同步词根</label>
                            <div className="flex flex-wrap gap-1">
                              {sharedStrategyWords.length > 0 ? (
                                sharedStrategyWords.map((word, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-white text-indigo-600 text-[9px] font-bold rounded-full border border-indigo-100 shadow-sm flex items-center gap-1">
                                    <span className="w-0.5 h-0.5 bg-indigo-400 rounded-full"></span>
                                    {word}
                                  </span>
                                ))
                              ) : (
                                <p className="text-[9px] text-slate-400 py-1">暂无词根</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Visual References */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-3 bg-indigo-500 rounded-full"></div>
                            <h3 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">视觉参考</h3>
                          </div>
                          <div className="space-y-3">
                            {/* Style Reference */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">风格参考图</label>
                              <div 
                                onClick={() => document.getElementById('style-upload')?.click()}
                                className={`relative w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center group transition-all cursor-pointer overflow-hidden ${
                                  styleReferenceImage ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/30'
                                }`}
                              >
                                <input id="style-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => setStyleReferenceImage(event.target?.result as string);
                                    reader.readAsDataURL(file);
                                  }
                                }} />
                                {styleReferenceImage ? (
                                  <>
                                    <img src={styleReferenceImage} alt="Style" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                      <p className="text-white text-[8px] font-bold bg-indigo-600 px-2 py-1 rounded-full shadow-lg">更换</p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); setStyleReferenceImage(null); }} className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-500 hover:text-white text-slate-400 rounded shadow-lg transition-all">
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  </>
                                ) : (
                                  <ImageIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                )}
                              </div>
                            </div>

                            {/* Layout Reference */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">排版参考图</label>
                              <div 
                                onClick={() => document.getElementById('layout-upload')?.click()}
                                className={`relative w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center group transition-all cursor-pointer overflow-hidden ${
                                  layoutReferenceImage ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/30'
                                }`}
                              >
                                <input id="layout-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => setLayoutReferenceImage(event.target?.result as string);
                                    reader.readAsDataURL(file);
                                  }
                                }} />
                                {layoutReferenceImage ? (
                                  <>
                                    <img src={layoutReferenceImage} alt="Layout" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                      <p className="text-white text-[8px] font-bold bg-indigo-600 px-2 py-1 rounded-full shadow-lg">更换</p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); setLayoutReferenceImage(null); }} className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-500 hover:text-white text-slate-400 rounded shadow-lg transition-all">
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  </>
                                ) : (
                                  <ImageIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                )}
                              </div>
                            </div>

                            {/* Product Image */}
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">产品图</label>
                              <div 
                                onClick={() => document.getElementById('product-upload')?.click()}
                                className={`relative w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center group transition-all cursor-pointer overflow-hidden ${
                                  productReferenceImage ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/30'
                                }`}
                              >
                                <input id="product-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => setProductReferenceImage(event.target?.result as string);
                                    reader.readAsDataURL(file);
                                  }
                                }} />
                                {productReferenceImage ? (
                                  <>
                                    <img src={productReferenceImage} alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                      <p className="text-white text-[8px] font-bold bg-indigo-600 px-2 py-1 rounded-full shadow-lg">更换</p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); setProductReferenceImage(null); }} className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-rose-500 hover:text-white text-slate-400 rounded shadow-lg transition-all">
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  </>
                                ) : (
                                  <ImageIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Footer Actions */}
                        <div className="pt-4 border-t border-slate-100 space-y-2">
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>提交需求</span>
                          </button>
                          <button className="w-full px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-slate-50 transition-all">重置</button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column: Generation Control Panel (3/4) */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Generation Control Panel */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="premium-card p-8 bg-white border-t-4 border-t-emerald-500"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-600/20">
                          <Sparkles className="text-white w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800">AI 创意工坊</h2>
                          <p className="text-sm text-slate-400">输入您的创意灵感，AI 将为您生成精美的营销视觉素材</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">创意提示词 (Prompt)</label>
                          <div className="relative">
                            <textarea 
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all min-h-[120px] resize-none" 
                              placeholder="例如：一个极简风格的白色家用加厚泳池，在阳光明媚的草坪上，周围有热带植物，电影感光影..."
                            />
                            <button className="absolute bottom-4 right-4 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2">
                              <Wand2 className="w-4 h-4" />
                              <span>立即生成</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">图片比例</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all">
                              <option>1:1 (正方形)</option>
                              <option>3:4 (纵向)</option>
                              <option>4:3 (横向)</option>
                              <option>16:9 (宽屏)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">艺术风格</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all">
                              <option>写实摄影</option>
                              <option>极简主义</option>
                              <option>3D 渲染</option>
                              <option>插画风格</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">生成数量</label>
                            <div className="flex gap-2">
                              {[1, 2, 4].map(n => (
                                <button key={n} className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${n === 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                  {n} 张
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Gallery Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                          我的作品集
                        </h3>
                        <button className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors">清空历史</button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                          <motion.div 
                            key={i}
                            whileHover={{ y: -4 }}
                            className="group relative aspect-square bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                          >
                            <img 
                              src={`https://picsum.photos/seed/creative-${i}/600/600`} 
                              alt="" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                              <div className="flex items-center justify-between gap-2">
                                <button className="flex-1 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                                  <Download className="w-3 h-3" />
                                  下载
                                </button>
                                <button className="p-2 bg-rose-500/20 backdrop-blur-md hover:bg-rose-500 text-white rounded-xl transition-all">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </>
        ) : activePage === 'industry' ? (
          <>
            {/* Header for Industry Trend */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold tracking-tight text-slate-800">行业趋势大盘</h1>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                  <span className="text-xs font-medium text-slate-400">行业洞察 / 市场趋势分析</span>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-hidden">
              <IndustryTrend />
            </main>
          </>
        ) : activePage === 'competitor' ? (
          <>
            {/* Header for Competitor Analysis */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold tracking-tight text-slate-800">竞品分析</h1>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                  <span className="text-xs font-medium text-slate-400">市场竞争 / 竞品数据追踪</span>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-hidden">
              <CompetitorAnalysis />
            </main>
          </>
        ) : activePage === 'planning' ? (
          <>
            {/* Header for Planning Direction */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold tracking-tight text-slate-800">确定策划方向</h1>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                  <span className="text-xs font-medium text-slate-400">内容策划 / 营销场景矩阵</span>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-hidden">
              <PlanningDirection />
            </main>
          </>
        ) : activePage === 'strategy' ? (
          <>
            {/* Header for Strategy Map */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <div className="px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold tracking-tight text-slate-800">战略地图</h1>
                  <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                  <span className="text-xs font-medium text-slate-400">运营规划 / 市场需求矩阵</span>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-hidden">
              <StrategyMap onSendToImageSpace={(words, category) => {
                setSharedStrategyWords(words);
                setSharedCategory(category);
                setActivePage('image_space');
              }} />
            </main>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <LayoutDashboard className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">该模块正在开发中...</p>
              <button 
                onClick={() => setActivePage('dashboard')}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                返回驾驶舱
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Product Selection Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
                    <ShoppingCart className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">选择产品</h3>
                </div>
                <button 
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {PRODUCT_LIBRARY.map((group) => (
                  <div key={group.category} className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-3 bg-indigo-500 rounded-full"></span>
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {group.products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setProductName(product.name);
                            setProductReferenceImage(product.image);
                            setIsProductModalOpen(false);
                          }}
                          className="group flex flex-col items-center p-3 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-center"
                        >
                          <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 border border-slate-100 group-hover:shadow-md transition-all">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {product.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string, icon: React.ReactNode, trend: string, color: string }) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 border-indigo-100',
    emerald: 'bg-emerald-50 border-emerald-100',
    amber: 'bg-amber-50 border-amber-100',
    rose: 'bg-rose-50 border-rose-100',
    blue: 'bg-blue-50 border-blue-100',
    violet: 'bg-violet-50 border-violet-100',
    orange: 'bg-orange-50 border-orange-100',
    cyan: 'bg-cyan-50 border-cyan-100',
  };

  return (
    <motion.div 
      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.8)' }}
      className="premium-card p-5 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{trend}</span>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 mb-1.5 truncate uppercase tracking-wider">{title}</h4>
        <p className="text-xl font-bold text-slate-800 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
