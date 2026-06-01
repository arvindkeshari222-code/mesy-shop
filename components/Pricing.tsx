"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Box, Cpu, Rocket } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Premium Web Builds",
      desc: "Next.js & Tailwind architectures built for maximum performance and fluid speeds.",
      icon: <Code className="w-5 h-5 text-[#C5A358]" />
    },
    {
      title: "UI/UX Components",
      desc: "Interactive, custom engineered assets to speed up your global user experience.",
      icon: <Box className="w-5 h-5 text-[#C5A358]" />
    },
    {
      title: "Gen AI Integration",
      desc: "Advanced backend AI models integrated directly into your e-commerce workflows.",
      icon: <Cpu className="w-5 h-5 text-[#C5A358]" />
    },
    {
      title: "Fast Deployment",
      desc: "Instant serverless sprints from staging nodes straight to live production.",
      icon: <Rocket className="w-5 h-5 text-[#C5A358]" />
    },
  ];

  return (
    <section className="w-full bg-transparent py-8 px-1 max-w-[1550px] mx-auto my-4">
      {/* 🎯 LUXURY BUNDLE CAPSULE: Perfectly wrapped with the exact brand standards */}
      <div className="w-full bg-white py-16 px-8 rounded-[32px] shadow-sm border border-gray-50/60">
        
        {/* Section Header */}
        <div className="mb-14 select-none">
          <h2 className="text-3xl md:text-5xl font-serif italic text-black tracking-tight leading-none">
            High-Performance <br /> 
            <span className="text-gray-300 font-sans not-italic font-black text-2xl md:text-3xl tracking-[4px] uppercase mt-2 block">Digital Assets.</span>
          </h2>
        </div>

        {/* The Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-[#F9F9FB] p-8 rounded-[24px] border border-gray-50/50 shadow-sm flex flex-col justify-between min-h-[280px] transition-all duration-500 group cursor-default"
            >
              {/* Minimalist Monochromatic Badge Capsule */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:bg-[#C5A358] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#C5A358]/10 transition-all duration-500 text-[#C5A358]">
                {React.cloneElement(service.icon, {
                  className: "w-5 h-5 transition-colors duration-500 group-hover:text-white"
                })}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-base font-serif italic text-black tracking-tight group-hover:text-[#C5A358] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-[11px] font-medium leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}