"use client";
import React from 'react';
import Link from 'next/link';

export default function DealsGrid({ categories = [] }: { categories: any[] }) {
  
  // Custom filter helper to extract precise matching child segments from WordPress
  const getSubCategories = (parentSlug: string) => {
    const parent = categories.find(c => c.slug === parentSlug);
    if (!parent) return [];
    return categories
      .filter(c => c.parent === parent.id)
      .slice(0, 4); // Keep grid cleanly sliced into a 4-grid structure
  };

  // 🎯 LUXURY TAXONOMY ALIGNMENT: Slugs ko bilkul aapke WordPress backend ke sath match kar diya hai
  const blocksConfig = [
    { title: "Home & Sanctuary Series", parentSlug: "home-sanctuary", linkLabel: "Discover Spaces" },
    { title: "Tech & Innovation Elite", parentSlug: "tech-innovation", linkLabel: "Explore Ecosystem" },
    { title: "Seasonal & Trending Archive", parentSlug: "seasonal-trending", linkLabel: "View Lookbook" },
    { title: "Wellness & Body Atelier", parentSlug: "wellness-body", linkLabel: "Shop Essence" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 max-w-[1550px] mx-auto">
      {blocksConfig.map((card, idx) => {
        // WordPress sub-categories dynamically mapped here
        const dynamicItems = getSubCategories(card.parentSlug);

        return (
          <div key={idx} className="bg-white p-6 flex flex-col shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500 justify-between rounded-[32px] border border-gray-50 group">
            <div>
              {/* Dynamic Header Block Title */}
              <h2 className="text-xl font-serif italic text-black mb-5 tracking-tight h-12 overflow-hidden flex items-center">
                {card.title}
              </h2>
              
              {/* Clean Luxury Sub-Categories 2x2 Layout */}
              {dynamicItems.length === 0 ? (
                /* Fallback sleek view if category data is syncing */
                <div className="aspect-square bg-[#F9F9FB] rounded-[24px] flex items-center justify-center text-[9px] text-gray-400 font-bold uppercase tracking-[3px] border border-gray-100">
                  Syncing Series...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {dynamicItems.map((item: any, i: number) => {
                    const itemImage = item.image?.src || "";
                    const itemName = item.name || "Archive Unit";

                    return (
                      <Link key={item.id || i} href={`/category/${item.slug}`} className="flex flex-col cursor-pointer group/item">
                        
                        {/* Box layout embedding image url without ugly padding */}
                        <div className="bg-[#F9F9FB] aspect-square flex items-center justify-center overflow-hidden rounded-[20px] border border-gray-50 group-hover/item:border-yellow-100/70 transition-all duration-500">
                          {itemImage ? (
                            <img 
                              src={itemImage} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 select-none" 
                              alt={itemName} 
                            />
                          ) : (
                            /* Luxury Fallback Monogram text replacement instead of raw emojis */
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Label Name */}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-2 truncate group-hover/item:text-black transition-colors px-1">
                          {itemName}
                        </span>

                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Premium Button Trigger Redirecting To Parent slugs */}
            <Link href={`/category/${card.parentSlug}`} className="mt-6 text-[10px] font-black uppercase tracking-[2px] text-black border-b border-black pb-0.5 w-fit block hover:text-[#C5A358] hover:border-[#C5A358] transition-all">
              {card.linkLabel}
            </Link>

          </div>
        );
      })}
    </div>
  );
}