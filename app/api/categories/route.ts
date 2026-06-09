// app/api/categories/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Aapki .env.local file ke mutabik sahi naam yahan set kar diye hain
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    const wpUrl = process.env.NEXT_PUBLIC_WOO_URL;

    if (!consumerKey || !consumerSecret || !wpUrl) {
      return NextResponse.json({ 
        error: "Environment variables missing!", 
        hint: "Check your .env.local file variables configuration."
      }, { status: 500 });
    }

    const response = await fetch(
      `${wpUrl}/wp-json/wc/v3/products/categories?per_page=100`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
        },
        next: { revalidate: 60 }, // 60 seconds caching
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ 
        error: "WooCommerce API responded with an error status", 
        status: response.status,
        details: errorData 
      }, { status: response.status });
    }
    
    const categories = await response.json();
    
    // Sirf top-level/parent categories filter kar rahe hain
    const parents = categories.filter((cat: any) => cat.parent === 0 && cat.slug !== 'uncategorized');

    // Har parent ke sath uski sub-categories attach kar rahe hain
    const formattedMenu = parents.map((parent: any) => {
      const subItems = categories
        .filter((cat: any) => cat.parent === parent.id)
        .map((sub: any) => ({
          name: sub.name,
          slug: sub.slug,
        }));

      return {
        name: parent.name,
        slug: parent.slug,
        subItems: subItems,
      };
    });

    return NextResponse.json(formattedMenu);
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to fetch categories', 
      reason: error.message || String(error) 
    }, { status: 500 });
  }
}