"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || "";
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const executeSearch = async () => {
      if (!query.trim()) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // 🎯 FIXED PARAMETER: Passing 'search' keyword directly to parse backend data
        const response = await api.get("products", {
          search: String(query).trim(),
          per_page: 30
        });
        setResults(response.data || []);
      } catch (error) {
        console.error("Search Query Engine Error:", error);
      } finally {
        setLoading(false);
      }
    };

    executeSearch();
  }, [query]);

  const safeDecodeHtml = (str: string) => {
    if (!str) return "";
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black font-sans">
        <Loader2 className="animate-spin text-neutral-200 mb-3" size={22} />
        <p className="text-[10px] font-black uppercase tracking-[4px] text-neutral-400">Searching Archive...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black font-sans antialiased select-none">
      <main className="max-w-[1500px] mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-24">
        
        {/* HEADER TRACK METADATA */}
        <div className="w-full text-left border-b border-neutral-100 pb-6 mb-12">
          <p className="text-[9px] font-black uppercase tracking-[3px] text-neutral-400">Search Query Engine</p>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
            Results for: &ldquo;{query}&rdquo;
          </h1>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-2">
            Found {results.length} Matching Archival Artifacts
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-24 text-neutral-400 text-xs font-black uppercase tracking-widest">
            No dynamic pieces match your query reference.
          </div>
        ) : (
          /* 👑 ALO STYLE UNCONSTRAINED SHARP GRID (100% Matches your Category styling blueprint) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12 w-full">
            {results.map((product, idx) => (
              <div key={product.id} className="relative block group bg-white w-full text-left">
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-50 cursor-pointer w-full h-full" />
                
                <Reveal delay={0.03 * idx}>
                  <div className="space-y-4 w-full">
                    
                    {/* B&W to Color Kinetic Portrait Image Frame */}
                    <div className="relative aspect-[3/4] bg-white border border-neutral-100 overflow-hidden w-full mb-3 rounded-none">
                      {product.images?.[0]?.src ? (
                        <img 
                          src={product.images[0].src} 
                          alt={product.name}
                          className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.02] transition-all duration-[800ms] ease-out select-none mix-blend-multiply grayscale md:grayscale group-hover:grayscale-0" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-50 text-[9px] font-black text-neutral-300 uppercase tracking-widest">No Image</div>
                      )}
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                    </div>

                    {/* Metadata text stack */}
                    <div className="space-y-1 px-1 w-full">
                      <div className="flex justify-between items-start gap-2 w-full">
                        <h2 className="text-[11px] font-bold text-neutral-400 group-hover:text-black transition-colors line-clamp-1 uppercase tracking-[2px] leading-none">
                          {safeDecodeHtml(product.name)}
                        </h2>
                        <span className="text-xs font-bold text-black tracking-tight leading-none mt-[-1px]">
                          ${parseFloat(product.price || "0").toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[8px] font-black tracking-[1.5px] text-neutral-300 uppercase italic pt-1">
                        Series // 0{product.id ? product.id.toString().slice(-1) : 1}
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