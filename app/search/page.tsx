export const dynamic = 'force-dynamic';
import { api } from '@/app/lib/woocommerce';
import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = (params.q as string) || "";

  let results = [];
  try {
    // API se search fetch kar rahe hain
    const res = await api.get('products', { search: query, status: 'publish' });
    results = Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Search fetch failed:", error);
    results = [];
  }

  return (
    <div className="bg-white min-h-screen py-32 px-6 md:px-20 font-sans">
      <header className="mb-20 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 mb-4">Search Results</p>
        <h1 className="text-4xl md:text-6xl font-serif font-thin italic text-neutral-900">
          {query ? `"${query}"` : "All Products"}
        </h1>
      </header>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {results.map((product: any) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block relative border border-neutral-100 p-2 hover:border-black transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden bg-neutral-50 mb-6">
                <img
                  src={product.images?.[0]?.src || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-900">
                  {product.name}
                </h2>
                <p className="text-[10px] text-neutral-500 font-serif italic">
                  ${parseFloat(product.price || 0).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-[10px] uppercase tracking-[0.2em]">
            No products found for "{query}". Try another term.
          </p>
        </div>
      )}
    </div>
  );
}