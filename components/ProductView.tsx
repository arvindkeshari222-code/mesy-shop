"use client";
import React, { useState } from 'react';
import { ShoppingCart, Zap, MapPin, Star, ShieldCheck, Truck, RotateCcw, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: string;
    oldPrice?: string;
    category: string;
    img: string;
    description: string;
  };
}

const ProductView = ({ product }: ProductProps) => {
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(product.img);

  return (
    <div className="max-w-[1550px] mx-auto px-6 py-12 bg-white text-black selection:bg-[#C5A358] selection:text-white">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* 1. LEFT: GALLERY (Ultra Clean) */}
        <div className="lg:w-[45%]">
          <div className="sticky top-32 flex gap-6">
            {/* Thumbnails Sidebar */}
            <div className="hidden md:flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImg(product.img)}
                  className={`w-16 h-16 border rounded-xl cursor-pointer p-2 transition-all duration-300 ${
                    selectedImg === product.img ? 'border-[#C5A358] shadow-md' : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <img src={product.img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                </motion.div>
              ))}
            </div>
            
            {/* Main Stage */}
            <div className="flex-1 relative group">
              <div className="aspect-[4/5] bg-[#F9F9FB] rounded-[40px] flex items-center justify-center p-12 overflow-hidden border border-gray-50">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={selectedImg}
                  src={selectedImg} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-[2s] ease-out"
                />
              </div>
              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                <Heart size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE: INFO (Luxury Spacing) */}
        <div className="lg:w-[30%] space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[6px] text-[#C5A358]">
              {product.brand} • {product.category}
            </span>
            <h1 className="text-4xl font-serif italic leading-tight tracking-tight text-black">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex text-[#C5A358]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">1.2k Reviews</span>
            </div>
          </div>

          <div className="space-y-1 py-4 border-y border-gray-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-light tracking-tighter">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-300 line-through">₹{product.oldPrice}</span>
              )}
            </div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">In Stock • Ready to Ship</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-black">The Detail</h3>
            <p className="text-sm text-gray-500 font-serif italic leading-relaxed">
              {product.description}
            </p>
            <ul className="space-y-3 pt-2">
              {["Handcrafted Excellence", "Premium Materials", "Signature Atelier Design"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-700">
                  <div className="w-1 h-1 bg-[#C5A358] rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. RIGHT: THE ULTRA BUY BOX */}
        <div className="lg:w-[25%]">
          <div className="bg-[#F9F9FB] border border-gray-100 rounded-[32px] p-8 space-y-6 sticky top-32 shadow-xl shadow-gray-100/50">
            <div className="space-y-2">
                <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-gray-400 uppercase">Subtotal</span>
                    <span className="text-2xl font-light text-black">₹{Number(product.price.replace(/,/g, '')) * qty}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                    <MapPin size={12} className="text-[#C5A358]" /> Deliver to Obra, 231219
                </div>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <label className="absolute -top-2 left-4 px-2 bg-[#F9F9FB] text-[8px] font-black uppercase tracking-widest text-gray-400">Quantity</label>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full bg-transparent border border-gray-200 rounded-xl py-4 px-4 text-xs font-bold appearance-none outline-none focus:border-black transition-all"
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Unit{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              <button className="w-full bg-black text-white py-5 rounded-full text-[10px] font-black uppercase tracking-[4px] hover:bg-[#C5A358] transition-all duration-500 shadow-lg shadow-black/10 active:scale-95">
                Add to Bag
              </button>
              
              <button className="w-full bg-white border border-black text-black py-5 rounded-full text-[10px] font-black uppercase tracking-[4px] hover:bg-gray-50 transition-all duration-500 flex items-center justify-center gap-2">
                <Zap size={14} fill="currentColor" /> Buy it Now
              </button>
            </div>

            {/* Trust Micro-icons */}
            <div className="pt-6 border-t border-gray-200 flex justify-between">
                <div className="flex flex-col items-center gap-1">
                    <Truck size={16} className="text-gray-400" />
                    <span className="text-[7px] font-black uppercase text-gray-400">Fast Ship</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <RotateCcw size={16} className="text-gray-400" />
                    <span className="text-[7px] font-black uppercase text-gray-400">Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={16} className="text-gray-400" />
                    <span className="text-[7px] font-black uppercase text-gray-400">Secure</span>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductView;