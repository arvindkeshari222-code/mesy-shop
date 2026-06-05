"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronDown, User, Heart } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, setIsCartOpen } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  const megaMenu = [
    { name: "Summer", slug: "the-summer-edit", subItems: [] },
    { name: "Beauty", slug: "beauty-self-care", subItems: [{ name: "Grooming Lab", slug: "grooming-lab" }, { name: "Organizer Edit", slug: "organizer-edit" }] },
    { name: "Home", slug: "home-sanctuary", subItems: [{ name: "Atelier Decor", slug: "atelier-decor" }, { name: "Aura Lighting", slug: "aura-lighting" }, { name: "Culinary Arts", slug: "culinary-arts" }] },
    { name: "Tech", slug: "tech-innovation", subItems: [{ name: "Audio Edit", slug: "audio-edit" }, { name: "Desktop Essence", slug: "desktop-essence" }, { name: "Mobile Suite", slug: "mobile-suite" }] },
    { name: "MEN", slug: "men", subItems: [] },
    { name: "WOMEN", slug: "women", subItems: [] },
    { name: "Kids", slug: "kids", subItems: [{ name: "Toys & Collectibles", slug: "toys-collectibles" }] },
    { name: "PETS", slug: "pets", subItems: [] },
    { name: "Vault", slug: "winter-archive", subItems: [] }
  ];

  return (
    <>
      <header className="fixed top-0 w-full bg-white z-[900] py-6 border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <h1 className="font-sans font-light tracking-[0.4em] text-2xl text-black uppercase cursor-pointer">MESY</h1>
          </Link>
          
          {/* MODERN MEGA MENU */}
         <nav className="hidden lg:flex gap-8">
  {megaMenu.map((item, i) => (
    <div key={i} className="group relative">
      <Link href={`/category/${item.slug}`} className="text-[10px] font-black uppercase text-black hover:text-gray-500 flex items-center gap-1 transition-colors py-4">
        {item.name} {item.subItems.length > 0 && <ChevronDown size={10} />}
      </Link>
      
      {/* FIXED MEGA MENU: Gap khatam kiya aur z-index badhaya */}
      {item.subItems.length > 0 && (
        <div className="absolute top-full left-0 hidden group-hover:block bg-white border border-gray-100 p-4 w-48 shadow-xl z-[999]">
          {item.subItems.map((sub, idx) => (
            <Link 
              key={idx} 
              href={`/category/${sub.slug}`} 
              className="block py-2 text-[10px] font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-all hover:translate-x-1"
            >
              {sub.name.replace('&amp;', '&')}
            </Link>
          ))}
        </div>
      )}
    </div>
  ))}
</nav>

          <div className="flex items-center gap-6 text-black">
            <Link href="https://dev-mesy.pantheonsite.io/my-account/" className="flex text-[10px] font-black uppercase tracking-[2px] hover:text-gray-500 items-center gap-1.5">
              <User size={16} /> SIGN IN
            </Link>
            
            <button type="button" onClick={() => setIsSearchOpen(true)} className="pointer-events-auto">
              <Search size={18} className="cursor-pointer hover:text-gray-500 transition-colors" />
            </button>
            
            <Link href="/wishlist" className="cursor-pointer hover:text-gray-500 transition-colors">
              <Heart size={18} />
            </Link>

            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer hover:text-gray-500 transition-colors">
              <ShoppingBag size={18} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
            </div>
            <Menu size={22} className="lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[9999] p-6 text-black overflow-y-auto">
          <X size={30} onClick={() => setIsMenuOpen(false)} className="cursor-pointer mb-10" />
          <div className="flex flex-col gap-6">
            {megaMenu.map((item, i) => (
              <div key={i}>
                <Link href={`/category/${item.slug}`} onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase">{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTAL SEARCH - HIGH VISIBILITY & CLICKABLE */}
      {isSearchOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col" onClick={() => setIsSearchOpen(false)}>
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="relative w-full bg-white border-b border-black p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[1500px] mx-auto flex items-center gap-6">
              <Search size={24} className="text-black" />
              <form className="flex-1" onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); setIsSearchOpen(false); }}>
                <input 
                  ref={inputRef}
                  type="text" 
                  className="w-full text-2xl font-medium text-black uppercase tracking-[0.2em] focus:outline-none placeholder:text-gray-400 bg-transparent" 
                  placeholder="SEARCH PRODUCTS..." 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </form>
              <button onClick={() => setIsSearchOpen(false)} className="text-[10px] font-black uppercase tracking-[0.2em] text-black">CLOSE</button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
      <CartDrawer />
    </>
  );
};
export default Header;