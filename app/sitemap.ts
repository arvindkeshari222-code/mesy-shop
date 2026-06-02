import { MetadataRoute } from 'next';

// 1. Direct fetch call fallback configuration (Axios wrap bypass for next build runtime)
const URL = "https://dev-mesy.pantheonsite.io/wp-json/wc/v3";
const CK = "ck_9304120bd6878947f779772c8e03d522eb450ad9";
const CS = "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73";

// Live Domain Base URL
const baseUrl = "https://www.mesy.shop";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // Static Base Routes
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
  ];

  let productEntries: MetadataRoute.Sitemap = [];
  let categoryEntries: MetadataRoute.Sitemap = [];

  try {
    // 2. Fetch Products with Native Fetch Engine (Works perfectly on Vercel deployment)
    const productsRes = await fetch(`${URL}/products?consumer_key=${CK}&consumer_secret=${CS}&per_page=100&status=publish`, {
      next: { revalidate: 3600 } // Build time pipeline safe execution
    });
    
    if (productsRes.ok) {
      const products = await productsRes.json();
      if (Array.isArray(products)) {
        productEntries = products.map((product: any) => ({
          url: `${baseUrl}/product/${product.id}`,
          lastModified: new Date(product.date_modified || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
      }
    }

    // 3. Fetch Categories & Subcategories with Native Fetch
    const categoriesRes = await fetch(`${URL}/products/categories?consumer_key=${CK}&consumer_secret=${CS}&per_page=100`, {
      next: { revalidate: 3600 }
    });

    if (categoriesRes.ok) {
      const categories = await categoriesRes.json();
      if (Array.isArray(categories)) {
        categoryEntries = categories.map((category: any) => {
          // Fallback parsing for numeric color paths vs text layouts
          const pathSegment = isNaN(Number(category.slug)) ? category.slug : category.id;
          return {
            url: `${baseUrl}/category/${pathSegment}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
          };
        });
      }
    }
  } catch (error) {
    console.error("Vercel production sitemap stream breakdown:", error);
  }

  // Combine everything seamlessly
  return [...staticPages, ...categoryEntries, ...productEntries];
}