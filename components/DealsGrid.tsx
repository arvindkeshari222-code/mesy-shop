"use client";
import React from 'react';
import Link from 'next/link';

export default function DealsGrid({ categories = [] }: { categories: any[] }) {
  
  // Custom filter functionality helper to extract precise matching child segments
  const getSubCategories = (parentSlug: string) => {
    const parent = categories.find(c => c.slug === parentSlug);
    if (!parent) return [];
    return categories
      .filter(c => c.parent === parent.id)
      .slice(0, 4); // Keep grid cleanly sliced into a 4 grid structure
  };

  // Luxury block alignment mapped accurately with your dynamic data slugs
  const blocksConfig = [
    { title: "Min. 35% off | Home Sanctuary", parentSlug: "home-sanctuary", linkLabel: "See all offers" },
    { title: "Up to 40% off | Tech Innovation", parentSlug: "tech-innovation", linkLabel: "Stores near you" },
    { title: "Up to 60% off | Beauty & Self-Care", parentSlug: "beauty-self-care", linkLabel: "Shop brands" },
    { title: "Up to 75% off | Wellness Archive", parentSlug: "wellness-body", linkLabel: "Small Businesses" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-6">
      {blocksConfig.map((card, idx) => {
        // WordPress sub-categories dynamically mapped here
        const dynamicItems = getSubCategories(card.parentSlug);

        return (
          <div key={idx} className="bg-white p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow justify-between rounded-sm border border-neutral-100/50">
            <div>
              {/* Dynamic Header Block Title */}
              <h2 className="text-[21px] font-bold text-[#111] mb-3 leading-7 h-14 overflow-hidden tracking-tighter">
                {card.title}
              </h2>
              
              {/* Clean Luxury Sub-Categories 2x2 Layout */}
              {dynamicItems.length === 0 ? (
                /* Fallback loading view parameter if category syncs data array */
                <div className="aspect-square bg-neutral-50/60 rounded flex items-center justify-center text-[10px] text-neutral-400 font-bold uppercase tracking-widest italic border border-dashed border-neutral-200">
                  Syncing Collection...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                  {dynamicItems.map((item: any, i: number) => {
                    const itemImage = item.image?.src || "";
                    const itemName = item.name || "Archive Unit";

                    return (
                      <Link key={item.id || i} href={`/category/${item.slug}`} className="flex flex-col cursor-pointer group">
                        
                        {/* Box layout embedding raw image url from asset buffer */}
                        <div className="bg-[#F7F8F8] aspect-square flex items-center justify-center overflow-hidden border border-gray-50 group-hover:opacity-90 transition-all p-3">
                          {itemImage ? (
                            <img 
                              src={itemImage} 
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 select-none" 
                              alt={itemName} 
                            />
                          ) : (
                            /* Fallback matching visual design indicators matching your taxonomy rules */
                            <span className="text-4xl opacity-30 select-none group-hover:scale-110 transition-transform duration-500">
                              {item.slug.includes('decor') || item.slug.includes('living') ? '🏺' : item.slug.includes('lab') || item.slug.includes('audio') ? '🎵' : '📦'}
                            </span>
                          )}
                        </div>

                        {/* Label Name */}
                        <span className="text-[12px] text-[#111] mt-1 font-medium truncate group-hover:text-neutral-600 transition-colors">
                          {itemName}
                        </span>

                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Premium Button Trigger Redirecting To Parent slugs */}
            <Link href={`/category/${card.parentSlug}`} className="mt-5 text-[13px] font-medium text-[#007185] hover:text-[#C7511F] hover:underline w-fit block">
              {card.linkLabel}
            </Link>

          </div>
        );
      })}
    </div>
  );
}