import React from 'react';
import { 
  Map, 
  BarChart2, 
  Users, 
  Lightbulb, 
  Compass, 
  Link as LinkIcon, 
  LayoutDashboard, 
  Grid, 
  Layers, 
  Flame, 
  ShieldCheck, 
  Settings2, 
  Wand2,
  ChevronRight,
  ClipboardList,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { id: 'strategy', label: '战略地图', icon: Map },
  { id: 'industry', label: '行业趋势大盘', icon: BarChart2 },
  { id: 'competitor', label: '竞品分析', icon: Users },
  { id: 'insight', label: '用户洞察汇总', icon: Lightbulb },
  { id: 'planning', label: '确定策划方向', icon: Compass },
  { id: 'layout', label: '一键布局链接', icon: LinkIcon },
  { id: 'dashboard', label: '推广驾驶舱', icon: LayoutDashboard, active: true },
  { id: 'matrix', label: '产品矩阵分析', icon: Grid },
  { id: 'operation', label: '产品分层运营', icon: Layers },
  { id: 'hot', label: '爆款递增卡位', icon: Flame },
  { id: 'aftersales', label: '售后模型分析', icon: ShieldCheck },
  { id: 'single_opt', label: '运营单品优化方向', icon: Settings2 },
  { id: 'product_opt', label: '产品优化方向', icon: Wand2 },
  { id: 'image_space', label: '生图空间', icon: ImageIcon },
];

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activeId, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col z-30 overflow-hidden">
      <div className="px-4 py-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 tracking-tight">运营管理系统</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <div className="px-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center justify-between px-2 py-3 rounded-xl text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 text-xs font-bold">
              JD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">运营总监</p>
              <p className="text-[10px] text-slate-500">huqian1997@admin</p>
            </div>
          </div>
          <button className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">
            退出登录
          </button>
        </div>
      </div>
    </aside>
  );
}
