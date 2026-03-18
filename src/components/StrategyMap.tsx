import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Download, ChevronDown, Filter, Layers, Search, Users, Briefcase, Tag, Clock, ShieldCheck, Sparkles, X, Wand2, Copy, Check } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const STRATEGY_COLUMNS = [
  { title: '人群需求', color: 'bg-indigo-50/50 text-indigo-700', icon: Users },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '使用需求', color: 'bg-blue-50/50 text-blue-700', icon: Layers },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '其他需求', color: 'bg-purple-50/50 text-purple-700', icon: Sparkles },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '功能需求', color: 'bg-indigo-50/50 text-indigo-700', icon: Briefcase },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '品牌需求', color: 'bg-blue-50/50 text-blue-700', icon: Tag },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '品类需求', color: 'bg-purple-50/50 text-purple-700', icon: Layers },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '场景需求', color: 'bg-indigo-50/50 text-indigo-700', icon: Clock },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '属性需求', color: 'bg-blue-50/50 text-blue-700', icon: Tag },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '时间状态需求', color: 'bg-purple-50/50 text-purple-700', icon: Clock },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '渠道官方背书需求', color: 'bg-indigo-50/50 text-indigo-700', icon: ShieldCheck },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
  { title: '营销修饰词需求', color: 'bg-blue-50/50 text-blue-700', icon: Sparkles },
  { title: '搜索人气', color: 'bg-slate-50/50 text-slate-400', icon: Search },
];

const MOCK_STRATEGY_DATA = [
  ['婴儿', '32,728,092', '泡脚', '28,349,066', '消耗', '758,666', '充气', '21,210,097', 'stokke', '2,504,485', '玩具', '35,459,759', '家用', '17,510,281', '专用', '4,034,849', '新款', '1,811,506', '旗舰店', '2,561,913', '神器', '9,080,417'],
  ['儿童', '31,138,385', '游泳', '23,249,082', 'kk', '661,780', '折叠', '12,666,251', '卡达', '2,478,609', '脚桶', '25,112,762', '户外', '2,208,461', '大', '1,284,680', '2025新款', '1,434,052', '第一名', '1,318,717', '专用', '2,691,621'],
  ['宝宝', '29,837,075', '泡澡', '13,164,853', '成长', '619,851', '游泳', '10,563,711', '哈卡', '2,145,882', '泡脚桶', '21,776,434', '飞机', '1,453,668', '连体', '1,214,694', '2025', '1,191,425', '官方', '1,251,836', '礼物', '1,632,261'],
  ['成人', '5,047,646', '滑雪', '5,055,012', '用品', '536,219', '气垫', '5,242,931', 'iuu', '165,7759', '水枪', '19,000,478', '露营', '1,300,422', '月龄', '1,119,065', '六月', '111,692', '旗舰', '364,012', '专业', '573,150'],
  ['大人', '4,407,658', '洗澡', '4,949,664', '人家', '487,454', '电动', '2,972,861', 'kk', '1,129,509', '餐椅', '16,985,697', '地铺', '1,180,624', '加厚', '1,076,046', '二月', '95,328', '一名', '104,760', '必备', '566,531'],
  ['新生', '4,059,493', '拳击', '4,923,857', '以上', '367,764', '便携', '2,244,701', '卡曼', '1,037,422', '泳镜', '15,086,882', '水上', '887,756', '弹力', '1,001,091', '年货', '90,104', '热销榜', '47,665', '超人', '513,065'],
  ['一岁', '3,482,294', '洗头', '4,815,870', '一名', '348,520', '防水', '2,195,839', '迪卡侬', '891,465', '泳圈', '11,002,087', '旅行', '655,807', '大号', '895,497', '八月', '76,856', '严选', '41,271', '大', '509,096'],
  ['幼儿', '3,196,079', '洗脚', '3,788,488', '抽抽', '346,629', '带轮', '2,115,053', '肯德基', '866,610', '充气床', '8,208,079', '火车', '505,434', '高', '876,896', '三月', '69,383', '第一', '36,621', '益智', '505,482'],
  ['游泳', '3,076,304', '坐浴', '3,320,303', '体力', '313,432', '自动', '2,057,557', '英发', '771,820', '泳帽', '7,800,672', '高铁', '478,907', '度数', '870,497', '热卖', '68,747', '品牌', '26,484', '龙珠', '483,566'],
  ['女士', '1,933,941', '训练', '2,564,817', '用盆', '285,912', '喷水', '2,011,542', '气床', '721,144', '洗澡盆', '6,903,629', '室内', '465,266', '硅胶', '767,178', '出生', '57,614', '十大', '18,624', '成长', '432,292'],
];

