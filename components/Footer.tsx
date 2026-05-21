"use client";
import React from 'react';
import { Globe, Globe2 } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 w-full">
      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white py-4 text-xs font-bold transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="bg-[#232f3e] text-white py-14">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-3">
            <h4 className="font-bold text-base mb-4">Get to Know Us</h4>
            <p className="text-gray-300 hover:underline cursor-pointer">About MESY</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Careers</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Press Releases</p>
            <p className="text-gray-300 hover:underline cursor-pointer">MESY Science</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-base mb-4">Connect with Us</h4>
            <p className="text-gray-300 hover:underline cursor-pointer">Facebook</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Twitter</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Instagram</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-base mb-4">Make Money with Us</h4>
            <p className="text-gray-300 hover:underline cursor-pointer">Sell on MESY</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Supply to MESY</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Become an Affiliate</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Advertise Your Products</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-base mb-4">Let Us Help You</h4>
            <p className="text-gray-300 hover:underline cursor-pointer">Your Account</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Returns Centre</p>
            <p className="text-gray-300 hover:underline cursor-pointer">100% Purchase Protection</p>
            <p className="text-gray-300 hover:underline cursor-pointer">Help</p>
          </div>
        </div>

        {/* Logo & Language Area */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col items-center gap-6">
          <div className="text-3xl font-serif italic font-black tracking-tighter">MESY.</div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 border border-gray-600 px-4 py-1.5 rounded-sm text-xs cursor-pointer hover:border-white">
                <Globe size={14} /> <span>English</span>
             </div>
             <div className="flex items-center gap-2 border border-gray-600 px-4 py-1.5 rounded-sm text-xs cursor-pointer hover:border-white">
                <span className="text-[#C5A358] font-bold">₹</span> <span>INR - Indian Rupee</span>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="bg-[#131a22] text-white py-10 px-6">
        <div className="max-w-[1000px] mx-auto text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-gray-400">
            <span className="hover:underline cursor-pointer">Conditions of Use & Sale</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
          </div>
          <p className="text-[11px] text-gray-500 italic">
            © 2026, MESY Global Atelier, Inc. or its affiliates. Built with Next.js 16.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;