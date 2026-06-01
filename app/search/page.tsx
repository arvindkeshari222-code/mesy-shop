export const dynamic = 'force-dynamic'; 
import { api } from '@/app/lib/woocommerce'; // Apni api import karo

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = params.q as string;
  
  // 1. API se search karo (Tumhara purana logic yahan aayega)
  let results = [];
  try {
    const res = await api.get('products', { search: query, status: 'publish' });
    results = res.data;
  } catch (error) {
    console.error("Search fetch failed:", error);
  }
  
  // 2. Results show karo
  return (
    <div className="pt-32 px-6">
      <h1 className="text-2xl font-bold uppercase mb-8">Search results for: {query}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((product: any) => (
          <div key={product.id} className="border p-4">
            <img src={product.images[0]?.src} alt={product.name} />
            <h2 className="text-sm font-bold mt-2">{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}