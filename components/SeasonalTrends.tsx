"use client";
import React, { useRef } from 'react';
import { Sun, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SeasonalTrends = ({ products = [] }: { products: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth Horizontal Navigaion Slider Control
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85; // Elegantly slides 85% of grid width
      
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-0 my-16">
      <div className="bg-[#FAF9F6] border border-neutral-200/60 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
        
        {/* Editorial Header Layout */}
        <div className="bg-white px-8 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-neutral-100 select-none">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center text-white shadow-md">
              <Sun size={24} strokeWidth={1.2} className="animate-spin-slow" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-[4px] text-neutral-400 uppercase italic block">Atelier Carousel Stream</span>
              <h2 className="text-2xl md:text-3xl font-serif italic tracking-tighter text-neutral-950 font-light">
                The Summer Edit
              </h2>
            </div>
          </div>

          {/* Premium Luxury Action Arrow Controllers */}
          {products && products.length > 0 && (
            <div className="flex items-center gap-3 self-end sm:self-center">
              <button 
                onClick={() => handleScroll('left')}
                type="button" 
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800 shadow-sm hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all active:scale-95"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => handleScroll('right')}
                type="button" 
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-800 shadow-sm hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all active:scale-95"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Matrix View Validation */}
        {!products || products.length === 0 ? (
          <div className="text-center py-24 text-[10px] font-black uppercase tracking-[4px] text-neutral-400 italic">
            — Summer Collection Channel Currently Empty —
          </div>
        ) : (
          /* Horizontal Scroll Container (With custom scroll-bar handling) */
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 p-6 bg-white no-scrollbar snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {products.map((product: any, idx: number) => {
              const productTitle = product.name || "Atelier Signature Piece";
              const productPrice = product.price || "0.00";
              const productImage = product.images?.[0]?.src || "";
              const archiveTag = product.sku ? `Edition • ${product.sku}` : "Summer Collection";

              return (
                <div 
                  key={product.id || idx} 
                  className="group cursor-pointer flex flex-col bg-[#FDFDFD] border border-neutral-100 rounded-2xl p-4 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-neutral-200/70 transition-all duration-500 min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] max-w-[350px] snap-start shrink-0"
                >
                  <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
                    
                    {/* Image Canvas Box */}
                    <div className="relative aspect-[3/4] bg-[#F9F9F9] rounded-xl mb-5 flex items-center justify-center overflow-hidden p-6 transition-all duration-700 group-hover:bg-[#F6F6F3]">
                      {productImage ? (
                        <img 
                          src={productImage} 
                          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-700 select-none" 
                          alt={productTitle} 
                        />
                      ) : (
                        <span className="text-[9px] font-black tracking-widest text-neutral-300 uppercase italic">
                          No Finish Loaded
                        </span>
                      )}
                      
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-neutral-800 text-[8px] font-black px-2.5 py-1 rounded border border-neutral-200/40 uppercase tracking-[2px] shadow-sm">
                        {archiveTag}
                      </div>
                    </div>

                    {/* Elite Typographic Content Framing */}
                    <div className="space-y-3 flex-1 px-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xs font-black uppercase text-neutral-900 tracking-wider group-hover:text-[#C5A358] transition-colors leading-tight max-w-[85%] truncate">
                          {productTitle}
                        </h3>
                        <ArrowUpRight size={14} className="text-neutral-300 group-hover:text-[#C5A358] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 duration-300" />
                      </div>
                      
                      <div className="flex items-baseline justify-between border-t border-neutral-100/70 pt-2.5">
                        <span className="text-[10px] text-neutral-400 font-serif italic uppercase tracking-wider">Acquisition</span>
                        <span className="text-base font-serif font-light italic text-neutral-950 tracking-tight">
                          ₹{parseFloat(productPrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                  </Link>

                  {/* High-End Minimalist Button */}
                  <Link href={`/product/${product.id}`} className="mt-5">
                    <button className="w-full py-3.5 bg-neutral-950 text-white rounded-xl text-[9px] font-black uppercase tracking-[3px] hover:bg-[#C5A358] transition-all duration-300 shadow-sm active:scale-[0.98]">
                      View Details
                    </button>
                  </Link>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeasonalTrends;