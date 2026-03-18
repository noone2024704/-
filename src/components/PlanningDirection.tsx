import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Download, 
  Wand2,
  Layout,
  Users,
  Target,
  Zap,
  Maximize2
} from 'lucide-react';
import { motion } from 'motion/react';

interface PlanningRow {
  id: string;
  category: string[];
  subCategory: string[];
  scene: string;
  audience: string;
  functions: string[];
  sellingPoints: string[];
  sizes: string[];
}

const MOCK_PLANNING_DATA: PlanningRow[] = [
  {
    id: '1',
    category: ['充气泳池', '免充气泳池'],
    subCategory: ['1、玩具泳池', '2、户外泳池', '3、沐浴桶', '4、球池...'],
    scene: '阳台',
    audience: '小资 中产 城市家庭 成人+儿童',
    functions: ['1、遮阳防晒，避暑降温', '2、折叠收纳，自充气'],
    sellingPoints: ['1、私家泳池，遮阳防晒', '2、小资氛围', '3、抑菌报告', '4、阳台观景氛围感...'],
    sizes: ['1.5m*3层', '1.8m*3层', '2.1m*3层']
  },
  {
    id: '2',
    category: ['充气泳池', '免充气泳池', '夹网泳池'],
    subCategory: ['1、玩具泳池', '2、户外泳池', '3、沐浴桶', '4、球池...'],
    scene: '天台',
    audience: '三四线城镇，家庭成人+儿童',
    functions: ['1、遮阳防晒，避暑降温', '2、折叠收纳，自充气'],
    sellingPoints: ['1、加大加厚，遮阳防晒', '2、送24件豪华大礼包', '3、3m特价，超高性价比', '4、送地垫...'],
    sizes: ['1.5m*3层', '1.8m*3层', '2.1m*3层', '2.6m*3...']
  },
  {
    id: '3',
    category: ['充气泳池', '免充气泳池'],
    subCategory: ['1、玩具泳池', '2、户外泳池', '3、沐浴桶', '4、球池...'],
    scene: '客厅',
    audience: '小资 中产 城市家庭 成人+儿童',
    functions: ['1、小空间收纳', '2、球池、玩具池、游泳、泡澡', '3、安全护栏'],
    sellingPoints: ['1、家长安全看护', '2、0-8岁儿童', '3、一键闪充', '4、安全无异味...'],
    sizes: ['1.5m*3层', '1.8m*3层', '2.1m*3层', '2.6m*3层']
  },
  {
    id: '4',
    category: ['充气泳池'],
    subCategory: ['1、玩具泳池', '2、户外泳池', '3、沐浴桶', '4、球池...'],
    scene: '卫生间',
    audience: '小户型宝妈+儿童',
    functions: ['1、洗澡、戏水'],
    sellingPoints: ['1、0-8岁儿童', '2、安全无异味', '3、抑菌报告', '4、戏水玩具...'],
    sizes: ['1.2m*2层', '1.5m*3层']
  },
  {
    id: '5',
    category: ['充气泳池', '免充气泳池', '夹网泳池'],
    subCategory: ['1、玩具泳池', '2、户外泳池', '3、沐浴桶', '4、球池...'],
    scene: '别墅庭院',
    audience: '一二线城市中资产人群',
    functions: ['1、遮阳防晒，避暑降温', '2、折叠收纳，自充气'],
    sellingPoints: ['1、加大加厚，遮阳防晒', '2、套装高级配件(泡泡机)', '3、儿童节礼物', '4、送地垫...'],
    sizes: ['1.5m*3层', '1.8m*3层', '2.1m*3层', '2.6m*3...']
  }
];

export function PlanningDirection() {
  const [selectedYear, setSelectedYear] = useState('2025年');
  const [selectedMonth, setSelectedMonth] = useState('01月');
  const [selectedCategory, setSelectedCategory] = useState('全部类目');
  const [selectedPlatform, setSelectedPlatform] = useState('平台');
  const [selectedProduct, setSelectedProduct] = useState('选择产品');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Filter Bar */}
      <div className="p-4 border-b border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-500">平台</div>
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 text-sm outline-none bg-white min-w-[100px]"
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
                className="px-3 py-2 text-sm outline-none bg-white min-w-[140px]"
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
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            导出表格
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <select 
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="px-3 py-2 text-sm outline-none bg-white min-w-[160px]"
            >
              <option>选择产品</option>
              <option>充气泳池</option>
              <option>免充气泳池</option>
              <option>夹网泳池</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <Wand2 className="w-4 h-4" />
            开始策划
          </button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full border-collapse text-left table-fixed">
          <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200">
            <tr>
              <th className="p-4 w-12 border-r border-slate-200">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              </th>
              <th className="p-4 w-16 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">编号</th>
              <th className="p-4 w-48 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">产品类别</th>
              <th className="p-4 w-48 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">上架类目</th>
              <th className="p-4 w-32 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">场景</th>
              <th className="p-4 w-48 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">人群 (画面主体)</th>
              <th className="p-4 w-64 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">功能功效</th>
              <th className="p-4 w-64 border-r border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">营销卖点</th>
              <th className="p-4 w-32 text-[11px] font-bold text-slate-500 uppercase tracking-wider">对应尺寸</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_PLANNING_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group align-top">
                <td className="p-4 border-r border-slate-100">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="p-4 border-r border-slate-100 text-xs text-slate-500">{item.id}</td>
                <td className="p-4 border-r border-slate-100">
                  <div className="flex flex-wrap gap-1">
                    {item.category.map((cat, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded text-[10px] font-bold ${idx === 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 border-r border-slate-100">
                  <div className="space-y-1">
                    {item.subCategory.map((sub, idx) => (
                      <p key={idx} className="text-[10px] text-slate-600">{sub}</p>
                    ))}
                  </div>
                </td>
                <td className="p-4 border-r border-slate-100 text-xs font-medium text-slate-700">{item.scene}</td>
                <td className="p-4 border-r border-slate-100 text-xs text-slate-600 leading-relaxed">{item.audience}</td>
                <td className="p-4 border-r border-slate-100">
                  <div className="space-y-1">
                    {item.functions.map((fn, idx) => (
                      <p key={idx} className="text-[10px] text-slate-600">{fn}</p>
                    ))}
                  </div>
                </td>
                <td className="p-4 border-r border-slate-100">
                  <div className="space-y-1">
                    {item.sellingPoints.map((point, idx) => (
                      <p key={idx} className="text-[10px] text-slate-600">{point}</p>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    {item.sizes.map((size, idx) => (
                      <p key={idx} className="text-[10px] text-slate-600">{size}</p>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
