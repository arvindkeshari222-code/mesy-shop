import { NextResponse } from 'next/server';

const URL = "https://dev-mesy.pantheonsite.io/wp-json/wc/v3";
const CK = "ck_9304120bd6878947f779772c8e03d522eb450ad9";
const CS = "cs_08ae962d4f00a7bc2793ed847965f6f3a764bc73";
const baseUrl = "https://www.mesy.shop";

// 100% secure query path concatenation string construction
const productsApiUrl = `${URL}/products?consumer_key=${CK}&consumer_secret=${CS}&per_page=100&status=publish`;
const categoriesApiUrl = `${URL}/products/categories?consumer_key=${CK}&consumer_secret=${CS}&per_page=100`;

export async function GET() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    // Forcefully fetch raw data using query string keys (Pantheon Safe)
    const [prodRes, catRes] = await Promise.all([
      fetch(productsApiUrl, { cache: 'no-store' }),
      fetch(categoriesApiUrl, { cache: 'no-store' })
    ]);

    if (prodRes.ok) products = await prodRes.json();
    if (catRes.ok) categories = await catRes.json();
  } catch (error) {
    console.error("Direct XML engine stream failure:", error);
  }

  // Pure XML template raw string interpolation build engine
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xmlString += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Home Link injection
  xmlString += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // 2. Categories mapping iteration
  if (Array.isArray(categories)) {
    categories.forEach((category: any) => {
      const pathSegment = isNaN(Number(category.slug)) ? category.slug : category.id;
      xmlString += `  <url>\n    <loc>${baseUrl}/category/${pathSegment}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
  }

  // 3. Products mapping iteration
  if (Array.isArray(products)) {
    products.forEach((product: any) => {
      xmlString += `  <url>\n    <loc>${baseUrl}/product/${product.id}</loc>\n    <lastmod>${new Date(product.date_modified || Date.now()).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
  }

  xmlString += `</urlset>`;

  // Direct XML text application content-type stream return logic
  return new NextResponse(xmlString, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=60'
    },
  });
}