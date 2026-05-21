"use client";

import { motion } from "framer-motion";
import { Code, Box, Cpu, Rocket } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Premium Web Builds",
      desc: "Next.js & Tailwind architectures built for maximum performance.",
      icon: <Code className="w-6 h-6 text-[#81b441]" />,
      color: "bg-blue-50",
    },
    {
      title: "UI/UX Components",
      desc: "Interactive, pre-built assets to speed up your workflow.",
      icon: <Box className="w-6 h-6 text-[#81b441]" />,
      color: "bg-purple-50",
    },
    {
      title: "Gen AI Integration",
      desc: "Advanced AI models integrated directly into your web products.",
      icon: <Cpu className="w-6 h-6 text-[#81b441]" />,
      color: "bg-green-50",
    },
    {
      title: "Fast Deployment",
      desc: "7-day sprints from idea to live production environment.",
      icon: <Rocket className="w-6 h-6 text-[#81b441]" />,
      color: "bg-orange-50",
    },
  ];

  return (
    <section className="w-full bg-[#fbf8f4] py-20 px-4 md:px-10">
      <div className="w-full max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-[32px] md:text-[48px] font-black text-black tracking-tighter leading-tight">
            High-Performance <br /> 
            <span className="text-gray-300 italic font-serif font-medium">Digital Assets.</span>
          </h2>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[300px] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#faf9f6] flex items-center justify-center mb-8">
                {service.icon}
              </div>
              
              <div>
                <h3 className="text-xl font-black text-black mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
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