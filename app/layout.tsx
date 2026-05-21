import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; 
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext"; 
import Header from "@/components/Header";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "700", "900"],
  style: ['italic', 'normal']
});

export const metadata: Metadata = {
  title: "MESY Global | Luxury Atelier",
  description: "Premium shopping experience",
};

// 🚨 SAFETY FLAG: Isko TRUE rakhne par poori site lock rahegi.
// Jab pricing testing khatam ho jaye, toh bas isko false kar dena!
const IS_COMING_SOON = true; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#f2f2f2]`}>
        {IS_COMING_SOON ? (
          /* Premium Luxury Coming Soon Screen overlay */
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black px-6 text-center">
            <div className="space-y-6 max-w-md">
              <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white">
                MESY
              </h1>
              <div className="h-[1px] w-20 bg-white/30 mx-auto" />
              <p className="text-xs uppercase tracking-[6px] text-white/70 font-sans">
                Refining Simplicity
              </p>
              <p className="text-[10px] uppercase tracking-[3px] text-[#C5A358] pt-4 font-bold font-sans">
                Coming Soon • Spring 2026
              </p>
            </div>
          </div>
        ) : (
          /* Normal Site Layout (Jab open karna ho) */
          <CartProvider>
            {/* Header har page pe upar chipka rahega */}
            <Header />
            {children}
          </CartProvider>
        )}
      </body>
    </html>
  );
}