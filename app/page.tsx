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
    // 🎯 ID SYNCED: Category '155' ko hatakar correct ID '44' map kar diya hai!
    const [summerRes, mobileRes, wellnessRes, toysRes, categoriesRes, menRes, womenRes, petsRes] = await Promise.all([
      api.get('products', { category: '47', per_page: 12, status: 'publish' }).catch(() => ({ data: [] })),
      api.get('products', { category: '44', per_page: 12, status: 'publish' }).catch(() => ({ data: [] })), // FIXED HERE
      api.get('products', { category: '154', per_page: 12, status: 'publish' }).catch(() => ({ data: [] })),
      api.get('products', { category: '150', per_page: 12, status: 'publish' }).catch(() => ({ data: [] })), 
      api.get('products/categories', { per_page: 100 }).catch(() => ({ data: [] })),
      
      api.get('products', { category: '160', per_page: 4, status: 'publish' }).catch(() => ({ data: [] })), 
      api.get('products', { category: '161', per_page: 4, status: 'publish' }).catch(() => ({ data: [] })), 
      api.get('products', { category: '162', per_page: 4, status: 'publish' }).catch(() => ({ data: [] }))
    ]);

    const filterUnique = (arr: any[]) => arr.filter((p, i, s) => s.findIndex((t) => t.id === p.id) === i);

    summerProducts = filterUnique(summerRes.data);
    mobileProducts = filterUnique(mobileRes.data);
    wellnessProducts = filterUnique(wellnessRes.data);
    toysProducts = filterUnique(toysRes.data); 
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
          
          {/* 1. BEST SELLERS GRID */}
          <Reveal>
            <BestSellers />
          </Reveal>

          {/* 2. CATEGORY QUICK SLIDER */}
          <CollectionSlider categories={allCategories} />

          {/* 3. SEASONAL & TRENDING (The Summer Edit) */}
          <Reveal>
            <SeasonalTrends products={summerProducts} />
          </Reveal>

          {/* 🔴 LIVE SECTION 1: MEN PRODUCTS */}
          <Reveal>
            <ProductRowSection title="MEN ARCHIVE" slug="men" products={menProducts} />
          </Reveal>

          {/* 4. TECH & INNOVATION (Mobile Suite) */}
          <Reveal>
            <MobileSection products={mobileProducts} />
          </Reveal>

          {/* 🔴 LIVE SECTION 2: WOMEN SILHOUETTES */}
          <Reveal>
            <ProductRowSection title="WOMEN SILHOUETTES" slug="women" products={womenProducts} />
          </Reveal>

          {/* 5. DYNAMIC TOYS & COLLECTIBLES SECTION */}
          <Reveal>
            <ToysSection products={toysProducts} />
          </Reveal>

          {/* 🔴 LIVE SECTION 3: PETS COLLECTIVE */}
          <Reveal>
            <ProductRowSection title="PETS ARCHIVE" slug="pets" products={petsProducts} />
          </Reveal>

          {/* 6. WELLNESS & BODY (Mindful Care) */}
          <Reveal>
            <BeautySection products={wellnessProducts} />
          </Reveal>

          {/* 7. BRAND EXPERIENCE & HISTORY */}
          <Reveal>
            <BrandShowcase />
          </Reveal>

          <Reveal>
            <CategoryCircle categories={allCategories} />
          </Reveal>

          <Reveal>
            <BrowsingHistory />
          </Reveal>

          {/* Luxury Atelier Footer Banner */}
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