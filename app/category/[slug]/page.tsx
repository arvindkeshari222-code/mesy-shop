"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export default function CategoryPage() {
  const { slug } = useParams();

  // Yahan hum hardcoded keys use kar rahe hain taaki "required" error khatam ho jaye
  const api = useMemo(() => {
    return new (WooCommerceRestApi as any)({
      url: "https://dev-mesy.pantheonsite.io",
      consumerKey: "ck_e5c365c8d863e7f8966714bbff4fd3090a7bc6fd", 
      consumerSecret: "cs_eb0baf2c94304850809aeebf46a1382811c3e7da", 
      version: "wc/v3",
      queryStringAuth: true,
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        // Pehle category fetch karo
        const res = await api.get("products/categories", { slug: slug });
        const cat = res.data?.[0];
        setCategoryData(cat);
        
        // Agar category mili, tab products fetch karo
        if (cat) {
          const prodRes = await api.get("products", { category: cat.id, per_page: 50, status: 'publish' });
          setProducts(prodRes.data);
        }
      } catch (err) { 
        console.error("API Error:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    
    if (slug) fetchCategoryAndProducts();
  }, [slug, api]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen pt-32 px-10">
      <h1 className="text-4xl italic mb-10">{categoryData?.name}</h1>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4">
            <h2 className="text-sm font-bold uppercase">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}