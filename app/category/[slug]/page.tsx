"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Loader2, Star, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { AnimatePresence, motion } from 'framer-motion';

export default function CategoryPage() {
  const { slug } = useParams();
  
  // FIX: api ko yahan initialize karo taaki environment variables load ho sakein
  const api = useMemo(() => {
    return new (WooCommerceRestApi as any)({
      url: process.env.NEXT_PUBLIC_WOO_URL || "https://dev-mesy.pantheonsite.io",
      consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
      consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
      version: "wc/v3",
      queryStringAuth: true,
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showInStockOnly, setShowInStockOnly] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      // Basic check ki keys load hui ya nahi
      if (!process.env.NEXT_PUBLIC_WC_CONSUMER_KEY) return;
      
      try {
        setLoading(true);
        const res = await api.get("products/categories", { slug: slug });
        const cat = res.data?.[0];
        setCategoryData(cat);
        if (cat) {
          const prodRes = await api.get("products", { category: cat.id, per_page: 50, status: 'publish' });
          setProducts(prodRes.data);
        }
      } catch (err) { 
        console.error("API Error:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    
    if (slug) fetchCategoryAndProducts();
  }, [slug, api]);

  const processedProducts = [...products]
    .filter(product => !showInStockOnly || product.stock_status === 'instock')
    .sort((a, b) => {
      if (sortBy === 'price-low') return parseFloat(a.price || '0') - parseFloat(b.price || '0');
      if (sortBy === 'price-high') return parseFloat(b.price || '0') - parseFloat(a.price || '0');
      return 0;
    });

  // ProductCardGridItem component ko yahan function ke bahar rakho ya yahan use karo
  // (Main ne code chota karne ke liye yahan logic rakh diya hai)

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] font-sans">
      <main className="max-w-[1400px] mx-auto px-4 lg:px-10 pt-32 pb-24">
        <header className="text-center space-y-3 mb-16">
          <p className="text-[9px] font-bold uppercase tracking-[7px] text-neutral-400">MESY ATELIER</p>
          <h1 className="text-4xl font-serif font-light italic text-neutral-900 capitalize">{categoryData?.name?.toLowerCase()}</h1>
        </header>

        <section className="border-y border-neutral-100 py-3.5 flex items-center justify-between mb-12 text-[11px] font-medium text-neutral-800">
            <button onClick={() => setShowInStockOnly(!showInStockOnly)} className={`uppercase tracking-wider ${showInStockOnly ? 'underline' : ''}`}>Available Now</button>
            <div className="relative">
                <button onClick={() => setIsSortOpen(!isSortOpen)} className="uppercase tracking-wider flex items-center gap-1">Sort <ChevronDown size={12} /></button>
                <AnimatePresence>
                {isSortOpen && (
                    <motion.div className="absolute right-0 mt-3 w-40 bg-white border border-neutral-100 p-1 z-50">
                        {[{v:'default', l:'Default'}, {v:'price-low', l:'Price: Low-High'}, {v:'price-high', l:'Price: High-Low'}].map(opt => (
                            <button key={opt.v} onClick={() => { setSortBy(opt.v); setIsSortOpen(false); }} className="block w-full text-left p-2 hover:bg-neutral-50">{opt.l}</button>
                        ))}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12">
          {processedProducts.map((product, idx) => (
             <div key={product.id}>
                {/* Product UI yahan daal do */}
                <h2 className="text-[10px] uppercase">{product.name}</h2>
             </div>
          ))}
        </div>
      </main>
    </div>
  );
}