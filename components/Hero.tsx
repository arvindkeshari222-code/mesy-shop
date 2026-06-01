"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setMouse(prev => ({ ...prev, targetX: x, targetY: y }));
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId: number;
    const tick = () => {
      setMouse(prev => ({
        ...prev,
        x: prev.x + (prev.targetX - prev.x) * 0.08,
        y: prev.y + (prev.targetY - prev.y) * 0.08
      }));
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return <div className="w-full h-screen bg-[#030303]" />;

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#030303] select-none font-sans antialiased text-white"
    >
      {/* 🌌 VIDEO LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div 
          className="w-full h-full relative"
          style={{
            transform: `scale(1.03) translate(${mouse.x * 10}px, ${mouse.y * -10}px) rotate(${mouse.x * 0.5}deg)`,
            transition: 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)'
          }}
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center grayscale-[25%] brightness-[45%] contrast-[110%]">
            <source src="/hero-campaign.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/60 z-10" />
      </div>

      {/* 👑 PREMIUM TEXT ENGINE */}
      <div className="relative w-full h-full flex flex-col justify-between z-20 px-6 md:px-16 pt-32 pb-20 max-w-[1440px] mx-auto">
        
        {/* TOP SPEC BAR */}
        <div className="w-full flex justify-between items-center text-[8px] font-black tracking-[6px] text-neutral-400 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A358] rounded-full animate-ping" />
            <span className="text-neutral-300">MESY STUDIO // ONLINE ATELIER</span>
          </div>
          <div>COLLECTION NO. 01</div>
        </div>

        {/* LUXURY EDITORIAL INSCRIPTION */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end my-auto">
          
          <div className="lg:col-span-8 text-left space-y-2">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                className="text-4xl sm:text-6xl md:text-[7.5rem] lg:text-[8.5rem] font-extralight tracking-[-2px] leading-[0.95] uppercase"
              >
                PRIVATE
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="text-4xl sm:text-6xl md:text-[7.5rem] lg:text-[8.5rem] font-black tracking-[4px] text-transparent leading-[0.95] uppercase italic"
                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.9)" }}
              >
                ARCHIVE<span className="text-[#C5A358] not-italic font-light">.</span>
              </motion.h1>
            </div>
          </div>

          {/* EXCLUSIVE REASONING & BUTTON */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-4 space-y-8 text-left lg:pb-4"
          >
            <p className="text-[10px] md:text-xs font-medium text-neutral-400 uppercase tracking-[4px] leading-relaxed max-w-sm">
              Our studio items are curated in high-demand volumetric drops. Sign up below for direct allocation and early priority access.
            </p>

            <div className="flex flex-row gap-4 items-center w-full">
              <Link 
                href="/category/the-summer-edit" 
                className="group relative flex-1 sm:flex-none px-10 py-4 bg-white text-black text-[9px] font-black uppercase tracking-[3px] rounded-[1px] text-center overflow-hidden transition-all duration-500 border border-white hover:bg-black hover:border-black shadow-2xl min-w-[160px]"
              >
                <span className="relative z-10 block transition-colors duration-500 group-hover:text-white tracking-[4px]">
                  Enter Atelier
                </span>
                <div className="absolute inset-0 bg-black scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-[450ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM METADATA */}
        <div className="w-full flex justify-between items-end border-t border-white/5 pt-6 text-[8px] font-bold text-neutral-500 tracking-[4px]">
          <div>AUTUMN // WINTER EDIT // 2026</div>
          <div className="flex items-center gap-3">
            <span>EXPLORE DROP</span>
            <div className="w-1.5 h-1.5 bg-[#C5A358] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;