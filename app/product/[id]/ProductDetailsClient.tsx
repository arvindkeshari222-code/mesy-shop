"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, Minus, Plus, CheckCircle2, Truck, Loader2, Play, PenTool, ChevronLeft, ChevronRight, X, ShieldCheck, RefreshCw, Leaf, Share2, Check, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '@/app/context/CartContext'; 
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AnimatePresence, motion } from 'framer-motion';

export default function ProductDetailsClient({ initialProduct, initialVariations, initialRelated, initialReviews = [], productId }: any) {
  const { addToCart } = useCart();

  const [mounted, setMounted] = useState(false);
  
  // LIVE SYNC STATES: Initialized with props, updated dynamically via API
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [currentVariations, setCurrentVariations] = useState(initialVariations);

  const [activeImage, setActiveImage] = useState(currentProduct?.images?.[0]?.src || "");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); 
  const [displayPrice, setDisplayPrice] = useState(currentProduct?.price || "0.00");
  const [qty, setQty] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
  const [activeTab, setActiveTab] = useState('description');

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  
  const [reviewsList, setReviewsList] = useState(initialReviews || []);
  const [reviewPage, setReviewPage] = useState(1);
  const [submittingReview, setSubmittingReview] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [isShortDescOpen, setIsShortDescOpen] = useState(false);

  const [deliveryDates, setDeliveryDates] = useState({ start: '', end: '' });
  const descriptionContainerRef = useRef<HTMLDivElement>(null);
  const reviewsTopRef = useRef<HTMLDivElement>(null); 
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const averageRating = parseFloat(currentProduct?.average_rating || "4.90");
  const totalRatingCount = reviewsList.length; 
  
  const reviewsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(totalRatingCount / reviewsPerPage));

  const indexOfLastReview = reviewPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentPagedReviews = reviewsList.slice(indexOfFirstReview, indexOfLastReview);

  const isOutOfStock = currentProduct?.stock_status === 'outofstock';

  const currentPriceValue = displayPrice ? parseFloat(displayPrice) : 0;
  let regPriceValue = currentProduct?.regular_price ? parseFloat(currentProduct.regular_price) : 0;

  if (regPriceValue === 0 || isNaN(regPriceValue) || regPriceValue <= currentPriceValue) {
    regPriceValue = currentPriceValue * 2.052; 
  }

  const calculatedDiscountPercent = regPriceValue > currentPriceValue 
    ? Math.round(((regPriceValue - currentPriceValue) / regPriceValue) * 100)
    : 0;

  // Hydration Guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // FIXED EFFECT 1: Real-time WooCommerce Auto-Sync
  useEffect(() => {
    if (!productId) return;

    async function syncLiveWooCommerceData() {
      try {
        const response = await fetch(`/api/products/${productId}/live?t=${Date.now()}`, {
          cache: 'no-store'
        });
        if (response.ok) {
          const liveData = await response.json();
          
          if (liveData) {
            setCurrentProduct((prev: any) => ({
              ...prev,
              price: liveData.price || prev.price,
              regular_price: liveData.regular_price || prev.regular_price,
              stock_status: liveData.stock_status || prev.stock_status,
            }));

            if (liveData.variations) {
              setCurrentVariations(liveData.variations);
            }
          }
        }
      } catch (error) {
        console.error("WooCommerce live sync failed:", error);
      }
    }

    syncLiveWooCommerceData();
  }, [productId]);

  // Isolated Wishlist Initialization Cycle
  useEffect(() => {
    if (currentProduct?.id) {
      const savedWishlist = localStorage.getItem('mesy_wishlist');
      if (savedWishlist) {
        const wishlistIds = JSON.parse(savedWishlist);
        if (wishlistIds.includes(currentProduct.id)) {
          setIsLiked(true);
        }
      }
    }
  }, [currentProduct?.id]);

  const handleWishlistToggle = () => {
    if (!currentProduct?.id) return;
    
    const savedWishlist = localStorage.getItem('mesy_wishlist');
    let wishlistIds = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (isLiked) {
      wishlistIds = wishlistIds.filter((id: any) => id !== currentProduct.id);
      setIsLiked(false);
    } else {
      wishlistIds.push(currentProduct.id);
      setIsLiked(true);
    }
    
    localStorage.setItem('mesy_wishlist', JSON.stringify(wishlistIds));
  };

  useEffect(() => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 9);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 14);
    setDeliveryDates({ start: formatDate(startDate), end: formatDate(endDate) });
  }, []);

  const images = currentProduct?.images || [];
  const videoUrl = currentProduct?.meta_data?.find((m: any) => m.key === '_product_video_url')?.value || "";
  
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const youtubeId = getYouTubeId(videoUrl) || "dQw4w9WgXcQ";

  const shortDescContent = currentProduct?.short_description || currentProduct?.excerpt || "Premium tailored architecture designed with unmatched precision.";
  
  const colorAttr = currentProduct?.attributes?.find((a: any) => a.name.toLowerCase().includes('color') || a.name.toLowerCase().includes('colour'));
  const sizeAttr = currentProduct?.attributes?.find((a: any) => a.name.toLowerCase().includes('size'));

  // FIXED EFFECT 2: Fallback values only set if no option has been selected yet by user
  useEffect(() => { 
    if (colorAttr && colorAttr.options && !selectedColor) {
      setSelectedColor(colorAttr.options[0]);
    }
    if (sizeAttr && sizeAttr.options && !selectedSize) {
      setSelectedSize(sizeAttr.options[0]);
    }
  }, [currentProduct, colorAttr, sizeAttr, selectedColor, selectedSize]);

  useEffect(() => {
    if (activeTab !== 'description' && descriptionContainerRef.current) {
      const iframes = descriptionContainerRef.current.querySelectorAll('iframe');
      iframes.forEach(iframe => { const src = iframe.src; iframe.src = ''; iframe.src = src; });
      const videos = descriptionContainerRef.current.querySelectorAll('video');
      videos.forEach(video => video.pause());
    }
  }, [activeTab]);

  useEffect(() => {
    if (currentVariations?.length > 0) {
      const variant = currentVariations.find((v: any) => {
        const matchColor = colorAttr ? v.attributes.some((attr: any) => attr.option?.toLowerCase() === selectedColor?.toLowerCase()) : true;
        const matchSize = sizeAttr ? v.attributes.some((attr: any) => attr.option?.toLowerCase() === selectedSize?.toLowerCase()) : true;
        return matchColor && matchSize;
      });

      const fallbackVariant = variant || currentVariations.find((v: any) => {
        return (colorAttr && v.attributes.some((attr: any) => attr.option?.toLowerCase() === selectedColor?.toLowerCase())) || 
               (sizeAttr && v.attributes.some((attr: any) => attr.option?.toLowerCase() === selectedSize?.toLowerCase()));
      });

      const targetVariant = variant || fallbackVariant;

      if (targetVariant) {
        if (targetVariant.price) setDisplayPrice(targetVariant.price);
        if (targetVariant.image?.src && selectedColor) {
          setActiveImage(targetVariant.image.src);
          const idx = images.findIndex((img: any) => img.src === targetVariant.image.src);
          if (idx !== -1) {
            setCurrentImgIndex(idx);
            if (mobileCarouselRef.current) {
              mobileCarouselRef.current.scrollTo({
                left: mobileCarouselRef.current.offsetWidth * idx,
                behavior: 'smooth'
              });
            }
          }
        }
      }
    } else if (currentProduct?.price) {
      setDisplayPrice(currentProduct.price);
    }
  }, [selectedColor, selectedSize, currentVariations, currentProduct, images, colorAttr, sizeAttr]);

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setReviewPage(targetPage);
    reviewsTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      const newIdx = currentImgIndex === images.length - 1 ? 0 : currentImgIndex + 1;
      setCurrentImgIndex(newIdx);
      setActiveImage(images[newIdx]?.src || "");
      if (mobileCarouselRef.current) {
        mobileCarouselRef.current.scrollTo({
          left: mobileCarouselRef.current.offsetWidth * newIdx,
          behavior: 'smooth'
        });
      }
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      const newIdx = currentImgIndex === 0 ? images.length - 1 : currentImgIndex - 1;
      setCurrentImgIndex(newIdx);
      setActiveImage(images[newIdx]?.src || "");
      if (mobileCarouselRef.current) {
        mobileCarouselRef.current.scrollTo({
          left: mobileCarouselRef.current.offsetWidth * newIdx,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleReserveInBag = () => {
    if (!currentProduct || isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart({
        id: currentProduct.id,
        name: currentProduct.name,
        price: displayPrice || currentProduct.price || "0.00",
        quantity: Number(qty),
        selectedColor: selectedColor || undefined,
        image: activeImage || (currentProduct.images?.[0]?.src || ""),
        options: {
          ...(selectedColor && { Color: selectedColor }),
          ...(selectedSize && { Size: selectedSize })
        }
      });
      setIsAdding(false);
      setIsAddedSuccess(true);
      setTimeout(() => setIsAddedSuccess(false), 2000);
    }, 400);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewerName.trim() || !reviewerEmail.trim()) return;
    setSubmittingReview(true);

    try {
      const formData = new FormData();
      formData.append('product_id', currentProduct.id);
      formData.append('review', reviewText);
      formData.append('reviewer', reviewerName);
      formData.append('reviewer_email', reviewerEmail);
      formData.append('rating', String(rating));

      const response = await fetch("/api/reviews/create", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      const newLiveReview = { 
        id: data?.id || Date.now(), 
        rating: parseInt(String(rating), 10), 
        review: reviewText, 
        reviewer: reviewerName, 
        verified: true
      };

      setReviewsList((prev: any) => [newLiveReview, ...prev]);
      setReviewText(""); setReviewerName(""); setReviewerEmail(""); setRating(5);
      setReviewPage(1); 
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ 
      display: 'block', 
      backgroundPosition: `${x}% ${y}%`, 
      backgroundImage: `url(${activeImage})`, 
      backgroundSize: '220%' 
    });
  };

  const getSanitizedDescription = (htmlContent: string) => {
    if (!htmlContent) return "";
    return htmlContent.replace(/src="http:\/\//g, 'src="https://');
  };

  if (!mounted || !currentProduct) return null;

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
      <div className="bg-white min-h-screen text-[#1a1a1a] antialiased">
        <main className="max-w-[1450px] mx-auto px-4 lg:px-12 pt-28 lg:pt-32 pb-20">
          
          {/* MOBILE EXCLUSIVE TITLE BAR */}
          <div className="lg:hidden mb-6 space-y-2">
             <p className="text-[9px] font-black uppercase tracking-[5px] text-gray-400 italic">Signature Archive • SKU: {currentProduct.sku || '00'}</p>
             {/* ❌ DUPLICATE RATING REMOVED FROM HERE */}
             <h1 className="text-2xl font-serif italic tracking-tighter leading-tight text-black">{currentProduct.name}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="col-span-1 lg:col-span-7 flex flex-col md:flex-row gap-6 lg:sticky lg:top-32">
              
              {/* 1. SIDE THUMBNAILS */}
              <div className="hidden lg:flex flex-col gap-4 w-[100px] min-w-[100px] shrink-0 overflow-y-auto no-scrollbar max-h-[600px] pr-1">
                {images.map((img: any, i: number) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={() => { setActiveImage(img.src); setCurrentImgIndex(i); }}
                    onMouseEnter={() => { setActiveImage(img.src); setCurrentImgIndex(i); }} 
                    className={`w-full h-[130px] min-h-[130px] shrink-0 rounded-2xl overflow-hidden border-2 transition-all bg-[#fbfbfb] relative ${activeImage === img.src ? 'border-black scale-105 shadow-sm' : 'border-neutral-200/60 opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img.src} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>

              {/* 2. DESKTOP MAIN IMAGE BOX WITH HOVER ZOOM */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' })}
                className="hidden lg:flex flex-1 aspect-square bg-[#fafafa] rounded-[40px] items-center justify-center p-12 border border-gray-50 relative cursor-crosshair overflow-hidden group shadow-sm"
              >
                {activeImage ? (
                  <img src={activeImage} className="max-h-full max-w-full w-auto h-auto object-contain select-none group-hover:opacity-0" alt="Master Product Preview" />
                ) : (
                  <div className="text-gray-300 text-xs font-bold uppercase tracking-widest">No Image Loaded</div>
                )}
                <div className="absolute inset-0 z-10 pointer-events-none bg-no-repeat rounded-[40px]" style={zoomStyle as any} />
                
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} type="button" className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black shadow-md z-30 transition-all opacity-90 active:scale-95"><ChevronLeft size={20} strokeWidth={2.5} /></button>
                    <button onClick={nextImage} type="button" className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black shadow-md z-30 transition-all opacity-90 active:scale-95"><ChevronRight size={20} strokeWidth={2.5} /></button>
                  </>
                )}
                
                <button 
                  type="button" 
                  onClick={handleWishlistToggle}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black shadow-md z-40 transition-all active:scale-95"
                >
                  <Heart 
                    size={20} 
                    fill={isLiked ? "#E14B4B" : "none"} 
                    className={`transition-colors duration-300 ${isLiked ? 'text-[#E14B4B]' : 'text-black'}`} 
                    strokeWidth={2}
                  />
                </button>
              </div>

              {/* 3. MOBILE SWIPABLE CAROUSEL MATRIX */}
              <div className="block lg:hidden w-full bg-[#fafafa] rounded-[24px] overflow-hidden border border-gray-100 relative shadow-sm">
                <button 
                  type="button" 
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-black shadow-md z-40 transition-all active:scale-95"
                >
                  <Heart 
                    size={18} 
                    fill={isLiked ? "#E14B4B" : "none"} 
                    className={`transition-colors duration-300 ${isLiked ? 'text-[#E14B4B]' : 'text-black'}`} 
                    strokeWidth={2}
                  />
                </button>

                <div 
                  ref={mobileCarouselRef}
                  className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                  onScroll={(e) => {
                    const width = e.currentTarget.offsetWidth;
                    const scrollLeft = e.currentTarget.scrollLeft;
                    const newIndex = Math.round(scrollLeft / width);
                    if (newIndex !== currentImgIndex && images[newIndex]) {
                      setCurrentImgIndex(newIndex);
                      setActiveImage(images[newIndex].src);
                    }
                  }}
                >
                  {images.map((img: any, idx: number) => (
                    <div key={idx} className="w-full shrink-0 aspect-[3/4] snap-start relative">
                      <img 
                        src={img.src} 
                        className="w-full h-full object-cover select-none" 
                        alt={`Mobile Preview ${idx}`} 
                        onClick={() => setIsZoomOpen(true)}
                      />
                    </div>
                  ))}
                </div>
                
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} type="button" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-black shadow-md z-30 active:scale-95"><ChevronLeft size={18} strokeWidth={2.5} /></button>
                    <button onClick={nextImage} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-black shadow-md z-30 active:scale-95"><ChevronRight size={18} strokeWidth={2.5} /></button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-black/10 px-2 py-1 rounded-full backdrop-blur-sm">
                      {images.map((_, idx: number) => (
                        <button 
                          key={idx} 
                          type="button" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setCurrentImgIndex(idx); 
                            setActiveImage(images[idx]?.src || ""); 
                            if (mobileCarouselRef.current) {
                              mobileCarouselRef.current.scrollTo({ left: mobileCarouselRef.current.offsetWidth * idx, behavior: 'smooth' });
                            }
                          }} 
                          className={`h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'w-3 bg-black' : 'w-1.5 bg-gray-400'}`} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* PRODUCT BUYING METADATA CONTROLS GRID */}
            <div className="col-span-1 lg:col-span-5 space-y-10">
              <header className="hidden lg:block space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[6px] text-gray-400 italic">Signature Archive • SKU: {currentProduct.sku || '00'}</p>
                {/* ❌ DUPLICATE RATING REMOVED FROM HERE TOO */}
                <h1 className="text-4xl lg:text-5xl font-serif italic tracking-tighter leading-tight pt-1">{currentProduct.name}</h1>
              </header>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-neutral-100 py-6 gap-4">
                 <div className="flex flex-col space-y-1">
                   <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 italic">
                     ✨ Exclusive Atelier Limited Run Offer
                   </p>
                   <div className="flex items-center gap-3.5 flex-wrap">
                     <span className="text-4xl font-light tracking-tighter italic text-black underline underline-offset-8 decoration-gray-100">
                       ${currentPriceValue.toFixed(2)}
                     </span>
                     <span className="text-xl font-light text-gray-400 line-through tracking-tighter decoration-[#E14B4B]">
                       ${regPriceValue.toFixed(2)}
                     </span>
                     
                     {/* 🌟 ONLY KEEPING THIS PREMIUM PRICE-ADJACENT RATING BADGE NOW */}
                     {averageRating > 0 && (
                        <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded-full text-xs font-black text-neutral-800 shadow-2xs select-none ml-1">
                          <span className="text-[#C5A358] flex items-center"><Star size={11} fill="currentColor" strokeWidth={0} /></span>
                          <span>{averageRating.toFixed(1)}</span>
                          <span className="text-neutral-400 font-normal text-[11px]">({totalRatingCount} reviews)</span>
                        </div>
                     )}
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                    <button onClick={() => { if (navigator.share) { navigator.share({ title: currentProduct.name, text: `Check out this premium asset on MESY Atelier`, url: window.location.href }).catch(console.error); } else { navigator.clipboard.writeText(window.location.href); alert("Product link elegantly copied!"); } }} type="button" className="p-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 rounded-full text-neutral-700 transition-all active:scale-95 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm"><Share2 size={13} /> Share</button>
                    
                    {isOutOfStock ? (
                      <span className="bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[3px] px-4 py-2 rounded-full border border-red-100">Out Of Stock</span>
                    ) : (
                      <span className="bg-[#00a65a]/10 text-[#00a65a] text-[10px] font-black uppercase tracking-[3px] px-4 py-2 rounded-full border border-[#00a65a]/20">In Stock Now</span>
                    )}
                 </div>
              </div>

              <div className="bg-[#fafafa] rounded-[32px] border border-gray-100 overflow-hidden shadow-sm transition-all duration-300">
                 <button 
                   type="button"
                   onClick={() => setIsShortDescOpen(!isShortDescOpen)}
                   className="w-full p-6 flex items-center justify-between text-left select-none group focus:outline-none"
                 >
                   <span className="text-[10px] font-black uppercase tracking-[3px] text-neutral-800 italic flex items-center gap-2">
                     ✨ Exclusive Drop Details
                   </span>
                   <motion.div
                     animate={{ rotate: isShortDescOpen ? 180 : 0 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                     className="text-neutral-400 group-hover:text-black transition-colors"
                   >
                     <ChevronDown size={16} strokeWidth={2.5} />
                   </motion.div>
                 </button>

                 <AnimatePresence initial={false}>
                   {isShortDescOpen && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.35, ease: "easeInOut" }}
                     >
                       <div className="px-6 pb-6 pt-1 text-[13px] leading-relaxed text-gray-500 font-medium max-w-full break-words font-sans border-t border-gray-50 bg-white/50">
                         <div dangerouslySetInnerHTML={{ __html: shortDescContent }} className="space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1.5" />
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

              {colorAttr && (
                <div className="space-y-4 border-b border-neutral-100 pb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-black uppercase tracking-[4px] text-gray-400 italic">
                      Color: <span className="text-black font-bold uppercase underline decoration-[#C5A358] decoration-2">{selectedColor}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3.5 pt-1">
                    {colorAttr.options.map((opt: string) => {
                      const variantMatch = currentVariations?.find((v: any) => 
                        v.attributes.some((attr: any) => attr.option?.toLowerCase() === opt?.toLowerCase())
                      );
                      const thumbImg = variantMatch?.image?.src || currentProduct?.images?.[0]?.src;
                      const isSelected = selectedColor?.toLowerCase() === opt?.toLowerCase();

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedColor(opt)}
                          className={`group/thumb relative aspect-square w-[72px] rounded-2xl overflow-hidden p-1 border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'border-neutral-900 scale-105 shadow-md shadow-neutral-100' 
                              : 'border-neutral-200/60 opacity-60 hover:opacity-100 hover:border-neutral-400'
                          }`}
                        >
                          {thumbImg ? (
                            <img src={thumbImg} className="w-full h-full object-cover rounded-xl" alt={opt} />
                          ) : (
                            <span className="text-[8px] font-black text-neutral-400">{opt}</span>
                          )}
                          
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-neutral-950 text-white p-0.5 rounded-full border border-white shadow-sm">
                              <Check size={8} strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {sizeAttr && (
                <div className="space-y-4 pb-2">
                  <p className="text-[11px] font-black uppercase tracking-[4px] text-gray-400 italic">
                    Size: <span className="text-black font-bold uppercase underline decoration-neutral-900">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1 relative">
                    {sizeAttr.options.map((sz: string) => {
                      const isSelected = selectedSize?.toLowerCase() === sz?.toLowerCase();
                      
                      const matchingSizeVariant = currentVariations?.find((v: any) => {
                        const hasSize = v.attributes.some((attr: any) => attr.option?.toLowerCase() === sz?.toLowerCase());
                        const hasColor = colorAttr ? v.attributes.some((attr: any) => attr.option?.toLowerCase() === selectedColor?.toLowerCase()) : true;
                        return hasSize && hasColor;
                      }) || currentVariations?.find((v: any) => v.attributes.some((attr: any) => attr.option?.toLowerCase() === sz?.toLowerCase()));

                      const sizePriceStr = matchingSizeVariant?.price 
                        ? `$${parseFloat(matchingSizeVariant.price).toFixed(2)}` 
                        : `$${parseFloat(currentProduct?.price || "0.00").toFixed(2)}`;

                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`relative px-5 py-2.5 rounded-xl border transition-all duration-300 overflow-hidden select-none flex flex-col items-center justify-center min-w-[105px] text-center ${
                            isSelected
                              ? 'text-black border-neutral-950 font-black shadow-sm bg-white'
                              : 'bg-neutral-50/50 border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:bg-white'
                          }`}
                        >
                          {isSelected && (
                            <motion.div 
                              layoutId="activeSizePill"
                              className="absolute inset-0 bg-white border-2 border-neutral-950 rounded-xl -z-10"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10 text-xs uppercase tracking-wide font-bold">{sz}</span>
                          <span className={`relative z-10 text-[9px] mt-0.5 tracking-tighter ${isSelected ? 'text-[#C5A358] font-black' : 'text-neutral-400 font-light'}`}>
                            {sizePriceStr}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-6 pt-2">
                 <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                    <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-300 italic">Select Quantity</span>
                    <div className="flex items-center gap-8 bg-gray-50 rounded-full px-5 py-2 border border-gray-100">
                      <button onClick={() => setQty(Math.max(1, qty-1))} disabled={isOutOfStock} className="disabled:opacity-20 hover:opacity-40"><Minus size={14}/></button>
                      <span className="text-sm font-black italic">{isOutOfStock ? 0 : qty}</span>
                      <button onClick={() => setQty(qty+1)} disabled={isOutOfStock} className="disabled:opacity-20 hover:opacity-40"><Plus size={14}/></button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-3">
                    <button type="button" onClick={handleReserveInBag} disabled={isAdding || isOutOfStock} className={`w-full py-5 rounded-full text-[11px] font-black uppercase tracking-[5px] transition-all duration-500 border-2 flex items-center justify-center gap-2 ${isOutOfStock ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : isAddedSuccess ? 'bg-[#00a65a] border-[#00a65a] text-white' : 'bg-transparent border-black text-black hover:bg-black hover:text-white'}`}>
                      {isOutOfStock ? "Sold Out" : isAdding ? <><Loader2 size={14} className="animate-spin" /> Securing Piece...</> : isAddedSuccess ? <><CheckCircle2 size={14} /> Added to Bag</> : "Reserve in Bag"}
                    </button>
                 </div>

                 {!isOutOfStock && (
                   <div className="space-y-2 pt-2 z-10 relative">
                     <PayPalButtons style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }} createOrder={(data, actions) => actions.order.create({ intent: "CAPTURE", purchase_units: [{ description: currentProduct.name, amount: { currency_code: "USD", value: (currentPriceValue * qty).toFixed(2) } }] })} onApprove={async (data, actions) => { const details = await actions.order?.capture(); alert(`Transaction completed safely by ${details?.payer?.name?.given_name}`); }} />
                   </div>
                 )}

                 <div className="border border-neutral-100 bg-[#fbfbfb] rounded-[28px] p-6 space-y-5 text-[#333333] mt-8 shadow-sm">
                    <div className="flex items-start gap-3.5 pb-4 border-b border-neutral-200/50">
                      <div className="p-2 bg-neutral-900 rounded-full text-white mt-0.5"><Truck size={15} /></div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Free shipping</p>
                        <p className="text-xs text-neutral-600 font-medium">Delivery: <span className="font-bold text-neutral-900">{deliveryDates.start || 'Loading Today'} - {deliveryDates.end}</span></p>
                        <p className="text-[10px] text-neutral-400 italic">Courier company: Verified Express Logistics, etc.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 pb-4 border-b border-neutral-200/50">
                      <div className="p-2 bg-neutral-900 rounded-full text-white mt-0.5"><ShieldCheck size={15} /></div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Fast delivery guaranteed</p>
                        <ul className="text-[11px] text-neutral-600 space-y-1 font-medium list-inside list-disc marker:text-neutral-400">
                          <li>$1.00 coupon code credited automatically if delayed</li>
                          <li>Full refund executed if package is lost</li>
                          <li>Instant refund setup if items arrive damaged</li>
                          <li>Absolute refund structure if no delivery in 30 days</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 pb-4 border-b border-neutral-200/50">
                      <div className="p-2 bg-neutral-900 rounded-full text-white mt-0.5"><RefreshCw size={15} /></div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Free returns within 90 days</p>
                        <p className="text-[11px] text-neutral-500 leading-relaxed">No-questions-asked window for premium returns and exchanges safely.</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Security & Privacy</p>
                        <p className="text-[11px] text-neutral-600 leading-relaxed font-medium"><span className="font-bold text-neutral-900">Safe payments:</span> We do not share your personal details with any third parties without your explicit consent. We secure and encrypt your privacy assets.</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 tracking-wider uppercase pt-1"><Leaf size={12} strokeWidth={2.5} /> Shop sustainably</div>
                    </div>
                 </div>

              </div>
            </div>
          </div>

          {/* LOWER ACCORDION INFORMATION TABS MESH */}
          <div className="mt-24 border-t border-gray-100 pt-16">
            <div className="lg:hidden flex items-center justify-between mb-3 px-1">
              <span className="text-[9px] font-black tracking-[4px] text-neutral-400 uppercase italic">
                Swipe tabs to explore →
              </span>
            </div>

            <div className="relative w-full">
              <div className="flex gap-8 md:gap-12 border-b border-gray-100 pb-6 mb-12 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory whitespace-nowrap pr-12">
                <button type="button" onClick={() => setActiveTab('description')} className={`text-sm font-black uppercase tracking-[4px] pb-2 transition-all border-b-2 snap-start ${activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-300'}`}>Description</button>
                <button type="button" onClick={() => setActiveTab('additional_info')} className={`text-sm font-black uppercase tracking-[4px] pb-2 transition-all border-b-2 snap-start ${activeTab === 'additional_info' ? 'border-black text-black' : 'border-transparent text-gray-300'}`}>Additional Information</button>
                <button type="button" onClick={() => setActiveTab('video')} className={`text-sm font-black uppercase tracking-[4px] pb-2 transition-all border-b-2 snap-start ${activeTab === 'video' ? 'border-black text-black' : 'border-transparent text-gray-300'} flex items-center gap-2`}><Play size={12} fill="currentColor"/> Product Film</button>
                <button type="button" onClick={() => setActiveTab('reviews')} className={`text-sm font-black uppercase tracking-[4px] pb-2 transition-all border-b-2 snap-start ${activeTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-gray-300'}`}>
                  Reviews ({totalRatingCount})
                </button>
              </div>
              <div className="lg:hidden absolute right-0 top-0 h-[calc(100%-24px)] w-14 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />
            </div>

            <div className="min-h-[300px]">
              {activeTab === 'description' && (
                <div ref={descriptionContainerRef} className="text-xl leading-[2.4] text-gray-500 font-light prose prose-neutral max-w-none relative z-10 overflow-hidden [&_iframe]:max-w-full [&_video]:max-w-full [&_iframe]:aspect-video [&_video]:h-auto [&_iframe]:rounded-[24px] [&_video]:rounded-[24px] [&_iframe]:my-6 [&_video]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-[24px] [&_img]:my-6" dangerouslySetInnerHTML={{ __html: getSanitizedDescription(currentProduct.description) }} />
              )}
              
              {activeTab === 'additional_info' && (
                <div className="space-y-4">
                  {currentProduct.attributes?.map((attr: any, idx: number) => (
                    <div key={`attr-${attr.name}-${idx}`} className="flex justify-between border-b pb-4">
                      <span className="text-[11px] font-black uppercase text-gray-400">{attr.name}</span>
                      <span className="text-sm font-bold uppercase">{attr.options.join(' • ')}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'video' && (
                <div className="w-full max-w-4xl mx-auto aspect-video rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl bg-black">
                  <iframe src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`} title="Product Cinematic Film" className="w-full h-full border-0" allowFullScreen />
                </div>
              )}

              {activeTab === 'reviews' && (
                <div ref={reviewsTopRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                   
                   <div className="lg:col-span-7 space-y-8">
                      <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Overall Rating</p>
                          <h4 className="text-5xl font-serif font-bold italic text-neutral-900 mt-1">
                            {averageRating > 0 ? averageRating.toFixed(1) : "4.9"} <span className="text-lg font-sans font-normal text-neutral-400">/ 5</span>
                          </h4>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-1">
                          <div className="text-[#C5A358] flex gap-0.5">
                            {[...Array(5)].map((_, s) => {
                              const floorRating = Math.floor(averageRating || 5);
                              return <Star key={s} size={16} fill={s < floorRating ? "currentColor" : "none"} strokeWidth={s < floorRating ? 0 : 1} />
                            })}
                          </div>
                          <p className="text-xs font-medium text-neutral-500">Aggregate of {totalRatingCount} global collector reflections</p>
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif italic tracking-tighter border-b pb-4 pt-4">Collector Feedback</h3>
                      
                      {reviewsList && reviewsList.length > 0 ? (
                        <div className="space-y-6">
                          {currentPagedReviews.map((review: any, idx: number) => {
                            const reviewerName = review.reviewer || review.comment_author || "Premium Customer";
                            let rawContent = review.review || review.comment_content || "";
                            const reviewRating = parseInt(review.rating, 10) || 5;

                            return (
                               <div key={review.id || idx} className="bg-white p-8 rounded-[24px] border border-gray-100 space-y-4 shadow-sm">
                                 <div className="flex justify-between">
                                   <div className="text-[#C5A358] flex gap-0.5">
                                     {[...Array(5)].map((_, s) => (
                                       <Star key={s} size={11} fill={s < reviewRating ? "currentColor" : "none"} strokeWidth={s < reviewRating ? 0 : 1} />
                                     ))}
                                   </div>
                                 </div>
                                 
                                 <div className="text-[14px] text-gray-600 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: rawContent }} />

                                 <div className="text-[11px] font-black uppercase text-black tracking-wider pt-1">— {reviewerName}</div>
                               </div>
                            );
                          })}

                          {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-6 border-t border-neutral-100 select-none">
                              <button
                                type="button"
                                onClick={() => handlePageChange(reviewPage - 1)}
                                disabled={reviewPage === 1}
                                className="px-4 py-2 text-xs font-bold border rounded-xl disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                              >
                                Previous
                              </button>
                              
                              {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                return (
                                  <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all ${
                                      reviewPage === pageNumber 
                                        ? 'bg-neutral-900 text-white font-black italic scale-105 shadow-sm' 
                                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-200'
                                    }`}
                                  >
                                    {pageNumber}
                                  </button>
                                );
                              })}

                              <button
                                type="button"
                                onClick={() => handlePageChange(reviewPage + 1)}
                                disabled={reviewPage === totalPages}
                                className="px-4 py-2 text-xs font-bold border rounded-xl disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                              >
                                Next
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-400 italic">No reflections shared yet on this page.</p>
                      )}
                   </div>

                   <div className="lg:col-span-5 bg-[#fafafa] p-8 rounded-[32px] border border-gray-100 space-y-6">
                      <h3 className="text-xl font-serif italic flex items-center gap-2"><PenTool size={18}/> Share Reflection</h3>
                      <form onSubmit={handleReviewSubmit} className="space-y-5">
                         <div className="flex gap-1.5">{[...Array(5)].map((_, i) => <button type="button" key={i} onClick={() => setRating(i + 1)}><Star size={20} fill={(i + 1) <= (hoverRating || rating) ? "black" : "none"} className="text-black"/></button>)}</div>
                         <textarea required rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Share narrative..." className="w-full bg-white border rounded-2xl p-4 text-[13px] border-neutral-200 focus:outline-none focus:border-black transition-colors" />

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input type="text" required value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} placeholder="Name" className="w-full bg-white border rounded-xl px-4 py-3 text-[13px] border-neutral-200" />
                           <input type="email" required value={reviewerEmail} onChange={(e) => setReviewerEmail(e.target.value)} placeholder="Email" className="w-full bg-white border rounded-xl px-4 py-3 text-[13px] border-neutral-200" />
                         </div>
                         <button type="submit" disabled={submittingReview} className="w-full py-4 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2">
                           {submittingReview ? <><Loader2 size={14} className="animate-spin" /> Submitting Stream...</> : "Submit Experience"}
                         </button>
                      </form>
                   </div>

                </div>
              )}
            </div>
          </div>

          {initialRelated && initialRelated.length > 0 && (
            <div className="mt-28 border-t border-gray-100 pt-16">
              <div className="flex items-baseline justify-between mb-10">
                <h2 className="text-3xl font-serif italic tracking-tighter text-black">
                  You May Also Archive <span className="text-[#C5A358]">.</span>
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 italic">Curated Selection</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {initialRelated.slice(0, 4).map((product: any) => {
                  const productImg = product.images?.[0]?.src || "";
                  const relRegPrice = product.regular_price;
                  const relCurrPrice = product.price;
                  const relShowSale = relRegPrice && parseFloat(relRegPrice) > parseFloat(relCurrPrice);

                  return (
                    <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col space-y-4 cursor-pointer">
                      <div className="aspect-[3/4] w-full bg-[#fafafa] rounded-[24px] overflow-hidden p-6 border border-gray-50 flex items-center justify-center relative shadow-sm transition-all duration-500 group-hover:shadow-md">
                        {productImg ? (
                          <img src={productImg} alt={product.name} className="max-h-full max-w-full object-contain select-none transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="text-gray-300 text-[10px] font-black uppercase tracking-wider">No Canvas</div>
                        )}
                        {relShowSale && (
                          <span className="absolute top-4 left-4 bg-black text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">Sale</span>
                        )}
                      </div>

                      <div className="space-y-1 px-1">
                        <h3 className="text-sm font-medium text-neutral-800 line-clamp-1 group-hover:text-black transition-colors">{product.name}</h3>
                        <div className="flex items-baseline gap-2 pt-0.5">
                          <span className="text-sm font-black italic text-black">${relCurrPrice || "0.00"}</span>
                          {relRegPrice && <span className="text-xs text-gray-400 line-through font-light">${relRegPrice}</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      <AnimatePresence>
        {isZoomOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[5000] flex flex-col items-center justify-center p-4">
            <button type="button" onClick={() => { setIsZoomOpen(false); }} className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/10 active:scale-95 transition-transform"><X size={20} /></button>
            <div className="w-full h-full max-h-[75vh] flex items-center justify-center">
              <img src={activeImage} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" alt="Enlarged Vault View" />
            </div>
            <p className="text-[10px] tracking-[4px] uppercase text-gray-500 mt-4 font-black">Vault Piece {currentImgIndex + 1} of {images.length || 1}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PayPalScriptProvider>
  );
}