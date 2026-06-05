"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Loader2, Star, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { AnimatePresence, motion } from 'framer-motion';

const api= new (WooCommerceRestApi as any)({
  url: "https://dev-mesy.pantheonsite.io",
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY, 
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET, 
  version: "wc/v3",
  queryStringAuth: true,
});

const categoryColorMap: { [key: string]: string } = {
  "200": "BLACK ARCHIVE", "201": "PARADISE PINK", "202": "SUN KISSED BROWN", "203": "CRISP WHITE", "204": "NAVY ARCHIVE"
};

const ProductCardGridItem = ({ product, idx }: { product: any; idx: number }) => {
  const averageRating = parseFloat(product.average_rating || "0");
  const ratingCount = parseInt(product.rating_count || "0");
  
  // Best Seller logic only
  const isBestSeller = product.featured;

  return (
    <div className="relative block group bg-white w-full text-left">
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-40 cursor-pointer w-full h-full" />
      <Reveal delay={0.02 * idx}>
        <div className="space-y-3.5 w-full">
          {/* PREMIUM IMAGE bOX */}
          <div className="relative aspect-[3/4] bg-[#fcfcfc] overflow-hidden w-full transition-all duration-500 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-xs">
            {product.images?.[0]?.src ? (
              <img 
                src={product.images[0].src} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-[1200ms] ease-out" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-300 font-sans tracking-widest uppercase">Atelier Canvas</div>
            )}
            {product.stock_status === 'outofstock' && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-3xs flex items-center justify-center">
                <span className="text-[9px] font-black uppercase tracking-[4px] text-black bg-white px-3 py-1.5 border border-neutral-200/60 shadow-xs">Sold Out</span>
              </div>
            )}
          </div>
          
          {/* LABEL (Only Best Seller) */}
          <div className="px-0.5 min-h-[14px]">
             {isBestSeller && (
                <span className="text-[8px] font-bold tracking-[1.5px] uppercase text-black bg-neutral-100 px-1.5 py-0.5 rounded-xs">Best Seller</span>
             )}
          </div>

          {/* PRODUCT META */}
          <div className="space-y-1 px-0.5">
            <h2 className="text-[10px] font-bold text-neutral-400 group-hover:text-black transition-colors duration-300 line-clamp-1 uppercase tracking-[2.5px] font-sans">
              {product.name}
            </h2>
            
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-xs font-medium tracking-tight text-neutral-900 font-sans">
                ${parseFloat(product.price || "0").toFixed(2)}
              </span>
              
              {ratingCount > 0 ? (
                <div className="flex items-center gap-1 text-[10px] font-medium select-none font-sans">
                  <div className="text-[#C5A358] flex items-center"><Star size={10} fill="currentColor" strokeWidth={0} /></div>
                  <span className="text-neutral-800 font-bold">{averageRating.toFixed(1)}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  const [sortBy, setSortBy] = useState<string>('default');
  const [showInStockOnly, setShowInStockOnly] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("products/categories", { slug: slug });
        const cat = res.data?.[0];
        setCategoryData(cat);
        if (cat) {
            const prodRes = await api.get("products", { category: cat.id, per_page: 50, status: 'publish' });
            setProducts(prodRes.data);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    if (slug) fetchCategoryAndProducts();
  }, [slug]);

  const processedProducts = [...products]
    .filter(product => !showInStockOnly || product.stock_status === 'instock')
    .sort((a, b) => {
      if (sortBy === 'price-low') return parseFloat(a.price || '0') - parseFloat(b.price || '0');
      if (sortBy === 'price-high') return parseFloat(b.price || '0') - parseFloat(a.price || '0');
      return 0;
    });

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
          {processedProducts.map((product, idx) => <ProductCardGridItem key={product.id} product={product} idx={idx} />)}
        </div>
      </main>
    </div>
  );
}