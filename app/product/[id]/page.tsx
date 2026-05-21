import { api } from '@/app/lib/woocommerce';
import ProductDetailsClient from './ProductDetailsClient';

// Next.js params ko properly async handle karne ke liye type definition
interface PageProps {
  params: Promise<{ id: string }>;
}

// 👈 Is function ko 'export default' hona zaroori hai Next.js router ke liye
export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  try {
    // 1. Base Product Fetch
    const baseProductRes = await api.get(`products/${id}`);
    const product = baseProductRes.data;

    if (!product) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center text-neutral-500 font-sans text-xs font-black uppercase tracking-[3px]">
          — Item Not Found In Boutique Archive —
        </div>
      );
    }

    // 2. Variations, Related, and Initial Reviews parallel pipeline fetch
    const [variationsRes, reviewsRes, relatedRes] = await Promise.all([
      api.get(`products/${id}/variations`, { per_page: 50 }).catch(() => ({ data: [] })),
      api.get(`products/reviews`, { product: parseInt(id, 10), status: 'approved', per_page: 100 }).catch(() => ({ data: [] })),
      product.related_ids && product.related_ids.length > 0
        ? api.get("products", { include: product.related_ids.slice(0, 4), per_page: 4 }).catch(() => ({ data: [] }))
        : Promise.resolve({ data: [] })
    ]);

    // 3. Client Side Wrapper safely injected with server data
    return (
      <ProductDetailsClient
        initialProduct={product}
        initialVariations={variationsRes.data}
        initialReviews={reviewsRes.data}
        initialRelated={relatedRes.data}
        productId={id}
      />
    );

  } catch (error) {
    console.error("Boutique server route channel alignment failure:", error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-neutral-400 font-sans text-xs font-black uppercase tracking-[3px]">
        — Error Syncing Boutique Data Stream —
      </div>
    );
  }
}