import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const productId = formData.get('product_id') as string;
    const reviewText = formData.get('review') as string;
    const reviewerName = formData.get('reviewer') as string;
    const reviewerEmail = formData.get('reviewer_email') as string;
    const rating = formData.get('rating') as string;
    const file = formData.get('image') as File | null;

    const WP_URL = "https://dev-mesy.pantheonsite.io";
    const USERNAME = "aviji646"; 
    const APP_PASSWORD = "8Eqp fSio etIJ KAoc qIpR SOL6";
    const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

    let uploadedImageId = null;
    let uploadedImageUrl = '';

    // ======= STEP 1: UPLOAD TO WORDPRESS MEDIA LIBRARY =======
    if (file && file.size > 0) {
      const mediaFormData = new FormData();
      mediaFormData.append('file', file, file.name);

      try {
        const wpMediaResponse = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
          },
          body: mediaFormData,
        });

        if (wpMediaResponse.ok) {
          const mediaData = await wpMediaResponse.json();
          uploadedImageId = mediaData.id;
          uploadedImageUrl = mediaData.source_url;
        }
      } catch (mediaErr) {
        console.error("Media Upload Pipeline Failed:", mediaErr);
      }
    }

    // ======= STEP 2: CREATE WOOCOMMERCE REVIEW WITH META DATA =======
    const CONSUMER_KEY = 'ck_9304120bd6878947f779772c8e03d522eb450ad9'; 
    const CONSUMER_SECRET = 'cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73';
    
    const reviewBody: any = {
      product_id: parseInt(productId, 10),
      review: reviewText,
      reviewer: reviewerName,
      reviewer_email: reviewerEmail,
      rating: parseInt(rating, 10),
      status: 'approved',
    };

    if (uploadedImageId) {
      reviewBody.meta_data = [
        { key: 'review_image_id', value: uploadedImageId.toString() },
        { key: 'review_image_url', value: uploadedImageUrl }
      ];
    }

    const wcReviewResponse = await fetch(`${WP_URL}/wp-json/wc/v3/products/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')}`,
      },
      body: JSON.stringify(reviewBody),
    });

    const data = await wcReviewResponse.json();

    if (!wcReviewResponse.ok) {
      return NextResponse.json({ error: data.message || 'WooCommerce Error' }, { status: wcReviewResponse.status });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}