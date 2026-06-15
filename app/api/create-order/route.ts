import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 👑 FIXED: Added "email" in destructuring to grab it from frontend payload
    const { firstName, lastName, email, address, phone, country, countryCode, cart, orderTotal, paypalOrderId } = body;

    // 🔐 FIXED MATCHING: Automatically maps with your exact .env configuration matrix
    const wooUrl = process.env.NEXT_PUBLIC_WOO_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY || process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET || process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

    // Credentials Fallback Safety Check
    if (!wooUrl || !consumerKey || !consumerSecret) {
      console.error("🚨 CRITICAL ERROR: WooCommerce Environment Keys Missing inside .env!");
      return NextResponse.json({ error: 'WooCommerce API credentials missing in server .env' }, { status: 500 });
    }

    // 👑 Cart Mapping Framework for Dynamic Variants (Color, Size etc.)
    const lineItems = cart.map((item: any) => {
      const metaData = item.options ? Object.entries(item.options).map(([key, value]) => ({
        key: key.toUpperCase(),
        value: String(value).toUpperCase()
      })) : [];

      // Falls back to item.id cleanly if item.wooProductId is empty
      return {
        product_id: Number(item.wooProductId || item.id),
        quantity: item.quantity,
        meta_data: metaData
      };
    });

    // 👑 Strict Production WooCommerce Order Blueprint Payload
    const orderData = {
      payment_method: 'paypal',
      payment_method_title: 'PayPal Secured Checkout',
      set_paid: true, // 👈 Ensures status automatically turns "Processing" for clean DSers synchronization
      transaction_id: paypalOrderId || '', 
      billing: {
        first_name: firstName,
        last_name: lastName,
        email: email, // 👈 👑 FIXED: This line maps email parameter directly into WooCommerce Dashboard
        address_1: address,
        phone: phone,
        country: countryCode || country || 'US' // 👈 Enforces 2-Letter ISO standard (US, CA, GB etc.)
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        country: countryCode || country || 'US'
      },
      line_items: lineItems
    };

    // Construct Basic Authentication Header Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    // Clean trailing slash from the base URL if any exists
    const cleanWooUrl = wooUrl.replace(/\/$/, '');

    console.log("🚀 Transmitting authorized checkout request to WooCommerce standard REST endpoint...");
    const response = await fetch(`${cleanWooUrl}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(orderData)
    });

    // Handle Endpoint Validation Rejection
    if (!response.ok) {
      const errData = await response.json();
      console.error("❌ WooCommerce REST API Server Refused To Create Order:", errData);
      return NextResponse.json({ error: 'Failed to sync with WooCommerce', details: errData }, { status: 400 });
    }

    const data = await response.json();
    console.log(`✅ Order successfully logged in WooCommerce Database! Internal ID: ${data.id}`);
    return NextResponse.json({ success: true, orderId: data.id });

  } catch (error: any) {
    console.error("🚨 Server Internal Catch System Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}