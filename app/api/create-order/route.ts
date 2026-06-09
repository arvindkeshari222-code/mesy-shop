import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, address, phone, country, cart, orderTotal } = body;

    // 🔐 Aapke env se WooCommerce ke credentials uthayega
    const wooUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    if (!wooUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'WooCommerce API credentials missing in .env' }, { status: 500 });
    }

    // 👑 Cart items ko WooCommerce ke standard structure me convert karna (With Dynamic Meta Options)
    const lineItems = cart.map((item: any) => {
      const metaData = item.options ? Object.entries(item.options).map(([key, value]) => ({
        key: key.toUpperCase(),
        value: String(value).toUpperCase()
      })) : [];

      return {
        product_id: item.id,
        quantity: item.quantity,
        meta_data: metaData // 👈 Yeh variant ke details DSers tak sahi pahunchayega
      };
    });

    // 👑 WooCommerce Order Payload (Standard Fulfill Model)
    const orderData = {
      payment_method: 'paypal',
      payment_method_title: 'PayPal Secured Checkout',
      set_paid: true, // 👈 True rakhenge taaki status direct "Processing" ho aur DSers turant utha le
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        phone: phone,
        country: country // 👈 Dynamic User Selected Country
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        country: country
      },
      line_items: lineItems
    };

    // WooCommerce Ko Request Bhejna
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const response = await fetch(`${wooUrl}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("WooCommerce API Error:", errData);
      return NextResponse.json({ error: 'Failed to sync with WooCommerce' }, { status: 400 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, orderId: data.id });

  } catch (error: any) {
    console.error("Server Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}