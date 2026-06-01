"use client";
import React, { useState, useEffect, useRef } from 'react';
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

// 🎯 DYNAMIC SUB-COMPONENT: Clean 3:4 portrait view without enclosing border frames
const ProductCardGridItem = ({ product, idx }: { product: any; idx: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root: null, rootMargin: "-15% 0px -15% 0px", threshold: 0.6 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const safeDecodeHtml = (str: string) => {
    if (!str) return "";
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  return (
    <div ref={cardRef} className="relative block group bg-white w-full text-left">
      {/* Invisible global interactive pardah layer preserved */}
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-50 cursor-pointer w-full h-full" aria-label={product.name} />
      
      <Reveal delay={0.03 * idx}>
        <div className="space-y-4 w-full">
          
          {/* 👑 FIXED HOUSING OVERHAUL: Stripped bg-fafafa, rounded-24px, and paddings completely */}
          <div className="relative aspect-[3/4] bg-white border border-neutral-100 overflow-hidden w-full mb-3 rounded-none">
            {product.images?.[0]?.src ? (
              <img 
                src={product.images[0].src} 
                alt={product.name}
                // 🔥 KINETIC INVERSION ENGINE: Sharp, high-dimension vertical lines with grayscale on hover/scroll
                className={`w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-all duration-[800ms] ease-out select-none mix-blend-multiply ${
                  isIntersecting 
                    ? 'grayscale-0 md:grayscale group-hover:grayscale-0' 
                    : 'grayscale md:grayscale group-hover:grayscale-0'
                }`} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-50 text-[9px] font-black text-neutral-300 uppercase tracking-widest rounded-none">No Image</div>
            )}
            
            {/* Elegant horizontal hover response anchor line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </div>

          {/* Product Typography Specifications metadata */}
          <div className="space-y-1 px-1 w-full">
            <div className="flex justify-between items-start gap-2 w-full">
              <h2 className="text-[11px] font-bold text-neutral-400 group-hover:text-black transition-colors line-clamp-1 uppercase tracking-[2px] leading-none">
                {safeDecodeHtml(product.name)}
              </h2>
              <span className="text-xs font-bold text-black tracking-tight leading-none mt-[-1px]">
                ${parseFloat(product.price || "0").toFixed(2)}
              </span>
            </div>
            <div className="text-[8px] font-black tracking-[1.5px] text-neutral-300 uppercase opacity-100 transition-opacity duration-300 italic pt-1">
              Series // 0{product.id ? product.id.toString().slice(-1) : 1}
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

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const colors = ["BLACK", "WHITE", "NAVY", "SUN KISSED BROWN", "PARADISE PINK"];
  const priceRanges = ["Under $100", "$100 - $300", "$300 - $600", "Above $600"];

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
            per_page: 50 
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

  const filteredProducts = products.filter((product) => {
    if (selectedColor) {
      const targetColor = selectedColor.toLowerCase();
      const nameMatch = product.name?.toLowerCase().includes(targetColor);
      const slugMatch = product.slug?.toLowerCase().includes(targetColor);
      const tagMatch = product.tags?.some((t: any) => t.name?.toLowerCase().includes(targetColor));
      if (!nameMatch && !slugMatch && !tagMatch) return false;
    }
    if (selectedPrice) {
      const price = parseFloat(product.price || "0");
      if (selectedPrice === "Under $100" && price >= 100) return false;
      if (selectedPrice === "$100 - $300" && (price < 100 || price > 300)) return false;
      if (selectedPrice === "$300 - $600" && (price < 300 || price > 600)) return false;
      if (selectedPrice === "Above $600" && price <= 600) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black">
        <div className="w-6 h-6 border-2 border-neutral-200 border-t-black rounded-full animate-spin mb-3" />
        <p className="text-[10px] font-black uppercase tracking-[4px] text-neutral-400">Loading Collection...</p>
      </div>
    );
  }

  if (!categoryData) {
    return <div className="text-center py-32 bg-white text-black">Collection Archive Empty.</div>;
  }

  const bannerImage = categoryData.image?.src || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1500";

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] antialiased select-none">
      
      {/* 1. Hero Banner Area */}
      <section className="px-4 lg:px-12 pt-28 lg:pt-36 max-w-[1450px] mx-auto">
        <Reveal imageSrc={bannerImage} delay={0.1} className="h-[40vh] md:h-[50vh] w-full rounded-none">
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
            <p className="text-[9px] font-black uppercase tracking-[6px] text-white/70 italic mb-2">Signature Edition</p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white tracking-tighter capitalize leading-none">
              {categoryData.name}
            </h1>
          </div>
        </Reveal>
      </section>

      {/* 2. Master Split Workspace Layout */}
      <main className="max-w-[1450px] mx-auto px-4 lg:px-12 pt-16 pb-20 bg-white">
        
        <div className="w-full flex items-center justify-between border-b border-gray-100 pb-4 mb-10 text-left">
          <p className="text-[10px] font-black uppercase tracking-[3px] text-neutral-400 italic">
            Showing {filteredProducts.length} of {products.length} Archival Artifacts
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* LEFT SIDEBAR: Static Filters Panel */}
          <aside className="col-span-1 lg:col-span-3 w-full space-y-10 pr-0 lg:pr-6 lg:sticky lg:top-28 text-left border-b lg:border-b-0 pb-8 lg:pb-0 border-neutral-100 z-40">
            
            <div className="space-y-4">
              <h4 className="text-[11px] font-black tracking-[3px] text-black uppercase">Filter by Color</h4>
              <div className="flex flex-row lg:flex-col flex-wrap gap-x-4 gap-y-2 lg:space-y-2.5 lg:gap-0">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={`text-[10px] font-bold tracking-[2px] uppercase text-left transition-all duration-300 ${
                      selectedColor === color 
                        ? 'text-black pl-0 lg:pl-2 border-b-2 lg:border-b-0 lg:border-l-2 border-black font-black' 
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 lg:pt-4 border-t border-neutral-100">
              <h4 className="text-[11px] font-black tracking-[3px] text-black uppercase">Price Range</h4>
              <div className="flex flex-row lg:flex-col flex-wrap gap-x-4 gap-y-2 lg:space-y-2.5 lg:gap-0">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedPrice(selectedPrice === range ? null : range)}
                    className={`text-[10px] font-bold tracking-[2px] uppercase text-left transition-all duration-300 ${
                      selectedPrice === range 
                        ? 'text-black pl-0 lg:pl-2 border-b-2 lg:border-b-0 lg:border-l-2 border-black font-black' 
                        : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {(selectedColor || selectedPrice) && (
              <button
                onClick={() => { setSelectedColor(null); setSelectedPrice(null); }}
                className="text-[9px] font-black tracking-[2px] uppercase border-b border-black pb-0.5 text-black mt-4 block hover:opacity-50 transition-opacity"
              >
                Reset Filters [x]
              </button>
            )}

          </aside>

          {/* RIGHT COLUMN: Switched data layer feed to connect high-height portrait component */}
          <section className="col-span-1 lg:col-span-9 w-full">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-neutral-400 text-xs uppercase tracking-widest">
                No matching pieces found for selected criteria.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12 w-full">
                {filteredProducts.map((product, idx) => (
                  <ProductCardGridItem key={product.id} product={product} idx={idx} />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}