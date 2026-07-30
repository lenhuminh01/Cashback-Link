import React from 'react';
import { 
  Globe, 
  ExternalLink, 
  Shirt, 
  Plane, 
  CreditCard, 
  Tv 
} from 'lucide-react';
import brandsData from '../data/brands.json';

const categoryIcons: Record<string, React.ReactNode> = {
  'Shirt': <Shirt className="w-3.5 h-3.5 text-blue-500" />,
  'Plane': <Plane className="w-3.5 h-3.5 text-teal-500" />,
  'CreditCard': <CreditCard className="w-3.5 h-3.5 text-indigo-500" />,
  'Tv': <Tv className="w-3.5 h-3.5 text-amber-500" />,
};

export const BrandEcosystem: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-4 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Globe className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              Thương Hiệu & Đối Tác
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                Official
              </span>
            </h3>
          </div>
        </div>
        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          Ưu Đãi Trực Tiếp
        </span>
      </div>

      {/* Brand Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {brandsData.map((cat, idx) => {
          const iconNode = categoryIcons[cat.icon] || <Globe className="w-3.5 h-3.5 text-blue-500" />;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/80 space-y-2.5"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-800 dark:text-zinc-200">
                {iconNode}
                <span>{cat.category}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {cat.items.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-800 transition-all text-xs font-semibold flex items-center justify-between group shadow-2xs"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
