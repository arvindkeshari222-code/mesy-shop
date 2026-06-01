"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  productData?: {
    id: string | number;
    name: string;
    color?: string;
    price: string;
    image: string;
  };
}

export default function ProductCard({ productData }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Fallback production data structure
  const defaultProduct = {
    id: productData?.id || "65",
    name: productData?.name || "MESY Atelier 3-in-1 MagSafe Fast Charging Station",
    color: productData?.color || "White",
    price: productData?.price || "89.98",
    image: productData?.image || ""
  };

  useEffect(() => {
    // Native mobile center observer coupling
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalPrice = (parseFloat(defaultProduct.price) * quantity).toFixed(2);

  return (
    <div 
      ref={cardRef}
      className="w-full max-w-sm bg-white p-2 text-left font-sans antialiased select-none group/card flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* 🌌 THE ASPECT 3:4 IMAGE HOUSING (Blends into section background, rounded-none) */}
        <Link 
          href={`/product/${defaultProduct.id}`} 
          className="relative aspect-[3/4] bg-white overflow-hidden block border border-neutral-100"
        >
          {/* Mobile Scroll Active + Desktop Hover Color Activation Engine */}
          <img 
            src={defaultProduct.image || 'https://via.placeholder.com/600'} 
            alt={defaultProduct.name} 
            className={`w-full h-full object-cover object-center scale-100 group-hover/card:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isIntersecting 
                ? 'grayscale-0 md:grayscale group-hover/card:grayscale-0' 
                : 'grayscale md:grayscale group-hover/card:grayscale-0'
            }`} 
          />
          
          <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out bg-white/90 backdrop-blur-xs border-t border-neutral-200 hidden sm:block">
            <span className="text-[9px] font-black tracking-[2px] text-black block text-center uppercase">
              Quick View +
            </span>
          </div>
        </Link>

        {/* METADATA SPEC LABELS */}
        <div className="space-y-1.5 px-1">
          <Link href={`/product/${defaultProduct.id}`} className="block">
            <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-neutral-400 group-hover/card:text-black transition-colors line-clamp-1">
              {defaultProduct.name}
            </h3>
          </Link>
          <p className="text-[8px] font-bold uppercase tracking-[3px] text-neutral-300">
            Style Core: {defaultProduct.color}
          </p>
        </div>
      </div>

      {/* INTERACTIONS AND PRICES ROW */}
      <div className="space-y-4 pt-4 px-1">
        
        <div className="flex justify-between items-center border-t border-neutral-100 pt-4">
          {/* MINIMAL SHARP QUANTITY ENGINE */}
          <div className="flex items-center gap-4 bg-white border border-neutral-200 rounded-none px-3 py-1.5">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-neutral-400 hover:text-black transition-colors active:scale-95"
            >
              <Minus size={10} strokeWidth={3} />
            </button>
            <span className="text-[10px] font-black text-black min-w-[12px] text-center">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="text-neutral-400 hover:text-black transition-colors active:scale-95"
            >
              <Plus size={10} strokeWidth={3} />
            </button>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-black tracking-wide">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* FULL INVERSION ULTRA-LUXURY PURCHASE BUTTON */}
        <button className="group/btn relative w-full py-4 bg-white text-black border border-black text-center text-[9px] font-black uppercase tracking-[3px] rounded-none overflow-hidden transition-all duration-500 shadow-xs">
          <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">
            Acquire Series
          </span>
          <div className="absolute inset-0 bg-black scale-y-0 group-hover/btn:scale-y-100 origin-bottom transition-transform duration-300 ease-out z-0" />
        </button>

      </div>
    </div>
  );
}