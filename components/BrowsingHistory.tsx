"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const BrowsingHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Browser local storage se history fetch karne ke liye
  useEffect(() => {
    const savedHistory = localStorage.getItem('mesy_browsing_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error parsing history json", e);
      }
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // 🎯 LUXURY STANDARD: Agar user ne koi product nahi dekha hai, toh flat message dikhane ke bajay 
  // poore section ka parda gira do (hide kar do) taaki empty space na dikhe.
  if (history.length === 0) return null;

  return (
    <section className="bg-white py-8 px-6 my-6 max-w-[1550px] mx-auto shadow-sm rounded-[32px] border border-gray-50 group relative">
      <div className="flex items-baseline justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif italic text-black">
            Inspired By <span className="text-gray-300">Your History</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#C5A358]">
            Your Recently Viewed Items
          </p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('mesy_browsing_history'); setHistory([]); }}
          className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 hover:text-black transition-colors"
        >
          Clear History
        </button>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-4 top-[50%] z-30 w-10 h-10 bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={() => scroll('right')} 
        className="absolute right-4 top-[50%] z-30 w-10 h-10 bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <ChevronRight size={20} />
      </button>

      {/* History Grid Loop */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4">
        {history.map((item, idx) => (
          <Link 
            href={`/product/${item.id}`}
            key={idx} 
            className="min-w-[180px] max-w-[180px] flex flex-col group/item cursor-pointer"
          >
            <div className="relative aspect-square bg-[#F9F9FB] rounded-[20px] overflow-hidden mb-3 border border-gray-50 group-hover/item:border-yellow-200 transition-all duration-500">
              {/* Real image display with fallback placeholder */}
              <img 
                src={item.image || item.images?.[0]?.src || 'https://via.placeholder.com/200'} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
              />
            </div>
            
            <div className="space-y-1 px-1">
              <h3 className="text-xs font-serif italic text-black line-clamp-1 group-hover/item:text-[#C5A358] transition-colors">
                {item.name}
              </h3>
              
              {/* 💸 FIXED CURRENCY: Ab real dollar notation dikhayega */}
              <p className="text-sm font-light text-black tracking-tighter">
                ${item.price ? parseFloat(item.price).toFixed(2) : "0.00"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrowsingHistory;