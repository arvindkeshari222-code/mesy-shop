import { MetadataRoute } from 'next';

const URL = "https://dev-mesy.pantheonsite.io/wp-json/wc/v3";
const CK = "ck_9304120bd6878947f779772c8e03d522eb450ad9";
const CS = "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73";

// Live Domain Base URL
const baseUrl = "https://www.mesy.shop";

// Explicit Basic Auth Token (Pantheon Cloud Firewall Bypass)
const token = Buffer.from(`${CK}:${CS}`).toString('base64');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // Static Base Routes
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
  ];

  let productEntries: MetadataRoute.Sitemap = [];
  let categoryEntries: MetadataRoute.Sitemap = [];

  try {
    // 1. Fetch Products with Explicit Auth Headers & No-Cache
    const productsRes = await fetch(`${URL}/products?per_page=100&status=publish`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Live raw data pipeline integration
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

    // 2. Fetch Categories & Subcategories
    const categoriesRes = await fetch(`${URL}/products/categories?per_page=100`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (categoriesRes.ok) {
      const categories = await categoriesRes.json();
      if (Array.isArray(categories)) {
        categoryEntries = categories.map((category: any) => {
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
    console.error("Sitemap compilation tracking error:", error);
  }

  // Final merge execution
  return [...staticPages, ...categoryEntries, ...productEntries];
}