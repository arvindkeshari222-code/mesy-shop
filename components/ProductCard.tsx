"use client";
import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react'; // Premium icon logic

// Mock data structures
const product = {
  name: "MESY Atelier 3-in-1 MagSafe Fast Charging Station for iPhone 17/16/15, Apple Watch & AirPods",
  color: "White",
  price: "89.98",
  image: "path/to/your/image.png"
};

export default function ProductCard() {
  const [quantity, setQuantity] = useState(2);

  // --- Premium Calculation Sequence ---
  const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] p-10 flex flex-col items-center justify-center">
      
      {/* 💳 MAIN CARD MATRIX FRAMEWORK 💳 */}
      <div className="w-full max-w-sm bg-white p-6 rounded-[32px] border border-gray-50/50 shadow-sm transition-all hover:shadow-lg space-y-6">
        
        {/* TOP INTERACTION LAYER: Image & Name */}
        <div className="flex gap-4 items-start">
          <div className="w-20 h-20 bg-[#fbfbfb] rounded-2xl flex items-center justify-center p-3 border border-gray-100 overflow-hidden shrink-0">
            {/* 🚨 Dynamic image integration mapping logic */}
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-gray-900 leading-tight line-clamp-3">
              {product.name}
            </h3>
            {/* Color definition binding */}
            <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-300 italic">
              Color: {product.color}
            </p>
          </div>
        </div>

        {/* BOTTOM EXECUTION LAYER: Quantity & Pricing */}
        <div className="flex justify-between items-end border-t border-gray-50 pt-6">
          
          {/* 🚨 DYNAMIC QUANTITY SELECTOR MATRIX (FIXED COLORING) 🚨 */}
          <div className="flex items-center gap-6 bg-gray-50/50 border border-gray-100/50 rounded-full px-5 py-2.5 scale-90 -ml-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              // Text coloring logic integration
              className="text-gray-300 hover:text-black transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-black italic tracking-tight text-black">
              {quantity} {/* State binding executed here */}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              // Text coloring logic integration
              className="text-gray-300 hover:text-black transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Pricing data sync block */}
          <div className="text-right">
            <span className="text-2xl font-light tracking-tighter italic text-black underline underline-offset-4 decoration-gray-100">
              ${totalPrice}
            </span>
            <p className="text-[9px] font-black uppercase text-gray-300 tracking-[3px] italic mt-1">
              Atelier Archive Price
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}