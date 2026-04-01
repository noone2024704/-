import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CategoryGroup {
  title: string;
  options: string[];
}

interface PddCategoryFilterProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
  categories: { name: string; children?: { name: string }[] }[];
}

export const PddCategoryFilter: React.FC<PddCategoryFilterProps> = ({ selectedCategory, onSelect, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Category Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
          isOpen 
            ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm' 
            : 'border-surface-border bg-surface-card text-secondary-700 hover:border-primary-400 hover:bg-secondary-50'
        }`}
      >
        <span className="text-sm font-medium">类目</span>
        <span className={`text-xs opacity-60 ${selectedCategory !== '全部' ? 'text-primary-600 font-bold opacity-100' : ''}`}>
          {selectedCategory}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popup Filter Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-[480px] bg-surface-card border border-surface-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="p-5 space-y-6">
              {categories.map((group) => (
                <div key={group.name} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary-600 rounded-full"></div>
                    <h3 className="text-xs font-bold text-surface-muted uppercase tracking-widest">{group.name}</h3>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {group.children?.map((option) => {
                      const isSelected = selectedCategory === option.name;
                      return (
                        <button
                          key={option.name}
                          onClick={() => {
                            onSelect(option.name);
                            setIsOpen(false);
                          }}
                          className={`px-2 py-2 text-[11px] rounded-lg border transition-all duration-200 text-center truncate ${
                            isSelected
                              ? 'bg-primary-600 border-primary-600 text-white font-bold shadow-md shadow-primary-200'
                              : 'bg-surface-bg border-surface-border text-secondary-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
                          }`}
                        >
                          {option.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-surface-bg border-t border-surface-border flex items-center justify-between">
              <button
                onClick={() => {
                  onSelect('全部');
                  setIsOpen(false);
                }}
                className="text-[11px] font-bold text-surface-muted hover:text-primary-600 transition-colors"
              >
                重置筛选
              </button>
              <div className="flex items-center gap-1 text-[10px] text-surface-muted">
                <Check className="w-3 h-3" />
                <span>点击选项立即筛选</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
