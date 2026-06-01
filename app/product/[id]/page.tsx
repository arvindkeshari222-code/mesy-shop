import { api } from '@/app/lib/woocommerce';
import ProductDetailsClient from './ProductDetailsClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // 1. Base Product Request
    const baseProductRes = await api.get(`products/${id}`);
    const product = baseProductRes.data;

    if (!product) {
      return <div className="text-center py-20 text-black">Product not found in archive.</div>;
    }

    // 2. Parallel Endpoint Pipeline - Initial load fetches 100 reviews in one shot securely on server
    const [variationsRes, reviewsRes, relatedRes] = await Promise.all([
      api.get(`products/${id}/variations`, { per_page: 50 }).catch(() => ({ data: [] })),
      api.get(`products/reviews`, { product: parseInt(id, 10), status: 'approved', per_page: 100 }).catch(() => ({ data: [] })),
      product.related_ids && product.related_ids.length > 0
        ? api.get("products", { include: product.related_ids.slice(0, 4), per_page: 4 }).catch(() => ({ data: [] }))
        : Promise.resolve({ data: [] })
    ]);

    return (
      <ProductDetailsClient
        initialProduct={product}
        initialVariations={variationsRes.data}
        initialReviews={reviewsRes.data} // Whole list safely injected into client array
        initialRelated={relatedRes.data}
        productId={id}
      />
    );

  } catch (error) {
    console.error("Fetch alignment failure:", error);
    return <div className="text-center py-20 text-black">Error loading boutique archive channel.</div>;
  }
}