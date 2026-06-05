"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Star } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }: { product: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="group relative w-full"
  >
    <Link href={`/product/${product.id}`} className="block overflow-hidden bg-neutral-100 aspect-[3/4] mb-6 relative">
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        src={product.images?.[0]?.src} 
        alt={product.name} 
        className="w-full h-full object-cover" 
      />
      {product.featured && <span className="absolute top-4 left-4 text-[8px] bg-white px-3 py-1 tracking-[0.2em] uppercase font-bold z-10 shadow-sm">Best</span>}
    </Link>
    
    <div className="space-y-1.5 px-1">
      <h2 className="text-[12px] uppercase tracking-[0.2em] font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
        {product.name.replace('&amp;', '&')}
      </h2>
      <div className="flex justify-between items-center">
        <p className="text-[11px] text-neutral-500 font-serif italic">${parseFloat(product.price || 0).toFixed(2)}</p>
        {product.average_rating > 0 && (
           <div className="flex items-center gap-1">
             <div className="flex text-[#C5A358]">
               {[...Array(5)].map((_, i) => <Star key={i} size={9} fill={i < Math.round(product.average_rating) ? "currentColor" : "none"} />)}
             </div>
           </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default function CategoryPage() {
  const { slug } = useParams();
  const api = useMemo(() => new (WooCommerceRestApi as any)({
    url: "https://dev-mesy.pantheonsite.io",
    consumerKey: "ck_e5c365c8d863e7f8966714bbff4fd3090a7bc6fd", 
    consumerSecret: "cs_eb0baf2c94304850809aeebf46a1382811c3e7da", 
    version: "wc/v3",
    queryStringAuth: true,
  }), []);

  const [products, setProducts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("products/categories", { slug });
      const cat = res.data?.[0];
      setCategoryData(cat);
      if (cat) {
        const pRes = await api.get("products", { category: cat.id, per_page: 50 });
        setProducts(pRes.data);
      }
    };
    if (slug) fetchData();
  }, [slug, api]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeFilter === 'available') list = list.filter(p => p.stock_status === 'instock');
    if (activeFilter === 'low-high') list.sort((a, b) => a.price - b.price);
    if (activeFilter === 'high-low') list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, activeFilter]);

  return (
    <div className="bg-white min-h-screen py-24 px-6 md:px-20 font-sans">
      <motion.header 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-24 text-center"
      >
        {/* FIX: Yahan .replace('&amp;', '&') add kiya hai */}
        <h1 className="text-6xl md:text-9xl font-serif font-thin italic text-neutral-900 mb-6">
            {categoryData?.name?.replace('&amp;', '&')}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-6 text-[9px] uppercase tracking-[0.3em] text-neutral-400">
           {[{id:'all', label:'All Items'}, {id:'available', label:'Available Now'}, {id:'low-high', label:'Price: Low-High'}, {id:'high-low', label:'Price: High-Low'}].map(f => (
             <button key={f.id} onClick={() => setActiveFilter(f.id)} className={`transition-all ${activeFilter === f.id ? 'text-black font-bold underline underline-offset-8' : 'hover:text-black'}`}>
               {f.label}
             </button>
           ))}
        </div>
      </motion.header>

      <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
        <AnimatePresence>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}