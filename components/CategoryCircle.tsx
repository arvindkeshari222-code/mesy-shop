"use client";
import React from 'react';
import Link from 'next/link';

export default function CategoryColorGrid() {
  const colors = [
    { name: "SUN KISSED BROWN", id: 202, desc: "A resort-ready shade that's ready for your next getaway.", img: "https://dev-mesy.pantheonsite.io/wp-content/uploads/2026/06/S0feb13d13e1241f0b1ff586489ad7610a.jpg_960x960q75.jpg_.avif", hex: "#825C4D", textColor: "text-white" },
    { name: "PARADISE PINK", id: 201, desc: "Bold, bright, and bound to make a statement.", img: "https://dev-mesy.pantheonsite.io/wp-content/uploads/2026/06/Sc0e763d9bd5945c18341af2c0ce283a5J.webp", hex: "#FF8DC5", textColor: "text-white" },
    { name: "NAVY", id: 204, desc: "This modern classic is bolder, bluer, and goes with everything.", img: "https://dev-mesy.pantheonsite.io/wp-content/uploads/2026/06/Sf7068f0e3d98488da3b5a3589a979d1aT.jpg_960x960q75.jpg_.avif", hex: "#262C38", textColor: "text-white" },
    { name: "WHITE", id: 203, desc: "Head-to-toe or paired with bright hues, crisp white always works.", img: "https://dev-mesy.pantheonsite.io/wp-content/uploads/2026/06/S90f7c9542237402c8b845a364a89e9cec.jpg_960x960q75.jpg_.avif", hex: "#FFFFFF", textColor: "text-black" },
    { name: "BLACK", id: 200, desc: "The studio-to-street classic you can always count on.", img: "https://dev-mesy.pantheonsite.io/wp-content/uploads/2026/06/Sc34684f8b8d9409491b7c09c4787ac7eI.jpg_960x960q75.jpg_.avif", hex: "#000000", textColor: "text-white" },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 max-w-[1500px] mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight uppercase text-black">Shop by Color</h2>
      </div>
      
      {/* Grid spacing aur layout perfect Alo Yoga jaisa flex/gap set kiya hai */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full">
        {colors.map((c) => (
          <Link href={`/category/${c.id}`} key={c.id} className="group block w-full flex flex-col text-left">
            
            {/* Image Box */}
            <div className="w-full aspect-[3/4] overflow-hidden bg-neutral-100">
              <img 
                src={c.img} 
                alt={c.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105" 
              />
            </div>
            
            {/* Content Box - Image ke niche solid color, pure layout alignment mapping */}
            <div 
              className={`w-full p-4 md:p-5 flex flex-col justify-between flex-grow min-h-[140px] ${c.textColor}`}
              style={{ backgroundColor: c.hex }}
            >
              <div>
                <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-wider leading-tight">{c.name}</h3>
                <p className="text-[12px] mt-2 opacity-90 leading-normal line-clamp-3">
                  {c.desc}
                </p>
              </div>
              <div className="mt-4">
                <span className="text-[9px] font-medium tracking-wide underline underline-offset-4">
                  Shop {c.name.toLowerCase()}
                </span>
              </div>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
}