import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const include = searchParams.get('include');

    if (!include) {
      return NextResponse.json([]);
    }

    const wcBaseUrl = `https://dev-mesy.pantheonsite.io/wp-json/wc/v3/products`;
    
    // Environment Variables check
    const ck = process.env.WOOCOMMERCE_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const cs = process.env.WOOCOMMERCE_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (!ck || !cs) {
      console.error("❌ WooCommerce API Keys are missing in your .env.local file!");
      return NextResponse.json({ error: "API Credentials missing on server" }, { status: 401 });
    }

    // 👑 BEYOND PANTHEON PROXY: Encoding keys into standard HTTP Basic Auth Header
    const authBuffer = Buffer.from(`${ck}:${cs}`).toString('base64');
    const finalWcUrl = `${wcBaseUrl}?include=${include}&per_page=100`;

    console.log(`📡 Secure Auth Header Fetching from WooCommerce...`);

    const response = await fetch(finalWcUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authBuffer}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 } 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ WooCommerce Error Response (Status ${response.status}):`, errorText);
      return NextResponse.json(
        { error: `WooCommerce responded with status ${response.status}`, details: errorText }, 
        { status: response.status }
      );
    }

    const products = await response.json();
    return NextResponse.json(products);

  } catch (error: any) {
    console.error("💥 API Route Server Crash:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}