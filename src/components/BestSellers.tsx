import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import productsData from '../data/products.json';
import { ProductItem } from '../types';
import { PLATFORMS } from '../lib/utils';

interface BestSellersProps {
  onSelectUrl: (url: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onSelectUrl }) => {
  const bestSellers = productsData.bestSellers as ProductItem[];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-3 transition-all">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
            Sản Phẩm Bán Chạy
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
          Shopee Hot Deals
        </span>
      </div>

      {/* Horizontal Carousel List with Product Thumbnails */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        {bestSellers.map((item) => {
          const platformInfo = PLATFORMS[item.platform];
          return (
            <div
              key={item.id}
              onClick={() => onSelectUrl(item.url)}
              className="flex items-center gap-3 p-2.5 min-w-[240px] max-w-[280px] bg-zinc-50 dark:bg-zinc-950/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500/40 transition-all cursor-pointer group shrink-0"
            >
              {/* Product Mini Thumbnail */}
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-cover rounded-lg border border-zinc-200 dark:border-zinc-800 shrink-0 bg-white"
                loading="lazy"
              />

              {/* Product Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${platformInfo.bgLight} ${platformInfo.bgDark} ${platformInfo.textLight} ${platformInfo.textDark}`}>
                    {platformInfo.name}
                  </span>
                </div>
                <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                  {item.title}
                </p>
              </div>

              {/* Action Indicator */}
              <div className="p-1.5 rounded-lg bg-blue-600 text-white opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
