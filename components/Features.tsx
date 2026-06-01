"use client";
import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

const Features = () => {
  const data = [
    {
      icon: <Truck size={28} strokeWidth={1} />,
      title: "Global Shipping",
      desc: "Delivering luxury to 50+ countries with real-time white-glove tracking."
    },
    {
      icon: <ShieldCheck size={28} strokeWidth={1} />,
      title: "Secure Checkout",
      desc: "100% protected premium payments with bank-grade encryption."
    },
    {
      icon: <RotateCcw size={28} strokeWidth={1} />,
      title: "Easy Returns",
      desc: "Not fully satisfied? Return within 30 days with no questions asked."
    },
    {
      icon: <Headset size={28} strokeWidth={1} />,
      title: "24/7 Concierge",
      desc: "Expert, dedicated support for your high-end lifestyle needs."
    }
  ];

  return (
    <section className="bg-transparent py-6 px-1 max-w-[1550px] mx-auto my-6">
      {/* 🎯 LUXURY FLOATING CAPSULE: Styled matching the exact rounded aesthetic of the store grids */}
      <div className="bg-white py-14 px-8 rounded-[32px] shadow-sm border border-gray-50/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group cursor-default">
              
              {/* Minimal Circle Icon Holder Matrix */}
              <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-full bg-[#F9F9FB] text-[#C5A358] group-hover:bg-[#C5A358] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#C5A358]/10 transition-all duration-500 border border-gray-100/50">
                {item.icon}
              </div>
              
              {/* Premium Fine-Print Typography */}
              <h3 className="text-[11px] font-black uppercase tracking-[3px] mb-2.5 text-black">
                {item.title}
              </h3>
              
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-[240px]">
                {item.desc}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;