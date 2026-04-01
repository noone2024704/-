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
  { id: 'competitor', label: '竞品分析', icon: Users, active: true },
  { id: 'insight', label: '用户洞察汇总', icon: Lightbulb },
  { id: 'planning', label: '确定策划方向', icon: Compass },
  { id: 'layout', label: '一键布局链接', icon: LinkIcon },
  { id: 'dashboard', label: '推广驾驶舱', icon: LayoutDashboard },
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
    <aside className="w-64 h-screen sticky top-0 bg-surface-card border-r border-surface-border flex flex-col z-30 overflow-hidden shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 transition-transform group-hover:scale-105">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-secondary-900 tracking-tight block leading-none mb-1">运营管理</span>
            <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">Management System</span>
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
                    ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100/50' 
                    : 'text-secondary-500 hover:bg-secondary-50 hover:text-secondary-900'}
                `}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'}`} />
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-5 bg-primary-600 rounded-r-full"
                  />
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-surface-bg/80 rounded-2xl p-4 border border-surface-border/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-12 h-12 -mr-6 -mt-6 bg-primary-500/10 rounded-full blur-xl transition-opacity group-hover:opacity-100 opacity-0" />
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-surface-card border border-surface-border shadow-sm flex items-center justify-center text-primary-600 text-xs font-bold ring-2 ring-primary-50/50">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-secondary-900 truncate">运营总监</p>
              <p className="text-[10px] font-medium text-secondary-400 truncate">huqian1997@admin</p>
            </div>
          </div>
          
          <button className="w-full py-2 bg-surface-card border border-surface-border rounded-lg text-[10px] font-bold text-secondary-500 hover:text-error-600 hover:border-error-100 hover:bg-error-50/30 uppercase tracking-widest transition-all shadow-sm">
            退出登录
          </button>
        </div>
      </div>
    </aside>
  );
}
