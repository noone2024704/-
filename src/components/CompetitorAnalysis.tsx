import React, { useState, useMemo } from 'react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import * as XLSX from 'xlsx';
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
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronDown,
  X,
  Check,
  Plus,
  Settings,
  Edit2,
  LineChart,
  Copy,
  CheckSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  // Pinduoduo specific fields
  date?: string;
  listingTime?: string;
  link?: string;
  material?: string;
  usagePrice?: number;
  maxPrice?: number;
  starCustomerPrice?: number;
  dailySales?: number;
  isBillionSubsidy?: boolean;
  isBlackLabel?: boolean;
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
    secondaryCategory: '卫浴/置物',
    date: '2026-03-12',
    listingTime: '2024-10-12',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=1',
    material: '环保PP+TPE',
    usagePrice: 158.00,
    maxPrice: 298.00,
    starCustomerPrice: 165.00,
    dailySales: 120,
    isBillionSubsidy: true,
    isBlackLabel: true
  },
  {
    id: '1-v2',
    productName: '日本润福桶折叠大人家用洗澡...',
    productImage: 'https://picsum.photos/seed/p1/100/100',
    shopName: '吱凡旗舰店',
    shopIcon: 'https://picsum.photos/seed/s1/40/40',
    rank: 1,
    sales: 285.40,
    salesYoY: -25.10,
    salesMoM: 8.50,
    unitPrice: 165.00,
    marketShare: 3.10,
    visitorsRange: '35万~65万',
    paidUsersRange: '2万~6万',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '上海',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-20',
    listingTime: '2024-10-12',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=1',
    material: '环保PP+TPE',
    usagePrice: 162.00,
    maxPrice: 310.00,
    starCustomerPrice: 165.00,
    dailySales: 145,
    isBillionSubsidy: true,
    isBlackLabel: true
  },
  {
    id: '1-v3',
    productName: '日本润福桶折叠大人家用洗澡...',
    productImage: 'https://picsum.photos/seed/p1/100/100',
    shopName: '吱凡旗舰店',
    shopIcon: 'https://picsum.photos/seed/s1/40/40',
    rank: 1,
    sales: 310.20,
    salesYoY: -15.50,
    salesMoM: 12.30,
    unitPrice: 165.00,
    marketShare: 3.45,
    visitorsRange: '40万~70万',
    paidUsersRange: '3万~8万',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '上海',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-25',
    listingTime: '2024-10-12',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=1',
    material: '环保PP+TPE',
    usagePrice: 168.00,
    maxPrice: 325.00,
    starCustomerPrice: 165.00,
    dailySales: 180,
    isBillionSubsidy: true,
    isBlackLabel: true
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
    secondaryCategory: '卫浴/置物',
    date: '2026-03-05',
    listingTime: '2024-11-05',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=2',
    material: '加厚塑料',
    usagePrice: 59.90,
    maxPrice: 128.00,
    starCustomerPrice: 65.00,
    dailySales: 350,
    isBillionSubsidy: false,
    isBlackLabel: false
  },
  {
    id: '2-v2',
    productName: '泡澡桶折叠大人家用洗澡桶儿...',
    productImage: 'https://picsum.photos/seed/p2/100/100',
    shopName: '益伟家居旗舰店',
    shopIcon: 'https://picsum.photos/seed/s2/40/40',
    rank: 2,
    sales: 225.50,
    salesYoY: 145.20,
    salesMoM: 110.30,
    unitPrice: 65.00,
    marketShare: 2.45,
    visitorsRange: '18万~35万',
    paidUsersRange: '2万~6万',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '浙江金华',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-15',
    listingTime: '2024-11-05',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=2',
    material: '加厚塑料',
    usagePrice: 62.50,
    maxPrice: 135.00,
    starCustomerPrice: 65.00,
    dailySales: 380,
    isBillionSubsidy: false,
    isBlackLabel: false
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
    secondaryCategory: '卫浴/置物',
    date: '2026-03-18',
    listingTime: '2024-09-20',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=3',
    material: '优质PP',
    usagePrice: 149.00,
    maxPrice: 268.00,
    starCustomerPrice: 165.00,
    dailySales: 85,
    isBillionSubsidy: true,
    isBlackLabel: false
  },
  {
    id: '3-v2',
    productName: '泡澡桶折叠大人全身浴缸成人...',
    productImage: 'https://picsum.photos/seed/p3/100/100',
    shopName: '格威索旗舰店',
    shopIcon: 'https://picsum.photos/seed/s3/40/40',
    rank: 3,
    sales: 92.50,
    salesYoY: -48.20,
    salesMoM: -22.10,
    unitPrice: 165.00,
    marketShare: 1.05,
    visitorsRange: '17万~32万',
    paidUsersRange: '2,000 ~ 6,000',
    uvValue: '--',
    conversionRate: '--',
    customerPrice: '--',
    shopType: '天猫',
    shippingLocation: '浙江金华',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-25',
    listingTime: '2024-09-20',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=3',
    material: '优质PP',
    usagePrice: 155.00,
    maxPrice: 285.00,
    starCustomerPrice: 165.00,
    dailySales: 110,
    isBillionSubsidy: true,
    isBlackLabel: false
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
    secondaryCategory: '卫浴/置物',
    date: '2026-03-22',
    listingTime: '2024-12-01',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=4',
    material: '环保TPE',
    usagePrice: 199.00,
    maxPrice: 358.00,
    starCustomerPrice: 225.00,
    dailySales: 45,
    isBillionSubsidy: false,
    isBlackLabel: true
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
    shopType: '拼多多',
    shippingLocation: '浙江杭州',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-10',
    listingTime: '2026-01-15',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=5',
    material: 'PVC',
    usagePrice: 488.00,
    maxPrice: 888.00,
    starCustomerPrice: 505.00,
    dailySales: 210,
    isBillionSubsidy: true,
    isBlackLabel: true
  },
  {
    id: '5-v2',
    productName: 'lalapercare/娜拉之夏自动充气...',
    productImage: 'https://picsum.photos/seed/p5/100/100',
    shopName: '娜拉之夏旗舰店',
    shopIcon: 'https://picsum.photos/seed/s5/40/40',
    rank: 5,
    sales: 72.15,
    salesYoY: -28.50,
    salesMoM: -65.10,
    unitPrice: 505.00,
    marketShare: 0.78,
    visitorsRange: '32万~62万',
    paidUsersRange: '2,000 ~ 6,000',
    uvValue: '4.10 ~ 7.20',
    conversionRate: '0.85% ~ 1.50%',
    customerPrice: '502.50 ~ 522.00',
    shopType: '拼多多',
    shippingLocation: '浙江杭州',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-15',
    listingTime: '2026-01-15',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=5',
    material: 'PVC',
    usagePrice: 495.00,
    maxPrice: 895.00,
    starCustomerPrice: 505.00,
    dailySales: 245,
    isBillionSubsidy: true,
    isBlackLabel: true
  },
  {
    id: '5-v3',
    productName: 'lalapercare/娜拉之夏自动充气...',
    productImage: 'https://picsum.photos/seed/p5/100/100',
    shopName: '娜拉之夏旗舰店',
    shopIcon: 'https://picsum.photos/seed/s5/40/40',
    rank: 5,
    sales: 78.90,
    salesYoY: -22.30,
    salesMoM: -58.40,
    unitPrice: 505.00,
    marketShare: 0.85,
    visitorsRange: '35万~65万',
    paidUsersRange: '3,000 ~ 7,000',
    uvValue: '4.50 ~ 7.80',
    conversionRate: '0.95% ~ 1.70%',
    customerPrice: '505.00 ~ 525.00',
    shopType: '拼多多',
    shippingLocation: '浙江杭州',
    secondaryCategory: '卫浴/置物',
    date: '2026-03-20',
    listingTime: '2026-01-15',
    link: 'https://mobile.yangkeduo.com/goods.html?goods_id=5',
    material: 'PVC',
    usagePrice: 505.00,
    maxPrice: 910.00,
    starCustomerPrice: 505.00,
    dailySales: 280,
    isBillionSubsidy: true,
    isBlackLabel: true
  },
  ...Array.from({ length: 150 }).map((_, i) => {
    const id = (i + 6).toString();
    const shopNames = ['优品家居馆', '生活美学社', '居家达人', '萌宝玩具城', '酷玩户外', '吱凡旗舰店', '益伟家居旗舰店', '格威索旗舰店', '灰狐卫浴旗舰店', '娜拉之夏旗舰店'];
    const categories = ['卫浴/置物', '戏水玩具', '婴儿游泳池', '充气玩具', '收纳/清洁'];
    const materials = ['环保PP+TPE', '加厚塑料', '优质PP', '环保TPE', 'PVC', '不锈钢', '实木'];
    const locations = ['上海', '浙江金华', '浙江杭州', '广东广州', '广东深圳', '江苏苏州', '北京'];
    const shopType = i % 3 === 0 ? '拼多多' : (i % 3 === 1 ? '天猫' : '京东');
    const randomDay = Math.floor(Math.random() * 31) + 1;
    const date = `2026-03-${randomDay.toString().padStart(2, '0')}`;
    
    return {
      id,
      productName: `热销商品_${id}号_${categories[i % categories.length]}`,
      productImage: `https://picsum.photos/seed/p${id}/100/100`,
      shopName: shopNames[i % shopNames.length],
      shopIcon: `https://picsum.photos/seed/s${id}/40/40`,
      rank: i + 6,
      sales: parseFloat((Math.random() * 100 + 10).toFixed(2)),
      salesYoY: parseFloat((Math.random() * 100 - 50).toFixed(2)),
      salesMoM: parseFloat((Math.random() * 100 - 50).toFixed(2)),
      unitPrice: Math.floor(Math.random() * 400 + 50),
      marketShare: parseFloat((Math.random() * 2).toFixed(2)),
      visitorsRange: '5万~15万',
      paidUsersRange: '1,000 ~ 5,000',
      uvValue: '2.5 ~ 5.0',
      conversionRate: '1.5% ~ 3.0%',
      customerPrice: '150 ~ 200',
      shopType,
      shippingLocation: locations[i % locations.length],
      secondaryCategory: categories[i % categories.length],
      date,
      listingTime: `2024-${(i % 12 + 1).toString().padStart(2, '0')}-${(i % 28 + 1).toString().padStart(2, '0')}`,
      link: i % 10 === 0 ? `https://mobile.yangkeduo.com/goods.html?goods_id=${(i % 5 + 1)}` : `https://mobile.yangkeduo.com/goods.html?goods_id=${id}`,
      material: materials[i % materials.length],
      usagePrice: Math.floor(Math.random() * 300 + 40),
      maxPrice: Math.floor(Math.random() * 500 + 100),
      starCustomerPrice: Math.floor(Math.random() * 400 + 50),
      dailySales: Math.floor(Math.random() * 500),
      isBillionSubsidy: i % 4 === 0,
      isBlackLabel: i % 5 === 0
    };
  })
];

