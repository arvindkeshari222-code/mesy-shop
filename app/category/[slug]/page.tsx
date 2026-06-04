"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

// 👑 DYNAMIC API CONFIG: Hardcoding hatakar environment variables ka use karo
const api = new (WooCommerceRestApi as any)({
  url: "https://dev-mesy.pantheonsite.io",
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY, // Vercel/Env se utha raha hai
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET, // Vercel/Env se utha raha hai
  version: "wc/v3",
  queryStringAuth: true,
});

const categoryColorMap: { [key: string]: string } = {
  "200": "BLACK ARCHIVE",
  "201": "PARADISE PINK",
  "202": "SUN KISSED BROWN",
  "203": "CRISP WHITE",
  "204": "NAVY ARCHIVE"
};

const ProductCardGridItem = ({ product, idx }: { product: any; idx: number }) => {
  // ... (Tumhara existing ProductCardGridItem code yahi rahega) ...
  return (
    <div className="relative block group bg-white w-full text-left">
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-50 cursor-pointer w-full h-full" />
      <Reveal delay={0.03 * idx}>
        <div className="space-y-4 w-full">
          <div className="relative aspect-[3/4] bg-white border border-neutral-100 overflow-hidden w-full mb-3">
            {product.images?.[0]?.src ? (
              <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-300">No Image</div>
            )}
          </div>
          <div className="space-y-1 px-1">
            <h2 className="text-[11px] font-bold text-neutral-400 group-hover:text-black line-clamp-1 uppercase tracking-[2px]">{product.name}</h2>
            <span className="text-xs font-bold text-black">${parseFloat(product.price || "0").toFixed(2)}</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const currentParam = String(slug).trim();
        const isId = !isNaN(Number(currentParam)); 

        let targetCategoryId = null;

        if (isId) {
          try {
            const catRes = await api.get(`products/categories/${currentParam}`);
            targetCategoryId = catRes.data.id;
            setCategoryData({ id: catRes.data.id, name: categoryColorMap[currentParam] || catRes.data.name });
          } catch (err) {
            targetCategoryId = currentParam;
            setCategoryData({ id: currentParam, name: categoryColorMap[currentParam] || "COLOR ARCHIVE" });
          }
        } else {
          const catRes = await api.get("products/categories", { slug: currentParam });
          const category = catRes.data?.[0];
          if (category) {
            targetCategoryId = category.id;
            setCategoryData(category);
          }
        }

        if (targetCategoryId) {
          const prodRes = await api.get("products", { category: targetCategoryId, per_page: 50, status: 'publish' });
          setProducts(prodRes.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCategoryAndProducts();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!categoryData) return <div className="text-center py-32">Collection Empty.</div>;

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-[1450px] mx-auto px-4 lg:px-12 pt-28 pb-20">
        <h1 className="text-4xl font-serif italic mb-10">{categoryData.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, idx) => <ProductCardGridItem key={product.id} product={product} idx={idx} />)}
        </div>
      </main>
    </div>
  );
}