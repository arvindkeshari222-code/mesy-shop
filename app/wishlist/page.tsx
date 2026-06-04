"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, Loader2, ArrowRight, AlertTriangle } from 'lucide-react';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 👑 LIVE DEBUG ENGINE: Yeh exact error screen par dikhayega
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchWishlistProducts();
  }, []);

  const fetchWishlistProducts = async () => {
    try {
      setLoading(true);
      setServerError(null);
      
      const savedWishlist = localStorage.getItem('mesy_wishlist');
      const wishlistIds = savedWishlist ? JSON.parse(savedWishlist) : [];

      if (wishlistIds.length === 0) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/products?include=${wishlistIds.join(',')}`);
      
      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data);
      } else {
        // Server ka exact raw error nikalna
        const errorText = await response.text();
        setServerError(`Status Code ${response.status} — ${errorText || response.statusText}`);
        console.error("WooCommerce products fetch failed:", errorText);
      }
    } catch (error: any) {
      setServerError(`Network Crash: ${error.message}`);
      console.error("Error loading wishlist assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const savedWishlist = localStorage.getItem('mesy_wishlist');
    let wishlistIds = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    wishlistIds = wishlistIds.filter((itemIds: number) => itemIds !== id);
    localStorage.setItem('mesy_wishlist', JSON.stringify(wishlistIds));
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] antialiased">
      <main className="max-w-[1450px] mx-auto px-4 lg:px-12 pt-32 pb-20">
        
        {/* Title Header */}
        <header className="border-b border-neutral-100 pb-8 mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[6px] text-gray-400 italic mb-2">Curated Curation</p>
            <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter text-black uppercase">
              Private Archive <span className="text-[#C5A358]">.</span>
            </h1>
          </div>
          <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400">
            {wishlistItems.length} Reserved Asset{wishlistItems.length !== 1 ? 's' : ''}
          </p>
        </header>

        {/* 🚨 DYNAMIC ERROR SHOWCASE BANNER */}
        {serverError && (
          <div className="mb-10 bg-red-50 border border-red-200 rounded-[24px] p-6 text-red-800 max-w-3xl mx-auto flex items-start gap-4 shadow-sm animate-fade-in">
            <AlertTriangle className="shrink-0 mt-0.5 text-red-600" size={20} />
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-wider">Server Route Misconfiguration</h4>
              <p className="text-xs font-mono bg-white/60 p-3 rounded-xl border border-red-100/80 leading-relaxed break-all">
                {serverError}
              </p>
              <p className="text-[11px] text-red-600/80 pt-1">
                💡 Tip: If status is 401, keys are invalid. If 404, the path is broken. If 500, check VS Code terminal logs.
              </p>
            </div>
          </div>
        )}

        {/* Core Layout Status Controller */}
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-[#C5A358]" size={32} />
            <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 italic">Restoring Vault Assets...</p>
          </div>
        ) : wishlistItems.length > 0 && !serverError ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {wishlistItems.map((product) => {
              const productImg = product.images?.[0]?.src || "";
              const currentPrice = parseFloat(product.price || "0.00").toFixed(2);
              const regularPrice = product.regular_price ? parseFloat(product.regular_price).toFixed(2) : null;
              const hasSale = regularPrice && parseFloat(regularPrice) > parseFloat(currentPrice);

              return (
                <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col space-y-4 cursor-pointer relative">
                  <div className="aspect-[3/4] w-full bg-[#fafafa] rounded-[24px] overflow-hidden p-6 border border-gray-50 flex items-center justify-center relative shadow-sm transition-all duration-500 group-hover:shadow-md">
                    {productImg ? (
                      <img src={productImg} alt={product.name} className="max-h-full max-w-full object-contain select-none transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="text-gray-300 text-[10px] font-black uppercase tracking-wider">No Canvas</div>
                    )}

                    <button 
                      type="button"
                      onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 bg-white/90 hover:bg-white hover:text-red-500 rounded-full flex items-center justify-center text-neutral-600 shadow-sm z-30 transition-all active:scale-90"
                    >
                      <Trash2 size={14} />
                    </button>

                    {hasSale && (
                      <span className="absolute top-4 left-4 bg-black text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">Sale</span>
                    )}
                  </div>

                  <div className="space-y-1 px-1">
                    <h3 className="text-sm font-medium text-neutral-800 line-clamp-1 group-hover:text-black transition-colors">{product.name}</h3>
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-sm font-black italic text-black">${currentPrice}</span>
                      {hasSale && <span className="text-xs text-gray-400 line-through font-light">${regularPrice}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          !serverError && (
            <div className="min-h-[450px] bg-[#F5F3EF] rounded-[32px] border border-dashed border-neutral-200 p-8 flex flex-col items-center justify-center text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              <Heart size={44} className="text-neutral-300 mb-4 stroke-[1.2]" />
              <h3 className="text-2xl font-serif italic text-black uppercase tracking-tight mb-2">Your Archive is Empty</h3>
              <p className="text-xs font-bold uppercase tracking-[1px] text-gray-400 max-w-sm leading-relaxed mb-8">
                Curate your collection by saving items directly from our product drop catalogs.
              </p>
              <Link 
                href="/" 
                className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[3px] rounded-full hover:bg-[#C5A358] transition-all duration-500 flex items-center gap-3 shadow-md"
              >
                Explore Drops <ArrowRight size={14} />
              </Link>
            </div>
          )
        )}

      </main>
    </div>
  );
}