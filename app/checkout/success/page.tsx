"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  // URL se database synchronized query nodes fetch karna
  const orderId = searchParams.get('orderId') || `AT-${Math.floor(100000 + Math.random() * 900000)}`;
  const totalAmount = searchParams.get('amount') || "0.00";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased flex flex-col justify-between selection:bg-neutral-100">
      
      {/* TOP HEADER STATUS */}
      <header className="py-8 border-b border-neutral-100 px-8 lg:px-20 max-w-[1700px] w-full mx-auto flex justify-between items-center">
        <Link href="/" className="text-sm font-light tracking-[0.6em] uppercase transition-opacity hover:opacity-60">
          MESY ATELIER
        </Link>
        <span className="text-[8.5px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
          <ShieldCheck size={12} /> SECURE TRANSACTION AUTHORIZED
        </span>
      </header>

      {/* CORE CONFIRMATION SEGMENT */}
      <main className="max-w-md mx-auto w-full px-6 py-20 text-center space-y-10 flex-1 flex flex-col justify-center">
        
        {/* Animated Check Ring Icon */}
        <div className="mx-auto w-16 h-16 bg-neutral-950 rounded-full flex items-center justify-center text-white shadow-xl scale-95 transition-transform duration-700 hover:scale-100 relative">
          <div className="absolute inset-0 rounded-full border border-neutral-950 animate-ping opacity-20 duration-1000"></div>
          <Check size={24} strokeWidth={2.5} />
        </div>

        {/* Text Headers Block */}
        <div className="space-y-3">
          <span className="text-[8.5px] font-bold tracking-[0.4em] text-neutral-400 uppercase block">ACQUISITION REGISTERED</span>
          <h1 className="font-sans font-light tracking-[0.2em] text-2xl uppercase text-neutral-950">Thank you for your order</h1>
          <p className="text-[11px] text-neutral-500 font-medium max-w-xs mx-auto leading-relaxed">
            Your payment parameter was authorized safely. Curated sequence logs are now transmitting straight to our global courier dispatch routing channels.
          </p>
        </div>

        {/* 👑 METADATA LEDGER INVOICE COMPONENT */}
        <div className="border border-neutral-200/80 p-5 rounded-2xl bg-neutral-50/30 text-left space-y-3.5 shadow-sm">
          <div className="flex justify-between items-baseline border-b border-neutral-100 pb-2">
            <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider">ORDER IDENTIFICATION</span>
            <span className="text-[11px] font-bold text-neutral-950 tracking-wide font-mono select-all">{orderId}</span>
          </div>

          <div className="flex justify-between items-baseline border-b border-neutral-100 pb-2">
            <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider">NET VALUATION CLEARANCE</span>
            <span className="text-xs font-black text-neutral-950">${parseFloat(totalAmount).toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-baseline pb-1">
            <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider">ESTIMATED ROUTING TIMELINE</span>
            <span className="text-[10px] font-bold text-neutral-800 uppercase tracking-wide flex items-center gap-1">
              <Package size={12} className="text-neutral-400" /> 7 - 12 Business Days (Express)
            </span>
          </div>
        </div>

        {/* LOGISTICS STEPS NOTIFICATION MATRIX */}
        <div className="text-left space-y-2 pt-2">
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest pl-1">NEXT REQUISITION STEPS:</p>
          <div className="text-[10.5px] font-medium text-neutral-500 space-y-1.5 bg-neutral-50/50 border border-neutral-100 p-4 rounded-xl">
            <p className="flex items-start gap-2 text-neutral-800 font-semibold">
              <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full mt-1.5 shrink-0"></span>
              A digital manifest and tracking index will automatically drop inside your email inbox within 24-48 hours.
            </p>
            <p className="flex items-start gap-2 pl-3.5">
              Customs border clearance sorting is fully managed through AliExpress core delivery automation engines.
            </p>
          </div>
        </div>

        {/* ACTION BUTTON RETURN TO STORE */}
        <div className="pt-4">
          <Link 
            href="/" 
            className="w-full py-4 bg-neutral-950 text-white text-[10px] font-black uppercase tracking-[0.25em] transition-colors hover:bg-neutral-800 rounded-full flex items-center justify-center gap-2 shadow-md group"
          >
            Return to Storefront <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </main>

      {/* FOOTER PREMIUM STANDARD CODES */}
      <footer className="py-6 border-t border-neutral-100 text-center px-6">
        <p className="text-[8.5px] text-neutral-300 font-bold tracking-[0.2em] uppercase">
          MESY ATELIER PRIVATE CLIENT ARCHITECTURE &copy; 2026. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  );
}

// 👑 SUSPENSE WRAPPER BOUNDARY TO PREVENT BUILD COMPILATION CRASH ON NEXT.JS SERVER RENDERING
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center text-[10px] font-black tracking-widest text-neutral-400 uppercase animate-pulse">
        Securing manifest transmission sequencing...
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}