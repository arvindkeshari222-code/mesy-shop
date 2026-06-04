import { NextResponse } from 'next/server';

// 1. NEXT.JS CACHE KO FORCE-DISABLE KARNE KE LIYE (IMPORTANT)
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> } // TypeScript error se bachne ke liye Promise lagaya
) {
  try {
    // Next.js ke latest standards ke mutabiq params ko await kiya
    const resolvedParams = await params;
    const id = resolvedParams.productId;
    
    // Aapki .env.local file se automatic credentials uthane ke liye
    const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL || "https://dev-mesy.pantheonsite.io";
    const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
    const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
    
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      return NextResponse.json({ error: 'API Keys missing in .env.local' }, { status: 500 });
    }
    
    const authHeader = `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`;

    // 2. Main Product fetch karein (Price aur Stock ke liye) - cache: 'no-store' ke sath
    const res = await fetch(`${WOO_URL}/wp-json/wc/v3/products/${id}`, {
      headers: {
        'Authorization': authHeader,
      },
      cache: 'no-store' // Next.js data cache ko bypass karega
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: 'WooCommerce se data fetch nahi ho paya' }, { status: 500 });
    }
    
    const productData = await res.json();
    
    // 3. Agar variable product hai, to uske Variations bhi fetch karein
    let variations = [];
    if (productData.variations && productData.variations.length > 0) {
       const varRes = await fetch(`${WOO_URL}/wp-json/wc/v3/products/${id}/variations?per_page=100`, {
         headers: {
           'Authorization': authHeader,
         },
         cache: 'no-store' // Variations ke liye bhi cache disable
       });
       if (varRes.ok) {
         variations = await varRes.json();
       }
    }

    // Front-end ko zaruri live data return karein
    return NextResponse.json({
      price: productData.price,
      regular_price: productData.regular_price,
      stock_status: productData.stock_status,
      variations: variations
    });

  } catch (error) {
    console.error("WooCommerce live sync API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}