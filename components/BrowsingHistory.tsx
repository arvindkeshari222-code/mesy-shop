"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BrowsingHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Browser memory se data nikalne ke liye
  useEffect(() => {
    const savedHistory = localStorage.getItem('mesy_browsing_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Agar user ne kuch nahi dekha toh section chhupa do (Amazon Style)
  if (history.length === 0) {
    return (
      <section className="bg-white p-6 my-6 max-w-[1500px] mx-auto shadow-sm rounded-sm border border-gray-100">
        <h2 className="text-xl font-bold text-[#111] mb-2">Inspired by your browsing history</h2>
        <p className="text-sm text-gray-500">Your recently viewed items will appear here as you shop.</p>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 my-6 max-w-[1500px] mx-auto shadow-sm rounded-sm border border-gray-100 group relative">
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="text-xl font-bold text-[#111]">Inspired by your browsing history</h2>
        <button 
          onClick={() => { localStorage.removeItem('mesy_browsing_history'); setHistory([]); }}
          className="text-xs text-blue-600 hover:underline"
        >
          Clear history
        </button>
      </div>

      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2">
        <ChevronLeft size={20} />
      </button>

      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg border border-gray-100 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2">
        <ChevronRight size={20} />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        {history.map((item, idx) => (
          <div key={idx} className="min-w-[160px] max-w-[160px] flex flex-col group/item cursor-pointer">
            <div className="bg-[#fcfcfc] aspect-square rounded-md flex items-center justify-center border border-gray-50 group-hover/item:border-gray-200 transition-all overflow-hidden mb-2">
              <span className="text-5xl group-hover/item:scale-110 transition-transform duration-500">{item.img || "📦"}</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] text-[#007185] hover:text-[#C7511F] line-clamp-1">{item.name}</p>
              <p className="text-sm font-bold text-black">₹{item.price}</p>
              <p className="text-[10px] text-gray-400 font-medium">Recently viewed</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowsingHistory;