"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Lock, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart() || { cart: [] };
  const [isOrdered, setIsOrdered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const orderTotal = getCartTotal().toFixed(2);

  const cleanName = (name: string) => {
    return name.replace(/&amp;/g, '&').replace(/&QUOT;/gi, '"');
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <CheckCircle2 size={32} className="text-neutral-950 mb-6" strokeWidth={1} />
        <h1 className="font-sans font-light tracking-[0.5em] text-lg uppercase mb-3 text-neutral-950">Acquisition Registered</h1>
        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed mb-8">
          Thank you, {firstName}. Your curated shipment sequence is authorized for express delivery.
        </p>
        <Link href="/" className="px-12 py-4 bg-neutral-950 text-white text-[9px] font-bold uppercase tracking-[0.3em] transition-colors hover:bg-neutral-800">
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
      <div className="bg-white min-h-screen text-neutral-950 font-sans antialiased selection:bg-neutral-100">
        
        {/* PARISIAN ATELIER BRAND HEADER */}
        <header className="py-10 flex justify-between items-center px-8 lg:px-20 max-w-[1700px] mx-auto">
          <Link href="/" className="text-base font-light tracking-[0.6em] text-neutral-950 uppercase transition-opacity hover:opacity-60">
            MESY ATELIER
          </Link>
          <div className="flex items-center gap-2 text-[8.5px] font-bold text-neutral-300 uppercase tracking-[0.25em]">
            <Lock size={11} strokeWidth={2} /> SECURE GATEWAY OPEN
          </div>
        </header>

        {/* GALLERY ASYMMETRIC GRID SYSTEM */}
        <main className="max-w-[1700px] mx-auto px-8 lg:px-20 py-12 grid grid-cols-1 lg:grid-cols-12 gap-x-24 gap-y-20">
          
          {/* LEFT INTERFACE: INVISIBLE MINIMALIST FORMS (Span 5) */}
          <div className="lg:col-span-5 space-y-20 flex flex-col justify-center">
            
            {/* Identity Cluster */}
            <div className="space-y-12">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-[0.3em] text-neutral-300 uppercase block">DESPATCH DATA</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Shipping Destination</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-10 gap-y-14">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="GIVEN NAME" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full py-2 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.2em] placeholder:text-neutral-300 uppercase" 
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="SURNAME" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full py-2 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.2em] placeholder:text-neutral-300 uppercase" 
                  />
                </div>
                <div className="col-span-2 relative">
                  <input 
                    type="text"
                    placeholder="FULL DELIVERY ROUTE ADDRESS METADATA" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full py-2 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.2em] placeholder:text-neutral-300 uppercase" 
                  />
                </div>
              </div>
            </div>

            {/* Clearance Cluster (PayPal Core Hub) */}
            <div className="space-y-10">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-[0.3em] text-neutral-300 uppercase block">FINANCIAL CLEARANCE</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Secure Verification</h2>
              </div>
              
              <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-1.5 pt-1">
                <CreditCard size={11} strokeWidth={2} /> Encrypted Routing Portals:
              </p>
              
              {/* ORIGINAL CAPSULE PILL GOLD PAYPAL EMBED FOR MAXIMUM CONVERSIONS */}
              <div className="max-w-md relative z-10 pt-2">
                <PayPalButtons 
                  style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                  disabled={isProcessing}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [{
                        description: "MESY Atelier Luxury Private Collection Acquisition",
                        amount: {
                          currency_code: "USD",
                          value: orderTotal
                        }
                      }]
                    });
                  }}
                  onApprove={async (data, actions) => {
                    setIsProcessing(true);
                    const details = await actions.order?.capture();
                    if (details && details.status === "COMPLETED") {
                      setIsProcessing(false);
                      setIsOrdered(true);
                    }
                  }}
                  onError={(err) => {
                    console.error("PayPal Execution Error:", err);
                    setIsProcessing(false);
                  }}
                />
              </div>
            </div>

          </div>

          {/* 👑 RIGHT AREA: MASSIVE-CANVAS LUXURY CATALOG DISPLAY (Span 7) */}
          <div className="lg:col-span-7 space-y-12 h-fit lg:sticky lg:top-36">
            <div className="flex justify-between items-baseline border-b border-neutral-950 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Manifest Document</h3>
              <span className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest">{cart.length} Asset Block</span>
            </div>
            
            {/* GIANT SELECTION LIST WITH PORTRAIT ASPECT RATIO */}
            <div className="max-h-[600px] overflow-y-auto no-scrollbar pr-2 space-y-8">
              {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-10 items-start group">
                  
                  {/* MASSIVE ULTRA PORTRAIT CANVAS PICTURE */}
                  <div className="w-32 h-40 bg-neutral-50/50 border border-neutral-100 shrink-0 flex items-center justify-center p-3 rounded-none relative overflow-hidden transition-all duration-500 group-hover:bg-neutral-50">
                    <img src={item.image} className="max-w-full max-h-full object-contain mix-blend-multiply scale-102 transition-transform duration-700 group-hover:scale-105" alt={item.name} />
                  </div>
                  
                  {/* EDITORIAL METADATA SPECIFICATIONS */}
                  <div className="flex-1 min-w-0 space-y-4 pt-2">
                    <p className="text-xs font-bold uppercase tracking-[0.06em] leading-snug text-neutral-900 transition-colors group-hover:text-black">
                      {cleanName(item.name)}
                    </p>
                    
                    {/* AUTOMATIC DYNAMIC RUNTIME OPTIONS PARSER */}
                    {item.options && Object.keys(item.options).length > 0 && (
                      <div className="flex flex-col gap-1.5 border-l border-neutral-100 pl-4">
                        {Object.entries(item.options).map(([key, value]: any) => (
                          <p key={key} className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
                            {key}: <span className="text-neutral-950 font-black">{value}</span>
                          </p>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 pt-1 text-[8.5px] font-bold text-neutral-400 uppercase tracking-[0.25em]">
                      <span>QUANTITY / {item.quantity}</span>
                      <span className="h-2 w-[1px] bg-neutral-200" />
                      <span>VALUATION / ${(parseFloat(item.price)).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Net net financial string row tag */}
                  <span className="text-[10px] font-black text-neutral-950 tracking-wider shrink-0 pt-2">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* GRAND TOTAL LEDGER ACQUISITION PANEL */}
            <div className="pt-8 border-t border-neutral-950 flex justify-between items-baseline">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Net Asset Valuation</span>
                <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest">Includes custom priority premium boutique packaging routing channels</p>
              </div>
              <span className="text-4xl font-light tracking-tighter text-neutral-950 italic underline underline-offset-4 decoration-neutral-100">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

          </div>

          {/* Legal footnote line */}
          <div className="lg:col-span-12 pt-16 border-t border-neutral-100 mt-16 pb-4">
            <p className="text-[7.5px] text-neutral-300 font-bold tracking-[0.3em] uppercase text-center">
              SECURE GLOBAL ARREST LEDGER CHANNEL // MESY PRIVATE TRUST ARCHIVE CORE PLATFORM LABS INC.
            </p>
          </div>

        </main>
      </div>
    </PayPalScriptProvider>
  );
}