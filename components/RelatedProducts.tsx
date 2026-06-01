"use client";
import React from 'react';
import Link from 'next/link';

interface RelatedProductsProps {
  products: any[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-28 border-t border-gray-100 pt-16">
      {/* Premium Elegant Heading like Amazon / Luxury Brands */}
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-3xl font-serif italic tracking-tighter text-black">
          You May Also Archive <span className="text-[#C5A358]">.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 italic">Curated Selection</p>
      </div>

      {/* Grid Engine Responsive layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.slice(0, 4).map((product: any) => {
          const productImg = product.images?.[0]?.src || "/placeholder.jpg";
          const regularPrice = product.regular_price;
          const currentPrice = product.price;
          const showSale = regularPrice && parseFloat(regularPrice) > parseFloat(currentPrice);

          return (
            <Link 
              href={`/product/${product.slug}`} 
              key={product.id} 
              className="group flex flex-col space-y-4 cursor-pointer"
            >
              {/* Product Card Image Canvas */}
              <div className="aspect-[3/4] w-full bg-[#fafafa] rounded-[24px] overflow-hidden p-6 border border-gray-50 flex items-center justify-center relative shadow-sm transition-all duration-500 group-hover:shadow-md">
                <img 
                  src={productImg} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain select-none transition-transform duration-700 group-hover:scale-105" 
                />
                {showSale && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Sale
                  </span>
                )}
              </div>

              {/* Product Metadata Context */}
              <div className="space-y-1 px-1">
                <h3 className="text-sm font-medium text-neutral-800 line-clamp-1 group-hover:text-black transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-sm font-black italic text-black">
                    ${currentPrice}
                  </span>
                  {showSale && (
                    <span className="text-xs text-gray-400 line-through font-light">
                      ${regularPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}