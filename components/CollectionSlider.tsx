"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link'; // 🚨 NEXT.JS LINK IMPORT KIYA

const miniCollections = [
  { name: "Summer", slug: "summer", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80", tag: "Trending", price: "From ₹1,499" },
  { name: "Atelier", slug: "atelier", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80", tag: "Elite", price: "Premium Tech" },
  { name: "Heritage", slug: "heritage", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&q=80", tag: "Limited", price: "Handcrafted" },
  { name: "Glow", slug: "glow", img: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=600&q=80", tag: "Organic", price: "Skin & Glow" },
  { name: "Sanctuary", slug: "sanctuary", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", tag: "Modern", price: "Home Decor" },
  { name: "The Vault", slug: "the-vault", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", tag: "Rare", price: "Exclusive" },
];

const MiniShowcase = () => {
  return (
    <section className="py-20 bg-white px-4 relative z-30">
      <div className="max-w-[1550px] mx-auto">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {miniCollections.map((item, i) => (
            /* 🚨 SYSTEM CHANGE: Pure Wrapper ko standard Link block banaya */
            <Link 
              key={i}
              href={`/category/${item.slug}`}
              className="relative block group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="relative aspect-[3/4.5] rounded-[24px] overflow-hidden bg-[#F9F9FB] w-full h-full"
              >
                {/* Image layout layer */}
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 pointer-events-none" 
                  alt={item.name} 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500 pointer-events-none" />

                {/* Top Glass Badge */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[7px] font-black uppercase tracking-[2.5px] px-2.5 py-1.5 rounded-full shadow-2xl">
                    {item.tag}
                  </span>
                </div>

                {/* Floating Action Button */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0 pointer-events-none">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-6 left-0 right-0 px-5 space-y-1 z-10 pointer-events-none">
                  <h3 className="text-lg font-serif italic text-white tracking-tighter transition-all duration-500 group-hover:text-[#C5A358]">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                      {item.price}
                    </p>
                    <div className="h-[1px] flex-1 bg-white/20 ml-3" />
                  </div>
                </div>

                {/* Interaction Border */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 rounded-[24px] pointer-events-none" />
                
                {/* 🚨 THE ROCK-SOLID OVERRIDE BUTTON Layer: Pure animation grid ke upar absolute top screen par events ko bypass karegi */}
                <div className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer pointer-events-auto" />
              </motion.div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default MiniShowcase;