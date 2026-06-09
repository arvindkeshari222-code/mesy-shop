"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Lock, CreditCard, CheckCircle2, MapPin, X, ChevronRight, Globe, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const { cart, getCartTotal } = useCart() || { cart: [] };
  const [isOrdered, setIsOrdered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // ALEXPRESS-STYLE INTERFACE OVERLAY STATE
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  // Form Fields Inputs local states
  const [country, setCountry] = useState('United States'); // Default High-Converting Country
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Validation runtime warnings
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const orderTotal = getCartTotal().toFixed(2);

  const cleanName = (name: string) => {
    return name.replace(/&amp;/g, '&').replace(/&QUOT;/gi, '"');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !address.trim() || !phone.trim() || !country) {
      setValidationError('Please complete all identification fields safely.');
      return;
    }
    setValidationError('');
    setIsAddressSaved(true);
    setIsAddressModalOpen(false);
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
      <div className="bg-white min-h-screen text-neutral-950 font-sans antialiased selection:bg-neutral-100 relative">
        
        {/* HEADER BRANDING */}
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
          
          {/* LEFT INTERFACE: DYNAMIC ADDRESS TRIGGER AND PAYPAL HUB */}
          <div className="lg:col-span-5 space-y-16 flex flex-col justify-start">
            
            {/* SHIPPING MODULE */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-[0.3em] text-neutral-300 uppercase block">DESPATCH DATA</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Shipping Destination</h2>
              </div>

              {!isAddressSaved ? (
                <button 
                  type="button" 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="w-full py-5 border border-dashed border-neutral-300 hover:border-neutral-950 transition-colors flex items-center justify-between px-6 text-neutral-500 hover:text-neutral-950 rounded-xl"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                    <MapPin size={14} className="text-neutral-400" /> + Add Shipping Address
                  </span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <div className="border border-neutral-200/80 p-6 rounded-2xl space-y-3 bg-neutral-50/20 relative group">
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <MapPin size={12} className="text-neutral-950" /> Dispatch Destination
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setIsAddressModalOpen(true)}
                      className="text-[9px] font-black text-neutral-400 hover:text-neutral-950 uppercase tracking-wider transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-[11px] font-medium text-neutral-800 space-y-0.5 uppercase tracking-wide">
                    <p className="font-bold text-neutral-950">{firstName} {lastName}</p>
                    <p className="text-neutral-500 truncate">{address}</p>
                    <p className="text-neutral-900 font-bold flex items-center gap-1 text-[10px] pt-1">
                      <Globe size={11} /> REGION: {country}
                    </p>
                    <p className="text-neutral-400 text-[10px] pt-0.5">Contact: {phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Clearance Cluster (PayPal Core Hub) */}
            <div className="space-y-10">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-[0.3em] text-neutral-300 uppercase block">FINANCIAL CLEARANCE</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Secure Verification</h2>
              </div>
              
              <div className="space-y-2 bg-neutral-50/50 p-5 border border-neutral-100 rounded-2xl">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Payment Methods / PayPal
                </p>
                <p className="text-[10.5px] text-neutral-400 font-medium leading-relaxed max-w-sm">
                  Pay easily, quickly, and securely with PayPal. Enjoy instant encrypted checkout, 180-day buyer protection, and zero shared credentials.
                </p>
              </div>
              
              <div className={`max-w-md relative transition-all duration-300 ${isAddressSaved ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none select-none'}`}>
                {!isAddressSaved && (
                  <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mb-3 italic">
                    ⚠️ Please provide your shipping address & country above to unlock payment gate.
                  </p>
                )}
                <div className="relative z-10 pt-2">
                  <PayPalButtons 
                    style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                    disabled={isProcessing || !isAddressSaved}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                          description: `MESY Atelier Private Acquisition - Shipping to ${country}`,
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

          </div>

          {/* RIGHT AREA: CATALOG DISPLAY */}
          <div className="lg:col-span-7 space-y-12 h-fit lg:sticky lg:top-36">
            <div className="flex justify-between items-baseline border-b border-neutral-950 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Manifest Document</h3>
              <span className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest">{cart.length} Asset Block</span>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto no-scrollbar pr-2 space-y-8">
              {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-10 items-start group">
                  <div className="w-32 h-40 bg-neutral-50/50 border border-neutral-100 shrink-0 flex items-center justify-center p-3 rounded-none relative overflow-hidden transition-all duration-500 group-hover:bg-neutral-50">
                    <img src={item.image} className="max-w-full max-h-full object-contain mix-blend-multiply scale-102 transition-transform duration-700 group-hover:scale-105" alt={item.name} />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-4 pt-2">
                    <p className="text-xs font-bold uppercase tracking-[0.06em] leading-snug text-neutral-900 transition-colors group-hover:text-black">
                      {cleanName(item.name)}
                    </p>
                    
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
                  
                  <span className="text-[10px] font-black text-neutral-950 tracking-wider shrink-0 pt-2">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

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
        </main>

        {/* DYNAMIC OVERLAY MODAL: WITH EXACT ALIEXPRESS DELIVERABLE COUNTRIES */}
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md" onClick={() => setIsAddressModalOpen(false)} />
            
            <div className="bg-white w-full max-w-lg mx-4 relative z-10 p-8 border border-neutral-100 shadow-2xl space-y-6 rounded-3xl animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-neutral-950">Add Shipping Address</h3>
                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="text-neutral-400 hover:text-neutral-950 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {validationError && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{validationError}</p>
              )}

              <form onSubmit={handleSaveAddress} className="space-y-6">
                
                {/* 👑 EXACT ALIEXPRESS LOGISTICS TARGET DROPDOWN */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Country / Region</label>
                  <div className="relative">
                    <select 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full py-3 px-4 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-950 text-[11px] font-bold tracking-wider text-neutral-800 appearance-none cursor-pointer"
                    >
                      <option value="United States">🇺🇸 United States</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="Italy">🇮🇹 Italy</option>
                      <option value="Spain">🇪🇸 Spain</option>
                      <option value="Netherlands">🇳🇱 Netherlands</option>
                      <option value="New Zealand">🇳🇿 New Zealand</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                {/* Input Fields Row */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="FIRST NAME" 
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full py-2.5 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.15em] uppercase placeholder:text-neutral-300"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="LAST NAME" 
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full py-2.5 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.15em] uppercase placeholder:text-neutral-300"
                    />
                  </div>
                  <div className="col-span-2 relative">
                    <input 
                      type="tel" 
                      placeholder="MOBILE PHONE NUMBER" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-2.5 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.15em] uppercase placeholder:text-neutral-300"
                    />
                  </div>
                  <div className="col-span-2 relative">
                    <input 
                      type="text" 
                      placeholder="STREET ADDRESS, APARTMENT, CITY, STATE, ZIP" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full py-2.5 border-b border-neutral-200 bg-transparent outline-none focus:border-neutral-950 transition-colors text-[10px] font-bold tracking-[0.15em] uppercase placeholder:text-neutral-300"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-neutral-100">
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-neutral-950 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors rounded-full"
                  >
                    Confirm Address
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAddressModalOpen(false)}
                    className="px-6 py-4 border border-neutral-200 text-neutral-400 hover:text-neutral-950 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </PayPalScriptProvider>
  );
}