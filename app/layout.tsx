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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#f2f2f2]`}
        suppressHydrationWarning
      >
        <CartProvider>
          <Header />
          <main className="pt-20"> {/* Header fixed hai toh padding zaruri hai */}
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}