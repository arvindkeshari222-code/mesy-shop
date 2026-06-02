import { MetadataRoute } from 'next';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new (WooCommerceRestApi as any)({
  url: "https://dev-mesy.pantheonsite.io",
  consumerKey: "ck_9304120bd6878947f779772c8e03d522eb450ad9",
  consumerSecret: "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73",
  version: "wc/v3",
  queryStringAuth: true
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Apni site ka Base URL define karo
  const baseUrl = "https://www.mesy.shop/"; // 👈 Yahan apni live site ka asli domain daal dena

  // Static Pages (Home, About, etc.)
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
  ];

  let productEntries: any[] = [];
  let categoryEntries: any[] = [];

  try {
    // 2. Fetch all products from WooCommerce for Sitemap
    const productsRes = await api.get("products", { per_page: 100, status: 'publish' });
    productEntries = productsRes.data.map((product: any) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(product.date_modified || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // 3. Fetch all categories (Jaise 'men', 'women', aur color IDs like '204')
    const categoriesRes = await api.get("products/categories", { per_page: 100 });
    categoryEntries = categoriesRes.data.map((category: any) => {
      // Agar numeric ID hai toh dynamic route handle hoga, nahi toh slug text
      const pathSegment = category.slug || category.id;
      return {
        url: `${baseUrl}/category/${pathSegment}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      };
    });
  } catch (error) {
    console.error("Sitemap generation fetching failed:", error);
  }

  // Sabko merge karke return karo
  return [...staticPages, ...categoryEntries, ...productEntries];
}