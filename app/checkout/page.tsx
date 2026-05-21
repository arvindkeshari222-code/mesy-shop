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

  // Form Fields Inputs local states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const orderTotal = getCartTotal().toFixed(2);

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <CheckCircle2 size={80} className="text-green-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Order Confirmed!</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">
          Thank you, {firstName}! Your premium archive piece is being prepared.
        </p>
        <Link href="/" className="mt-8 px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[3px] rounded-full">
          Continue Browsing
        </Link>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
      <div className="bg-white min-h-screen text-black">
        <header className="border-b py-6 flex justify-between items-center px-10">
          <Link href="/" className="text-xl font-black italic">MESY ATELIER</Link>
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase">
            <Lock size={14} /> Secure Payment
          </div>
        </header>

        <main className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* LEFT SIDE: SHIPPING FORM FIELDS */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Shipping & Payment</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="First Name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-4 border rounded-xl bg-gray-50 outline-none focus:border-black transition-all" 
              />
              <input 
                placeholder="Last Name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-4 border rounded-xl bg-gray-50 outline-none focus:border-black transition-all" 
              />
              <input 
                placeholder="Address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="col-span-2 p-4 border rounded-xl bg-gray-50 outline-none focus:border-black transition-all" 
              />
            </div>

            {/* PAYPAL MATRIX COMPONENT PLATFORM */}
            <div className="pt-4 space-y-3 relative z-10">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <CreditCard size={12} /> Secure Gateway Channels:
              </p>
              
              <PayPalButtons 
                style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                disabled={isProcessing}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                      description: "MESY Global Storefront Purchase",
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

          {/* RIGHT SIDE: CART ITEM RAIL */}
          <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 h-fit space-y-6">
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Your Selection</h3>
            {cart.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-white border rounded-xl overflow-hidden">
                  <img src={item.image} className="w-full h-full object-contain p-2" alt="" />
                </div>
                <div className="flex-grow">
                  <p className="text-xs font-black uppercase leading-tight">{item.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-black">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-6 border-t flex justify-between text-2xl font-black tracking-tighter">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

        </main>
      </div>
    </PayPalScriptProvider>
  );
}