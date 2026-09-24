import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import FeatureStrip from "./components/FeatureStrip";
import CategorySection from "./components/Categorysection";
import PopularSection from "./components/PopularSection";
import PromoBanners from "./components/PromoBanners";
import TrustStrip from "./components/TrustStrip";
import Footer from "./components/Footer";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex bg-white p-4 gap-4 items-start">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Hero />
            <FeatureStrip />
            <CategorySection />
            <PopularSection />
            <PromoBanners />
            <TrustStrip />
            <Footer />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}