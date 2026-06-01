"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Zap, MapPin, Star, ShieldCheck, Truck, RotateCcw, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductProps {
  product: {
    id: string | number;
    name: string;
    brand?: string;
    price: string;
    regular_price?: string;
    oldPrice?: string;
    category?: string;
    categories?: any[];
    img?: string;
    images?: any[];
    description: string;
  };
}

const ProductView = ({ product }: ProductProps) => {
  const [qty, setQty] = useState(1);
  
  // 🎯 DYNAMIC IMAGE HANDLER: WooCommerce images array se real assets nikalega
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [{ src: product.img || "https://via.placeholder.com/600" }];
    
  const [selectedImg, setSelectedImg] = useState(productImages[0].src);

  // Agar async state badle toh selection automatic zero index par align ho jaye
  useEffect(() => {
    if (productImages[0]?.src) {
      setSelectedImg(productImages[0].src);
    }
  }, [product]);

  // Pricing format variables clean parameters logic execution
  const rawPrice = parseFloat(product.price || "0.00");
  const oldPrice = parseFloat(product.regular_price || product.oldPrice || "0.00");
  const subtotal = (rawPrice * qty).toFixed(2);

  // Fallback labels configuration parameters
  const brandLabel = product.brand || "MESY ATELIER";
  const categoryLabel = product.categories?.[0]?.name || product.category || "Luxury Artifact";

  return (
    <div className="max-w-[1550px] mx-auto px-6 py-12 bg-white text-black selection:bg-[#C5A358] selection:text-white">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* 1. LEFT: GALLERY (Ultra Clean Dynamic System) */}
        <div className="lg:w-[45%]">
          <div className="sticky top-32 flex gap-6">
            
            {/* Dynamic Thumbnails Sidebar from WooCommerce API array buffer */}
            {productImages.length > 1 && (
              <div className="hidden md:flex flex-col gap-4">
                {productImages.map((img: any, i: number) => (
                  <motion.div 
                    key={img.id || i} 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImg(img.src)}
                    className={`w-16 h-20 border rounded-xl cursor-pointer overflow-hidden p-1 transition-all duration-300 ${
                      selectedImg === img.src ? 'border-[#C5A358] shadow-sm bg-white' : 'border-gray-100 hover:border-gray-300 bg-[#F9F9FB]'
                    }`}
                  >
                    <img src={img.src} className="w-full h-full object-cover rounded-lg" alt="thumb" />
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Main Stage Panel Area */}
            <div className="flex-1 relative group">
              <div className="aspect-[4/5] bg-[#F9F9FB] rounded-[40px] flex items-center justify-center p-8 overflow-hidden border border-gray-50">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={selectedImg}
                  src={selectedImg} 
                  className="w-full h-full object-cover rounded-[24px] transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>
              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                <Heart size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE: INFO (Luxury Minimal Spacing) */}
        <div className="lg:w-[30%] space-y-8">
          <div className="space-y-3">
            <span className="inline-block text-[9px] font-black uppercase tracking-[4px] text-[#C5A358] bg-[#C5A358]/5 px-3 py-1 rounded-full">
              {brandLabel} • {categoryLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif italic leading-tight tracking-tight text-black">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-[#C5A358]">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" className="text-[#C5A358]" />)}
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px]">1.2k Reviews</span>
            </div>
          </div>

          {/* 💸 PRICE FILTER CONVERTED TO DYNAMIC DOLLAR MATRIX */}
          <div className="space-y-1.5 py-5 border-y border-gray-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-light tracking-tighter text-black">${rawPrice.toFixed(2)}</span>
              {oldPrice > rawPrice && (
                <span className="text-sm text-gray-300 line-through font-light">${oldPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">In Stock • Ready to Ship</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[2px] text-black">The Detail</h3>
            <div 
              className="text-sm text-gray-500 font-serif italic leading-relaxed prose-sm"
              dangerouslySetInnerHTML={{ __html: product.description }} // WordPress raw HTML render compliance
            />
            <ul className="space-y-3 pt-4 border-t border-gray-50">
              {["Handcrafted Excellence", "Premium Materials", "Signature Atelier Design"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-gray-700">
                  <div className="w-1.5 h-1.5 bg-[#C5A358] rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. RIGHT: THE ULTRA BUY BOX PANEL CAPSULE */}
        <div className="lg:w-[25%]">
          <div className="bg-[#F9F9FB] border border-gray-50 rounded-[32px] p-6 space-y-6 sticky top-32 shadow-xl shadow-black/5">
            <div className="space-y-2">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Subtotal</span>
                    <span className="text-2xl font-light text-black tracking-tighter">${subtotal}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-gray-400 uppercase font-bold tracking-wider">
                    <MapPin size={11} className="text-[#C5A358]" /> Deliver to Obra, 231219
                </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="relative group">
                <label className="absolute -top-2 left-4 px-2 bg-[#F9F9FB] text-[8px] font-black uppercase tracking-widest text-gray-400">Quantity</label>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full bg-transparent border border-gray-200 rounded-xl py-3.5 px-4 text-xs font-bold appearance-none outline-none focus:border-black transition-all cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} className="text-black">{n} Unit{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              <button className="w-full bg-black text-white py-4 mt-2 rounded-full text-[10px] font-black uppercase tracking-[3px] hover:bg-[#C5A358] transition-all duration-500 shadow-lg shadow-black/5 active:scale-95">
                Add to Bag
              </button>
              
              <button className="w-full bg-white border border-black text-black py-4 rounded-full text-[10px] font-black uppercase tracking-[4px] hover:bg-gray-50 transition-all duration-500 flex items-center justify-center gap-2 active:scale-95">
                <Zap size={12} fill="currentColor" /> Buy it Now
              </button>
            </div>

            {/* Trust Micro-icons Matrix alignment */}
            <div className="pt-5 border-t border-gray-100 flex justify-between px-2">
                <div className="flex flex-col items-center gap-1.5">
                    <Truck size={14} className="text-gray-400" />
                    <span className="text-[7px] font-black uppercase text-gray-400 tracking-wider">White Glove</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <RotateCcw size={14} className="text-gray-400" />
                    <span className="text-[7px] font-black uppercase text-gray-400 tracking-wider">30-D Return</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <ShieldCheck size={14} className="text-gray-400" />
                    <span className="text-[7px] font-black uppercase text-gray-400 tracking-wider">Guaranteed</span>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductView;