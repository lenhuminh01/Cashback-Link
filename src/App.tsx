import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UrlConverter } from './components/UrlConverter';
import { ConversionResult } from './components/ConversionResult';
import { QrCodeModal } from './components/QrCodeModal';
import { BatchConverter } from './components/BatchConverter';
import { BestSellers } from './components/BestSellers';
import { HotTrending } from './components/HotTrending';
import { BrandEcosystem } from './components/BrandEcosystem';
import { Footer } from './components/Footer';
import { ConvertedLink, ThemeMode } from './types';
import { Link2, Layers } from 'lucide-react';

const LOCAL_STORAGE_THEME_KEY = 'short_link_theme_v2';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return (saved as ThemeMode) || 'system';
  });

  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [latestConverted, setLatestConverted] = useState<ConvertedLink | null>(null);
  const [selectedBestSellerUrl, setSelectedBestSellerUrl] = useState<string>('');
  const [qrModalLink, setQrModalLink] = useState<ConvertedLink | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Sync dark mode class on html tag
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    const root = document.documentElement;

    const applyDark = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    if (theme === 'dark') {
      applyDark(true);
    } else if (theme === 'light') {
      applyDark(false);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyDark(systemDark);
    }
  }, [theme]);

  const handleNewConversion = (link: ConvertedLink) => {
    setLatestConverted(link);
  };

  const handleSelectBestSeller = (url: string) => {
    setSelectedBestSellerUrl(url);
  };

  const handleOpenQrModal = (link: ConvertedLink) => {
    setQrModalLink(link);
    setIsQrModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors font-sans antialiased relative overflow-x-hidden">
      {/* Background Glow Elements */}
      <div className="fixed top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-500 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-emerald-500 rounded-full blur-[140px]"></div>
      </div>

      {/* Header Bar */}
      <Header
        theme={theme}
        setTheme={setTheme}
        convertedCount={0}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Description Section */}
        <div className="text-center max-w-xl mx-auto mb-2">
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Dán đường link Shopee, TikTok Shop hoặc Lazada để làm sạch và tạo đường dẫn mua sắm.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 bg-white dark:bg-zinc-900/90 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'single'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Dán Link</span>
            </button>

            <button
              onClick={() => setActiveTab('batch')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Hàng Loạt</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Single URL Converter */}
        {activeTab === 'single' && (
          <div className="space-y-6">
            {/* 1. Box Dán Link */}
            <UrlConverter
              onConvert={handleNewConversion}
              externalUrl={selectedBestSellerUrl}
            />

            {/* 2. Section Kết Quả */}
            {latestConverted && (
              <ConversionResult
                link={latestConverted}
                onOpenQrModal={handleOpenQrModal}
              />
            )}

            {/* 3. Section Bán Chạy (Hình ảnh mini) */}
            <BestSellers onSelectUrl={handleSelectBestSeller} />

            {/* 4. Section Hot Trending (Grid 2 cột mobile) */}
            <HotTrending onSelectUrl={handleSelectBestSeller} />

            {/* 5. Section Thương Hiệu & Đối Tác */}
            <BrandEcosystem />
          </div>
        )}

        {/* Tab 2: Batch / Bulk Converter */}
        {activeTab === 'batch' && (
          <div className="space-y-6">
            <BatchConverter />
            <BestSellers onSelectUrl={handleSelectBestSeller} />
            <HotTrending onSelectUrl={handleSelectBestSeller} />
            <BrandEcosystem />
          </div>
        )}
      </main>

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        link={qrModalLink}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
