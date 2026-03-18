import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  Filter, 
  MessageSquare, 
  Trash2, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Play,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

interface CompetitorData {
  id: string;
  productName: string;
  productImage: string;
  shopName: string;
  shopIcon: string;
  rank: number;
  sales: number;
  salesYoY: number;
  salesMoM: number;
  unitPrice: number;
  marketShare: number;
  visitorsRange: string;
  paidUsersRange: string;
  uvValue: string;
  conversionRate: string;
  customerPrice: string;
  shopType: string;
  shippingLocation: string;
  secondaryCategory: string;
}

const MOCK_COMPETITORS: CompetitorData[] = [
  {
    id: '1',
    productName: '日本润福桶折叠大人家用洗澡...',
    productImage: 'https://picsum.photos/seed/p1/100/100',
    shopName: '吱凡旗舰店',
    shopIcon: 'https://picsum.photos/seed/s1/40/40',
    rank: 1,
    sales: 261.26,
    salesYoY: -30.33,
    salesMoM: 4.26,
    unitPrice: 165.00,
    marketShare: 2.83,
    visitorsRange: '30万~60万',
    paidUsersRange: '1万~5万',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '上海',
    secondaryCategory: '卫浴/置物'
  },
  {
    id: '2',
    productName: '泡澡桶折叠大人家用洗澡桶儿...',
    productImage: 'https://picsum.photos/seed/p2/100/100',
    shopName: '益伟家居旗舰店',
    shopIcon: 'https://picsum.photos/seed/s2/40/40',
    rank: 2,
    sales: 201.15,
    salesYoY: 132.09,
    salesMoM: 96.47,
    unitPrice: 65.00,
    marketShare: 2.18,
    visitorsRange: '15万~30万',
    paidUsersRange: '1万~5万',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '浙江金华',
    secondaryCategory: '卫浴/置物'
  },
  {
    id: '3',
    productName: '泡澡桶折叠大人全身浴缸成人...',
    productImage: 'https://picsum.photos/seed/p3/100/100',
    shopName: '格威索旗舰店',
    shopIcon: 'https://picsum.photos/seed/s3/40/40',
    rank: 3,
    sales: 84.02,
    salesYoY: -54.76,
    salesMoM: -29.27,
    unitPrice: 165.00,
    marketShare: 0.91,
    visitorsRange: '15万~30万',
    paidUsersRange: '1,000 ~ 5,000',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '浙江金华',
    secondaryCategory: '卫浴/置物'
  },
  {
    id: '4',
    productName: '家用泡澡桶大人折叠浴缸成人...',
    productImage: 'https://picsum.photos/seed/p4/100/100',
    shopName: '灰狐卫浴旗舰店',
    shopIcon: 'https://picsum.photos/seed/s4/40/40',
    rank: 4,
    sales: 67.27,
    salesYoY: -67.52,
    salesMoM: -16.99,
    unitPrice: 225.00,
    marketShare: 0.72,
    visitorsRange: '4万~8万',
    paidUsersRange: '1,000 ~ 5,000',
    uvValue: '5.10 ~ 8.75',
    conversionRate: '2.22% ~ 4.08%',
    customerPrice: '205.66 ~ 229.79',
    shopType: '天猫',
    shippingLocation: '浙江金华',
    secondaryCategory: '卫浴/置物'
  },
  {
    id: '5',
    productName: 'lalapercare/娜拉之夏自动充气...',
    productImage: 'https://picsum.photos/seed/p5/100/100',
    shopName: '娜拉之夏旗舰店',
    shopIcon: 'https://picsum.photos/seed/s5/40/40',
    rank: 5,
    sales: 66.65,
    salesYoY: -31.06,
    salesMoM: -69.26,
    unitPrice: 505.00,
    marketShare: 0.72,
    visitorsRange: '30万~60万',
    paidUsersRange: '1,000 ~ 5,000',
    uvValue: '3.84 ~ 6.80',
    conversionRate: '0.74% ~ 1.36%',
    customerPrice: '500.21 ~ 519.39',
    shopType: '天猫',
    shippingLocation: '浙江杭州',
    secondaryCategory: '卫浴/置物'
  }
];

export function CompetitorAnalysis() {
  const [selectedYear, setSelectedYear] = useState('2025年');
  const [selectedMonth, setSelectedMonth] = useState('01月');
  const [selectedCategory, setSelectedCategory] = useState('全部类目');
  const [selectedPlatform, setSelectedPlatform] = useState('平台');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Filter Bar */}
      <div className="p-4 border-b border-slate-200 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-500">平台</div>
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 text-sm outline-none bg-white min-w-[120px]"
            >
              <option>全部平台</option>
              <option>天猫</option>
              <option>京东</option>
            </select>
          </div>

          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm outline-none bg-white min-w-[160px]"
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
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none bg-white"
            >
              <option>2025年</option>
              <option>2024年</option>
            </select>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none bg-white"
            >
              <option>01月</option>
              <option>02月</option>
              <option>03月</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors">
              <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            </button>
          </div>

          <div className="text-xs text-slate-400">
            ( 统计时间：2025年1月1日-1月31日 )
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              上传链接
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Upload className="w-4 h-4" />
              上传表格
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
              筛选竞品
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <MessageSquare className="w-4 h-4" />
              评论分析
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-rose-50 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Download className="w-4 h-4" />
              导出表格
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
            <tr>
              <th className="p-4 w-10">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              </th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">商品</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">店铺</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">排名</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">销售额</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">销售额同比</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">销售额环比</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">件单价</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">市场占有率</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">访客数(区间)</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">支付人数(区间)</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">店铺类型</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">发货地</th>
              <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_COMPETITORS.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3 min-w-[240px]">
                    <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-100" referrerPolicy="no-referrer" />
                    <span className="text-xs font-medium text-slate-700 line-clamp-2 leading-relaxed">{item.productName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <img src={item.shopIcon} alt="" className="w-5 h-5 rounded-full border border-slate-100" referrerPolicy="no-referrer" />
                    <span className="text-xs text-slate-600">{item.shopName}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs font-bold text-slate-800">{item.rank}</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-800">{item.sales}万</span>
                    <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${(item.sales / 300) * 100}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`flex items-center gap-1 text-xs font-bold ${item.salesYoY >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.salesYoY >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(item.salesYoY)}%
                  </div>
                </td>
                <td className="p-4">
                  <div className={`flex items-center gap-1 text-xs font-bold ${item.salesMoM >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.salesMoM >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(item.salesMoM)}%
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-slate-600">
                  {item.unitPrice.toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{item.marketShare}%</span>
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400" style={{ width: `${item.marketShare * 10}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs text-slate-600 whitespace-nowrap">
                  {item.visitorsRange}
                </td>
                <td className="p-4 text-xs text-slate-600 whitespace-nowrap">
                  {item.paidUsersRange}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                    {item.shopType}
                  </span>
                </td>
                <td className="p-4 text-xs text-slate-600">
                  {item.shippingLocation}
                </td>
                <td className="p-4">
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
                    测算
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
