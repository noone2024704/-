import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

export function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorMap: Record<string, { bg: string, text: string, icon: string }> = {
    brand: { bg: 'bg-primary-50/50', text: 'text-primary-600', icon: 'bg-primary-100/50 text-primary-600 border-primary-200/50' },
    emerald: { bg: 'bg-success-50/50', text: 'text-success-600', icon: 'bg-success-100/50 text-success-600 border-success-200/50' },
    amber: { bg: 'bg-warning-50/50', text: 'text-warning-600', icon: 'bg-warning-100/50 text-warning-600 border-warning-200/50' },
    rose: { bg: 'bg-error-50/50', text: 'text-error-600', icon: 'bg-error-100/50 text-error-600 border-error-200/50' },
    blue: { bg: 'bg-blue-50/50', text: 'text-blue-600', icon: 'bg-blue-100/50 text-blue-600 border-blue-200/50' },
    violet: { bg: 'bg-violet-50/50', text: 'text-violet-600', icon: 'bg-violet-100/50 text-violet-600 border-violet-200/50' },
    orange: { bg: 'bg-orange-50/50', text: 'text-orange-600', icon: 'bg-orange-100/50 text-orange-600 border-orange-200/50' },
    cyan: { bg: 'bg-cyan-50/50', text: 'text-cyan-600', icon: 'bg-cyan-100/50 text-cyan-600 border-cyan-200/50' },
  };

  const isPositive = trend.startsWith('+');
  const isNeutral = trend === '稳定';

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="premium-card p-4 flex flex-col justify-between min-h-[120px] relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40 ${colorMap[color].bg}`} />
      
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2 rounded-lg border transition-colors ${colorMap[color].icon}`}>
          {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
        </div>
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
          isNeutral ? 'bg-secondary-100 text-secondary-500' : 
          isPositive ? 'bg-success-50 text-success-600' : 'bg-error-50 text-error-600'
        }`}>
          {trend}
        </div>
      </div>

      <div className="mt-4 relative z-10">
        <h4 className="data-label mb-1 opacity-70">{title}</h4>
        <div className="flex items-baseline gap-1">
          <p className="text-xl font-bold text-secondary-900 tracking-tight leading-none">{value}</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary-50 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full opacity-30 ${colorMap[color].bg.replace('/50', '')}`}
        />
      </div>
    </motion.div>
  );
}
