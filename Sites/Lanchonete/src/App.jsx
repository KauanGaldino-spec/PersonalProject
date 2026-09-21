import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero, { DemoMenu } from "./components/Hero";
import CategorySection from "./components/Categorysection";
import PopularSection from "./components/PopularSection";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex bg-white p-4 gap-4">
          <Sidebar />
          <Hero />
        </div>
        <CategorySection />
        <PopularSection />
        <DemoMenu />
      </div>
    </CartProvider>
  );
}