import { NextResponse } from 'next/server';

const URL = "https://dev-mesy.pantheonsite.io/wp-json/wc/v3";
const CK = "ck_9304120bd6878947f779772c8e03d522eb450ad9";
const CS = "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73";
const baseUrl = "https://www.mesy.shop";

// 🎯 HARDCODED FAILSAFE LIST: Agar Cloud REST API fail ho jaye toh ye links hamesha dikhenge
const fallbackCategories = [
  "men", "women", "pets", "summer", "beauty", "shoes", "bags", "clothes", "events",
  "200", "201", "202", "203", "204" // Saare critical design color IDs
];

// Fallback Products List (Jitne critical ya main products hain unki IDs)
const fallbackProductIds = [
  "47", "44", "154", "150", "160", "161", "162"
];

const requestHeaders = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export async function GET() {
  let products: any[] = [];
  let categories: any[] = [];
  let fetchFailed = false;

  try {
    const [prodRes, catRes] = await Promise.all([
      fetch(`${URL}/products?consumer_key=${CK}&consumer_secret=${CS}&per_page=100&status=publish`, { method: 'GET', headers: requestHeaders, cache: 'no-store' }),
      fetch(`${URL}/products/categories?consumer_key=${CK}&consumer_secret=${CS}&per_page=100`, { method: 'GET', headers: requestHeaders, cache: 'no-store' })
    ]);

    if (prodRes.ok) products = await prodRes.json();
    else fetchFailed = true;

    if (catRes.ok) categories = await catRes.json();
    else fetchFailed = true;
  } catch (error) {
    console.error("Pantheon security block activated, running fallback array:", error);
    fetchFailed = true;
  }

  // Pure XML string boilerplate configuration
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xmlString += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Home Link Injection
  xmlString += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // 2. Categories Engine Loop
  if (!fetchFailed && Array.isArray(categories) && categories.length > 0) {
    categories.forEach((category: any) => {
      const pathSegment = isNaN(Number(category.slug)) ? category.slug : category.id;
      xmlString += `  <url>\n    <loc>${baseUrl}/category/${pathSegment}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
  } else {
    // API fail hone par fallback links generate honge taaki Google verify kar sake
    fallbackCategories.forEach((slugOrId) => {
      xmlString += `  <url>\n    <loc>${baseUrl}/category/${slugOrId}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
  }

  // 3. Products Engine Loop
  if (!fetchFailed && Array.isArray(products) && products.length > 0) {
    products.forEach((product: any) => {
      xmlString += `  <url>\n    <loc>${baseUrl}/product/${product.id}</loc>\n    <lastmod>${new Date(product.date_modified || Date.now()).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
  } else {
    fallbackProductIds.forEach((id) => {
      xmlString += `  <url>\n    <loc>${baseUrl}/product/${id}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
  }

  xmlString += `</urlset>`;

  return new NextResponse(xmlString, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}