import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import productsData from '../data/products.json';
import { ProductItem } from '../types';
import { PLATFORMS } from '../lib/utils';
import { motion } from 'motion/react';

interface HotTrendingProps {
  onSelectUrl: (url: string) => void;
}

export const HotTrending: React.FC<HotTrendingProps> = ({ onSelectUrl }) => {
  const hotTrending = productsData.hotTrending as ProductItem[];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-4 transition-all">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              Hot Trending
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                Xu Hướng
              </span>
            </h3>
          </div>
        </div>
        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          Sản phẩm Hot
        </span>
      </div>

      {/* Product Grid: 2 Columns on Mobile, 4 Columns on PC */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {hotTrending.map((item) => {
          const platformInfo = PLATFORMS[item.platform];
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSelectUrl(item.url)}
              className="group p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between cursor-pointer space-y-2.5"
            >
              {/* Product Thumbnail Container with Platform Overlay Badge */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white border border-zinc-200 dark:border-zinc-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold shadow-xs ${platformInfo.bgLight} ${platformInfo.bgDark} ${platformInfo.textLight} ${platformInfo.textDark}`}>
                  {platformInfo.name}
                </span>
              </div>

              {/* Title & Info */}
              <div className="space-y-1 flex-1 flex flex-col justify-between">
                <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug">
                  {item.title}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full py-1.5 px-2 rounded-lg text-xs font-bold text-white bg-blue-600 group-hover:bg-blue-700 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Tạo link</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
