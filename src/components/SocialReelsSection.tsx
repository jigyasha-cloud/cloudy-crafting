import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Instagram,
  Play,
  Pause,
  Flame,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Music2,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark,
  Check,
  Plus,
  ShoppingBag,
  Calendar,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import { SocialReel } from '../types';
import { BEST_VIEWS_REELS, INSTAGRAM_PROFILE } from '../data/reelsData';
import { useNavigate } from 'react-router-dom';

interface SocialReelsSectionProps {
  onOpenShop?: () => void;
}

export const SocialReelsSection: React.FC<SocialReelsSectionProps> = ({
  onOpenShop,
}) => {
  const navigate = useNavigate();
  const [reels, setReels] = useState<SocialReel[]>(() => {
    const saved = localStorage.getItem('3cs_custom_reels');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...BEST_VIEWS_REELS];
      } catch (e) {
        return BEST_VIEWS_REELS;
      }
    }
    return BEST_VIEWS_REELS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'views' | 'likes' | 'latest'>('views');
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likedReelIds, setLikedReelIds] = useState<Record<string, boolean>>({});
  const [savedReelIds, setSavedReelIds] = useState<Record<string, boolean>>({});
  const [copiedReelId, setCopiedReelId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newReelUrl, setNewReelUrl] = useState<string>('');
  const [newReelTitle, setNewReelTitle] = useState<string>('');
  const [newReelCaption, setNewReelCaption] = useState<string>('');
  const [newReelCategory, setNewReelCategory] = useState<'ocean' | 'geode' | 'keepsake' | 'gilding' | 'diy'>('ocean');
  const [addSuccessMsg, setAddSuccessMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Playback progress simulation in modal
  const [progress, setProgress] = useState<number>(0);

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



  // Reset progress on reel change
  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);
  }, [activeReelIndex]);

  // Keyboard navigation for reel viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === 'Escape') {
        setActiveReelIndex(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextReel();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const categories = [
    { id: 'all', label: 'All Top Reels' },
    { id: 'viral', label: '🔥 1M+ Viral Hits' },
    { id: 'ocean', label: '🌊 Ocean Waves' },
    { id: 'geode', label: '✨ Geode & Crystals' },
    { id: 'keepsake', label: '🌸 Keepsakes' },
    { id: 'gilding', label: '💫 Gold Leafing' },
    { id: 'diy', label: '📦 DIY Kits' },
  ];

  // Filtering
  const filteredReels = reels.filter((reel) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'viral') return reel.viewsCount >= 1000000;
    return reel.category === activeCategory;
  });

  // Sorting
  const sortedReels = [...filteredReels].sort((a, b) => {
    if (sortBy === 'views') return b.viewsCount - a.viewsCount;
    if (sortBy === 'likes') return b.likesCount - a.likesCount;
    return 0;
  });

  useEffect(() => {
  let interval: ReturnType<typeof setInterval> | undefined;

  const currentReel =
    activeReelIndex !== null
      ? sortedReels[activeReelIndex]
      : null;

  if (
    activeReelIndex !== null &&
    isPlaying &&
    !currentReel?.videoPreviewUrl
  ) {
    interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 100);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [activeReelIndex, isPlaying, sortedReels]);

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedReelIds((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const updated = { ...prev, [id]: !isCurrentlyLiked };
      // update count in reel
      setReels((current) =>
        current.map((r) => {
          if (r.id === id) {
            const newCount = isCurrentlyLiked ? r.likesCount - 1 : r.likesCount + 1;
            return {
              ...r,
              likesCount: newCount,
              likesFormatted: newCount >= 1000 ? `${(newCount / 1000).toFixed(1)}K` : `${newCount}`,
            };
          }
          return r;
        })
      );
      return updated;
    });
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedReelIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyShare = (reel: SocialReel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareText = `${reel.title} - Watch 3C's Art Classes Instagram Reel: ${reel.instagramUrl}`;
    navigator.clipboard?.writeText(shareText);
    setCopiedReelId(reel.id);
    setTimeout(() => setCopiedReelId(null), 2500);
  };

  const handleOpenReelModal = (index: number) => {
    setActiveReelIndex(index);
    setProgress(0);
  };

  const handleCloseReelModal = () => {
    setActiveReelIndex(null);
  };

  const handleNextReel = () => {
    if (activeReelIndex === null) return;
    setActiveReelIndex((prev) => ((prev! + 1) % sortedReels.length));
  };

  const handlePrevReel = () => {
    if (activeReelIndex === null) return;
    setActiveReelIndex((prev) => (prev! === 0 ? sortedReels.length - 1 : prev! - 1));
  };

  const handleAddCustomReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReelTitle.trim()) return;

    const customReel: SocialReel = {
      id: `custom-reel-${Date.now()}`,
      title: newReelTitle.trim(),
      viewsCount: 45000,
      viewsFormatted: '45K',
      likesCount: 3200,
      likesFormatted: '3.2K',
      commentsCount: 180,
      duration: '0:30',
      category: newReelCategory,
      categoryLabel: newReelCategory.toUpperCase(),
      thumbnail: reels[0]?.thumbnail || '',
      audioTitle: 'cloud9_celebrations • Original Audio',
      instagramUrl: newReelUrl.trim() || 'https://www.instagram.com/',
      tags: ['#cloud9celebrations', '#NeetaKungrani', '#ResinArt', '#AkolaResin', '#ViralReels'],
      date: 'Just Added',
      isViralTopPick: false,
    };

    const updated = [customReel, ...reels];
    setReels(updated);
    
    // Save to local storage
    const customOnly = updated.filter((r) => r.id.startsWith('custom-reel-'));
    localStorage.setItem('cloud9_custom_reels', JSON.stringify(customOnly));

    setAddSuccessMsg('✨ New reel successfully pinned to your social showcase!');
    setNewReelTitle('');
    setNewReelCaption('');
    setNewReelUrl('');
    setTimeout(() => {
      setAddSuccessMsg(null);
      setShowAddModal(false);
    }, 1500);
  };

  const currentReel = activeReelIndex !== null ? sortedReels[activeReelIndex] : null;

  return (
    <section
      id="social-feed"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#F0F6F9] via-[#EAF4F8] to-[#F0F6F9] border-y border-[#DADEE1] relative overflow-hidden"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B9D8E1]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#629BB5]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Instagram Profile Header Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#B9D8E1] shadow-lg mb-10 sm:mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Avatar & Profile Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              {/* Instagram Gradient Ring Avatar */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#629BB5] via-[#447F98] to-[#142C37] shadow-md transition-transform group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden">
                    <img
                      src={reels[0]?.thumbnail}
                      alt="cloud9_celebrations Instagram"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-[#447F98] to-[#629BB5] text-white p-1.5 rounded-full shadow-md border-2 border-white">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bio & Handle */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#142C37]">
                    {INSTAGRAM_PROFILE.displayName}
                  </h2>
                  <span className="inline-flex items-center gap-1 bg-[#D6EBF3] text-[#447F98] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#B9D8E1]">
                    <Sparkles className="w-3 h-3 text-[#447F98]" />
                    Official Feed
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#447F98]">
                  {INSTAGRAM_PROFILE.handle}
                </p>
                <p className="text-xs text-[#3A6070] leading-relaxed">
                  {INSTAGRAM_PROFILE.bio}
                </p>
              </div>
            </div>

            {/* Right: Stats Counter & CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-end gap-3.5 w-full lg:w-auto">
              {/* Stats badges */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 bg-[#F0F6F9] px-4 py-2.5 rounded-2xl border border-[#B9D8E1] w-full sm:w-auto">
                <div className="text-center">
                  <p className="text-xs font-bold text-[#142C37]">{INSTAGRAM_PROFILE.followers}</p>
                  <p className="text-[10px] text-[#5C7C8B] uppercase font-medium">Followers</p>
                </div>
                <div className="h-6 w-px bg-[#DADEE1]" />
                <div className="text-center">
                  <p className="text-xs font-bold text-[#142C37]">{INSTAGRAM_PROFILE.posts}</p>
                  <p className="text-[10px] text-[#5C7C8B] uppercase font-medium">Reels & Posts</p>
                </div>
                <div className="h-6 w-px bg-[#DADEE1]" />
                <div className="text-center">
                  <p className="text-xs font-bold text-[#447F98] flex items-center justify-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {INSTAGRAM_PROFILE.totalReelViews}
                  </p>
                  <p className="text-[10px] text-[#5C7C8B] uppercase font-medium">Reel Views</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={INSTAGRAM_PROFILE.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#447F98] to-[#629BB5] hover:opacity-95 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow on Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Section Heading & Interactive Filter Chips */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#D6EBF3] text-[#447F98] text-xs font-bold px-3 py-1 rounded-full mb-2 border border-[#B9D8E1]">
                <Flame className="w-3.5 h-3.5 text-[#447F98]" />
                Top Trending Creations & Masterclasses
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#142C37]">
                Instagram Best Views Reels
              </h3>
              <p className="text-xs sm:text-sm text-[#5C7C8B] mt-1 max-w-2xl">
                Explore our most-watched viral resin pours, ASMR demolding moments, ocean foam blowing secrets, and behind-the-scenes masterclass transformations.
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-1.5 rounded-full border border-[#B9D8E1] shadow-xs text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#447F98]" />
              <span className="text-[#5C7C8B] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#142C37] focus:outline-none cursor-pointer"
              >
                <option value="views">🔥 Most Views</option>
                <option value="likes">❤️ Most Likes</option>
                <option value="latest">✨ Latest Added</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#447F98] text-white shadow-sm'
                    : 'bg-white text-[#142C37] border border-[#B9D8E1] hover:bg-[#EAF4F8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reels Grid (2 in one row on mobile, 3 on large screens) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {sortedReels.map((reel, index) => {
            const isLiked = !!likedReelIds[reel.id];
            const isSaved = !!savedReelIds[reel.id];

            return (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative bg-[#142C37] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#B9D8E1]/80 hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => handleOpenReelModal(index)}
              >
                {/* 9:15 Aspect ratio container */}
                <div className="relative aspect-[9/15] w-full overflow-hidden bg-black">
                  
                  {/* Thumbnail / Animated Visual */}
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlays for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

                  {/* Top Bar inside Reel */}
                  <div className="absolute top-2 sm:top-3.5 left-2 sm:left-3.5 right-2 sm:right-3.5 flex items-center justify-between z-10">
                    {/* View Count Badge */}
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-black/60 backdrop-blur-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20 text-white text-[9px] sm:text-[11px] font-bold">
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" />
                      <span>{reel.viewsFormatted}</span>
                    </div>

                    {/* Viral Badge or Duration */}
                    {reel.isViralTopPick ? (
                      <span className="flex items-center gap-0.5 sm:gap-1 bg-gradient-to-r from-[#447F98] to-[#629BB5] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
                        <Flame className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                        Viral
                      </span>
                    ) : (
                      <span className="bg-black/50 backdrop-blur-xs text-white/90 text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full border border-white/10 font-mono">
                        {reel.duration}
                      </span>
                    )}
                  </div>

                  {/* Center Floating Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#447F98]/90">
                      <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-white ml-0.5 sm:ml-1 text-white" />
                    </div>
                  </div>

                  {/* Right Floating Actions (Like, Comment, Share, Save) */}
                  <div className="absolute right-1.5 sm:right-3 bottom-14 sm:bottom-20 flex flex-col items-center gap-1.5 sm:gap-3.5 z-20">
                    
                    {/* Like Button */}
                    <button
                      onClick={(e) => handleToggleLike(reel.id, e)}
                      className="group/btn flex flex-col items-center gap-0.5 text-white hover:scale-110 transition-transform focus:outline-none"
                    >
                      <div className={`p-1.5 sm:p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                        isLiked ? 'bg-[#447F98] text-white' : 'bg-black/40 text-white'
                      }`}>
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isLiked ? 'fill-white' : ''}`} />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold shadow-xs">
                        {reel.likesFormatted}
                      </span>
                    </button>

                    {/* Comment Count */}
                    <div className="flex flex-col items-center gap-0.5 text-white">
                      <div className="p-1.5 sm:p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-bold">
                        {reel.commentsCount}
                      </span>
                    </div>

                    {/* Share / Copy Link */}
                    <button
                      onClick={(e) => handleCopyShare(reel, e)}
                      className="p-1.5 sm:p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                      title="Copy Reel Link"
                    >
                      {copiedReelId === reel.id ? (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </button>

                    {/* Save / Bookmark */}
                    <button
                      onClick={(e) => handleToggleSave(reel.id, e)}
                      className={`p-1.5 sm:p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                        isSaved ? 'bg-amber-500 text-white' : 'bg-black/40 text-white hover:bg-white/20'
                      }`}
                      title="Save reel"
                    >
                      <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>

                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3.5 right-9 sm:right-16 text-left text-white z-10 space-y-0.5 sm:space-y-1.5">
                    
                    {/* User Tag */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] sm:text-xs font-bold text-white hover:underline truncate max-w-[90px] sm:max-w-none">
                        @cloud9_celebrations
                      </span>
                      <span className="text-[7px] sm:text-[9px] bg-white/20 px-1 sm:px-1.5 py-0.2 rounded-full uppercase tracking-wider hidden xs:inline-block">
                        {reel.categoryLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-[10px] sm:text-sm font-semibold text-white/95 line-clamp-2 leading-tight sm:leading-snug">
                      {reel.title}
                    </h4>

                    {/* Audio track ticker */}
                    <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-white/80">
                      <Music2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#B9D8E1] animate-spin shrink-0" style={{ animationDuration: '4s' }} />
                      <span className="truncate">{reel.audioTitle}</span>
                    </div>

                  </div>

                </div>

                {/* Card Footer Banner */}
                <div className="p-2 sm:p-3.5 bg-[#1E3F4E] text-left flex items-center justify-between border-t border-white/10 gap-1.5">
                  <div className="truncate">
                    <p className="text-[9px] sm:text-[11px] text-[#B9D8E1] font-semibold truncate">
                      {reel.featuredProductLink?.name || 'Handcrafted at cloud9_celebrations'}
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-white/70 hidden xs:block">Watch in HD player</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (reel.featuredProductLink?.url === '/custom-commissions') {
                        navigate('/custom-commissions');
                      } else {
                        if (onOpenShop) onOpenShop();
                        else navigate('/shop');
                      }
                    }}
                    className="shrink-0 inline-flex items-center gap-0.5 sm:gap-1 bg-[#447F98] hover:bg-[#386D82] text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors"
                  >
                    <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>Shop</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULLSCREEN / REEL PLAYER MODAL                          */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeReelIndex !== null && currentReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-lg">
            
            {/* Close Button */}
            <button
              onClick={handleCloseReelModal}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
              title="Close Reel"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev / Next buttons for desktop */}
            <button
              onClick={handlePrevReel}
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all shadow-xl"
              title="Previous Reel (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextReel}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all shadow-xl"
              title="Next Reel (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Reel Player Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-md max-h-[92vh] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
              onClick={() => setIsPlaying((p) => !p)}
            >
              {/* Progress Bar Header */}
              <div className="absolute top-2 left-3 right-3 z-30 flex items-center gap-1">
                <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Top Reel Navigation & Profile Tag */}
              <div
                className="absolute top-5 left-3 right-3 z-30 flex items-center justify-between text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#FCAF45] to-[#E1306C]">
                    <img
                      src={currentReel.thumbnail}
                      alt="cloud9_celebrations avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold">cloud9_celebrations</span>
                      <span className="text-[10px] text-white/70">• Following</span>
                    </div>
                    <span className="text-[10px] text-white/80">{currentReel.viewsFormatted} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted((m) => !m)}
                    className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <a
                    href={currentReel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 hover:bg-[#E1306C]"
                    title="Open on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Main Media Preview */}
              <div className="relative flex-1 w-full h-full overflow-hidden">
                {currentReel.videoPreviewUrl ? (
                <video
                ref={videoRef}
                key={currentReel.id}
                src={currentReel.videoPreviewUrl}
                poster={currentReel.thumbnail}
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
               <img
               src={currentReel.thumbnail}
               alt={currentReel.title}
               className="w-full h-full object-cover"
               />
              )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 pointer-events-none" />

                {/* Play/Pause state indicator */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                      <Pause className="w-8 h-8 fill-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Action Rail */}
              <div
                className="absolute right-3.5 bottom-24 z-30 flex flex-col items-center gap-4 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Like Button */}
                <button
                  onClick={() => handleToggleLike(currentReel.id)}
                  className="flex flex-col items-center gap-0.5 group focus:outline-none"
                >
                  <div className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                    likedReelIds[currentReel.id] ? 'bg-[#E1306C] text-white' : 'bg-black/50 text-white'
                  }`}>
                    <Heart className={`w-5 h-5 ${likedReelIds[currentReel.id] ? 'fill-white' : ''}`} />
                  </div>
                  <span className="text-[11px] font-bold">{currentReel.likesFormatted}</span>
                </button>

                {/* Comments */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold">{currentReel.commentsCount}</span>
                </div>

                {/* Share */}
                <button
                  onClick={() => handleCopyShare(currentReel)}
                  className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-colors"
                  title="Copy Link"
                >
                  {copiedReelId === currentReel.id ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Share2 className="w-5 h-5" />
                  )}
                </button>

                {/* Save */}
                <button
                  onClick={() => handleToggleSave(currentReel.id)}
                  className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                    savedReelIds[currentReel.id] ? 'bg-amber-500 text-white' : 'bg-black/50 text-white'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${savedReelIds[currentReel.id] ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Bottom Caption & Audio Bar */}
              <div
                className="absolute bottom-3 left-3.5 right-16 z-30 text-left text-white space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-sm font-bold leading-snug">
                  {currentReel.title}
                </h3>

                {/* Product attachment CTA */}
                {currentReel.featuredProductLink && (
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        handleCloseReelModal();
                        navigate(currentReel.featuredProductLink!.url);
                      }}
                      className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[#FCAF45]" />
                      <span>{currentReel.featuredProductLink.name}</span>
                    </button>
                  </div>
                )}

                {/* Audio track ticker */}
                <div className="flex items-center gap-2 text-[11px] text-white/80 pt-1">
                  <Music2 className="w-3 h-3 text-[#FCAF45] shrink-0" />
                  <span className="truncate">{currentReel.audioTitle}</span>
                </div>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* ADD / PIN CUSTOM INSTAGRAM REEL MODAL                    */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#B9D8E1] relative"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 text-[#142C37] hover:bg-[#EAF4F8] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-left space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 bg-[#D6EBF3] text-[#447F98] text-xs font-bold px-3 py-1 rounded-full border border-[#B9D8E1]">
                  <Instagram className="w-3.5 h-3.5 text-[#447F98]" />
                  Pin a Cloud9 Instagram Reel
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#142C37]">
                  Add Instagram Reel
                </h3>
                <p className="text-xs text-[#5C7C8B]">
                  Paste your Instagram reel link, title, and topic to showcase it in the best views reels section.
                </p>
              </div>

              {addSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl border border-emerald-200">
                  {addSuccessMsg}
                </div>
              )}

              <form onSubmit={handleAddCustomReel} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-[#142C37] mb-1">
                    Reel Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🌊 Peeling 4-Day Ocean Wave Coasters"
                    value={newReelTitle}
                    onChange={(e) => setNewReelTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#B9D8E1] focus:border-[#447F98] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142C37] mb-1">
                    Instagram Reel URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/reel/..."
                    value={newReelUrl}
                    onChange={(e) => setNewReelUrl(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#B9D8E1] focus:border-[#447F98] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142C37] mb-1">
                    Category
                  </label>
                  <select
                    value={newReelCategory}
                    onChange={(e: any) => setNewReelCategory(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#B9D8E1] focus:border-[#447F98] focus:outline-none bg-white text-[#142C37]"
                  >
                    <option value="ocean">🌊 Ocean Wave</option>
                    <option value="geode">✨ Geode & Crystal</option>
                    <option value="keepsake">🌸 Keepsake Preservation</option>
                    <option value="gilding">💫 24K Gold Leaf Gilding</option>
                    <option value="diy">📦 DIY Kits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142C37] mb-1">
                    Caption / Hashtags
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a brief caption or hashtags for your reel..."
                    value={newReelCaption}
                    onChange={(e) => setNewReelCaption(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#B9D8E1] focus:border-[#447F98] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-bold text-[#142C37] hover:bg-[#EAF4F8] rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#447F98] hover:bg-[#386D82] text-white text-xs font-bold rounded-full shadow-md transition-all"
                  >
                    Pin to Social Feed
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
