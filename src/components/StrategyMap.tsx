import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Download, ChevronDown, Filter, Layers, Search, Users, Briefcase, Tag, Clock, ShieldCheck, Sparkles, X, Wand2, Copy, Check, Lightbulb, Zap, TrendingUp as TrendingUpIcon, Type, Send, ChevronRight, ArrowDownRight, Settings, Plus, Trash2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const CATEGORY_DATA = [
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
  { name: '宠物及园艺', children: [] }
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
  categories: any[];
}

function CategoryFilter({ selectedCategory, onSelect, categories }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeL1, setActiveL1] = useState(categories[0]);
  const [activeL2, setActiveL2] = useState(categories[0]?.children?.[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categories.length > 0) {
      if (!activeL1 || !categories.find(c => c.name === activeL1.name)) {
        setActiveL1(categories[0]);
        setActiveL2(categories[0]?.children?.[0]);
      }
    }
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const results: { path: string; name: string; fullPath: string }[] = [];
    
    categories.forEach(l1 => {
      if (l1.children) {
        l1.children.forEach(l2 => {
          if (l2.children) {
            l2.children.forEach(l3 => {
              if (l3.name.includes(searchQuery) || l2.name.includes(searchQuery) || l1.name.includes(searchQuery)) {
                results.push({
                  path: `${l1.name} > ${l2.name}`,
                  name: l3.name,
                  fullPath: `${l1.name} > ${l2.name} > ${l3.name}`
                });
              }
            });
          }
        });
      }
    });
    return results;
  }, [searchQuery, categories]);

  return (
    <div className="relative" ref={containerRef}>
      <div className={`relative flex items-center bg-white border rounded-xl px-3 py-1.5 min-w-[320px] transition-all ${isOpen ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-[#DCDFE6] hover:border-primary-500'}`}>
        <Search className="w-4 h-4 text-secondary-400 mr-2" />
        <input 
          type="text"
          value={isOpen ? searchQuery : selectedCategory}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            setSearchQuery('');
          }}
          placeholder="搜索类目..."
          className="bg-transparent text-sm text-secondary-700 outline-none w-full"
        />
        <ChevronDown className={`ml-auto w-4 h-4 text-secondary-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute top-full left-0 mt-2 bg-white border border-[#F0F2F5] rounded-2xl shadow-2xl z-[100] flex overflow-hidden ${searchQuery ? 'w-full min-w-[320px] max-h-[380px] flex-col' : 'min-w-[720px] h-[380px]'}`}
          >
            {searchQuery ? (
              <div className="overflow-y-auto p-2">
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelect(result.fullPath);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#F5F7FA] rounded-xl transition-all mb-1 group"
                    >
                      <div className="text-[10px] text-secondary-400 mb-0.5 group-hover:text-primary-400 transition-colors">
                        {result.path}
                      </div>
                      <div className="text-sm text-secondary-700 font-medium group-hover:text-primary-600 transition-colors">
                        {result.name}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-secondary-400 text-sm">
                    未找到相关类目
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Column 1 */}
                <div className="w-1/3 border-r border-[#F0F2F5] overflow-y-auto p-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onMouseEnter={() => {
                        setActiveL1(cat);
                        if (cat.children && cat.children.length > 0) {
                          setActiveL2(cat.children[0]);
                        } else {
                          setActiveL2(null as any);
                        }
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all mb-1 ${
                        activeL1?.name === cat.name 
                          ? 'bg-primary-50 text-primary-600 font-bold' 
                          : 'text-secondary-600 hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="w-1/3 border-r border-[#F0F2F5] overflow-y-auto p-2">
                  {activeL1.children && activeL1.children.map((cat) => (
                    <button
                      key={cat.name}
                      onMouseEnter={() => setActiveL2(cat)}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all mb-1 ${
                        activeL2?.name === cat.name 
                          ? 'bg-primary-50 text-primary-600 font-bold' 
                          : 'text-secondary-600 hover:bg-[#F5F7FA]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Column 3 */}
                <div className="w-1/3 overflow-y-auto p-2">
                  {activeL2?.children?.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        onSelect(`${activeL1.name} > ${activeL2.name} > ${cat.name}`);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all mb-1 ${
                        selectedCategory.includes(cat.name)
                          ? 'bg-primary-600 text-white font-bold shadow-lg shadow-primary-200' 
                          : 'text-secondary-600 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ROOT_WORD_COLUMNS = [
  { title: '品类', key: 'category' },
  { title: '人群', key: 'audience' },
  { title: '场景', key: 'scene' },
  { title: '功能', key: 'function' },
  { title: '使用', key: 'usage' },
  { title: '属性', key: 'attribute' },
  { title: '时间', key: 'time' },
  { title: '背书', key: 'endorsement' },
  { title: '修饰词', key: 'modifier' },
  { title: '品牌', key: 'brand' },
];

const MOCK_ROOT_DATA: Record<string, { name: string; value: string; change: number }[]> = {
  category: [
    { name: '玩具', value: '41,487,918', change: -12.6 },
    { name: '脚桶', value: '29,381,931', change: 5.1 },
    { name: '泡脚桶', value: '25,478,427', change: -19.4 },
    { name: '水枪', value: '22,230,559', change: -7.5 },
    { name: '餐椅', value: '19,873,265', change: -2.6 },
    { name: '泳镜', value: '17,651,651', change: -19.4 },
    { name: '泳圈', value: '12,872,441', change: -5.9 },
    { name: '充气床', value: '9,603,452', change: -7.2 },
    { name: '泳帽', value: '9,126,786', change: -11.5 },
    { name: '洗澡盆', value: '8,077,245', change: -19.1 },
  ],
  audience: [
    { name: '婴儿', value: '38,291,867', change: -57.68 },
    { name: '儿童', value: '36,431,910', change: 42.2 },
    { name: '宝宝', value: '34,909,377', change: -29.1 },
    { name: '成人', value: '5,985,745', change: -8.4 },
    { name: '大人', value: '5,156,959', change: -9.3 },
    { name: '新生', value: '4,749,606', change: -5.9 },
    { name: '一岁', value: '4,074,283', change: -12.6 },
    { name: '幼儿', value: '3,739,412', change: -5.1 },
    { name: '游泳', value: '3,599,275', change: -19.4 },
    { name: '女士', value: '2,262,710', change: -7.5 },
  ],
  scene: [
    { name: '家用', value: '14,625', change: -2.6 },
    { name: '户外', value: '10,413', change: -29.1 },
    { name: '飞机', value: '5,265', change: -5.9 },
    { name: '露营', value: '3,744', change: -7.2 },
    { name: '地铺', value: '2,457', change: -11.5 },
    { name: '水上', value: '2,106', change: -19.1 },
    { name: '旅行', value: '1,755', change: -9.3 },
    { name: '火车', value: '1,404', change: -5.9 },
    { name: '高铁', value: '1,053', change: -12.6 },
    { name: '室内', value: '936', change: -5.1 },
  ],
  function: [
    { name: '充气', value: '24,815,813', change: -42.2 },
    { name: '折叠', value: '14,819,513', change: -29.1 },
    { name: '游泳', value: '12,359,541', change: -8.4 },
    { name: '气垫', value: '6,134,247', change: -9.3 },
    { name: '电动', value: '3,478,247', change: -5.9 },
    { name: '便携', value: '2,626,300', change: -12.6 },
    { name: '防水', value: '2,569,131', change: -5.1 },
    { name: '带轮', value: '2,474,612', change: -19.4 },
    { name: '自动', value: '2,407,341', change: -7.5 },
    { name: '喷水', value: '2,353,504', change: -2.6 },
  ],
  usage: [
    { name: '泡脚', value: '33,168,407', change: -12.4 },
    { name: '游泳', value: '27,201,425', change: -25.9 },
    { name: '泡澡', value: '15,402,878', change: -9.1 },
    { name: '滑雪', value: '5,914,364', change: -142.2 },
    { name: '洗澡', value: '5,791,106', change: -2.6 },
    { name: '拳击', value: '5,760,912', change: -29.1 },
    { name: '洗头', value: '5,634,567', change: -5.9 },
    { name: '洗脚', value: '4,432,530', change: -7.2 },
    { name: '坐浴', value: '3,884,754', change: -11.5 },
    { name: '训练', value: '3,000,835', change: -19.1 },
  ],
  attribute: [
    { name: '材质', value: '18,087,918', change: -9.6 },
    { name: '加厚', value: '14,171,931', change: -15.1 },
    { name: '环保', value: '11,438,427', change: -22.4 },
    { name: '耐磨', value: '9,360,559', change: -5.5 },
    { name: '防滑', value: '9,343,265', change: -12.6 },
    { name: '舒适', value: '7,121,651', change: -29.1 },
    { name: '柔软', value: '5,852,441', change: -15.9 },
    { name: '尺寸', value: '4,923,452', change: -7.2 },
    { name: '颜色', value: '4,446,786', change: -11.5 },
    { name: '大号', value: '3,397,245', change: -19.1 },
  ],
  time: [
    { name: '2025新款', value: '21,597,918', change: -42.6 },
    { name: '夏季', value: '17,681,931', change: -29.1 },
    { name: '冬季', value: '13,778,427', change: -9.4 },
    { name: '四季通用', value: '10,530,559', change: -7.5 },
    { name: '节日', value: '8,173,265', change: -2.6 },
    { name: '生日', value: '5,951,651', change: -29.1 },
    { name: '周年', value: '4,682,441', change: -5.9 },
    { name: '限时', value: '3,753,452', change: -7.2 },
    { name: '全天', value: '3,276,786', change: -11.5 },
    { name: '夜用', value: '2,227,245', change: -19.1 },
  ],
  endorsement: [
    { name: '官方正品', value: '14,577,918', change: -12.6 },
    { name: '厂家直销', value: '11,831,931', change: -19.1 },
    { name: '质量保证', value: '10,268,427', change: -9.4 },
    { name: '售后无忧', value: '8,190,559', change: -7.5 },
    { name: '品牌授权', value: '7,003,265', change: -2.6 },
    { name: '专利产品', value: '4,781,651', change: -29.1 },
    { name: '检测报告', value: '3,512,441', change: -5.9 },
    { name: '明星同款', value: '2,583,452', change: -7.2 },
    { name: '网红推荐', value: '2,106,786', change: -11.5 },
    { name: '出口品质', value: '1,408,245', change: -19.1 },
  ],
  modifier: [
    { name: '爆款', value: '29,787,918', change: -32.6 },
    { name: '热销', value: '23,531,931', change: -19.1 },
    { name: '推荐', value: '18,458,427', change: -9.4 },
    { name: '必备', value: '14,040,559', change: -7.5 },
    { name: '极速发货', value: '11,683,265', change: -2.6 },
    { name: '限时抢购', value: '9,461,651', change: -29.1 },
    { name: '特惠', value: '8,192,441', change: -5.9 },
    { name: '新款', value: '7,263,452', change: -7.2 },
    { name: '包邮', value: '6,786,786', change: -11.5 },
    { name: '秒杀', value: '5,737,245', change: -19.1 },
  ],
  brand: [
    { name: 'stokke', value: '2,930,247', change: -9.3 },
    { name: '卡达', value: '2,899,972', change: -5.9 },
    { name: '哈卡', value: '2,510,681', change: -12.6 },
    { name: 'iuu', value: '1,939,578', change: 5.1 },
    { name: 'kk', value: '1,321,525', change: -19.4 },
    { name: '卡曼', value: '1,213,783', change: -7.5 },
    { name: '迪卡侬', value: '1,043,014', change: -2.6 },
    { name: '肯德基', value: '1,013,933', change: -29.1 },
    { name: '英发', value: '903,029', change: -5.9 },
    { name: '气床', value: '843,738', change: -7.2 },
  ],
};

const KEYWORD_DATABASE_DATA = [
  { rank: 6, term: '推荐餐椅6', index: '142,492', growth: 60.56, ctr: '106.93%', productIndex: '13,823', supplyDemand: '110,046', price: '¥2,748' },
  { rank: 12, term: '推荐餐椅12', index: '139,874', growth: 65.53, ctr: '98.73%', productIndex: '15,710', supplyDemand: '114,033', price: '¥2,563' },
  { rank: 13, term: '推荐游泳池13', index: '100,422', growth: 42.08, ctr: '92.28%', productIndex: '4,952', supplyDemand: '79,103', price: '¥1,908' },
  { rank: 7, term: '推荐游泳池7', index: '88,367', growth: 48.40, ctr: '80.41%', productIndex: '5,341', supplyDemand: '83,775', price: '¥1,903' },
  { rank: 1, term: '推荐游泳池1', index: '79,488', growth: 40.61, ctr: '90.52%', productIndex: '5,282', supplyDemand: '71,233', price: '¥1,925', highlight: true },
  { rank: 3, term: '推荐充气床3', index: '71,499', growth: 3.86, ctr: '82.08%', productIndex: '3,085', supplyDemand: '47,641', price: '¥1,930', highlight: true },
  { rank: 15, term: '推荐充气床15', index: '71,142', growth: 7.60, ctr: '88.80%', productIndex: '2,602', supplyDemand: '43,016', price: '¥2,128' },
  { rank: 9, term: '推荐充气床9', index: '55,854', growth: 4.21, ctr: '84.43%', productIndex: '3,448', supplyDemand: '53,469', price: '¥2,277' },
  { rank: 14, term: '推荐折叠盆14', index: '51,827', growth: 29.33, ctr: '71.24%', productIndex: '2,720', supplyDemand: '37,940', price: '¥1,135' },
  { rank: 2, term: '推荐折叠盆2', index: '51,365', growth: 33.40, ctr: '68.14%', productIndex: '2,571', supplyDemand: '32,102', price: '¥1,254', highlight: true },
  { rank: 8, term: '推荐折叠盆8', index: '50,192', growth: 31.95, ctr: '79.25%', productIndex: '3,333', supplyDemand: '34,618', price: '¥1,275' },
  { rank: 4, term: '推荐婴儿浴盆4', index: '43,399', growth: 14.25, ctr: '94.44%', productIndex: '3,336', supplyDemand: '37,327', price: '¥1,609' },
  { rank: 10, term: '推荐婴儿浴盆10', index: '40,868', growth: 10.64, ctr: '91.19%', productIndex: '3,391', supplyDemand: '28,147', price: '¥1,501' },
  { rank: 11, term: '推荐滑雪圈11', index: '29,963', growth: 144.60, ctr: '71.27%', productIndex: '1,309', supplyDemand: '15,962', price: '¥838' },
  { rank: 5, term: '推荐滑雪圈5', index: '27,899', growth: 141.37, ctr: '70.95%', productIndex: '1,206', supplyDemand: '18,010', price: '¥842' },
];

const TITLE_LIBRARY_DATA = [
  {
    user: '张三',
    avatar: '张',
    time: '2025-03-15 10:30',
    title: '2025新款 婴儿游泳池 充气加厚 厂家直销',
    audience: '宝妈/婴幼儿',
    scene: '水上活动/健身'
  },
  {
    user: '李四',
    avatar: '李',
    time: '2025-03-15 14:20',
    title: '爆款推荐：戏水玩具 | 婴儿 | 折叠 质量保证',
    audience: '宝妈/婴幼儿',
    scene: '日常使用'
  },
  {
    user: '王五',
    avatar: '王',
    time: '2025-03-16 09:15',
    title: '高端定制 充气浮排 水上运动 必备单品',
    audience: '大众人群',
    scene: '日常使用'
  },
  {
    user: '张三',
    avatar: '张',
    time: '2025-03-16 11:05',
    title: '折叠浴桶 婴儿 泡脚 2025新款 特惠',
    audience: '宝妈/婴幼儿',
    scene: '居家保健/放松'
  }
];

interface StrategyMapProps {
  onSendToImageSpace?: (words: string[], category: string) => void;
}

function CategoryManagementModal({ isOpen, onClose, categories, setCategories }: { isOpen: boolean; onClose: () => void; categories: any[]; setCategories: (cats: any[]) => void }) {
  const [activeL1, setActiveL1] = useState(categories[0]);
  const [activeL2, setActiveL2] = useState(categories[0]?.children?.[0]);
  const [newL1Name, setNewL1Name] = useState('');
  const [newL2Name, setNewL2Name] = useState('');
  const [newL3Name, setNewL3Name] = useState('');

  const handleAdd = (level: number) => {
    const updatedCategories = [...categories];
    if (level === 1 && newL1Name.trim()) {
      updatedCategories.push({ name: newL1Name.trim(), children: [] });
      setNewL1Name('');
    } else if (level === 2 && activeL1 && newL2Name.trim()) {
      const l1 = updatedCategories.find(c => c.name === activeL1.name);
      if (l1) {
        l1.children.push({ name: newL2Name.trim(), children: [] });
        setNewL2Name('');
      }
    } else if (level === 3 && activeL2 && newL3Name.trim()) {
      const l1 = updatedCategories.find(c => c.name === activeL1.name);
      if (l1) {
        const l2 = l1.children.find((c: any) => c.name === activeL2.name);
        if (l2) {
          l2.children.push({ name: newL3Name.trim() });
          setNewL3Name('');
        }
      }
    }
    setCategories(updatedCategories);
  };

  const handleDelete = (level: number, name: string) => {
    let updatedCategories = [...categories];
    if (level === 1) {
      updatedCategories = updatedCategories.filter(c => c.name !== name);
      if (activeL1?.name === name) {
        setActiveL1(updatedCategories[0]);
        setActiveL2(updatedCategories[0]?.children?.[0]);
      }
    } else if (level === 2 && activeL1) {
      const l1 = updatedCategories.find(c => c.name === activeL1.name);
      if (l1) {
        l1.children = l1.children.filter((c: any) => c.name !== name);
        if (activeL2?.name === name) {
          setActiveL2(l1.children[0]);
        }
      }
    } else if (level === 3 && activeL2) {
      const l1 = updatedCategories.find(c => c.name === activeL1.name);
      if (l1) {
        const l2 = l1.children.find((c: any) => c.name === activeL2.name);
        if (l2) {
          l2.children = l2.children.filter((c: any) => c.name !== name);
        }
      }
    }
    setCategories(updatedCategories);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-8 py-6 border-b border-[#F0F2F5] flex items-center justify-between bg-[#F5F7FA]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-800">类目管理</h2>
              <p className="text-xs text-secondary-500">管理您的三级类目体系</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-[#F0F2F5]">
            <X className="w-5 h-5 text-secondary-400" />
          </button>
        </div>

        <div className="flex-1 p-8 flex gap-6 overflow-hidden">
          {/* Level 1 */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-secondary-700">一级类目</span>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newL1Name}
                  onChange={(e) => setNewL1Name(e.target.value)}
                  placeholder="新增..."
                  className="w-24 px-2 py-1 text-xs border border-[#DCDFE6] rounded-lg outline-none focus:border-primary-500"
                />
                <button 
                  onClick={() => handleAdd(1)} 
                  disabled={!newL1Name.trim()}
                  className="p-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 border border-[#F0F2F5] rounded-2xl overflow-y-auto p-2 bg-[#F5F7FA]/30">
              {categories.map(cat => (
                <div 
                  key={cat.name}
                  onClick={() => {
                    setActiveL1(cat);
                    setActiveL2(cat.children?.[0]);
                  }}
                  className={`group flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all mb-1 ${activeL1?.name === cat.name ? 'bg-white shadow-sm ring-1 ring-primary-500/10 text-primary-600 font-bold' : 'text-secondary-600 hover:bg-white/50'}`}
                >
                  <span className="text-sm">{cat.name}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(1, cat.name); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-secondary-700">二级类目</span>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newL2Name}
                  onChange={(e) => setNewL2Name(e.target.value)}
                  placeholder="新增..."
                  className="w-24 px-2 py-1 text-xs border border-[#DCDFE6] rounded-lg outline-none focus:border-primary-500"
                />
                <button 
                  onClick={() => handleAdd(2)} 
                  disabled={!newL2Name.trim() || !activeL1}
                  className="p-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 border border-[#F0F2F5] rounded-2xl overflow-y-auto p-2 bg-[#F5F7FA]/30">
              {activeL1?.children?.map((cat: any) => (
                <div 
                  key={cat.name}
                  onClick={() => setActiveL2(cat)}
                  className={`group flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all mb-1 ${activeL2?.name === cat.name ? 'bg-white shadow-sm ring-1 ring-primary-500/10 text-primary-600 font-bold' : 'text-secondary-600 hover:bg-white/50'}`}
                >
                  <span className="text-sm">{cat.name}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(2, cat.name); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-secondary-700">三级类目</span>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newL3Name}
                  onChange={(e) => setNewL3Name(e.target.value)}
                  placeholder="新增..."
                  className="w-24 px-2 py-1 text-xs border border-[#DCDFE6] rounded-lg outline-none focus:border-primary-500"
                />
                <button 
                  onClick={() => handleAdd(3)} 
                  disabled={!newL3Name.trim() || !activeL2}
                  className="p-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 border border-[#F0F2F5] rounded-2xl overflow-y-auto p-2 bg-[#F5F7FA]/30">
              {activeL2?.children?.map((cat: any) => (
                <div 
                  key={cat.name}
                  className="group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all mb-1 text-secondary-600 hover:bg-white/50"
                >
                  <span className="text-sm">{cat.name}</span>
                  <button 
                    onClick={() => handleDelete(3, cat.name)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-[#F0F2F5] bg-[#F5F7FA]/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
          >
            完成管理
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function StrategyMap({ onSendToImageSpace }: StrategyMapProps) {
  const [activeTab, setActiveTab] = useState('词根分析');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('淘系平台');
  const [selectedYear, setSelectedYear] = useState('2026年');
  const [selectedMonth, setSelectedMonth] = useState('1月');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState(CATEGORY_DATA);
  const [sortBy, setSortBy] = useState('搜索人气↓');

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleGenerateTitle = async () => {
    if (selectedWords.length === 0) return;
    setIsGeneratingTitle(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `请根据以下关键词，生成 5 个吸引人的电商产品标题：${selectedWords.join('、')}。要求：简洁有力，突出卖点，符合中文语境。`,
      });
      setGeneratedTitle(response.text || '生成失败');
    } catch (error) {
      console.error('Title generation error:', error);
      setGeneratedTitle('生成失败，请稍后重试');
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTitle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F2F5] p-4 overflow-hidden font-sans">
      {/* Top Filter Bar */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F7FA] rounded-lg border border-[#E4E7ED]">
            <Filter className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-bold text-secondary-700">筛选条件</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-500">平台</span>
              <div className="relative">
                <select 
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="appearance-none bg-white border border-[#DCDFE6] rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-primary-500 transition-all min-w-[100px]"
                >
                  <option>淘系平台</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-500">类目</span>
              <div className="flex items-center gap-2">
                <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} categories={categories} />
                <button 
                  onClick={() => setIsCategoryModalOpen(true)}
                  title="类目管理"
                  className="p-2 border border-[#DCDFE6] rounded-xl text-secondary-400 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-200 transition-all"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-500">时间</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none bg-white border border-[#DCDFE6] rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-primary-500 transition-all min-w-[90px]"
                  >
                    <option>2026年</option>
                    <option>2025年</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none bg-white border border-[#DCDFE6] rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-primary-500 transition-all min-w-[70px]"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option key={i + 1}>{i + 1}月</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#DCDFE6] rounded-lg text-sm font-medium text-secondary-600 hover:bg-[#F5F7FA] transition-all">
            <Upload className="w-4 h-4" />
            <span>上传数据</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            <span>导出报表</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 mb-4 bg-white p-1 rounded-xl shadow-sm w-fit">
        {['词根分析', '关键词数据库', '标题库'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab 
                ? 'bg-primary-50 text-primary-600 shadow-sm' 
                : 'text-secondary-500 hover:text-secondary-700 hover:bg-[#F5F7FA]'
            }`}
          >
            {tab === '词根分析' && <span className="mr-2 inline-block w-2 h-2 bg-primary-600 rounded-full" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Category Management Modal */}
      <CategoryManagementModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        setCategories={setCategories}
      />

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col mb-4">
        {/* Content Header */}
        <div className="px-6 py-4 border-b border-[#F0F2F5] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {activeTab === '标题库' ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100">
                  <Layers className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-secondary-800">标题库</h3>
                  <p className="text-xs text-secondary-400">查看团队已使用的标题及历史记录</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
                <h3 className="text-base font-bold text-secondary-800">
                  {activeTab === '词根分析' ? '词根分析' : '热搜词排行'}
                </h3>
                {activeTab === '关键词数据库' && (
                  <span className="text-[10px] text-secondary-400 font-medium ml-2">共 15 条数据</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeTab === '标题库' ? (
              <div className="relative">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DCDFE6] rounded-lg text-xs font-medium text-secondary-700 min-w-[120px]">
                  <Users className="w-3.5 h-3.5 text-secondary-400" />
                  <span>全部用户</span>
                  <ChevronDown className="ml-auto w-3 h-3 text-secondary-400" />
                </div>
              </div>
            ) : (
              <>
                <span className="text-xs text-secondary-500">排序方式</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#F5F7FA] border border-[#E4E7ED] rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-secondary-700 focus:outline-none min-w-[100px]"
                  >
                    <option>搜索人气↓</option>
                    <option>环比率↓</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-secondary-400 pointer-events-none" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === '词根分析' ? (
            <div className="flex-1 overflow-x-auto custom-scrollbar">
              <div className="min-w-[1400px] h-full flex">
                {ROOT_WORD_COLUMNS.map((col) => {
                  const sortedData = [...(MOCK_ROOT_DATA[col.key] || [])].sort((a, b) => {
                    if (sortBy === '搜索人气↓') {
                      const valA = parseInt(a.value.replace(/,/g, ''));
                      const valB = parseInt(b.value.replace(/,/g, ''));
                      return valB - valA;
                    } else {
                      return b.change - a.change;
                    }
                  });

                  return (
                    <div key={col.key} className="flex-1 border-r border-[#F0F2F5] last:border-r-0 flex flex-col">
                      {/* Column Header */}
                      <div className="px-4 py-3 bg-[#F8FAFC] flex items-center justify-between border-b border-[#F0F2F5]">
                        <span className="text-sm font-bold text-primary-700">{col.title}</span>
                        <span className="text-[10px] text-secondary-400 font-medium">人气/环比</span>
                      </div>
                      {/* Column Rows */}
                      <div className="flex-1 overflow-y-auto py-2">
                        {sortedData.map((item, idx) => {
                          const isSelected = selectedWords.includes(item.name);
                          return (
                            <div 
                              key={idx}
                              onClick={() => toggleWord(item.name)}
                              className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-all hover:bg-primary-50 group ${
                                isSelected ? 'bg-primary-50' : ''
                              }`}
                            >
                              <span className={`text-sm font-medium transition-colors ${
                                isSelected ? 'text-primary-600 font-bold' : 'text-secondary-700 group-hover:text-primary-600'
                              }`}>
                                {item.name}
                              </span>
                              <div className="text-right">
                                <div className="text-[11px] font-bold text-secondary-600 tabular-nums">
                                  {item.value}
                                </div>
                                <div className={`text-[10px] flex items-center justify-end gap-0.5 font-medium ${
                                  item.change > 0 ? 'text-success-600' : 'text-error-600'
                                }`}>
                                  {item.change > 0 ? <TrendingUpIcon className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                                  {Math.abs(item.change)}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === '关键词数据库' ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#F8FAFC] z-10">
                  <tr className="border-b border-[#F0F2F5]">
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        排名 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">搜索词</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        搜索指数 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        搜索增长幅度 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        点击率 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        商品指数 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        供需指数 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">
                      <div className="flex items-center gap-1">
                        包月推广价 <ChevronDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F2F5]">
                  {[...KEYWORD_DATABASE_DATA].sort((a, b) => {
                    if (sortBy === '搜索人气↓') {
                      const valA = parseInt(a.index.replace(/,/g, ''));
                      const valB = parseInt(b.index.replace(/,/g, ''));
                      return valB - valA;
                    } else {
                      return b.growth - a.growth;
                    }
                  }).map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="px-6 py-4">
                        {item.highlight ? (
                          <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {item.rank}
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-[#F0F2F5] rounded-full flex items-center justify-center text-secondary-500 text-xs font-bold">
                            {item.rank}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-secondary-800">{item.term}</td>
                      <td className="px-6 py-4 text-sm font-medium text-secondary-600 tabular-nums">{item.index}</td>
                      <td className="px-6 py-4">
                        <div className={`text-sm font-medium flex items-center gap-1 ${item.growth > 0 ? 'text-error-500' : 'text-success-500'}`}>
                          {item.growth > 0 ? <TrendingUpIcon className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(item.growth)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-secondary-600 tabular-nums">{item.ctr}</td>
                      <td className="px-6 py-4 text-sm font-medium text-secondary-600 tabular-nums">{item.productIndex}</td>
                      <td className="px-6 py-4 text-sm font-medium text-secondary-600 tabular-nums">{item.supplyDemand}</td>
                      <td className="px-6 py-4 text-sm font-medium text-secondary-600 tabular-nums">{item.price}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => toggleWord(item.term)}
                          className={`p-1.5 rounded-lg transition-all ${selectedWords.includes(item.term) ? 'bg-primary-600 text-white' : 'bg-[#F0F2F5] text-secondary-400 hover:bg-primary-50 hover:text-primary-600'}`}
                        >
                          {selectedWords.includes(item.term) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-[#F0F2F5]">
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">使用者</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">使用时间</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">标题名称</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">人群</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500">场景</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary-500 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F2F5]">
                  {TITLE_LIBRARY_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 text-xs font-bold border border-primary-100">
                            {item.avatar}
                          </div>
                          <span className="text-sm font-medium text-secondary-700">{item.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-secondary-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-secondary-800 font-medium">{item.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-[#F5F7FA] text-secondary-500 rounded text-[10px] font-medium border border-[#E4E7ED]">
                          {item.audience}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-[#F5F7FA] text-secondary-500 rounded text-[10px] font-medium border border-[#E4E7ED]">
                          {item.scene}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="flex items-center gap-1 ml-auto text-xs font-bold text-error-500 hover:text-error-600 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>删除</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg font-bold text-sm">
              <Type className="w-4 h-4" />
              <span>词根组合</span>
            </div>
            <div className="text-sm text-secondary-500 whitespace-nowrap">
              已选 <span className="font-bold text-primary-600 mx-0.5">{selectedWords.length}</span> 个词
            </div>
          </div>

          <div className="flex-1 min-w-0 bg-white rounded-xl border border-[#E4E7ED] px-4 py-2 min-h-[44px] flex items-center">
            <div className="flex flex-wrap gap-2">
              {selectedWords.length > 0 ? (
                selectedWords.map(word => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary-50 border border-primary-100 rounded-lg text-xs font-bold text-primary-600"
                  >
                    {word}
                    <button 
                      onClick={() => toggleWord(word)}
                      className="hover:text-error-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-sm text-secondary-400">点击上方矩阵中的词汇进行组合...</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setSelectedWords([])}
              className="text-sm font-bold text-secondary-400 hover:text-secondary-600 transition-colors"
            >
              清空选择
            </button>
            <button 
              onClick={handleGenerateTitle}
              disabled={selectedWords.length === 0 || isGeneratingTitle}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedWords.length > 0 
                ? 'bg-[#F0F2F5] text-secondary-700 hover:bg-[#E4E7ED]' 
                : 'bg-[#F8FAFC] text-secondary-300 cursor-not-allowed'
              }`}
            >
              {isGeneratingTitle ? "生成中..." : "一键生成标题"}
            </button>
            <button 
              onClick={() => onSendToImageSpace?.(selectedWords, selectedCategory)}
              disabled={selectedWords.length === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                selectedWords.length > 0 
                ? 'bg-primary-600 text-white hover:bg-primary-700' 
                : 'bg-primary-50 text-primary-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>发送至生图空间</span>
            </button>
          </div>
        </div>

      {/* AI Generated Title Result */}
      <AnimatePresence>
        {generatedTitle && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-success-50 border border-success-100 rounded-2xl relative group shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-success-600" />
                <span className="text-xs font-bold text-success-700">AI 生成标题建议</span>
              </div>
              <button 
                onClick={() => setGeneratedTitle('')}
                className="p-1 hover:bg-success-100 rounded-full text-success-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-secondary-700 leading-relaxed whitespace-pre-wrap">
              {generatedTitle}
            </div>
            <button 
              onClick={copyToClipboard}
              className="absolute bottom-4 right-4 p-2 bg-white border border-success-100 rounded-lg text-success-600 hover:bg-success-50 transition-all shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-success-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
