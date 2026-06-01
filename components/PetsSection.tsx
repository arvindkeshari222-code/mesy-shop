"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PetsSection() {
  return (
    <div className="w-full bg-[#EFEFF1] rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
        <span className="text-[10px] font-black uppercase tracking-[4px] text-gray-400 italic">Companion Suite</span>
        <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter text-black uppercase">
          PETITE PAWS COLLECTIVE
        </h2>
        <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400 leading-relaxed">
          Premium signature accessories, custom architecture, and tech design objects curated for your pets.
        </p>
      </div>

      <div className="z-10 shrink-0">
        <Link 
          href="/category/pets" 
          className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[3px] rounded-full hover:bg-[#C5A358] transition-all duration-500 flex items-center gap-3 shadow-lg"
        >
          Explore Pets <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}