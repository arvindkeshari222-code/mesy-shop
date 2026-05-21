import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('product');
    const page = searchParams.get('page') || '1';

    if (!productId) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const WP_URL = "https://dev-mesy.pantheonsite.io";
    const CONSUMER_KEY = 'ck_9304120bd6878947f779772c8e03d522eb450ad9'; 
    const CONSUMER_SECRET = 'cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73';
    
    // WooCommerce ko basic auth securely headers mein pass kar rahe hain
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const targetUrl = `${WP_URL}/wp-json/wc/v3/products/reviews?product=${productId}&status=approved&per_page=20&page=${page}`;
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'WooCommerce fetch failure' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}