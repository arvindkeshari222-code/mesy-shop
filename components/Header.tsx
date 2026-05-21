"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, User, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext'; 
import CartDrawer from '@/components/CartDrawer';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cart, setIsCartOpen } = useCart();

  const megaMenu = [
    { name: "Summer", slug: "the-summer-edit", subItems: [] },
    {
      name: "Beauty",
      slug: "beauty-self-care",
      subItems: [
        { name: "Grooming Lab", slug: "grooming-lab" },
        { name: "Organizer Edit", slug: "organizer-edit" }
      ]
    },
    {
      name: "Home",
      slug: "home-sanctuary",
      subItems: [
        { name: "Atelier Decor", slug: "atelier-decor" },
        { name: "Aura Lighting", slug: "aura-lighting" }
      ]
    },
    {
      name: "Tech",
      slug: "tech-innovation",
      subItems: [
        { name: "Audio Edit", slug: "audio-edit" },
        { name: "Desktop Essence", slug: "desktop-essence" },
        { name: "Mobile Suite", slug: "mobile-suite" }
      ]
    },
    { name: "Vault", slug: "winter-archive", subItems: [] }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full transition-all duration-500 z-[1000] py-6 ${isScrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white'}`}>
        <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between">
          <Link href="/"><h1 className="font-serif italic text-black text-2xl cursor-pointer">MESY<span className="text-[#C5A358]">.</span></h1></Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-12">
            {megaMenu.map((item, i) => (
              <div 
                key={i} 
                className="relative py-2 group" 
                onMouseEnter={() => setActiveDropdown(item.name)} 
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={item.subItems.length > 0 ? '#' : `/category/${item.slug}`} className="text-[10px] font-black uppercase tracking-[4px] text-gray-400 group-hover:text-black transition-colors flex items-center gap-1">
                  {item.name}
                  {item.subItems.length > 0 && <ChevronDown size={10} />}
                </Link>
                
                <AnimatePresence>
                  {item.subItems.length > 0 && activeDropdown === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      /* 🚨 POSITION FIXED: left-0 lagaya taaki sub-menu theek usi main item ke left side se bilkul neeche aligned khule */
                      className="absolute top-full left-0 w-max min-w-[220px] bg-white border border-gray-100 shadow-xl rounded-2xl p-2 mt-2 z-[1002]"
                    >
                      {/* Invisible Hover Bridge Bridge to protect pointer movement */}
                      <div className="absolute top-[-15px] left-0 w-full h-[15px] bg-transparent" />
                      
                      {item.subItems.map((sub, idx) => (
                        <Link 
                          key={idx} 
                          href={`/category/${sub.slug}`} 
                          onClick={() => setActiveDropdown(null)}
                          className="text-[10px] font-bold text-gray-400 hover:text-black block py-3 px-5 uppercase tracking-[2px] rounded-xl hover:bg-gray-50 transition-all text-left"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* UTILITIES RIGHT */}
          <div className="flex items-center gap-6">
            <Search size={18} className="text-gray-400 cursor-pointer" />
            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
              <ShoppingBag size={19} className="text-black" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[7px] w-3.5 h-3.5 flex items-center justify-center rounded-full">{cart.length}</span>}
            </div>
            <Menu size={22} className="lg:hidden text-black cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </header>

      {/* MOBILE SLIDER DRAWER SIDEBAR */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black z-[2000]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 right-0 h-full w-[300px] bg-white z-[2001] shadow-2xl p-6 flex flex-col overflow-y-auto text-black">
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="font-serif italic text-xl">Navigation</span>
                  <X size={20} className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setIsMenuOpen(false)} />
                </div>
                <div className="flex flex-col gap-6">
                  {megaMenu.map((item, i) => (
                    <div key={i} className="space-y-3">
                      <Link href={`/category/${item.slug}`} onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-[3px] text-black block">{item.name}</Link>
                      {item.subItems.map((sub, idx) => (
                        <Link key={idx} href={`/category/${sub.slug}`} onClick={() => setIsMenuOpen(false)} className="text-[11px] font-medium text-gray-500 uppercase tracking-[1.5px] block pl-3 border-l border-gray-100">{sub.name}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CartDrawer />
    </>
  );
};

export default Header;