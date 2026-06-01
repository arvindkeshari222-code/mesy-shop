"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, setIsCartOpen } = useCart();

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
          <h1 className="font-sans font-light tracking-[0.4em] text-2xl text-black uppercase cursor-pointer">
            MESY
          </h1>
        </Link>
          
          {/* DESKTOP MEGA MENU */}
          <nav className="hidden lg:flex gap-8">
            {megaMenu.map((item, i) => (
              <div key={i} className="group relative">
                <Link href={`/category/${item.slug}`} className="text-[10px] font-black uppercase text-black hover:text-gray-500 flex items-center gap-1">
                  {item.name} {item.subItems.length > 0 && <ChevronDown size={10} />}
                </Link>
                {/* Desktop Dropdown */}
                {item.subItems.length > 0 && (
                  <div className="absolute top-full left-0 hidden group-hover:block bg-white border p-4 w-48 shadow-xl">
                    {item.subItems.map((sub, idx) => (
                      <Link key={idx} href={`/category/${sub.slug}`} className="block py-2 text-[10px] font-bold text-gray-500 hover:text-black uppercase">{sub.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-6 text-black">
            {/* SIGN IN LINK ADDED HERE */}
            <Link href="https://dev-mesy.pantheonsite.io/my-account/" className="hidden md:flex text-[10px] font-black uppercase tracking-[2px] hover:text-gray-500 items-center gap-1.5">
              <User size={16} /> SIGN IN
            </Link>
            
            <Search size={18} className="cursor-pointer" onClick={() => setIsSearchOpen(true)} />
            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
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
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {item.subItems.map((sub, idx) => (
                    <Link key={idx} href={`/category/${sub.slug}`} onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-gray-500">{sub.name}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRO SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[9999] p-6 flex flex-col items-center justify-center text-black">
          <X size={30} className="absolute top-6 right-6 cursor-pointer" onClick={() => setIsSearchOpen(false)} />
          <form onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); setIsSearchOpen(false); }} className="w-full max-w-[600px]">
            <input autoFocus type="text" className="w-full border-b-2 border-black p-4 text-2xl font-black uppercase text-center focus:outline-none" placeholder="TYPE TO SEARCH..." onChange={(e) => setSearchQuery(e.target.value)} />
          </form>
        </div>
      )}
      <CartDrawer />
    </>
  );
};
export default Header;