interface StrategyMapProps {
  onSendToImageSpace?: (words: string[], category: string) => void;
}

export function StrategyMap({ onSendToImageSpace }: StrategyMapProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('泳池');
  const [customWord, setCustomWord] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customWord.trim();
    if (trimmed && !selectedWords.includes(trimmed)) {
      setSelectedWords([...selectedWords, trimmed]);
      setCustomWord('');
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
    <div className="flex flex-col h-full bg-[#F8FAFC] p-6 overflow-hidden">
      {/* Filters Section - Unified with App.tsx */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-6 mb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-full border border-slate-200">
                <Filter className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">筛选条件</span>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">平台</span>
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-white">
                  <option>淘系平台</option>
                  <option>1688平台</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">类目</span>
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-white"
                >
                  <option>泳池</option>
                  <option>泳圈</option>
                  <option>皮划艇</option>
                  <option>床垫</option>
                  <option>泡澡桶</option>
                  <option>洗脚桶</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">时间</span>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg divide-x divide-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all hover:bg-white">
                <div className="relative">
                  <select className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm focus:outline-none transition-all">
                    <option>2025年</option>
                    <option>2026年</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm focus:outline-none transition-all">
                    <option>1月</option>
                    <option>2月</option>
                    <option>3月</option>
                    <option>4月</option>
                    <option>5月</option>
                    <option>6月</option>
                    <option>7月</option>
                    <option>8月</option>
                    <option>9月</option>
                    <option>10月</option>
                    <option>11月</option>
                    <option>12月</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Upload className="w-4 h-4" />
              <span>上传数据</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200">
              <Download className="w-4 h-4" />
              <span>导出报表</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Table Content - Unified with Dashboard style */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="premium-card flex-1 flex flex-col overflow-hidden mb-6"
      >
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full border-collapse table-fixed min-w-[2200px]">
            <thead>
              <tr className="border-b border-slate-100">
                {STRATEGY_COLUMNS.map((col, idx) => {
                  return (
                    <th 
                      key={idx}
                      className={`sticky top-0 z-10 p-3 text-center border-r border-slate-100/50 ${col.color}`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                          {col.title}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_STRATEGY_DATA.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors group">
                  {row.map((cell, cellIdx) => {
                    const isWord = cellIdx % 2 === 0;
                    const isSelected = isWord && selectedWords.includes(cell);
                    return (
                      <td 
                        key={cellIdx}
                        onClick={() => isWord && toggleWord(cell)}
                        className={`p-2.5 text-center text-xs border-r border-slate-100/30 tabular-nums transition-all ${
                          !isWord 
                            ? 'text-slate-400 font-normal bg-slate-50/10' 
                            : isSelected
                              ? 'bg-indigo-600 text-white font-bold cursor-pointer'
                              : 'text-slate-700 font-medium group-hover:text-indigo-600 cursor-pointer hover:bg-indigo-50'
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Root Combination Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-6 bg-white border-t-4 border-t-indigo-500"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">词根组合</h3>
            <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
              已选 {selectedWords.length} 个词
            </span>
            <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
            <form onSubmit={handleAddCustomWord} className="flex items-center gap-2">
              <input 
                type="text" 
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                placeholder="自定义词根..."
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all w-32"
              />
              <button 
                type="submit"
                className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 rotate-90" />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedWords([])}
              className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
            >
              清空选择
            </button>
            <button 
              onClick={handleGenerateTitle}
              disabled={selectedWords.length === 0 || isGeneratingTitle}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
                selectedWords.length > 0 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isGeneratingTitle ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              <span>一键生成标题</span>
            </button>
            <button 
              onClick={() => onSendToImageSpace?.(selectedWords, selectedCategory)}
              disabled={selectedWords.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
                selectedWords.length > 0 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4 rotate-180" />
              <span>发送至生图空间</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 min-h-[120px]">
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedWords.length > 0 ? (
                selectedWords.map(word => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-100 rounded-full text-xs font-bold text-indigo-600 shadow-sm group"
                  >
                    {word}
                    <button 
                      onClick={() => toggleWord(word)}
                      className="hover:text-rose-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 py-8">
                  <Layers className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm">点击上方表格中的词语进行组合</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {generatedTitle && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl relative group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700">AI 生成标题建议</span>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {generatedTitle}
            </div>
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-white border border-emerald-100 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
