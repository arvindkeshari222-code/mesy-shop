"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WomenSection() {
  return (
    <div className="w-full bg-[#F5F3EF] rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
        <span className="text-[10px] font-black uppercase tracking-[6px] text-gray-400 italic">Sartorial Curation</span>
        <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter text-black uppercase">
          FEMININ SILHOUETTES
        </h2>
        <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400 leading-relaxed">
          Elegance reimagined through contemporary structures, luxury textures, and minimal aesthetics.
        </p>
      </div>

      <div className="z-10 shrink-0">
        <Link 
          href="/category/women" 
          className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[3px] rounded-full hover:bg-[#C5A358] transition-all duration-500 flex items-center gap-3 shadow-lg"
        >
          Explore Women <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}