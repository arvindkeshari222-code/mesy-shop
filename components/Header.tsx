"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronDown, User, Heart } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

interface SubItem {
  name: string;
  slug: string;
}

interface MenuItem {
  name: string;
  slug: string;
  subItems: SubItem[];
}

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenu, setMegaMenu] = useState<MenuItem[]>([]);
  
  // Premium Ordered Pillars
  const [collectionsItems, setCollectionsItems] = useState<MenuItem[]>([]);
  const [menItem, setMenItem] = useState<MenuItem | null>(null);
  const [womenItem, setWomenItem] = useState<MenuItem | null>(null);
  const [kidsItem, setKidsItem] = useState<MenuItem | null>(null);
  const [petsItem, setPetsItem] = useState<MenuItem | null>(null);

  const { cart, setIsCartOpen } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          
          // Color tags out
          const cleanData = data.filter((item: MenuItem) => 
            !['black', 'brown', 'navy', 'pink', 'white'].includes(item.slug)
          );

          // Find exact individual pillars
          setMenItem(cleanData.find((item: MenuItem) => item.slug === 'men') || null);
          setWomenItem(cleanData.find((item: MenuItem) => item.slug === 'women') || null);
          setKidsItem(cleanData.find((item: MenuItem) => item.slug === 'kids') || null);
          setPetsItem(cleanData.find((item: MenuItem) => item.slug === 'pets') || null);

          // Put everything else under collections
          const collections = cleanData.filter((item: MenuItem) => 
            !['men', 'women', 'kids', 'pets'].includes(item.slug)
          );
          setCollectionsItems(collections);
          setMegaMenu(cleanData);
        }
      } catch (err) {
        console.error("Luxury Categories load failed:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isSearchOpen]);

  const cleanName = (name: string) => {
    return name.replace(/&amp;/g, '&').replace(/&QUOT;/gi, '"');
  };

  // Helper component to render pillar dropdown with advanced hover protection
  const renderPillarDropdown = (item: MenuItem | null) => {
    if (!item || item.subItems.length === 0) return null;
    return (
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 bg-white border border-neutral-100 p-5 w-52 shadow-[0_20px_40px_rgba(0,0,0,0.04)] opacity-0 group-hover:opacity-100 invisible group-hover:visible z-[999] transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        {/* Anti-Flicker Protection Bridge */}
        <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />
        <div className="flex flex-col gap-3">
          {item.subItems.map((sub, idx) => (
            <Link 
              key={idx} 
              href={`/category/${sub.slug}`} 
              className="block text-[9px] font-semibold text-neutral-400 hover:text-neutral-950 uppercase tracking-[0.18em] transition-all duration-200 hover:translate-x-1"
            >
              {cleanName(sub.name)}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white z-[900] py-4 border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-sans font-light tracking-[0.5em] text-xl text-neutral-950 uppercase cursor-pointer transition-opacity hover:opacity-70">MESY</h1>
          </Link>
          
          {/* HIGH-END MINIMAL NAVIGATION (STRICT ORDER) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-12 gap-x-10">
            
            {/* 1️⃣ COLLECTIONS MEGA DROPDOWN */}
            {collectionsItems.length > 0 && (
              <div className="group static">
                <button className="text-[10px] font-bold uppercase text-neutral-900 group-hover:text-neutral-400 flex items-center gap-1.5 py-6 tracking-[0.25em] cursor-pointer bg-transparent border-none transition-colors duration-200">
                  COLLECTIONS <ChevronDown size={8} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* MEGA OVERLAY WITH ADVANCED TOP OFFSET PROTECTION */}
                <div className="absolute top-[80%] left-0 w-full bg-white border-b border-neutral-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible z-[999] transition-all duration-200 pointer-events-none group-hover:pointer-events-auto shadow-[0_30px_60px_rgba(0,0,0,0.02)]">
                  {/* Flicker Protection Box - Bridges the layout gap across different pages */}
                  <div className="absolute -top-8 left-0 w-full h-8 bg-transparent" />
                  
                  <div className="max-w-[1400px] mx-auto px-16 py-14">
                    <div className="grid grid-cols-5 gap-x-12 gap-y-12">
                      {collectionsItems.map((mainCat, idx) => (
                        <div key={idx} className="flex flex-col gap-4 border-r border-neutral-50 pr-4 last:border-none">
                          <Link href={`/category/${mainCat.slug}`} className="text-[10px] font-black text-neutral-950 tracking-[0.2em] hover:text-neutral-500 uppercase transition-colors">
                            {cleanName(mainCat.name)}
                          </Link>
                          <div className="flex flex-col gap-3">
                            {mainCat.subItems.map((sub, sIdx) => (
                              <Link 
                                key={sIdx} 
                                href={`/category/${sub.slug}`} 
                                className="text-[9px] font-semibold text-neutral-400 hover:text-neutral-950 uppercase tracking-[0.15em] transition-all duration-200 hover:translate-x-1"
                              >
                                {cleanName(sub.name)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2️⃣ MEN PILLAR */}
            {menItem && (
              <div className="group relative">
                <Link href={`/category/${menItem.slug}`} className="text-[10px] font-bold uppercase text-neutral-900 hover:text-neutral-400 flex items-center gap-1.5 transition-colors py-6 tracking-[0.25em] whitespace-nowrap">
                  {cleanName(menItem.name)} {menItem.subItems.length > 0 && <ChevronDown size={8} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                {renderPillarDropdown(menItem)}
              </div>
            )}

            {/* 3️⃣ WOMEN PILLAR */}
            {womenItem && (
              <div className="group relative">
                <Link href={`/category/${womenItem.slug}`} className="text-[10px] font-bold uppercase text-neutral-900 hover:text-neutral-400 flex items-center gap-1.5 transition-colors py-6 tracking-[0.25em] whitespace-nowrap">
                  {cleanName(womenItem.name)} {womenItem.subItems.length > 0 && <ChevronDown size={8} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                {renderPillarDropdown(womenItem)}
              </div>
            )}

            {/* 4️⃣ KIDS PILLAR */}
            {kidsItem && (
              <div className="group relative">
                <Link href={`/category/${kidsItem.slug}`} className="text-[10px] font-bold uppercase text-neutral-900 hover:text-neutral-400 flex items-center gap-1.5 transition-colors py-6 tracking-[0.25em] whitespace-nowrap">
                  {cleanName(kidsItem.name)} {kidsItem.subItems.length > 0 && <ChevronDown size={8} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                {renderPillarDropdown(kidsItem)}
              </div>
            )}

            {/* 5️⃣ PETS PILLAR */}
            {petsItem && (
              <div className="group relative">
                <Link href={`/category/${petsItem.slug}`} className="text-[10px] font-bold uppercase text-neutral-900 hover:text-neutral-400 flex items-center gap-1.5 transition-colors py-6 tracking-[0.25em] whitespace-nowrap">
                  {cleanName(petsItem.name)} {petsItem.subItems.length > 0 && <ChevronDown size={8} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                {renderPillarDropdown(petsItem)}
              </div>
            )}

          </nav>

          {/* RIGHT UTILITY ICONS */}
          <div className="flex items-center gap-7 text-neutral-950 flex-shrink-0">
            <Link href="https://dev-mesy.pantheonsite.io/my-account/" className="hidden sm:flex text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-900 hover:text-neutral-400 items-center gap-2 transition-colors">
              <User size={14} strokeWidth={2.5} /> SIGN IN
            </Link>
            
            <button type="button" onClick={() => setIsSearchOpen(true)} className="hover:opacity-50 transition-opacity">
              <Search size={16} strokeWidth={2.5} />
            </button>
            
            <Link href="/wishlist" className="hover:opacity-50 transition-opacity">
              <Heart size={16} strokeWidth={2.5} />
            </Link>

            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer hover:opacity-50 transition-opacity">
              <ShoppingBag size={16} strokeWidth={2.5} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-neutral-950 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold tracking-tight">
                  {cart.length}
                </span>
              )}
            </div>
            <Menu size={18} className="lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </header>

      {/* MOBILE INTERFACE */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[9999] p-8 text-black overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-sans font-light tracking-[0.4em] text-lg uppercase">MENU</h2>
            <X size={24} onClick={() => setIsMenuOpen(false)} className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-8">
            {megaMenu.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Link href={`/category/${item.slug}`} onClick={() => setIsMenuOpen(false)} className="text-base font-bold uppercase tracking-widest text-neutral-950">
                  {cleanName(item.name)}
                </Link>
                {item.subItems.length > 0 && (
                  <div className="pl-4 flex flex-col gap-3 border-l border-neutral-200 my-1">
                    {item.subItems.map((sub, idx) => (
                      <Link key={idx} href={`/category/${sub.slug}`} onClick={() => setIsMenuOpen(false)} className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        {cleanName(sub.name)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PORTAL SEARCH */}
      {isSearchOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex flex-col" onClick={() => setIsSearchOpen(false)}>
          <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-md" />
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="relative w-full bg-white border-b border-neutral-100 p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[1500px] mx-auto flex items-center gap-6">
              <Search size={22} className="text-neutral-900" />
              <form className="flex-1" onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); setIsSearchOpen(false); }}>
                <input 
                  ref={inputRef}
                  type="text" 
                  className="w-full text-xl font-light text-black uppercase tracking-[0.25em] focus:outline-none placeholder:text-neutral-300 bg-transparent" 
                  placeholder="Type to search..." 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </form>
              <button onClick={() => setIsSearchOpen(false)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">CLOSE</button>
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