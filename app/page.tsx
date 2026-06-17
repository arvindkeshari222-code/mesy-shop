import { api } from '@/app/lib/woocommerce';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { Reveal } from '../components/Reveal';
import CollectionSlider from '../components/CollectionSlider'; 
import SeasonalTrends from '../components/SeasonalTrends';
import CategoryCircle from '../components/CategoryCircle';
import BeautySection from '../components/BeautySection';
import BestSellers from '../components/BestSellers';
import BrandShowcase from '../components/BrandShowcase';
import BrowsingHistory from '../components/BrowsingHistory';
import Features from '../components/Features';
import Footer from '../components/Footer';
import MobileSection from '../components/MobileSection';
import ToysSection from '../components/ToysSection'; 
import ProductRowSection from '../components/ProductRowSection';

export default async function Home() {
  let summerProducts = [];
  let mobileProducts = [];
  let wellnessProducts = [];
  let toysProducts = []; 
  let allCategories = [];
  
  let menProducts = [];
  let womenProducts = [];
  let petsProducts = [];

  try {
    const [summerRes, mobileRes, wellnessRes, toysRes, categoriesRes, menRes, womenRes, petsRes] = await Promise.all([
      api.get('products', { category: '47', per_page: 8, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] })),
      api.get('products', { category: '44', per_page: 8, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] })),
      api.get('products', { category: '154,288', per_page: 8, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] })),
      api.get('products', { category: '150', per_page: 8, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] })),
      
      // 🔥 MASTER FIX FOR CIRCLES: Added timestamp to break WordPress cache & dropped revalidate to 10s
      api.get('products/categories', { per_page: 50, _timestamp: Date.now(), next: { revalidate: 10 } }).catch(() => ({ data: [] })),
      
      api.get('products', { category: '160', per_page: 4, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] })),
      api.get('products', { category: '161', per_page: 4, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] })),
      api.get('products', { category: '162', per_page: 4, status: 'publish', _fields: 'id,name,price,images', next: { revalidate: 60 } }).catch(() => ({ data: [] }))
    ]);

    const filterUnique = (arr: any[]) => arr.filter((p, i, s) => s.findIndex((t) => t.id === p.id) === i);

    summerProducts = filterUnique(summerRes.data);
    mobileProducts = filterUnique(mobileRes.data);
    wellnessProducts = filterUnique(wellnessRes.data);
    toysProducts = filterUnique(toysRes.data); 
    
    // 🔥 Saari categories (with brand new images) ab bina freeze hue isme aayengi
    allCategories = categoriesRes.data;
    
    menProducts = filterUnique(menRes.data);
    womenProducts = filterUnique(womenRes.data);
    petsProducts = filterUnique(petsRes.data);

  } catch (error) {
    console.error("Home master grid fetch failure:", error);
  }

  return (
    <main className="bg-[#ffffff] min-h-screen font-sans antialiased text-black">
      <Header />
      
      <div className="relative isolate w-full">
        <Hero />

        <div className="max-w-[1500px] mx-auto px-4 md:px-6 -mt-32 md:-mt-52 relative z-30 pointer-events-auto space-y-16 pb-20">
          
          <Reveal>
            <BestSellers />
          </Reveal>

          <CollectionSlider categories={allCategories} />

          <Reveal>
            <SeasonalTrends products={summerProducts} />
          </Reveal>

          <Reveal>
            <ProductRowSection title="MEN ARCHIVE" slug="men" products={menProducts} />
          </Reveal>

          <Reveal>
            <MobileSection products={mobileProducts} />
          </Reveal>

          <Reveal>
            <ProductRowSection title="WOMEN SILHOUETTES" slug="women" products={womenProducts} />
          </Reveal>

          <Reveal>
            <ToysSection products={toysProducts} />
          </Reveal>

          <Reveal>
            <ProductRowSection title="PETS ARCHIVE" slug="pets" products={petsProducts} />
          </Reveal>

          <Reveal>
            <BeautySection products={wellnessProducts} />
          </Reveal>

          <Reveal>
            <BrandShowcase />
          </Reveal>

          {/* 👑 TUMHARA DYNAMIC CIRCLE GRID SEAMLESSLY REFRESHED HERE */}
          <Reveal>
            <CategoryCircle categories={allCategories} />
          </Reveal>

          <Reveal>
            <BrowsingHistory />
          </Reveal>

          <Reveal>
            <div className="w-full h-48 bg-white shadow-sm flex items-center justify-center border border-gray-100 group cursor-pointer overflow-hidden rounded-[24px] relative">
               <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity" />
               <div className="text-center">
                  <p className="text-[10px] font-black tracking-[12px] text-gray-300 uppercase mb-4">The Collection</p>
                  <h3 className="text-3xl font-serif italic text-gray-400 group-hover:text-[#C5A358] transition-all duration-700 uppercase tracking-tighter">
                    MESY ATELIER <span className="font-sans font-light not-italic">2026</span>
                  </h3>
               </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Features />
      <Footer />
    </main>
  );
}