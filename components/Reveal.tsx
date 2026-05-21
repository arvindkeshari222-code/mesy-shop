"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  imageSrc?: string;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, width = "100%", imageSrc, className = "", delay = 0.2 }: Props) => {
  return (
    /* 🚨 POINTER EVENTS FIXED: Is wrapper div par events active rakhe hain */
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
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.9, 
          ease: [0.16, 1, 0.3, 1], 
          delay: delay 
        }}
        /* 🚨 POINTER EVENTS INSIDE MOTION: Isko unlock kiya taaki click niche layers par leak ho sake */
        className="w-full h-full pointer-events-auto"
      >
        {imageSrc ? (
          <div className="relative group overflow-hidden rounded-3xl w-full h-full">
            <img 
              src={imageSrc} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              alt="Mesy Premium Reveal"
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