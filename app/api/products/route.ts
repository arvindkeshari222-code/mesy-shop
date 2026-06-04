import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const include = searchParams.get('include');

    if (!include) return NextResponse.json([]);

    const wcBaseUrl = `https://dev-mesy.pantheonsite.io/wp-json/wc/v3/products`;
    const ck = process.env.WOOCOMMERCE_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const cs = process.env.WOOCOMMERCE_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (!ck || !cs) return NextResponse.json({ error: "API Credentials missing" }, { status: 401 });

    const authBuffer = Buffer.from(`${ck}:${cs}`).toString('base64');
    
    // CHANGE: Cache-Buster add kiya 't' parameter se
    const finalWcUrl = `${wcBaseUrl}?include=${include}&per_page=100&t=${Date.now()}`;

    const response = await fetch(finalWcUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authBuffer}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store' 
    });

    if (!response.ok) return NextResponse.json({ error: `WooCommerce error ${response.status}` }, { status: response.status });

    const products = await response.json();
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}