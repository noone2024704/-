import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  "圈类", "泳池", "床垫", "皮划艇", "泡澡桶", 
  "拍拍垫", "泡脚桶", "浴盆", "头枕", "冲浪板", 
  "雨衣", "雨鞋", "沙发", "浮排", "球类", 
  "不倒翁", "冰垫", "学座椅", "滑雪圈"
];

export const PinduoduoCategorySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleOpen}
        className={cn(
          "flex items-center gap-1 px-4 py-2 text-sm font-bold transition-all rounded-lg",
          "bg-surface-card border border-surface-border hover:border-primary-400 hover:text-primary-600 shadow-sm",
          isOpen ? "text-primary-600 border-primary-600 ring-2 ring-primary-600/10" : "text-secondary-700"
        )}
      >
        <span className="truncate max-w-[100px]">{selectedCategory || "类目"}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform text-secondary-400", isOpen && "rotate-180 text-primary-600")} />
      </button>

      {/* Popup Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile or just to capture clicks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/10 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute left-0 z-50 mt-2 w-[320px] sm:w-[400px] md:w-[480px]",
                "bg-surface-card rounded-2xl shadow-2xl border border-surface-border overflow-hidden"
              )}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
                    <h3 className="text-base font-bold text-secondary-800">选择类目</h3>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-secondary-400 hover:text-secondary-600 rounded-full hover:bg-secondary-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Grid Layout: 5-6 per row */}
                <div className="grid grid-cols-5 gap-2.5">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSelect(category)}
                      className={cn(
                        "px-1 py-3 text-[11px] rounded-xl transition-all text-center",
                        "border border-surface-border/50",
                        selectedCategory === category
                          ? "bg-primary-50 text-primary-700 border-primary-200 font-bold shadow-sm shadow-primary-100"
                          : "bg-secondary-50 text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Footer / Action Area */}
              <div className="px-5 py-4 bg-surface-bg/50 border-t border-surface-border flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsOpen(false);
                  }}
                  className="px-5 py-2 text-xs font-bold text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  重置
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-2 text-xs font-bold text-white bg-primary-600 rounded-full hover:bg-primary-700 shadow-lg shadow-primary-600/20 active:scale-95 transition-all"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
