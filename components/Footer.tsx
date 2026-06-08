"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing:", email);
    setEmail(""); // Email clear karne ke liye after submit
  };

  return (
    <footer className="w-full bg-black text-white font-sans antialiased border-t border-neutral-900 select-none mt-32">
      
      {/* BACK TO TOP BUTTON */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white py-4 text-[9px] font-black uppercase tracking-[4px] transition-all duration-300 border-b border-neutral-900"
      >
        Back to top ↑
      </button>

      {/* NEWSLETTER ROW */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-12 border-b border-neutral-900">
        <div className="max-w-xl">
          <h3 className="text-[11px] font-black tracking-[3px] uppercase text-white mb-6">
            Sign up for Mesy newsletter
          </h3>
          <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white py-2.5">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              className="w-full bg-transparent text-xs font-bold tracking-[2px] uppercase focus:outline-none placeholder:text-neutral-700 text-white pr-10"
              required
            />
            <button type="submit" className="absolute right-0 text-neutral-400 hover:text-white transition-colors">
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* LINKS MATRIX */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-left">
        
        {/* COLUMN 1: SUPPORT */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black tracking-[3px] uppercase text-white">Support</h4>
          <div className="flex flex-col gap-3 text-[10px] font-bold text-neutral-400 uppercase tracking-[1.5px]">
            <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Info</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link>
            {/* 🎯 CONTACT US LINK DIRECTLY CONNECTED TO YOUR /app/contact-us/page.js */}
            <Link href="/contact-us" className="hover:text-white transition-colors text-white">Contact Us</Link>
          </div>
        </div>

        {/* COLUMN 2: LEGAL */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black tracking-[3px] uppercase text-white">Legal</h4>
          <div className="flex flex-col gap-3 text-[10px] font-bold text-neutral-400 uppercase tracking-[1.5px]">
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* COLUMN 3: HQ / BRAND INFO */}
        <div className="space-y-4 md:col-span-2">
          <h4 className="text-[10px] font-black tracking-[3px] uppercase text-white">MESY STUDIO NY</h4>
          <div className="text-[10px] font-medium text-neutral-500 uppercase tracking-[1.5px] space-y-2 leading-relaxed">
            <p>HQ: 350 5th Ave, Manhattan, New York, NY 10118</p>
            <p>Digital Concierge: <span className="text-neutral-300">mesyshop1@gmail.com</span></p>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="bg-neutral-950 text-neutral-500 py-8 px-6 text-center text-[9px] font-bold uppercase tracking-[1px] border-t border-neutral-900">
        © 2026, MESY STUDIO INC. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;