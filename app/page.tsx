import { api } from '@/app/lib/woocommerce';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { Reveal } from '../components/Reveal';
import CollectionSlider from '../components/CollectionSlider'; 
import SeasonalTrends from '../components/SeasonalTrends';
import ProductRow from '../components/ProductRow';
import DealsGrid from '../components/DealsGrid';
import CategoryCircle from '../components/CategoryCircle';
import BeautySection from '../components/BeautySection';
import BestSellers from '../components/BestSellers';
import BrandShowcase from '../components/BrandShowcase';
import BrowsingHistory from '../components/BrowsingHistory';
import Features from '../components/Features';
import Footer from '../components/Footer';
import MobileSection from '../components/MobileSection';

export default async function Home() {
  let summerProducts = [];
  let allCategories = [];
  let latestProducts = [];

  try {
    // Pipeline Pipeline: Summer, Categories, aur Latest Products sab ek sath fast fetch kiye server par
    const [productsRes, categoriesRes, latestRes] = await Promise.all([
      api.get('products', { category: 'the-summer-edit', per_page: 20, status: 'publish' }).catch(() => ({ data: [] })),
      api.get('products/categories', { per_page: 100 }).catch(() => ({ data: [] })),
      api.get('products', { per_page: 4, order: 'desc', orderby: 'date', status: 'publish' }).catch(() => ({ data: [] }))
    ]);

    summerProducts = productsRes.data;
    allCategories = categoriesRes.data;
    latestProducts = latestRes.data;
  } catch (error) {
    console.error("Home master grid fetch failure:", error);
  }

  return (
    <main className="bg-[#EAEDED] min-h-screen">
      <Header />
      
      <div className="relative isolate">
        <Hero />

        <div className="max-w-[1500px] mx-auto px-4 md:px-6 -mt-32 md:-mt-80 relative z-[99] pointer-events-auto space-y-12 pb-20">
          
          {/* --- MOBILE/LATEST SECTION (Passed fresh products array) --- */}
          <Reveal>
            <MobileSection products={latestProducts} />
          </Reveal>

          <CollectionSlider />

          <Reveal>
            <SeasonalTrends products={summerProducts} />
          </Reveal>

          <Reveal>
            <DealsGrid categories={allCategories} />
          </Reveal>

          <Reveal>
            <DealsGrid categories={allCategories} />
          </Reveal>

          <Reveal>
            <ProductRow />
          </Reveal>

          <Reveal>
            <CategoryCircle />
          </Reveal>

          <Reveal>
            <BeautySection />
          </Reveal>

          <Reveal>
            <BrandShowcase />
          </Reveal>

          <Reveal>
            <BestSellers />
          </Reveal>

          <Reveal>
            <BrowsingHistory />
          </Reveal>

          <Reveal>
            <div className="w-full h-48 bg-white shadow-sm flex items-center justify-center border border-gray-100 group cursor-pointer overflow-hidden rounded-sm relative">
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