import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; 
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext"; 
import Header from "@/components/Header";
// 🎯 1. IMPORT SCRIPT FOR ANALYTICS PERFORMANCE OPTIMIZATION
import Script from "next/script";

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
  verification: {
    google: "jPn0_3VyJDucQk8qw1f7JtKLWacO5VtVJbYrmhtuGUI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🎯 2. REAL GOOGLE ANALYTICS ID ASSIGNMENT
  const GA_MEASUREMENT_ID = "G-ZS6KHPLZ8J";

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#f2f2f2]`}
        suppressHydrationWarning
      >
        {/* 🎯 3. HIGH PERFORMANCE INJECTOR FOR GA4 PIPELINE */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* 🤖 TIDIO LIVE CHATBOT INJECTOR */}
        <Script 
          src="https://code.tidio.co/r5dmhpvlq2t48raksia7vgl6tf2urv1.js" 
          strategy="afterInteractive" 
        />

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