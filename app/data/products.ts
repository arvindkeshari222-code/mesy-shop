// Isme sirf data rahega, koi UI nahi
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  oldPrice?: string;
  category: string;
  img: string; // Abhi emoji use kar rahe hain, baad mein path daal dena
  description: string;
  isHot?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Midnight Oud Artifact",
    brand: "ATELIER SERIES",
    price: "12,499",
    oldPrice: "18,000",
    category: "Fragrance",
    img: "🏺",
    description: "Handcrafted glass with mystical oud notes.",
    isHot: true
  },
  {
    id: "2",
    name: "Obsidian Smart Watch",
    brand: "TECH ARTIFACTS",
    price: "45,000",
    category: "Tech",
    img: "⌚",
    description: "Minimalist wearable with sapphire display."
  },
  {
    id: "3",
    name: "Velvet Studio Chair",
    brand: "HERITAGE LIVING",
    price: "89,000",
    oldPrice: "1,10,000",
    category: "Furniture",
    img: "🛋️",
    description: "Ergonomic luxury for modern creators."
  },
  {
    id: "4",
    name: "Golden Serum Essence",
    brand: "ELITE BEAUTY",
    price: "8,500",
    category: "Beauty",
    img: "🧪",
    description: "24k gold infused skin revitalization."
  },
  {
    id: "5",
    name: "Lunar Desk Lamp",
    brand: "ATELIER LIGHTING",
    price: "15,999",
    category: "Living",
    img: "💡",
    description: "Ambient lighting inspired by lunar phases."
  }
];