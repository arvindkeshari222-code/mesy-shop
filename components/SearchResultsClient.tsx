"use client";
import React from 'react';
import Link from 'next/link';

export default function SearchResultsClient({ allProducts, query }: { allProducts: any[], query: string }) {
  // Yahan logic hai: Agar query matching hai toh filter karo
  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen py-32 px-6 md:px-20 font-sans">
      <h1 className="text-4xl text-center font-serif italic mb-20">Results for: "{query}"</h1>
      
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {filtered.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block border p-2">
              <div className="aspect-[3/4] bg-neutral-50 mb-4">
                <img src={product.images?.[0]?.src} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <h2 className="text-[11px] uppercase tracking-[0.2em]">{product.name}</h2>
              <p className="text-[10px] italic">${parseFloat(product.price || 0).toFixed(2)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-400">No products found. Try typing another keyword.</p>
      )}
    </div>
  );
}