"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

const USERNAME = "aviji646"; 
const APP_PASSWORD = "8Eqp fSio etIJ KAoc qIpR SOL6";
const authHeader = typeof window === 'undefined' 
  ? Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64')
  : btoa(`${USERNAME}:${APP_PASSWORD}`);

const api = new (WooCommerceRestApi as any)({
  url: "https://dev-mesy.pantheonsite.io",
  consumerKey: "ck_9304120bd6878947f779772c8e03d522eb450ad9",
  consumerSecret: "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73",
  version: "wc/v3",
  queryStringAuth: true,
  axiosConfig: {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + authHeader
    }
  }
});

export default function CategoryPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const catRes = await api.get("products/categories", { 
          slug: String(slug).trim() 
        });
        
        const category = catRes.data?.[0];
        setCategoryData(category);

        if (category) {
          const prodRes = await api.get("products", { 
            category: category.id, 
            per_page: 20 
          });
          setProducts(prodRes.data);
        }
      } catch (error) {
        console.error("Category Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCategoryAndProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black">
        <Loader2 className="animate-spin text-neutral-200 mb-3" size={22} />
        <p className="text-[10px] font-black uppercase tracking-[4px] text-neutral-400">Loading Collection...</p>
      </div>
    );
  }

  if (!categoryData) {
    return <div className="text-center py-32 bg-white text-black">Collection Archive Empty.</div>;
  }

  const bannerImage = categoryData.image?.src || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1500";

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] antialiased">
      
      {/* 1. Hero Banner Area */}
      <section className="px-4 lg:px-12 pt-28 lg:pt-36 max-w-[1450px] mx-auto">
        <Reveal imageSrc={bannerImage} delay={0.1} className="h-[40vh] md:h-[50vh] w-full">
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
            <p className="text-[9px] font-black uppercase tracking-[6px] text-white/70 italic mb-2">Signature Edition</p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white tracking-tighter capitalize leading-none">
              {categoryData.name}
            </h1>
          </div>
        </Reveal>
      </section>

      {/* 2. Products Grid System */}
      <main className="max-w-[1450px] mx-auto px-4 lg:px-12 pt-16 pb-20 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-10">
          <p className="text-[10px] font-black uppercase tracking-[3px] text-neutral-400 italic">
            Showing {products.length} Archival Artifacts
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-neutral-400 text-xs uppercase tracking-widest">No pieces currently listed.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
            {products.map((product, idx) => (
              <div 
                key={product.id} 
                className="relative block group bg-white"
              >
                {/* 🚨 THE BULLETPROOF LAYER: Yeh invisible link pure card ke upar ek transparent parda daal deta hai. User kahin bhi touch kare, click direct is par hoga! */}
                <Link 
                  href={`/product/${product.id}`}
                  className="absolute inset-0 z-50 cursor-pointer w-full h-full"
                  aria-label={product.name}
                />

                {/* Animation component standard flow */}
                <Reveal delay={0.03 * idx}>
                  <div className="space-y-4">
                    {/* Product Image Frame */}
                    <div className="aspect-[3/4] bg-[#fafafa] rounded-[24px] border border-neutral-50 flex items-center justify-center p-6 relative overflow-hidden transition-all duration-500 group-hover:shadow-sm">
                      {product.images?.[0]?.src ? (
                        <img 
                          src={product.images[0].src} 
                          className="max-h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105 select-none" 
                          alt={product.name} 
                        />
                      ) : (
                        <div className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">No Image</div>
                      )}
                    </div>

                    {/* Product Metadata Details */}
                    <div className="space-y-1.5 px-2">
                      <div className="flex justify-between items-start gap-2">
                        <h2 className="text-xs font-bold text-neutral-800 tracking-tight group-hover:text-black transition-colors line-clamp-1 uppercase">
                          {product.name}
                        </h2>
                        <span className="text-xs font-light tracking-tight text-black italic">
                          ${product.price || "0.00"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[2px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 italic">
                        View Piece <ArrowRight size={10} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}