interface CategoryNode {
  name: string;
  children?: CategoryNode[];
}

const CATEGORY_TREE: CategoryNode[] = [
  {
    name: '玩具',
    children: [
      {
        name: '运动、休闲、传统玩具',
        children: [
          { name: '戏水玩具' },
          { name: '婴儿游泳池' }
        ]
      },
      {
        name: '充气玩具',
        children: []
      }
    ]
  },
  { name: '运动户外', children: [] },
  { name: '收纳清洁用具', children: [] },
  { name: '家纺家饰', children: [] },
  { name: '家装建材', children: [] },
  { name: '居家日用', children: [] },
  { name: '宠物及园艺', children: [] },
];

function CategorySelector({ value, onChange, categories }: { value: string[]; onChange: (val: string[]) => void; categories: CategoryNode[] }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [activeL1, setActiveL1] = React.useState<CategoryNode | null>(null);
  const [activeL2, setActiveL2] = React.useState<CategoryNode | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    if (name === '全部类目') {
      onChange(['全部类目']);
    } else {
      const newValue = value.filter(v => v !== '全部类目');
      if (newValue.includes(name)) {
        const filtered = newValue.filter(v => v !== name);
        onChange(filtered.length === 0 ? ['全部类目'] : filtered);
      } else {
        onChange([...newValue, name]);
      }
    }
  };

  const filteredResults = React.useMemo(() => {
    if (!searchText) return [];
    const results: string[] = [];
    const traverse = (node: CategoryNode, path: string[]) => {
      const currentPath = [...path, node.name];
      if (node.name.includes(searchText)) {
        results.push(currentPath.join(' > '));
      }
      node.children?.forEach(child => traverse(child, currentPath));
    };
    categories.forEach(node => traverse(node, []));
    return results;
  }, [searchText, categories]);

  const displayValue = React.useMemo(() => {
    if (value.length === 0 || (value.length === 1 && value[0] === '全部类目')) {
      return '';
    }
    if (value.length <= 2) return value.join(', ');
    return `已选 ${value.length} 个类目`;
  }, [value]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white min-w-[240px]">
        <div className="px-3 py-2 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-500 whitespace-nowrap">类目</div>
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm outline-none placeholder:text-slate-400"
            placeholder={displayValue || "搜索或选择类目"}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          {(searchText || (value.length > 0 && value[0] !== '全部类目')) && (
            <button 
              onClick={() => {
                setSearchText('');
                onChange(['全部类目']);
              }}
              className="absolute right-8 p-1 hover:bg-slate-100 rounded-full"
            >
              <X className="w-3 h-3 text-slate-400" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-slate-400 mr-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 flex overflow-hidden min-w-[600px] h-[320px]"
          >
            {searchText && filteredResults.length > 0 ? (
              <div className="flex-1 overflow-auto p-2">
                <div className="text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">搜索结果</div>
                {filteredResults.map((res, idx) => {
                  const name = res.split(' > ').pop()!;
                  const isSelected = value.includes(name);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(name)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                        isSelected ? 'bg-brand-50 text-brand-600 font-medium' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      {res}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                {/* Level 1 */}
                <div className="w-1/3 border-r border-slate-100 overflow-auto p-2 bg-slate-50/30">
                  <button
                    onClick={() => handleSelect('全部类目')}
                    className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all flex items-center gap-2 mb-1 ${
                      value.includes('全部类目') 
                        ? 'bg-brand-50 text-brand-600 font-medium' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                      value.includes('全部类目') ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                    }`}>
                      {value.includes('全部类目') && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    全部类目
                  </button>
                  <div className="h-px bg-slate-100 my-1 mx-2" />
                  {categories.map((cat) => {
                    const isSelected = value.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        onMouseEnter={() => {
                          setActiveL1(cat);
                          setActiveL2(null);
                        }}
                        onClick={() => !cat.children?.length && handleSelect(cat.name)}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all flex items-center justify-between ${
                          activeL1?.name === cat.name 
                            ? 'bg-brand-50 text-brand-600 font-medium' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {!cat.children?.length && (
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                          )}
                          {cat.name}
                        </div>
                        {cat.children?.length ? <ChevronRight className="w-3 h-3 opacity-50" /> : null}
                      </button>
                    );
                  })}
                </div>

                {/* Level 2 */}
                <div className="w-1/3 border-r border-slate-100 overflow-auto p-2">
                  {activeL1?.children?.map((cat) => {
                    const isSelected = value.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        onMouseEnter={() => setActiveL2(cat)}
                        onClick={() => !cat.children?.length && handleSelect(cat.name)}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all flex items-center justify-between ${
                          activeL2?.name === cat.name 
                            ? 'bg-brand-50 text-brand-600 font-medium' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {!cat.children?.length && (
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                          )}
                          {cat.name}
                        </div>
                        {cat.children?.length ? <ChevronRight className="w-3 h-3 opacity-50" /> : null}
                      </button>
                    );
                  })}
                </div>

                {/* Level 3 */}
                <div className="w-1/3 overflow-auto p-2">
                  {activeL2?.children?.map((cat) => {
                    const isSelected = value.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleSelect(cat.name)}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all flex items-center gap-2 ${
                          isSelected ? 'bg-brand-600 text-white shadow-md shadow-brand-200' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-600'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-white border-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-brand-600" />}
                        </div>
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryManagementModal({ 
  isOpen, 
  onClose, 
  categories, 
  onUpdate 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  categories: CategoryNode[]; 
  onUpdate: (newCats: CategoryNode[]) => void 
}) {
  const [activeL1Idx, setActiveL1Idx] = useState<number | null>(null);
  const [activeL2Idx, setActiveL2Idx] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState('');

  if (!isOpen) return null;

  const handleAddL1 = () => {
    if (!newItemName) return;
    onUpdate([...categories, { name: newItemName, children: [] }]);
    setNewItemName('');
  };

  const handleAddL2 = () => {
    if (!newItemName || activeL1Idx === null) return;
    const newCats = [...categories];
    const parent = newCats[activeL1Idx];
    parent.children = [...(parent.children || []), { name: newItemName, children: [] }];
    onUpdate(newCats);
    setNewItemName('');
  };

  const handleAddL3 = () => {
    if (!newItemName || activeL1Idx === null || activeL2Idx === null) return;
    const newCats = [...categories];
    const l1 = newCats[activeL1Idx];
    const l2 = l1.children![activeL2Idx];
    l2.children = [...(l2.children || []), { name: newItemName }];
    onUpdate(newCats);
    setNewItemName('');
  };

  const handleDelete = (level: 1 | 2 | 3, idx: number) => {
    const newCats = JSON.parse(JSON.stringify(categories));
    if (level === 1) {
      newCats.splice(idx, 1);
      setActiveL1Idx(null);
      setActiveL2Idx(null);
    } else if (level === 2 && activeL1Idx !== null) {
      newCats[activeL1Idx].children.splice(idx, 1);
      setActiveL2Idx(null);
    } else if (level === 3 && activeL1Idx !== null && activeL2Idx !== null) {
      newCats[activeL1Idx].children[activeL2Idx].children.splice(idx, 1);
    }
    onUpdate(newCats);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">类目管理</h2>
            <p className="text-sm text-slate-500 mt-1">手动添加或修改三级类目结构</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden min-h-[500px]">
          {/* Level 1 Management */}
          <div className="w-1/3 border-r border-slate-100 flex flex-col">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">一级类目</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="添加一级类目"
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500/20"
                  value={activeL1Idx === null ? newItemName : ''}
                  onChange={(e) => {
                    setActiveL1Idx(null);
                    setNewItemName(e.target.value);
                  }}
                />
                <button 
                  onClick={handleAddL1}
                  className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2 space-y-1">
              {categories.map((cat, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveL1Idx(idx);
                    setActiveL2Idx(null);
                  }}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    activeL1Idx === idx ? 'bg-brand-50 text-brand-600 shadow-sm' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="text-sm font-medium">{cat.name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(1, idx); }} className="p-1 hover:bg-rose-100 text-rose-500 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level 2 Management */}
          <div className="w-1/3 border-r border-slate-100 flex flex-col">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">二级类目</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={activeL1Idx !== null ? `在 ${categories[activeL1Idx].name} 下添加` : "先选择一级类目"}
                  disabled={activeL1Idx === null}
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-100"
                  value={activeL1Idx !== null && activeL2Idx === null ? newItemName : ''}
                  onChange={(e) => {
                    setActiveL2Idx(null);
                    setNewItemName(e.target.value);
                  }}
                />
                <button 
                  onClick={handleAddL2}
                  disabled={activeL1Idx === null}
                  className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors disabled:bg-slate-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2 space-y-1">
              {activeL1Idx !== null && categories[activeL1Idx].children?.map((cat, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveL2Idx(idx)}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    activeL2Idx === idx ? 'bg-brand-50 text-brand-600 shadow-sm' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="text-sm font-medium">{cat.name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(2, idx); }} className="p-1 hover:bg-rose-100 text-rose-500 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 Management */}
          <div className="w-1/3 flex flex-col">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">三级类目</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={activeL2Idx !== null ? `在 ${categories[activeL1Idx!].children![activeL2Idx].name} 下添加` : "先选择二级类目"}
                  disabled={activeL2Idx === null}
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-100"
                  value={activeL2Idx !== null ? newItemName : ''}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <button 
                  onClick={handleAddL3}
                  disabled={activeL2Idx === null}
                  className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors disabled:bg-slate-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2 space-y-1">
              {activeL1Idx !== null && activeL2Idx !== null && categories[activeL1Idx].children![activeL2Idx].children?.map((cat, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-all"
                >
                  <span className="text-sm font-medium">{cat.name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(3, idx)} className="p-1 hover:bg-rose-100 text-rose-500 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
          >
            完成管理
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CustomDatePicker({ 
  value, 
  onChange, 
  onClose 
}: { 
  value: string; 
  onChange: (date: string) => void; 
  onClose: () => void 
}) {
  const [viewDate, setViewDate] = useState(() => {
    const dates = value.split(' ~ ');
    return dates[0] ? new Date(dates[0]) : new Date();
  });
  
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const dates = value.split(' ~ ');
    return dates[0] ? new Date(dates[0]) : null;
  });
  
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const dates = value.split(' ~ ');
    return dates[1] ? new Date(dates[1]) : null;
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  
  // Adjust firstDayOfMonth to start from Monday (1) to Sunday (0 -> 7)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonthDays = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // Previous month days
  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true
    });
  }
  
  // Next month days
  const remainingSlots = 42 - days.length;
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({
      day: i,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false
    });
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const formatDate = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const isSelected = (y: number, m: number, d: number) => {
    const date = new Date(y, m, d);
    return (startDate && date.getTime() === startDate.getTime()) || 
           (endDate && date.getTime() === endDate.getTime());
  };

  const isInRange = (y: number, m: number, d: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(y, m, d);
    return date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime();
  };

  const handleDateClick = (y: number, m: number, d: number) => {
    const clickedDate = new Date(y, m, d);
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onChange(`${formatDate(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())} ~ ${formatDate(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())}`);
    } else if (startDate) {
      onChange(formatDate(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xl p-4 w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
          <span className="text-sm font-bold text-slate-800">{year}年{String(month + 1).padStart(2, '0')}月</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 rounded transition-colors">
            <ArrowUpRight className="w-4 h-4 text-slate-400 -rotate-45" />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 rounded transition-colors">
            <ArrowDownRight className="w-4 h-4 text-slate-400 rotate-45" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['一', '二', '三', '四', '五', '六', '日'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, idx) => {
          const active = isSelected(d.year, d.month, d.day);
          const inRange = isInRange(d.year, d.month, d.day);
          const isToday = formatDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) === formatDate(d.year, d.month, d.day);
          
          return (
            <button
              key={idx}
              onClick={() => handleDateClick(d.year, d.month, d.day)}
              className={`
                h-8 w-8 flex items-center justify-center text-xs rounded-lg transition-all relative
                ${d.isCurrentMonth ? 'text-slate-700' : 'text-slate-300'}
                ${active ? 'bg-brand-600 text-white font-bold shadow-lg shadow-brand-200' : inRange ? 'bg-brand-50 text-brand-600' : 'hover:bg-slate-100'}
                ${isToday && !active ? 'text-brand-600 font-bold' : ''}
              `}
            >
              {d.day}
              {isToday && !active && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <button 
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            onChange('');
            onClose();
          }}
          className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
        >
          清除
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const today = new Date();
              setStartDate(today);
              setEndDate(null);
              onChange(formatDate(today.getFullYear(), today.getMonth(), today.getDate()));
              onClose();
            }}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            今天
          </button>
          <button 
            onClick={() => {
              handleConfirm();
              onClose();
            }}
            className="px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-lg hover:bg-brand-700 transition-all"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

export function CompetitorAnalysis() {
  const [selectedYear, setSelectedYear] = useState('2026年');
  const [selectedMonth, setSelectedMonth] = useState('03月');
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['全部类目']);
  const [selectedPlatform, setSelectedPlatform] = useState('平台');
  const [timeRangeType, setTimeRangeType] = useState('自定义');
  const [startDate, setStartDate] = useState('2026-03-14');
  const [endDate, setEndDate] = useState('2026-03-21');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<CategoryNode[]>(CATEGORY_TREE);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState('全部');
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string[]>(['全部']);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [isShopFilterOpen, setIsShopFilterOpen] = useState(false);
  const [selectedShopFilter, setSelectedShopFilter] = useState<string[]>(['全部']);
  const [shopSearchQuery, setShopSearchQuery] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [pickedDate, setPickedDate] = useState('2026-03-25');
  const [isListingDateFilterOpen, setIsListingDateFilterOpen] = useState(false);
  const [selectedListingDateFilter, setSelectedListingDateFilter] = useState('全部');
  const [isListingDatePickerOpen, setIsListingDatePickerOpen] = useState(false);
  const [pickedListingDate, setPickedListingDate] = useState('2026-03-25');
  const [isMaterialFilterOpen, setIsMaterialFilterOpen] = useState(false);
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string[]>(['全部']);
  const [materialSearchQuery, setMaterialSearchQuery] = useState('');
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [isMaxPriceFilterOpen, setIsMaxPriceFilterOpen] = useState(false);
  const [minMaxPriceFilter, setMinMaxPriceFilter] = useState('');
  const [maxMaxPriceFilter, setMaxMaxPriceFilter] = useState('');
  const [isStarCustomerPriceFilterOpen, setIsStarCustomerPriceFilterOpen] = useState(false);
  const [minStarCustomerPriceFilter, setMinStarCustomerPriceFilter] = useState('');
  const [maxStarCustomerPriceFilter, setMaxStarCustomerPriceFilter] = useState('');
  const [isDailySalesFilterOpen, setIsDailySalesFilterOpen] = useState(false);
  const [minDailySalesFilter, setMinDailySalesFilter] = useState('');
  const [maxDailySalesFilter, setMaxDailySalesFilter] = useState('');
  const [isBillionSubsidyFilterOpen, setIsBillionSubsidyFilterOpen] = useState(false);
  const [billionSubsidyFilter, setBillionSubsidyFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [isBlackLabelFilterOpen, setIsBlackLabelFilterOpen] = useState(false);
  const [blackLabelFilter, setBlackLabelFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [selectedChartField, setSelectedChartField] = useState<'dailySales' | 'usagePrice' | 'maxPrice' | 'starCustomerPrice'>('dailySales');
  const [selectedXAxisField, setSelectedXAxisField] = useState<'date' | 'productName'>('productName');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState('');

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPlatform, 
    searchQuery, 
    selectedDateFilter, 
    pickedDate, 
    selectedCategoryFilter, 
    selectedShopFilter, 
    selectedListingDateFilter, 
    pickedListingDate,
    selectedMaterialFilter,
    minPriceFilter,
    maxPriceFilter,
    minMaxPriceFilter,
    maxMaxPriceFilter,
    minStarCustomerPriceFilter,
    maxStarCustomerPriceFilter,
    minDailySalesFilter,
    maxDailySalesFilter,
    billionSubsidyFilter,
    blackLabelFilter,
    selectedCategory
  ]);

  const toggleSelectAll = () => {
    const currentPageIds = paginatedCompetitors.map(item => item.id);
    const allCurrentPageSelected = currentPageIds.every(id => selectedIds.has(id));
    
    const newSelected = new Set(selectedIds);
    if (allCurrentPageSelected && currentPageIds.length > 0) {
      currentPageIds.forEach(id => newSelected.delete(id));
    } else {
      currentPageIds.forEach(id => newSelected.add(id));
    }
    setSelectedIds(newSelected);
  };

  const selectAllFilteredData = () => {
    if (selectedIds.size === filteredCompetitors.length && filteredCompetitors.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCompetitors.map(item => item.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const dataToExport = selectedIds.size > 0 
      ? filteredCompetitors.filter(item => selectedIds.has(item.id))
      : filteredCompetitors;

    if (dataToExport.length === 0) {
      alert('没有可导出的数据');
      return;
    }

    const defaultName = `竞品分析_${selectedPlatform}_${new Date().toISOString().split('T')[0]}`;
    setExportFileName(defaultName);
    setIsExportModalOpen(true);
  };

  const confirmExport = () => {
    const dataToExport = selectedIds.size > 0 
      ? filteredCompetitors.filter(item => selectedIds.has(item.id))
      : filteredCompetitors;

    const exportData = dataToExport.map((item, index) => ({
      '序号': index + 1,
      '日期': item.date,
      '二级分类': item.secondaryCategory,
      '店铺名称': item.shopName,
      '上架时间': item.listingTime,
      '商品名称': item.productName,
      '商品链接': item.link,
      '商品图片': item.productImage,
      '材质': item.material,
      '露出价': item.usagePrice,
      '最高价': item.maxPrice,
      '预估客单价': item.starCustomerPrice,
      '日销量': item.dailySales,
      '是否百亿': item.isBillionSubsidy ? '是' : '否',
      '是否黑标': item.isBlackLabel ? '是' : '否'
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '竞品分析');
    
    // Ensure filename ends with .xlsx
    const finalFileName = exportFileName.toLowerCase().endsWith('.xlsx') 
      ? exportFileName 
      : `${exportFileName}.xlsx`;
      
    XLSX.writeFile(workbook, finalFileName);
    setIsExportModalOpen(false);
  };

  const dateFilterOptions = ['全部', '指定日期', '昨天', '本周', '上周', '本月', '上月', '今年', '去年'];

  const categoryOptions = useMemo(() => {
    const cats = new Set(MOCK_COMPETITORS.map(item => item.secondaryCategory).filter(Boolean));
    return ['全部', ...Array.from(cats)];
  }, []);

  const filteredCategoryOptions = categoryOptions.filter(cat => 
    cat.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const shopOptions = useMemo(() => {
    const shops = new Set(MOCK_COMPETITORS.map(item => item.shopName).filter(Boolean));
    return ['全部', ...Array.from(shops)];
  }, []);

  const filteredShopOptions = shopOptions.filter(shop => 
    shop.toLowerCase().includes(shopSearchQuery.toLowerCase())
  );

  const materialOptions = useMemo(() => {
    const mats = new Set(MOCK_COMPETITORS.map(item => item.material).filter(Boolean));
    return ['全部', ...Array.from(mats)];
  }, []);

  const filteredMaterialOptions = materialOptions.filter(mat => 
    mat!.toLowerCase().includes(materialSearchQuery.toLowerCase())
  );

  const filteredCompetitors = MOCK_COMPETITORS.filter(item => {
    // 平台筛选
    if (selectedPlatform !== '平台' && selectedPlatform !== '全部平台' && item.shopType !== selectedPlatform) {
      return false;
    }

    // 搜索筛选
    const matchesSearch = !searchQuery || (
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.link && item.link.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.secondaryCategory && item.secondaryCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date && item.date.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.material && item.material.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (!matchesSearch) return false;

    // 日期筛选
    if (selectedDateFilter !== '全部') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const formatDate = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      let startDate = '';
      let endDate = '';

      if (selectedDateFilter === '指定日期') {
        if (pickedDate.includes(' ~ ')) {
          [startDate, endDate] = pickedDate.split(' ~ ');
        } else {
          startDate = endDate = pickedDate;
        }
      } else if (selectedDateFilter === '昨天') {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        startDate = endDate = formatDate(yesterday);
      } else if (selectedDateFilter === '本周') {
        const day = today.getDay() || 7;
        const monday = new Date(today);
        monday.setDate(today.getDate() - day + 1);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        startDate = formatDate(monday);
        endDate = formatDate(sunday);
      } else if (selectedDateFilter === '上周') {
        const day = today.getDay() || 7;
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - day - 6);
        const lastSunday = new Date(lastMonday);
        lastSunday.setDate(lastMonday.getDate() + 6);
        startDate = formatDate(lastMonday);
        endDate = formatDate(lastSunday);
      } else if (selectedDateFilter === '本月') {
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        startDate = formatDate(firstDay);
        endDate = formatDate(lastDay);
      } else if (selectedDateFilter === '上月') {
        const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
        startDate = formatDate(firstDay);
        endDate = formatDate(lastDay);
      } else if (selectedDateFilter === '今年') {
        startDate = `${today.getFullYear()}-01-01`;
        endDate = `${today.getFullYear()}-12-31`;
      } else if (selectedDateFilter === '去年') {
        startDate = `${today.getFullYear() - 1}-01-01`;
        endDate = `${today.getFullYear() - 1}-12-31`;
      }

      if (startDate && endDate) {
        if (item.date! < startDate || item.date! > endDate) return false;
      }
    }

    // 上架时间筛选
    if (selectedListingDateFilter !== '全部') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const formatDate = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      let startDate = '';
      let endDate = '';

      if (selectedListingDateFilter === '指定日期') {
        if (pickedListingDate.includes(' ~ ')) {
          [startDate, endDate] = pickedListingDate.split(' ~ ');
        } else {
          startDate = endDate = pickedListingDate;
        }
      } else if (selectedListingDateFilter === '昨天') {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        startDate = endDate = formatDate(yesterday);
      } else if (selectedListingDateFilter === '本周') {
        // 本周一到本周日
        const day = today.getDay() || 7;
        const monday = new Date(today);
        monday.setDate(today.getDate() - day + 1);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        startDate = formatDate(monday);
        endDate = formatDate(sunday);
      } else if (selectedListingDateFilter === '上周') {
        // 上周一到上周日
        const day = today.getDay() || 7;
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - day - 6);
        const lastSunday = new Date(lastMonday);
        lastSunday.setDate(lastMonday.getDate() + 6);
        startDate = formatDate(lastMonday);
        endDate = formatDate(lastSunday);
      } else if (selectedListingDateFilter === '本月') {
        // 本月1号到今晚最后一天
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        startDate = formatDate(firstDay);
        endDate = formatDate(today);
      } else if (selectedListingDateFilter === '上月') {
        // 上月1号到上月最后一天
        const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
        startDate = formatDate(firstDay);
        endDate = formatDate(lastDay);
      } else if (selectedListingDateFilter === '今年') {
        // 今年1月1日到12月31日
        startDate = `${today.getFullYear()}-01-01`;
        endDate = `${today.getFullYear()}-12-31`;
      } else if (selectedListingDateFilter === '去年') {
        // 去年1月1日到去年12月31日
        startDate = `${today.getFullYear() - 1}-01-01`;
        endDate = `${today.getFullYear() - 1}-12-31`;
      }

      if (startDate && endDate) {
        if (item.listingTime! < startDate || item.listingTime! > endDate) return false;
      }
    }

    // 类目筛选
    if (!selectedCategoryFilter.includes('全部')) {
      if (!selectedCategoryFilter.includes(item.secondaryCategory)) {
        return false;
      }
    }

    // 顶部栏类目筛选
    if (!selectedCategory.includes('全部类目')) {
      if (!selectedCategory.includes(item.secondaryCategory)) {
        return false;
      }
    }

    // 店铺筛选
    if (!selectedShopFilter.includes('全部')) {
      if (!selectedShopFilter.includes(item.shopName)) {
        return false;
      }
    }

    // 材质筛选
    if (!selectedMaterialFilter.includes('全部')) {
      if (!selectedMaterialFilter.includes(item.material || '')) {
        return false;
      }
    }

    // 价格筛选
    if (minPriceFilter !== '') {
      if (item.usagePrice! < parseFloat(minPriceFilter)) return false;
    }
    if (maxPriceFilter !== '') {
      if (item.usagePrice! > parseFloat(maxPriceFilter)) return false;
    }

    // 最高价筛选
    if (minMaxPriceFilter !== '') {
      if (item.maxPrice! < parseFloat(minMaxPriceFilter)) return false;
    }
    if (maxMaxPriceFilter !== '') {
      if (item.maxPrice! > parseFloat(maxMaxPriceFilter)) return false;
    }

    // 预估客单价筛选
    if (minStarCustomerPriceFilter !== '') {
      if (item.starCustomerPrice! < parseFloat(minStarCustomerPriceFilter)) return false;
    }
    if (maxStarCustomerPriceFilter !== '') {
      if (item.starCustomerPrice! > parseFloat(maxStarCustomerPriceFilter)) return false;
    }

    // 日销量筛选
    if (minDailySalesFilter !== '') {
      if (item.dailySales! < parseFloat(minDailySalesFilter)) return false;
    }
    if (maxDailySalesFilter !== '') {
      if (item.dailySales! > parseFloat(maxDailySalesFilter)) return false;
    }

    // 百亿筛选
    if (billionSubsidyFilter !== 'all') {
      const isYes = billionSubsidyFilter === 'yes';
      if (item.isBillionSubsidy !== isYes) return false;
    }

    // 黑标筛选
    if (blackLabelFilter !== 'all') {
      const isYes = blackLabelFilter === 'yes';
      if (item.isBlackLabel !== isYes) return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (searchQuery && (a.link?.includes(searchQuery) || a.productName.includes(searchQuery))) {
      return (a.date || '').localeCompare(b.date || '');
    }
    return b.sales - a.sales;
  });

  const totalPages = Math.ceil(filteredCompetitors.length / pageSize);
  const paginatedCompetitors = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCompetitors.slice(start, start + pageSize);
  }, [filteredCompetitors, currentPage, pageSize]);

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Top Filter Bar */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-10">
              <div className="px-3 py-2 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-500">平台</div>
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 text-sm outline-none bg-white min-w-[120px]"
              >
                <option>全部平台</option>
                <option>天猫</option>
                <option>京东</option>
                <option>拼多多</option>
              </select>
            </div>

            {selectedPlatform === '拼多多' ? (
              <div className="flex items-center gap-2">
                <CategorySelector value={selectedCategory} onChange={setSelectedCategory} categories={categories} />
                <button 
                  onClick={() => setIsCategoryModalOpen(true)}
                  title="类目管理"
                  className="p-2.5 border border-slate-200 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 hover:border-brand-200 transition-all"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-10">
                <select 
                  value={selectedCategory[0]}
                  onChange={(e) => setSelectedCategory([e.target.value])}
                  className="px-3 py-2 text-sm outline-none bg-white min-w-[160px]"
                >
                  <option>全部类目</option>
                  <option>卫浴用品</option>
                  <option>家居百货</option>
                </select>
              </div>
            )}

            {selectedPlatform !== '拼多多' && (
              <div className="flex items-center gap-1">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none bg-white h-10"
                >
                  <option>2026年</option>
                  <option>2025年</option>
                </select>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none bg-white h-10"
                >
                  <option>01月</option>
                  <option>02月</option>
                  <option>03月</option>
                </select>
              </div>
            )}

            {selectedPlatform !== '拼多多' && (
              <>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors">
                    <Play className="w-4 h-4 text-brand-600 fill-brand-600" />
                  </button>
                </div>

                <div className="text-xs text-slate-400">
                  ( 统计时间：2026年3月1日-3月31日 )
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedPlatform !== '拼多多' && (
              <button className="p-2 hover:bg-rose-50 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {selectedPlatform === '拼多多' ? (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 transition-all shadow-md shadow-brand-100">
                <Upload className="w-4 h-4" />
                上传表格
              </button>
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                <Download className="w-4 h-4" />
                导出表格
              </button>
            )}
          </div>
        </div>
      </div>

      <CategoryManagementModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onUpdate={setCategories}
      />

      {/* Main Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar p-4 bg-slate-50/50">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
          {selectedPlatform === '拼多多' && (
            <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                <div className="flex-1 max-w-md relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索标题、店铺、类目、链接、日期或材质..."
                    className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-all"
                      title="清空搜索"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setViewMode(viewMode === 'table' ? 'chart' : 'table')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap"
                >
                  <LineChart className="w-3.5 h-3.5 text-brand-600" />
                  {viewMode === 'table' ? '折线图' : '返回表格'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">共 {filteredCompetitors.length} 条数据</span>
                <div className="h-4 w-[1px] bg-slate-200 mx-2" />
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDateFilter('全部');
                    setSelectedListingDateFilter('全部');
                    setSelectedCategoryFilter('全部');
                    setSelectedShopFilter('全部');
                    setSelectedMaterialFilter('全部');
                    setMinPriceFilter('');
                    setMaxPriceFilter('');
                    setMinMaxPriceFilter('');
                    setMaxMaxPriceFilter('');
                    setMinStarCustomerPriceFilter('');
                    setMaxStarCustomerPriceFilter('');
                    setMinDailySalesFilter('');
                    setMaxDailySalesFilter('');
                    setBillionSubsidyFilter('all');
                    setBlackLabelFilter('all');
                    setCategorySearchQuery('');
                    setShopSearchQuery('');
                    setMaterialSearchQuery('');
                    setPickedDate('2026-03-25');
                    setPickedListingDate('2026-03-25');
                  }}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  重置筛选
                </button>
              </div>
            </div>
          )}
          
          {viewMode === 'chart' ? (
            <div className="flex-1 p-8 bg-slate-50 flex flex-col gap-6 overflow-auto">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-brand-600" />
                      {selectedPlatform === '拼多多' ? '销售趋势看版' : (
                        selectedChartField === 'dailySales' ? '销量趋势分析' : 
                        selectedChartField === 'usagePrice' ? '价格分布分析 (露出价)' :
                        selectedChartField === 'maxPrice' ? '价格分布分析 (最高价)' : '客单价分析'
                      )}
                      {selectedPlatform !== '拼多多' && <span className="text-sm font-normal text-slate-400 ml-2">(Top 10 竞品)</span>}
                      {selectedPlatform === '拼多多' && <span className="text-sm font-normal text-slate-400 ml-2">(样本量: {filteredCompetitors.length})</span>}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {selectedChartField === 'dailySales' ? '基于当前筛选条件的竞品日销量对比' : 
                       '基于当前筛选条件的竞品价格数据对比'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">纵轴字段:</span>
                        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                          {[
                            { id: 'dailySales', label: '日销量' },
                            { id: 'usagePrice', label: '露出价' },
                            { id: 'maxPrice', label: '最高价' },
                            { id: 'starCustomerPrice', label: '预估客单价' }
                          ].map((field) => (
                            <button
                              key={field.id}
                              onClick={() => setSelectedChartField(field.id as any)}
                              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                selectedChartField === field.id 
                                  ? 'bg-white text-brand-600 shadow-sm' 
                                  : 'text-slate-500 hover:text-slate-700'
                              }`}
                            >
                              {field.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">横轴字段:</span>
                        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                          {[
                            { id: 'productName', label: '商品名称' },
                            { id: 'date', label: '日期' }
                          ].map((field) => (
                            <button
                              key={field.id}
                              onClick={() => setSelectedXAxisField(field.id as any)}
                              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                selectedXAxisField === field.id 
                                  ? 'bg-white text-brand-600 shadow-sm' 
                                  : 'text-slate-500 hover:text-slate-700'
                              }`}
                            >
                              {field.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setViewMode('table')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-bold transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        返回表格
                      </button>
                      <button 
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-slate-200"
                      >
                        <Download className="w-4 h-4" />
                        保存为图片
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="h-[700px] w-full bg-white rounded-xl border border-slate-100 p-6 flex flex-col">
                  {filteredCompetitors.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={(selectedPlatform === '拼多多' ? filteredCompetitors : filteredCompetitors.slice(0, 10)).map(item => ({
                          name: selectedXAxisField === 'date' 
                            ? item.date 
                            : (item.productName.length > 10 ? item.productName.substring(0, 10) + '...' : item.productName),
                          value: item[selectedChartField],
                          fullName: `${item.productName} (${item.date})`
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={
                              selectedChartField === 'dailySales' ? '#5146f0' : 
                              selectedChartField === 'usagePrice' ? '#10b981' :
                              selectedChartField === 'maxPrice' ? '#f59e0b' : '#ec4899'
                            } stopOpacity={0.1}/>
                            <stop offset="95%" stopColor={
                              selectedChartField === 'dailySales' ? '#5146f0' : 
                              selectedChartField === 'usagePrice' ? '#10b981' :
                              selectedChartField === 'maxPrice' ? '#f59e0b' : '#ec4899'
                            } stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="name" 
                          angle={-90} 
                          textAnchor="end" 
                          interval={0}
                          height={120}
                          tickMargin={20}
                          tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                          axisLine={{ stroke: '#e2e8f0' }}
                          tickFormatter={(value) => selectedChartField === 'dailySales' ? value : `¥${value}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                          labelStyle={{ fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}
                          formatter={(value: any) => [
                            `${selectedChartField === 'dailySales' ? '' : '¥'}${value}${selectedChartField === 'dailySales' ? ' 件' : ''}`, 
                            selectedChartField === 'dailySales' ? '日销量' : 
                            selectedChartField === 'usagePrice' ? '露出价' :
                            selectedChartField === 'maxPrice' ? '最高价' : '预估客单价'
                          ]}
                          labelFormatter={(label, payload) => {
                            if (payload && payload[0]) {
                              return payload[0].payload.fullName;
                            }
                            return label;
                          }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          align="right"
                          height={36}
                          iconType="circle"
                          wrapperStyle={{ paddingTop: '0', paddingBottom: '20px' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name={
                            selectedChartField === 'dailySales' ? '日销量' : 
                            selectedChartField === 'usagePrice' ? '露出价' :
                            selectedChartField === 'maxPrice' ? '最高价' : '预估客单价'
                          }
                          stroke={
                            selectedChartField === 'dailySales' ? '#5146f0' : 
                            selectedChartField === 'usagePrice' ? '#10b981' :
                            selectedChartField === 'maxPrice' ? '#f59e0b' : '#ec4899'
                          }
                          strokeWidth={4}
                          dot={{ r: 5, fill: '#fff', strokeWidth: 3, stroke: selectedChartField === 'dailySales' ? '#5146f0' : selectedChartField === 'usagePrice' ? '#10b981' : selectedChartField === 'maxPrice' ? '#f59e0b' : '#ec4899' }}
                          activeDot={{ r: 8, strokeWidth: 0 }}
                          label={{ 
                            position: 'top', 
                            fill: '#64748b', 
                            fontSize: 10, 
                            fontWeight: 600, 
                            offset: 10,
                            formatter: (value: any) => selectedChartField === 'dailySales' ? value : `¥${value}`
                          }}
                          animationDuration={1500}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-sm font-medium">未找到匹配的数据，请调整筛选条件</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-brand-500" />
                      <span className="text-xs text-slate-500">数据更新时间: 2026-03-25</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs text-slate-500">样本量: {filteredCompetitors.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
                <tr>
                  {selectedPlatform === '拼多多' ? (
                    <>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                            checked={paginatedCompetitors.length > 0 && paginatedCompetitors.every(item => selectedIds.has(item.id))}
                            onChange={toggleSelectAll}
                          />
                          <span>序号</span>
                        </div>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>日期</span>
                            <button 
                              onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isDateFilterOpen || selectedDateFilter !== '全部' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {selectedDateFilter !== '全部' && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {selectedDateFilter === '指定日期' ? pickedDate : selectedDateFilter}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDateFilter('全部');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isDateFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsDateFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-4 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="py-1">
                                  {dateFilterOptions.map((option) => (
                                    <button
                                      key={option}
                                      onClick={() => {
                                        if (option === '指定日期') {
                                          setIsDatePickerOpen(true);
                                        } else {
                                          setSelectedDateFilter(option);
                                        }
                                        setIsDateFilterOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition-colors ${
                                        selectedDateFilter === option ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-600'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {isDatePickerOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-[60]" 
                                onClick={() => setIsDatePickerOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute top-full left-4 mt-1 z-[70]"
                              >
                                <CustomDatePicker 
                                  value={pickedDate}
                                  onChange={(date) => {
                                    setPickedDate(date);
                                    setSelectedDateFilter('指定日期');
                                    setIsDatePickerOpen(false);
                                  }}
                                  onClose={() => setIsDatePickerOpen(false)}
                                />
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>类目</span>
                            <button 
                              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isCategoryFilterOpen || !selectedCategoryFilter.includes('全部') ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {!selectedCategoryFilter.includes('全部') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {selectedCategoryFilter.length === 1 ? selectedCategoryFilter[0] : `已选 ${selectedCategoryFilter.length} 个`}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCategoryFilter(['全部']);
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isCategoryFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsCategoryFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-4 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="p-2 border-b border-slate-100">
                                  <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                    <input 
                                      type="text"
                                      placeholder="搜索类目..."
                                      className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                      value={categorySearchQuery}
                                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                                      autoFocus
                                    />
                                  </div>
                                </div>
                                <div className="max-h-48 overflow-y-auto py-1 custom-scrollbar">
                                  {filteredCategoryOptions.length > 0 ? (
                                    filteredCategoryOptions.map((option) => (
                                      <div
                                        key={option}
                                        onClick={() => {
                                          if (option === '全部') {
                                            setSelectedCategoryFilter(['全部']);
                                          } else {
                                            const newFilters = selectedCategoryFilter.filter(f => f !== '全部');
                                            if (newFilters.includes(option)) {
                                              const filtered = newFilters.filter(f => f !== option);
                                              setSelectedCategoryFilter(filtered.length === 0 ? ['全部'] : filtered);
                                            } else {
                                              setSelectedCategoryFilter([...newFilters, option]);
                                            }
                                          }
                                        }}
                                        className={`w-full text-left px-4 py-2 text-[10px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2 ${
                                          selectedCategoryFilter.includes(option) ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-600'
                                        }`}
                                      >
                                        <div className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${
                                          selectedCategoryFilter.includes(option) ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                                        }`}>
                                          {selectedCategoryFilter.includes(option) && <Check className="w-2 h-2 text-white" />}
                                        </div>
                                        {option}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-4 py-3 text-[10px] text-slate-400 text-center">未找到类目</div>
                                  )}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>店铺名称</span>
                            <button 
                              onClick={() => setIsShopFilterOpen(!isShopFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isShopFilterOpen || !selectedShopFilter.includes('全部') ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {!selectedShopFilter.includes('全部') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {selectedShopFilter.length === 1 ? selectedShopFilter[0] : `已选 ${selectedShopFilter.length} 个`}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedShopFilter(['全部']);
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isShopFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsShopFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-4 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="p-2 border-b border-slate-100">
                                  <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                    <input 
                                      type="text"
                                      placeholder="搜索店铺..."
                                      className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                      value={shopSearchQuery}
                                      onChange={(e) => setShopSearchQuery(e.target.value)}
                                      autoFocus
                                    />
                                  </div>
                                </div>
                                <div className="max-h-48 overflow-y-auto py-1 custom-scrollbar">
                                  {filteredShopOptions.length > 0 ? (
                                    filteredShopOptions.map((option) => (
                                      <div
                                        key={option}
                                        onClick={() => {
                                          if (option === '全部') {
                                            setSelectedShopFilter(['全部']);
                                          } else {
                                            const newFilters = selectedShopFilter.filter(f => f !== '全部');
                                            if (newFilters.includes(option)) {
                                              const filtered = newFilters.filter(f => f !== option);
                                              setSelectedShopFilter(filtered.length === 0 ? ['全部'] : filtered);
                                            } else {
                                              setSelectedShopFilter([...newFilters, option]);
                                            }
                                          }
                                        }}
                                        className={`w-full text-left px-4 py-2 text-[10px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2 ${
                                          selectedShopFilter.includes(option) ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-600'
                                        }`}
                                      >
                                        <div className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${
                                          selectedShopFilter.includes(option) ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                                        }`}>
                                          {selectedShopFilter.includes(option) && <Check className="w-2 h-2 text-white" />}
                                        </div>
                                        {option}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-4 py-3 text-[10px] text-slate-400 text-center">未找到店铺</div>
                                  )}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>上架时间</span>
                            <button 
                              onClick={() => setIsListingDateFilterOpen(!isListingDateFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isListingDateFilterOpen || selectedListingDateFilter !== '全部' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {selectedListingDateFilter !== '全部' && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {selectedListingDateFilter === '指定日期' ? pickedListingDate : selectedListingDateFilter}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedListingDateFilter('全部');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isListingDateFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsListingDateFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-4 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="py-1">
                                  {dateFilterOptions.map((option) => (
                                    <button
                                      key={option}
                                      onClick={() => {
                                        if (option === '指定日期') {
                                          setIsListingDatePickerOpen(true);
                                        } else {
                                          setSelectedListingDateFilter(option);
                                        }
                                        setIsListingDateFilterOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition-colors ${
                                        selectedListingDateFilter === option ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-600'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {isListingDatePickerOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-[60]" 
                                onClick={() => setIsListingDatePickerOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute top-full left-4 mt-1 z-[70]"
                              >
                                <CustomDatePicker 
                                  value={pickedListingDate}
                                  onChange={(date) => {
                                    setPickedListingDate(date);
                                    setSelectedListingDateFilter('指定日期');
                                    setIsListingDatePickerOpen(false);
                                  }}
                                  onClose={() => setIsListingDatePickerOpen(false)}
                                />
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">标题名称</th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">链接</th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">主图</th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>材质</span>
                            <button 
                              onClick={() => setIsMaterialFilterOpen(!isMaterialFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isMaterialFilterOpen || !selectedMaterialFilter.includes('全部') ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {!selectedMaterialFilter.includes('全部') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {selectedMaterialFilter.length === 1 ? selectedMaterialFilter[0] : `已选 ${selectedMaterialFilter.length} 个`}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMaterialFilter(['全部']);
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isMaterialFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsMaterialFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-4 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="p-2 border-b border-slate-100">
                                  <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                                    <input 
                                      type="text"
                                      placeholder="搜索材质..."
                                      className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                      value={materialSearchQuery}
                                      onChange={(e) => setMaterialSearchQuery(e.target.value)}
                                      autoFocus
                                    />
                                  </div>
                                </div>
                                <div className="max-h-48 overflow-y-auto py-1 custom-scrollbar">
                                  {filteredMaterialOptions.length > 0 ? (
                                    filteredMaterialOptions.map((option) => (
                                      <div
                                        key={option}
                                        onClick={() => {
                                          if (option === '全部') {
                                            setSelectedMaterialFilter(['全部']);
                                          } else {
                                            const newFilters = selectedMaterialFilter.filter(f => f !== '全部');
                                            if (newFilters.includes(option)) {
                                              const filtered = newFilters.filter(f => f !== option);
                                              setSelectedMaterialFilter(filtered.length === 0 ? ['全部'] : filtered);
                                            } else {
                                              setSelectedMaterialFilter([...newFilters, option]);
                                            }
                                          }
                                        }}
                                        className={`w-full text-left px-4 py-2 text-[10px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2 ${
                                          selectedMaterialFilter.includes(option) ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-600'
                                        }`}
                                      >
                                        <div className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${
                                          selectedMaterialFilter.includes(option) ? 'bg-brand-600 border-brand-600' : 'border-slate-300'
                                        }`}>
                                          {selectedMaterialFilter.includes(option) && <Check className="w-2 h-2 text-white" />}
                                        </div>
                                        {option}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-4 py-3 text-[10px] text-slate-400 text-center">未找到材质</div>
                                  )}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>露出价</span>
                            <button 
                              onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isPriceFilterOpen || minPriceFilter !== '' || maxPriceFilter !== '' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {(minPriceFilter !== '' || maxPriceFilter !== '') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {minPriceFilter || '0'} - {maxPriceFilter || '∞'}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMinPriceFilter('');
                                  setMaxPriceFilter('');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isPriceFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsPriceFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-3"
                              >
                                <div className="text-[10px] font-bold text-slate-500 mb-2">价格区间 (元)</div>
                                <div className="flex items-center gap-2 mb-3">
                                  <input 
                                    type="number"
                                    placeholder="最低"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={minPriceFilter}
                                    onChange={(e) => setMinPriceFilter(e.target.value)}
                                  />
                                  <span className="text-slate-300">-</span>
                                  <input 
                                    type="number"
                                    placeholder="最高"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={maxPriceFilter}
                                    onChange={(e) => setMaxPriceFilter(e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => {
                                      setMinPriceFilter('');
                                      setMaxPriceFilter('');
                                    }}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                                  >
                                    重置
                                  </button>
                                  <button 
                                    onClick={() => setIsPriceFilterOpen(false)}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-all shadow-sm"
                                  >
                                    确定
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>最高价</span>
                            <button 
                              onClick={() => setIsMaxPriceFilterOpen(!isMaxPriceFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isMaxPriceFilterOpen || minMaxPriceFilter !== '' || maxMaxPriceFilter !== '' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {(minMaxPriceFilter !== '' || maxMaxPriceFilter !== '') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {minMaxPriceFilter || '0'} - {maxMaxPriceFilter || '∞'}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMinMaxPriceFilter('');
                                  setMaxMaxPriceFilter('');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isMaxPriceFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsMaxPriceFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-3"
                              >
                                <div className="text-[10px] font-bold text-slate-500 mb-2">价格区间 (元)</div>
                                <div className="flex items-center gap-2 mb-3">
                                  <input 
                                    type="number"
                                    placeholder="最低"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={minMaxPriceFilter}
                                    onChange={(e) => setMinMaxPriceFilter(e.target.value)}
                                  />
                                  <span className="text-slate-300">-</span>
                                  <input 
                                    type="number"
                                    placeholder="最高"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={maxMaxPriceFilter}
                                    onChange={(e) => setMaxMaxPriceFilter(e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => {
                                      setMinMaxPriceFilter('');
                                      setMaxMaxPriceFilter('');
                                    }}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                                  >
                                    重置
                                  </button>
                                  <button 
                                    onClick={() => setIsMaxPriceFilterOpen(false)}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-all shadow-sm"
                                  >
                                    确定
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>预估客单价</span>
                            <button 
                              onClick={() => setIsStarCustomerPriceFilterOpen(!isStarCustomerPriceFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isStarCustomerPriceFilterOpen || minStarCustomerPriceFilter !== '' || maxStarCustomerPriceFilter !== '' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {(minStarCustomerPriceFilter !== '' || maxStarCustomerPriceFilter !== '') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {minStarCustomerPriceFilter || '0'} - {maxStarCustomerPriceFilter || '∞'}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMinStarCustomerPriceFilter('');
                                  setMaxStarCustomerPriceFilter('');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isStarCustomerPriceFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsStarCustomerPriceFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-3"
                              >
                                <div className="text-[10px] font-bold text-slate-500 mb-2">价格区间 (元)</div>
                                <div className="flex items-center gap-2 mb-3">
                                  <input 
                                    type="number"
                                    placeholder="最低"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={minStarCustomerPriceFilter}
                                    onChange={(e) => setMinStarCustomerPriceFilter(e.target.value)}
                                  />
                                  <span className="text-slate-300">-</span>
                                  <input 
                                    type="number"
                                    placeholder="最高"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={maxStarCustomerPriceFilter}
                                    onChange={(e) => setMaxStarCustomerPriceFilter(e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => {
                                      setMinStarCustomerPriceFilter('');
                                      setMaxStarCustomerPriceFilter('');
                                    }}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                                  >
                                    重置
                                  </button>
                                  <button 
                                    onClick={() => setIsStarCustomerPriceFilterOpen(false)}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-all shadow-sm"
                                  >
                                    确定
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>日销量</span>
                            <button 
                              onClick={() => setIsDailySalesFilterOpen(!isDailySalesFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isDailySalesFilterOpen || minDailySalesFilter !== '' || maxDailySalesFilter !== '' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {(minDailySalesFilter !== '' || maxDailySalesFilter !== '') && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {minDailySalesFilter || '0'} - {maxDailySalesFilter || '∞'}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMinDailySalesFilter('');
                                  setMaxDailySalesFilter('');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isDailySalesFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsDailySalesFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-3"
                              >
                                <div className="text-[10px] font-bold text-slate-500 mb-2">销量区间</div>
                                <div className="flex items-center gap-2 mb-3">
                                  <input 
                                    type="number"
                                    placeholder="最低"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={minDailySalesFilter}
                                    onChange={(e) => setMinDailySalesFilter(e.target.value)}
                                  />
                                  <span className="text-slate-300">-</span>
                                  <input 
                                    type="number"
                                    placeholder="最高"
                                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                                    value={maxDailySalesFilter}
                                    onChange={(e) => setMaxDailySalesFilter(e.target.value)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => {
                                      setMinDailySalesFilter('');
                                      setMaxDailySalesFilter('');
                                    }}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                                  >
                                    重置
                                  </button>
                                  <button 
                                    onClick={() => setIsDailySalesFilterOpen(false)}
                                    className="flex-1 py-1.5 text-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-all shadow-sm"
                                  >
                                    确定
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>百亿</span>
                            <button 
                              onClick={() => setIsBillionSubsidyFilterOpen(!isBillionSubsidyFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isBillionSubsidyFilterOpen || billionSubsidyFilter !== 'all' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {billionSubsidyFilter !== 'all' && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {billionSubsidyFilter === 'yes' ? '是' : '否'}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setBillionSubsidyFilter('all');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isBillionSubsidyFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsBillionSubsidyFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                                  <div className="text-[10px] font-bold text-slate-500">百亿筛选</div>
                                </div>
                                <div className="p-1">
                                  <button
                                    onClick={() => {
                                      setBillionSubsidyFilter('all');
                                      setIsBillionSubsidyFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[10px] font-medium rounded-lg transition-colors ${billionSubsidyFilter === 'all' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                  >
                                    全部
                                  </button>
                                  <button
                                    onClick={() => {
                                      setBillionSubsidyFilter('yes');
                                      setIsBillionSubsidyFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[10px] font-medium rounded-lg transition-colors ${billionSubsidyFilter === 'yes' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                  >
                                    是
                                  </button>
                                  <button
                                    onClick={() => {
                                      setBillionSubsidyFilter('no');
                                      setIsBillionSubsidyFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[10px] font-medium rounded-lg transition-colors ${billionSubsidyFilter === 'no' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                  >
                                    否
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                      <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider relative">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span>黑标</span>
                            <button 
                              onClick={() => setIsBlackLabelFilterOpen(!isBlackLabelFilterOpen)}
                              className={`p-1 rounded hover:bg-slate-200 transition-colors ${isBlackLabelFilterOpen || blackLabelFilter !== 'all' ? 'text-brand-600' : 'text-slate-400'}`}
                            >
                              <Filter className="w-3 h-3" />
                            </button>
                          </div>
                          {blackLabelFilter !== 'all' && (
                            <div className="text-[9px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded border border-brand-100 flex items-center gap-1 w-fit normal-case">
                              {blackLabelFilter === 'yes' ? '是' : '否'}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setBlackLabelFilter('all');
                                }}
                                className="hover:bg-brand-100 rounded p-0.5"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <AnimatePresence>
                          {isBlackLabelFilterOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-20" 
                                onClick={() => setIsBlackLabelFilterOpen(false)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full right-0 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden"
                              >
                                <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                                  <div className="text-[10px] font-bold text-slate-500">黑标筛选</div>
                                </div>
                                <div className="p-1">
                                  <button
                                    onClick={() => {
                                      setBlackLabelFilter('all');
                                      setIsBlackLabelFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[10px] font-medium rounded-lg transition-colors ${blackLabelFilter === 'all' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                  >
                                    全部
                                  </button>
                                  <button
                                    onClick={() => {
                                      setBlackLabelFilter('yes');
                                      setIsBlackLabelFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[10px] font-medium rounded-lg transition-colors ${blackLabelFilter === 'yes' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                  >
                                    是
                                  </button>
                                  <button
                                    onClick={() => {
                                      setBlackLabelFilter('no');
                                      setIsBlackLabelFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[10px] font-medium rounded-lg transition-colors ${blackLabelFilter === 'no' ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                  >
                                    否
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="p-4 w-10">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                          checked={paginatedCompetitors.length > 0 && paginatedCompetitors.every(item => selectedIds.has(item.id))}
                          onChange={toggleSelectAll}
                        />
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
                    </>
                  )}
                  {selectedPlatform !== '拼多多' && (
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">操作</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedCompetitors.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedIds.has(item.id) ? 'bg-brand-50/30' : ''}`}>
                    {selectedPlatform === '拼多多' ? (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                              checked={selectedIds.has(item.id)}
                              onChange={() => toggleSelect(item.id)}
                            />
                            <span className="text-xs text-slate-500 font-medium">{(currentPage - 1) * pageSize + index + 1}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-slate-600 whitespace-nowrap">{item.date}</td>
                        <td className="p-4 text-xs text-slate-600 whitespace-nowrap">{item.secondaryCategory}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 min-w-[100px]">
                            <span className="text-xs text-slate-600">{item.shopName}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-slate-600 whitespace-nowrap">{item.listingTime}</td>
                        <td className="p-4">
                          <div className="relative group flex items-center gap-1">
                            <span className="text-xs font-medium text-slate-700 line-clamp-1 leading-relaxed max-w-[150px] block">{item.productName}</span>
                            <button 
                              onClick={() => handleCopy(item.id + '-name', item.productName)}
                              className={`p-1 rounded transition-all ${
                                copiedId === item.id + '-name' 
                                  ? 'text-emerald-500 bg-emerald-50' 
                                  : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100'
                              }`}
                              title="复制标题"
                            >
                              {copiedId === item.id + '-name' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="relative group flex items-center gap-1">
                            <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline truncate max-w-[80px] block">
                              {item.link}
                            </a>
                            <button 
                              onClick={() => handleCopy(item.id, item.link)}
                              className={`p-1 rounded transition-all ${
                                copiedId === item.id 
                                  ? 'text-emerald-500 bg-emerald-50' 
                                  : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100'
                              }`}
                              title="复制链接"
                            >
                              {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-100" referrerPolicy="no-referrer" />
                        </td>
                        <td className="p-4 text-xs text-slate-600">{item.material}</td>
                        <td className="p-4 text-xs font-bold text-slate-800">¥{item.usagePrice?.toFixed(2)}</td>
                        <td className="p-4 text-xs text-slate-600">¥{item.maxPrice?.toFixed(2)}</td>
                        <td className="p-4 text-xs text-slate-600">¥{item.starCustomerPrice?.toFixed(2)}</td>
                        <td className="p-4 text-xs font-bold text-slate-800">{item.dailySales}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded ${item.isBillionSubsidy ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'}`}>
                            {item.isBillionSubsidy ? '是' : '否'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded ${item.isBlackLabel ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {item.isBlackLabel ? '是' : '否'}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                            checked={selectedIds.has(item.id)}
                            onChange={() => toggleSelect(item.id)}
                          />
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
                              <div className="h-full bg-brand-500" style={{ width: `${(item.sales / 300) * 100}%` }}></div>
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
                              <div className="h-full bg-brand-400" style={{ width: `${item.marketShare * 10}%` }}></div>
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
                      </>
                    )}
                    {selectedPlatform !== '拼多多' && (
                      <td className="p-4">
                        <button className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline transition-all">
                          测算
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          {/* Pagination */}
          {filteredCompetitors.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <div className="text-xs text-slate-500">
                共 <span className="font-bold text-slate-700">{filteredCompetitors.length}</span> 条数据，
                展示第 <span className="font-bold text-slate-700">{(currentPage - 1) * pageSize + 1}</span> 到 <span className="font-bold text-slate-700">{Math.min(currentPage * pageSize, filteredCompetitors.length)}</span> 条
                {selectedIds.size > 0 && (
                  <>，已选中 <span className="font-bold text-brand-600">{selectedIds.size}</span> 条</>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum 
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-200' 
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {selectedPlatform === '拼多多' && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
              <button 
                onClick={selectAllFilteredData}
                className={`flex items-center gap-2 px-6 py-2 border rounded-lg text-sm font-bold transition-all shadow-sm ${
                  selectedIds.size === filteredCompetitors.length && filteredCompetitors.length > 0
                    ? 'bg-brand-50 border-brand-200 text-brand-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                全选所有数据
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                导出表格
              </button>
            </div>
          )}

          {/* Export Modal */}
          <AnimatePresence>
            {isExportModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-800">导出数据</h3>
                        <p className="text-xs text-slate-500">设置文件名并导出为 Excel 表格</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsExportModalOpen(false)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">文件名</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={exportFileName}
                          onChange={(e) => setExportFileName(e.target.value)}
                          placeholder="请输入文件名"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all pr-12"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">.xlsx</div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                      <div className="text-amber-500 shrink-0 mt-0.5">
                        <Settings className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-amber-700 leading-relaxed">
                        <span className="font-bold">提示：</span>
                        浏览器将根据您的设置，在下载时弹出位置选择对话框或直接保存到默认下载目录。
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
                    <button 
                      onClick={() => setIsExportModalOpen(false)}
                      className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                    >
                      取消
                    </button>
                    <button 
                      onClick={confirmExport}
                      className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200"
                    >
                      确认导出
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
