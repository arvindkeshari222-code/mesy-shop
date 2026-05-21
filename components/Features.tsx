"use client";
import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

const Features = () => {
  const data = [
    {
      icon: <Truck size={32} strokeWidth={1} />,
      title: "Global Shipping",
      desc: "Delivering luxury to 50+ countries with real-time tracking."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1} />,
      title: "Secure Checkout",
      desc: "100% protected payments with bank-grade encryption."
    },
    {
      icon: <RotateCcw size={32} strokeWidth={1} />,
      title: "Easy Returns",
      desc: "Not satisfied? Return within 30 days, no questions asked."
    },
    {
      icon: <Headset size={32} strokeWidth={1} />,
      title: "24/7 Concierge",
      desc: "Expert support for your high-end lifestyle needs."
    }
  ];

  return (
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gray-50 text-[#C5A358] group-hover:bg-[#C5A358] group-hover:text-white transition-all duration-500 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-[3px] mb-2 text-black">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
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