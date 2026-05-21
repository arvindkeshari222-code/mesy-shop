"use client";
import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function MobileSection({ products = [] }: { products: any[] }) {
  
  // Agar server se real arrays na aayein toh empty matrix protection setup
  const displayItems = products && products.length > 0 ? products : [];

  return (
    <section className="w-full px-4 py-6 bg-white my-4 shadow-sm rounded-sm border border-neutral-100/40">
      
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-5 select-none">
        <div className="space-y-0.5">
          <h2 className="text-lg font-black text-neutral-900 tracking-tight uppercase">
            New Arrivals Archive
          </h2>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
            Latest Boutique Additions
          </p>
        </div>
        <Link href="/shop" className="text-neutral-500 hover:text-black text-xs font-black uppercase tracking-wider underline underline-offset-4 decoration-neutral-200">
          See all
        </Link>
      </div>

      {/* Fully Responsive Grid Container: Mobile: 2 Col | Tablet/Desktop: 4 Col */}
      {displayItems.length === 0 ? (
        <div className="text-center py-12 text-xs font-bold text-neutral-400 uppercase tracking-widest italic">
          Configuring Live Stream Assets...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayItems.map((item: any, idx: number) => {
            const productTitle = item.name || "Atelier New Piece";
            const productPrice = item.price || "0.00";
            const productImage = item.images?.[0]?.src || "";
            const primaryBadge = item.sku ? `SKU • ${item.sku}` : "New Drop";
            const reviewCount = item.rating_count || "12";

            return (
              <Link 
                key={item.id || idx} 
                href={`/product/${item.id}`} 
                className="border border-neutral-100 rounded-xl p-3 flex flex-col justify-between hover:border-neutral-300 hover:shadow-sm transition-all bg-[#FCFCFC]"
              >
                <div>
                  {/* Canvas Image Container Box */}
                  <div className="bg-white aspect-square rounded-lg flex items-center justify-center overflow-hidden p-3 border border-neutral-50 relative group">
                    {productImage ? (
                      <img 
                        src={productImage} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 select-none" 
                        alt={productTitle} 
                      />
                    ) : (
                      <span className="text-[10px] font-black text-neutral-300 uppercase tracking-wider">
                        No View
                      </span>
                    )}
                  </div>
                  
                  {/* Details Data block */}
                  <div className="space-y-1.5 mt-4">
                    <span className="bg-[#CC0C39] text-white text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider block w-fit">
                      {primaryBadge}
                    </span>
                    <h3 className="text-xs font-bold text-neutral-800 line-clamp-1 group-hover:text-black">
                      {productTitle}
                    </h3>
                    
                    {/* Stars and rating block data */}
                    <div className="flex items-center gap-1 select-none">
                      <Star size={10} fill="#FFA41C" className="text-[#FFA41C]" />
                      <Star size={10} fill="#FFA41C" className="text-[#FFA41C]" />
                      <Star size={10} fill="#FFA41C" className="text-[#FFA41C]" />
                      <Star size={10} fill="#FFA41C" className="text-[#FFA41C]" />
                      <span className="text-[9px] font-bold text-neutral-400 ml-0.5">({reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Secure Price calculation output wrapper */}
                <p className="text-sm font-black text-neutral-900 mt-3 tracking-tight">
                  ₹{parseFloat(productPrice).toLocaleString('en-IN')}
                </p>

              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}