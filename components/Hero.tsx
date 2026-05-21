"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Link property add ki gayi hai har slide ke liye
  const slides = [
    { title: "Summer", subtitle: "The Oasis Collection", label: "New Arrival", img: "/1.jpg", link: "/category/summer-edit" },
    { title: "Atelier", subtitle: "Refined Simplicity", label: "Exclusive 2026", img: "/2.jpg", link: "/category/atelier" },
    { title: "Wellness", subtitle: "ZenPulse Series", label: "Self Care", img: "/3.jpg", link: "/category/wellness" },
    { title: "Luxury", subtitle: "Premium Artifacts", label: "Limited Edition", img: "/4.jpg", link: "/category/vault" }
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (!mounted) return <div className="h-[750px] bg-gray-100 w-full" />;

  return (
    <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-black group">
      
      {/* Slides Loop */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
          }`}
        >
          {/* Poora slide ab ek Link hai */}
          <Link href={slide.link} className="relative block w-full h-full cursor-pointer">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-all duration-700" />
            </div>

            {/* Content */}
            <div className="relative w-full h-full flex items-center justify-center text-center z-20">
              <div className="space-y-4 px-6">
                <span className="inline-block text-[10px] font-black uppercase tracking-[5px] text-white border border-white/30 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                  {slide.label}
                </span>
                <h1 className="text-7xl md:text-[10rem] font-serif italic text-white leading-none tracking-tighter drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-[6px] drop-shadow-md">
                  {slide.subtitle}
                </p>
                
                <div className="pt-8">
                  <div className="inline-block px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[3px] rounded-sm group-hover:bg-[#C5A358] group-hover:text-white transition-all duration-500 shadow-xl">
                      Explore Now
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Navigation Arrows (Inhe Link ke bahar rakha hai taaki click handle ho sake) */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-6 pointer-events-none">
        <button 
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white hover:text-black transition-all duration-500 pointer-events-auto opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>

        <button 
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white hover:text-black transition-all duration-500 pointer-events-auto opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {slides.map((_, i) => (
          <div 
            key={i}
            onClick={(e) => { e.preventDefault(); setCurrentSlide(i); }}
            className={`h-[2px] transition-all duration-500 cursor-pointer ${
              i === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;