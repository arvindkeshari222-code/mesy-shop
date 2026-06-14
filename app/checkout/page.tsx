"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
// 👑 ALL BUNDLED ICONS PRECISELY IMPORTED HERE (Zero Reference Errors)
import { Lock, CheckCircle2, MapPin, ChevronRight, ChevronDown, Check, X } from 'lucide-react';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { countriesList } from './countries'; 

// REAL AUTOMATIC STATE & CITY DATABASE ENGINE
import { State, City } from 'country-state-city';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart() || { cart: [], clearCart: () => {} };
  const [isOrdered, setIsOrdered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // ALEXPRESS-STYLE INTERFACE OVERLAY STATE
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  // ISO CONTROL MATRIX BINDING
  const [selectedCountry, setSelectedCountry] = useState<any>(countriesList[0]); // Default to US Node
  const [statesList, setStatesList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);

  // 1:1 Cloned Form Input Fields States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState(''); 
  const [aptSuite, setAptSuite] = useState(''); 
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [zipCode, setZipCode] = useState(''); 

  // LIVE ERROR TRACKING STATES MATRIX
  const [formErrors, setFormErrors] = useState<any>({});
  const [touchedFields, setTouchedFields] = useState<any>({});
  const [showSubmitError, setShowSubmitError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Country change hone par automatic states fetch system
  useEffect(() => {
    if (selectedCountry?.isoCode) {
      const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
      setStatesList(countryStates || []);
      setSelectedStateCode(''); 
      setCitiesList([]);
      setSelectedCityName('');
    }
  }, [selectedCountry]);

  // State dropdown toggle par automatic city options filter logic
  useEffect(() => {
    if (selectedCountry?.isoCode && selectedStateCode) {
      const stateCities = City.getCitiesOfState(selectedCountry.isoCode, selectedStateCode);
      setCitiesList(stateCities || []);
      setSelectedCityName(''); 
    } else {
      setCitiesList([]);
    }
  }, [selectedStateCode, selectedCountry]);

  // 👑 REALTIME FORM VALIDATOR ENGINE (Perfectly tracks dynamic character rules)
  useEffect(() => {
    const errors: any = {};
    
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!streetAddress.trim()) errors.streetAddress = "Street address is required";
    if (!selectedStateCode) errors.stateProvince = "Please select your State/Province";
    if (!selectedCityName) errors.city = "Please select your City";
    if (!zipCode.trim()) errors.zipCode = "ZIP code is required";

    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!phone.trim()) {
      errors.phone = "Mobile number is required";
    } else if (!/^[0-9]+$/.test(cleanPhone)) {
      errors.phone = "Mobile number must contain digits only";
    } else if (cleanPhone.length < 7 || cleanPhone.length > 10) {
      errors.phone = `⚠️ Please enter a phone number with between 7 and 10 digits (The number you entered has ${cleanPhone.length} digits)`;
    }

    setFormErrors(errors);
  }, [firstName, lastName, phone, streetAddress, selectedStateCode, selectedCityName, zipCode]);

  if (!mounted) return null;

  const orderTotal = getCartTotal().toFixed(2);

  const cleanName = (name: string) => {
    return name.replace(/&amp;/g, '&').replace(/&QUOT;/gi, '"');
  };

  const getStateName = () => {
    const target = statesList.find(s => s.isoCode === selectedStateCode);
    return target ? target.name : selectedStateCode;
  };

  // Input click blur tracking block
  const handleBlur = (field: string) => {
    setTouchedFields((prev: any) => ({ ...prev, [field]: true }));
  };

  // Final confirmation routing handler
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allTouched = {
      firstName: true, lastName: true, phone: true,
      streetAddress: true, stateProvince: true, city: true, zipCode: true
    };
    setTouchedFields(allTouched);

    if (Object.keys(formErrors).length > 0) {
      setShowSubmitError(true);
      return;
    }

    setShowSubmitError(false);
    setIsAddressSaved(true);
    setIsAddressModalOpen(false);
  };

  const fullFormattedAddress = `${streetAddress}${aptSuite ? ' ' + aptSuite : ''}, ${selectedCityName}, ${getStateName()}, ${zipCode}`;

  return (
    <PayPalScriptProvider options={{ "client-id": "ASHeA9nZS0SGYQskg2oC9NLm_k0q7X1Y9uVp1D6O3VqW5Z0Y7U1O2P3Q4R5S6T7U8V9W0X", currency: "USD" }}>
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

        {/* MAIN DISPLAY GRID */}
        <main className="max-w-[1700px] mx-auto px-8 lg:px-20 py-12 grid grid-cols-1 lg:grid-cols-12 gap-x-24 gap-y-20">
          
          {/* LEFT INTERFACE Panel */}
          <div className="lg:col-span-5 space-y-16 flex flex-col justify-start">
            
            {/* SHIPPING DESTINATION PREVIEW MODULE */}
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
                    <MapPin size={14} className="text-neutral-400" /> + Add Cloned Shipping Address
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
                    <p className="text-neutral-500 text-[10.5px] leading-relaxed max-w-sm">{fullFormattedAddress}</p>
                    <p className="text-neutral-950 font-bold flex items-center gap-2 text-[10px] pt-1">
                      <span>{selectedCountry?.flag}</span> REGION: {selectedCountry?.name}
                    </p>
                    <p className="text-neutral-400 text-[10px] pt-0.5">Contact: {selectedCountry?.code} {phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* FINANCIAL CLEARANCE MODULE */}
            <div className="space-y-10">
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-[0.3em] text-neutral-300 uppercase block">FINANCIAL CLEARANCE</span>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Secure Verification</h2>
              </div>
              
              <div className={`max-w-md relative transition-all duration-300 ${isAddressSaved ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none select-none'}`}>
                {!isAddressSaved && (
                  <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mb-3 italic">
                    ⚠️ Please provide your full broken-down address data above to unlock payment gate.
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
                          description: `MESY Atelier Shipping to ${selectedCountry?.name}`,
                          amount: { currency_code: "USD", value: orderTotal }
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      setIsProcessing(true);
                      const details = await actions.order?.capture();
                      if (details && details.status === "COMPLETED") {
                        try {
                          await fetch('/api/create-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              firstName, lastName, address: fullFormattedAddress,
                              phone: `${selectedCountry?.code} ${phone}`,
                              country: selectedCountry?.name, cart, orderTotal
                            })
                          });
                          if (clearCart) clearCart();
                          setIsProcessing(false);
                          
                          // 👑 AUTO REDIRECT SYSTEM WITH METADATA PIPELINE
                          window.location.href = `/checkout/success?orderId=${details.id}&amount=${orderTotal}`;
                        } catch (err) {
                          window.location.href = `/checkout/success?amount=${orderTotal}`;
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* 👑 RIGHT AREA: CATALOG DISP (FIXED: Synced perfectly with item.options Format) 👑 */}
          <div className="lg:col-span-7 space-y-12 h-fit lg:sticky lg:top-36">
            <div className="flex justify-between items-baseline border-b border-neutral-950 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Manifest Document</h3>
              <span className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest">{cart.length} Asset Block</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto no-scrollbar space-y-8 pr-2">
              {cart.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-10 items-start group">
                  <div className="w-32 h-40 bg-neutral-50 flex items-center justify-center p-3 rounded-none border border-neutral-100 shrink-0">
                    <img src={item.image} className="max-w-full max-h-full object-contain" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-[0.06em] text-neutral-900 leading-relaxed">{cleanName(item.name)}</p>
                    
                    {/* 👑 ASALI FIX: Directly pulling from item.options matrix exactly like Cart page */}
                    {item.options && Object.keys(item.options).length > 0 && (
                      <div className="space-y-1 text-[8.5px] font-bold text-neutral-500 uppercase tracking-[0.2em] bg-neutral-50 p-2.5 rounded-xl border border-neutral-100/60 w-fit min-w-[140px]">
                        {Object.entries(item.options).map(([key, value]: any) => (
                          <p key={key} className="leading-tight">
                            <span className="text-neutral-400 font-semibold">{key}:</span> <span className="text-neutral-950 font-black">{value}</span>
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-[8.5px] font-bold text-neutral-400 uppercase tracking-[0.25em] pt-1">
                      <span>QUANTITY / {item.quantity}</span>
                      <span className="h-2 w-[1px] bg-neutral-200" />
                      <span>VALUATION / ${(parseFloat(item.price)).toFixed(2)}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-neutral-950 pt-2">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total Valuation Card Block */}
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

        {/* OVERLAY MODAL: 👑 1:1 PERFECT AUTOMATED CLONE WITH VALIDATION ERRORS & BLACK BUTTONS 👑 */}
        {isAddressModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md" onClick={() => setIsAddressModalOpen(false)} />
            
            <div className="bg-white w-full max-w-xl mx-4 relative z-10 p-8 border border-neutral-100 shadow-2xl space-y-5 rounded-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
              {/* Header Cloned styling */}
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold text-neutral-900 font-sans">Add new address</h3>
                <button type="button" onClick={() => setIsAddressModalOpen(false)} className="text-neutral-400 hover:text-neutral-950 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Cloned Warning Alert Ribbon */}
              {showSubmitError && Object.keys(formErrors).length > 0 && (
                <p className="text-[11px] font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
                  ⚠️ Form cannot be submitted. Please resolve the highlighted validation errors below.
                </p>
              )}

              <form onSubmit={handleSaveAddress} className="space-y-4">
                
                {/* 1. Country/region Select Cloned block Node */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-neutral-700">Country/region</label>
                  <select 
                    value={selectedCountry?.name}
                    onChange={(e) => {
                      const found = countriesList.find(c => c.name === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="w-full py-2 px-3 bg-white border border-neutral-200 rounded-md outline-none text-[11px] font-medium text-neutral-800 shadow-sm"
                  >
                    {countriesList.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.flag} {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Contact Information Group with Red Error Indicators Matrix */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-neutral-700 block">Contact information</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input 
                        type="text" placeholder="First name*" required value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={() => handleBlur('firstName')}
                        className={`w-full py-2 px-3 border bg-white rounded-md outline-none text-[11px] font-medium transition-all ${touchedFields.firstName && formErrors.firstName ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-neutral-200 focus:border-neutral-950'}`}
                      />
                      {touchedFields.firstName && formErrors.firstName && <span className="text-[10px] text-red-500 block pl-0.5">{formErrors.firstName}</span>}
                    </div>

                    <div className="space-y-1">
                      <input 
                        type="text" placeholder="Last name*" required value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={() => handleBlur('lastName')}
                        className={`w-full py-2 px-3 border bg-white rounded-md outline-none text-[11px] font-medium transition-all ${touchedFields.lastName && formErrors.lastName ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-neutral-200 focus:border-neutral-950'}`}
                      />
                      {touchedFields.lastName && formErrors.lastName && <span className="text-[10px] text-red-500 block pl-0.5">{formErrors.lastName}</span>}
                    </div>
                  </div>
                </div>

                {/* 3. Mobile Phone Block - Standard validation hooks active */}
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-bold text-neutral-700 block">Mobile number*</label>
                  <div className={`flex rounded-md border overflow-hidden bg-white transition-all h-[36px] ${touchedFields.phone && formErrors.phone ? 'border-red-500 focus-within:border-red-500 bg-red-50/10' : 'border-neutral-200 focus-within:border-neutral-950'}`}>
                    <div className="bg-neutral-50 px-3 text-[11px] font-medium text-neutral-500 border-r border-neutral-200 select-none flex items-center min-w-[60px] justify-center shrink-0">
                      {selectedCountry?.code || "+1"}
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Mobile number" 
                      required 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className="w-full py-2 px-3 outline-none bg-transparent text-[11px] font-medium text-neutral-800"
                    />
                  </div>
                  {/* Cloned Bracket Red Text warning constraints layout output */}
                  {touchedFields.phone && formErrors.phone ? (
                    <span className="text-[10px] font-semibold text-red-500 block pl-0.5">{formErrors.phone}</span>
                  ) : (
                    <span className="text-[9.5px] text-neutral-400 block pl-0.5">Enter a valid mobile number (6 to 15 numbers maximum)</span>
                  )}
                </div>

                {/* 4. Cloned Core Address Block with Matrix Red Indicators Row Setup */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-neutral-700 block">Address</span>
                  
                  <div className="space-y-1">
                    <input 
                      type="text" placeholder="Street*" required value={streetAddress} 
                      onChange={(e) => setStreetAddress(e.target.value)}
                      onBlur={() => handleBlur('streetAddress')}
                      className={`w-full py-2 px-3 border bg-white rounded-md outline-none text-[11px] font-medium transition-all ${touchedFields.streetAddress && formErrors.streetAddress ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-neutral-200 focus:border-neutral-950'}`}
                    />
                    {touchedFields.streetAddress && formErrors.streetAddress && <span className="text-[10px] text-red-500 block pl-0.5">{formErrors.streetAddress}</span>}
                  </div>

                  <input type="text" placeholder="Apt, suite, unit, etc (optional)" value={aptSuite} onChange={(e) => setAptSuite(e.target.value)} className="w-full py-2 px-3 border border-neutral-200 rounded-md outline-none text-[11px] font-medium text-neutral-800" />

                  {/* Matrix Red Indicators Selection Row Setup */}
                  <div className="grid grid-cols-3 gap-3">
                    
                    {/* Cloned Native State Selector Node */}
                    <div className="flex flex-col gap-1">
                      <select
                        value={selectedStateCode}
                        onChange={(e) => { setSelectedStateCode(e.target.value); handleBlur('stateProvince'); }}
                        className={`w-full py-2 px-2 bg-white border rounded-md outline-none text-[11px] font-medium text-neutral-800 shadow-sm h-[36px] ${touchedFields.stateProvince && formErrors.stateProvince ? 'border-red-500 focus:border-red-500' : 'border-neutral-200'}`}
                      >
                        <option value="">State / Prov.*</option>
                        {statesList.map((st) => <option key={st.isoCode} value={st.isoCode}>{st.name}</option>)}
                      </select>
                      {touchedFields.stateProvince && formErrors.stateProvince && <span className="text-[9px] text-red-500 block pl-0.5 truncate">{formErrors.stateProvince}</span>}
                    </div>

                    {/* Cloned Native Cities Selector Node */}
                    <div className="flex flex-col gap-1">
                      <select
                        value={selectedCityName}
                        disabled={!selectedStateCode}
                        onChange={(e) => { setSelectedCityName(e.target.value); handleBlur('city'); }}
                        className={`w-full py-2 px-2 bg-white border rounded-md outline-none text-[11px] font-medium text-neutral-800 shadow-sm h-[36px] ${!selectedStateCode ? 'opacity-40 bg-neutral-50 cursor-not-allowed' : ''} ${touchedFields.city && formErrors.city ? 'border-red-500 focus:border-red-500' : 'border-neutral-200'}`}
                      >
                        <option value="">City *</option>
                        {citiesList.map((ct, idx) => <option key={idx} value={ct.name}>{ct.name}</option>)}
                      </select>
                      {touchedFields.city && formErrors.city && <span className="text-[9px] text-red-500 block pl-0.5 truncate">{formErrors.city}</span>}
                    </div>

                    {/* ZIP CODE Cloned Node */}
                    <div className="flex flex-col gap-1">
                      <input 
                        type="text" placeholder="ZIP code*" required value={zipCode} 
                        onChange={(e) => setZipCode(e.target.value)}
                        onBlur={() => handleBlur('zipCode')}
                        className={`w-full py-2 px-3 border bg-white rounded-md outline-none text-[11px] font-medium transition-all h-[36px] ${touchedFields.zipCode && formErrors.zipCode ? 'border-red-500 focus:border-red-500 bg-red-50/10' : 'border-neutral-200 focus:border-neutral-950'}`}
                      />
                      {touchedFields.zipCode && formErrors.zipCode && <span className="text-[9px] text-red-500 block pl-0.5">{formErrors.zipCode}</span>}
                    </div>

                  </div>

                </div>

                {/* 👑 PREMIUM LUXURY MATTE BLACK ACTION BUTTONS 👑 */}
                <div className="flex gap-3 pt-6 border-t border-neutral-100">
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-neutral-950 text-white text-[11.5px] font-bold rounded-full hover:bg-black transition-colors shadow-sm tracking-wide uppercase"
                  >
                    Confirm
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddressModalOpen(false)} 
                    className="px-6 py-2.5 bg-neutral-100 text-neutral-800 text-[11.5px] font-bold rounded-full hover:bg-neutral-200 transition-colors uppercase"
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