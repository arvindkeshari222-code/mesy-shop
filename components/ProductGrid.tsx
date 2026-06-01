"use client";
import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface ProductGridProps {
  products?: any[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products = [], title = "Featured Collections" }) => {
  
  // Agar page se array pass na ho, toh safety filter text display block
  const displayItems = products && products.length > 0 ? products : [];

  if (displayItems.length === 0) return null;

  return (
    <section className="w-full py-8 px-6 bg-white my-6 max-w-[1550px] mx-auto shadow-sm rounded-[32px] border border-gray-50 group">
      
      {/* Luxury Header Bar */}
      <div className="flex justify-between items-baseline mb-8 select-none">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif italic text-black">
            {title.split(' ')[0]} <span className="text-gray-300">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-[#C5A358]">
            MESY Atelier Signature Pieces
          </p>
        </div>
        <Link href="/shop" className="text-xs font-bold text-black border-b border-black cursor-pointer hover:text-[#C5A358] hover:border-[#C5A358] transition-all">
          View All
        </Link>
      </div>

      {/* Fully Responsive Grid Matrix Structure */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayItems.map((product) => {
          const productTitle = product.name || "Atelier Core Artifact";
          const productPrice = product.price || "0.00";
          const productImage = product.images?.[0]?.src || product.image || "";
          const reviewCount = product.rating_count || product.reviews || "0";

          return (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group/item flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image Container with Luxury Fluid Aspect */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F9FB] rounded-[24px] border border-gray-50 group-hover/item:border-yellow-200 transition-all duration-500">
                  <img 
                    src={productImage || 'https://via.placeholder.com/400'} 
                    alt={productTitle}
                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
                  />
                  {product.on_sale && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      Sale
                    </div>
                  )}
                </div>

                {/* Details Typography Block */}
                <div className="p-2 space-y-1.5 mt-2">
                  <p className="text-[10px] font-bold text-[#C5A358] uppercase tracking-widest">
                    {product.brands?.[0]?.name || "ATELIER EDITIONS"}
                  </p>
                  <h3 className="text-sm font-serif italic text-black group-hover/item:text-[#C5A358] transition-colors line-clamp-1">
                    {productTitle}
                  </h3>
                  
                  {/* Fine-tuned Monochromatic Star Ratings */}
                  <div className="flex items-center gap-1 select-none">
                    <div className="flex text-[#C5A358]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < 4 ? "#C5A358" : "none"} className={i < 4 ? "text-[#C5A358]" : "text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 ml-1">({reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Interaction Layer */}
              <div className="mt-3 p-2 pt-0 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-light text-black tracking-tighter">
                    ${parseFloat(productPrice).toFixed(2)}
                  </span>
                </div>
                
                {/* Luxury Bag Bag Button Icon */}
                <button className="bg-black text-white p-3 rounded-full hover:bg-[#C5A358] transition-all duration-500 shadow-xl shadow-black/5 active:scale-95">
                  <ShoppingBag size={14} />
                </button>
              </div>

            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;