"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  imageSrc?: string;
  className?: string;
  delay?: number;
  triggerMargin?: string; // 🎯 ADDED: Viewport trigger margin customization prop
}

export const Reveal = ({ 
  children, 
  width = "100%", 
  imageSrc, 
  className = "", 
  delay = 0.2,
  triggerMargin = "-80px" // Luxury premium optimal offset entry standard
}: Props) => {
  return (
    /* 🚨 POINTER EVENTS STABLE MATRIX: Master wrapper layout constraints */
    <div className={`relative ${className}`} style={{ width }}>
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 20, 
          filter: "blur(8px)", 
          scale: 0.98 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          scale: 1 
        }}
        viewport={{ once: true, margin: triggerMargin }}
        transition={{ 
          duration: 0.9, 
          ease: [0.16, 1, 0.3, 1], // Fluid ultra-luxury cubic bezier curve timing
          delay: delay 
        }}
        /* 🚨 POINTER EVENTS ACTIVE LAYER: Structural nodes clicks leak safely into sub-components */
        className="w-full h-full pointer-events-auto"
      >
        {imageSrc ? (
          <div className="relative group overflow-hidden rounded-[32px] w-full h-full border border-gray-50/10">
            <img 
              src={imageSrc} 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
              alt="Mesy Premium Reveal Asset"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {children && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                {children}
              </div>
            )}
          </div>
        ) : (
          children
        )}
      </motion.div>
    </div>
  );
};