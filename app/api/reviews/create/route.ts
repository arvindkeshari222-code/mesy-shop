import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const productId = formData.get('product_id') as string;
    const reviewText = formData.get('review') as string;
    const reviewerName = formData.get('reviewer') as string;
    const reviewerEmail = formData.get('reviewer_email') as string;
    const rating = formData.get('rating') as string;
    const file = formData.get('image') as File | null; // Single media fallback

    const WP_URL = "https://dev-mesy.pantheonsite.io";
    const wpAuth = Buffer.from("aviji646:6eHupPEU9o5IPoPoQwLJhe1p").toString('base64');
    let finalReviewText = reviewText;

    // Standard Single Media Upload
    if (file && file.size > 0) {
      try {
        const mediaFd = new FormData();
        mediaFd.append('file', file);
        const mediaRes = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
          method: 'POST',
          headers: { 'Authorization': `Basic ${wpAuth}` },
          body: mediaFd
        });
        if (mediaRes.ok) {
          const media = await mediaRes.json();
          if (file.type.startsWith('video/')) {
            finalReviewText += `\n\n[video] ${media.source_url}`;
          } else {
            finalReviewText += `\n\n[image] ${media.source_url}`;
          }
        }
      } catch (e) {
        console.log("Media upload skipped");
      }
    }

    // Core WordPress Comment Submission
    const commentFormData = new URLSearchParams();
    commentFormData.append('comment_post_ID', productId);
    commentFormData.append('author', reviewerName);
    commentFormData.append('email', reviewerEmail);
    commentFormData.append('comment', finalReviewText);
    commentFormData.append('rating', rating); 
    commentFormData.append('comment_parent', '0');

    const wpCommentRes = await fetch(`${WP_URL}/wp-comments-post.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: commentFormData.toString(),
    });

    if (wpCommentRes.status === 200 || wpCommentRes.status === 302 || wpCommentRes.redirected) {
      return NextResponse.json({
        reviewer: reviewerName,
        reviewer_email: reviewerEmail,
        review: finalReviewText,
        rating: parseInt(rating, 10),
        product_id: parseInt(productId, 10)
      }, { status: 200 });
    }

    return NextResponse.json({ message: "Submission failed" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}