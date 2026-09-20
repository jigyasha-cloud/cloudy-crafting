import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Award,
  ShieldCheck,
  Play,
  Pause,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Music2,
  Instagram,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  Check,
  Calendar,
  ShoppingBag,
} from 'lucide-react';
import { BEST_VIEWS_REELS, INSTAGRAM_PROFILE } from '../data/reelsData';
import { HERO_BANNER_IMAGE } from '../data/products';

interface HeroSectionProps {
  onShopClick: () => void;
  onCustomClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onCustomClick,
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [showHeartBurst, setShowHeartBurst] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const activeReel = BEST_VIEWS_REELS[activeReelIndex] || BEST_VIEWS_REELS[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
  const videoEl = videoRef.current;
  if (!videoEl) return;
  if (isPlaying) {
    videoEl.play().catch(() => {});
  } else {
    videoEl.pause();
  }
}, [isPlaying, activeReelIndex]);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.muted = isMuted;
  }
}, [isMuted, activeReelIndex]);

useEffect(() => {
  let interval: any;
  if (isPlaying && !activeReel?.videoPreviewUrl) {
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);
  }
  return () => clearInterval(interval);
}, [isPlaying, activeReelIndex, activeReel]);
  // Reset progress when switching reels
  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);
  }, [activeReelIndex]);

  const handleNextReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveReelIndex((prev) => (prev + 1) % BEST_VIEWS_REELS.length);
  };

  const handlePrevReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveReelIndex((prev) => (prev === 0 ? BEST_VIEWS_REELS.length - 1 : prev - 1));
  };

  const handleToggleLike = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const current = !likedMap[activeReel.id];
    setLikedMap((prev) => ({ ...prev, [activeReel.id]: current }));
    if (current) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
  };

  const handleToggleSave = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedMap((prev) => ({ ...prev, [activeReel.id]: !prev[activeReel.id] }));
  };

  const handleShareReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(activeReel.instagramUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="hero"
      className="pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-[#F0F6F9] via-[#E8F4F8] to-[#DCECF3]"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#B9D8E1]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#629BB5]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-70"
        style={{
          backgroundImage: `url('${HERO_BANNER_IMAGE}')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Hero Copy on Left, Instagram Reel Player on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Heading, Bio, Actions, Reel Quick Selectors */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Live Instagram Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <a
                href={INSTAGRAM_PROFILE.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white border border-[#B9D8E1] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#142C37] shadow-xs transition-all hover:scale-105"
              >
                <div className="w-2 h-2 rounded-full bg-[#447F98] animate-pulse" />
                <Instagram className="w-3.5 h-3.5 text-[#447F98]" />
                <span>{INSTAGRAM_PROFILE.handle}</span>
                <span className="text-[#447F98] font-semibold">• 304K+ Reel Views</span>
              </a>

              <span className="hidden sm:inline-flex items-center gap-1 bg-[#447F98]/10 text-[#447F98] text-xs font-bold px-3 py-1.5 rounded-full">
                <Flame className="w-3.5 h-3.5 text-[#447F98]" />
                #1 Viral Customized Hampers & bouquets
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-Cormorant Garamond text-[#142C37] tracking-tight leading-[1.15]"
            >
              We turn your imagination into <span className="text-[#447F98] italic font-Cormorant Garamond">reality</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto bg-[#447F98] hover:bg-[#386D82] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Handcrafted Art</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCustomClick}
                className="w-full sm:w-auto bg-white hover:bg-[#EAF4F8] text-[#142C37] border border-[#B9D8E1] px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#447F98]" />
                <span>Custom Orders</span>
              </button>
            </motion.div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-[#B9D8E1]/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-xs font-bold text-[#142C37]">100% Non-Toxic</p>
                <p className="text-[10px] text-[#5C7C8B]">Certified Safe Epoxy</p>
              </div>
              <div className="text-center lg:text-left border-x border-[#B9D8E1] px-2">
                <p className="text-xs font-bold text-[#142C37]">4.9★ Top Rated</p>
                <p className="text-[10px] text-[#5C7C8B]">5,000+ Happy Homes</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xs font-bold text-[#142C37]">Fast Insured Box</p>
                <p className="text-[10px] text-[#5C7C8B]">Cushioned Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Instagram Reel Player Component */}
          <div className="lg:col-span-5 flex justify-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[340px] sm:max-w-[370px]"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#833AB4] rounded-[2.5rem] blur-md opacity-30 group-hover:opacity-60 transition duration-500" />

              <div
                className="relative bg-black rounded-[2.2rem] overflow-hidden shadow-2xl border-4 border-white/80 aspect-[9/16] flex flex-col cursor-pointer select-none group"
                onClick={() => setIsPlaying((p) => !p)}
              >
                
                <div className="absolute top-2.5 left-3.5 right-3.5 z-30 flex items-center gap-1.5">
                  {BEST_VIEWS_REELS.slice(0, 4).map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                        style={{
                          width:
                            idx < activeReelIndex
                              ? '100%'
                              : idx === activeReelIndex
                              ? `${progress}%`
                              : '0%',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="absolute top-6 left-3.5 right-3.5 z-30 flex items-center justify-between text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#833AB4]">
                      <img
                        src={activeReel.thumbnail}
                        alt="Cloudy_crafting"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">{INSTAGRAM_PROFILE.handle}</span>
                        <span className="text-[9px] bg-white/25 px-1.5 py-0.2 rounded-full font-bold uppercase">
                          REEL
                        </span>
                      </div>
                      <p className="text-[10px] text-white/80 font-medium">{activeReel.viewsFormatted} views</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Mute/Unmute */}
                    <button
                      onClick={() => setIsMuted((m) => !m)}
                      className="p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 text-white transition-colors"
                      title={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Open on IG */}
                    <a
                      href={activeReel.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-gradient-to-tr from-[#E1306C] to-[#833AB4] text-white shadow-xs hover:scale-105 transition-transform"
                      title="Watch on Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Main Media Preview Image with Animated Fluid Pan/Zoom */}
                <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
  {activeReel.videoPreviewUrl ? (
    <video
      ref={videoRef}
      key={activeReel.id}
      src={activeReel.videoPreviewUrl}
      poster={activeReel.thumbnail}
      className="w-full h-full object-cover"
      muted={isMuted}
      autoPlay
      loop
      playsInline
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (v.duration) setProgress((v.currentTime / v.duration) * 100);
      }}
    />
  ) : (
    <motion.img
      key={activeReel.id}
      src={activeReel.thumbnail}
      alt={activeReel.title}
      initial={{ scale: 1.05, opacity: 0.8 }}
      animate={{
        scale: isPlaying ? [1.02, 1.08, 1.04] : 1.04,
        opacity: 1,
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className="w-full h-full object-cover"
    />
  )}

                  {/* Gradient shadow overlay for readable captions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50 pointer-events-none" />

                  {/* Shimmer sweep effect during active playback */}
                  {isPlaying && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  )}

                  {/* Center Pause/Play Indicator */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Heart Burst Popup Animation on Like */}
                  <AnimatePresence>
                    {showHeartBurst && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                        exit={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                      >
                        <Heart className="w-24 h-24 fill-[#E1306C] text-[#E1306C] drop-shadow-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Reel Side Actions (Like, Comments, Share, Save) */}
                <div
                  className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-3.5 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Like */}
                  <button
                    onClick={handleToggleLike}
                    className="flex flex-col items-center gap-0.5 group focus:outline-none"
                  >
                    <div
                      className={`p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                        likedMap[activeReel.id]
                          ? 'bg-[#E1306C] text-white scale-110'
                          : 'bg-black/40 text-white hover:scale-105'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${likedMap[activeReel.id] ? 'fill-white' : ''}`}
                      />
                    </div>
                    <span className="text-[10px] font-bold">
                      {likedMap[activeReel.id] ? 'Liked' : activeReel.likesFormatted}
                    </span>
                  </button>

                  {/* Comment */}
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold">{activeReel.commentsCount}</span>
                  </div>

                  {/* Share */}
                  <button
                    onClick={handleShareReel}
                    className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-colors"
                    title="Copy Reel Link"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Save */}
                  <button
                    onClick={handleToggleSave}
                    className={`p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                      savedMap[activeReel.id]
                        ? 'bg-amber-500 text-white'
                        : 'bg-black/40 text-white hover:bg-white/20'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${savedMap[activeReel.id] ? 'fill-white' : ''}`}
                    />
                  </button>
                </div>

                {/* Bottom Caption & Audio Track */}
                <div
                  className="absolute bottom-3 left-3.5 right-14 z-30 text-left text-white space-y-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#FCAF45]">
                      #{activeReel.categoryLabel}
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                      {activeReel.date}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold leading-snug text-white line-clamp-2">
                    {activeReel.title}
                  </h3>

                  {/* Dynamic Product/Class CTA button attached to reel */}
                  {activeReel.featuredProductLink && (
                    <div className="pt-0.5">
                      <button
                        onClick={() => {
                          if (activeReel.featuredProductLink?.url === '/custom-commissions') {
                            onCustomClick();
                          } else {
                            onShopClick();
                          }
                        }}
                        className="inline-flex items-center gap-1 bg-white text-[#4A1E29] hover:bg-[#FAF0EE] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md transition-transform hover:scale-105"
                      >
                        <Sparkles className="w-3 h-3 text-[#E1306C]" />
                        <span>{activeReel.featuredProductLink.name}</span>
                      </button>
                    </div>
                  )}

                  {/* Audio waveform ticker */}
                  <div className="flex items-center gap-1.5 text-[10px] text-white/80 pt-0.5">
                    <Music2
                      className={`w-3 h-3 text-[#FCAF45] shrink-0 ${
                        isPlaying ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '4s' }}
                    />
                    <span className="truncate">{activeReel.audioTitle}</span>
                  </div>
                </div>

                {/* Quick Prev / Next Arrow overlays */}
                <button
                  onClick={handlePrevReel}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-1.5 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                  title="Previous Reel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextReel}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-1.5 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/70 transition-all"
                  title="Next Reel"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

              {/* Floating aesthetic label below the player */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#5C7C8B] px-3">
                <span className="flex items-center gap-1 font-medium">
                  <Play className="w-3 h-3 text-[#447F98] fill-[#447F98]" />
                  Tap screen to {isPlaying ? 'pause' : 'play'}
                </span>
                <button
                  onClick={handleNextReel}
                  className="font-bold text-[#447F98] hover:underline flex items-center gap-0.5"
                >
                  Next Reel →
                </button>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
