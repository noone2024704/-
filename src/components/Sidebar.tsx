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
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200/60 flex flex-col z-30 overflow-hidden shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-200 transition-transform group-hover:scale-105">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight block leading-none mb-1">运营管理</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management System</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar px-3">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all group relative
                  ${isActive 
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100/50' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-5 bg-brand-600 rounded-r-full"
                  />
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-12 h-12 -mr-6 -mt-6 bg-brand-500/10 rounded-full blur-xl transition-opacity group-hover:opacity-100 opacity-0" />
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-600 text-xs font-bold ring-2 ring-brand-50/50">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">运营总监</p>
              <p className="text-[10px] font-medium text-slate-400 truncate">huqian1997@admin</p>
            </div>
          </div>
          
          <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50/30 uppercase tracking-widest transition-all shadow-sm">
            退出登录
          </button>
        </div>
      </div>
    </aside>
  );
}
