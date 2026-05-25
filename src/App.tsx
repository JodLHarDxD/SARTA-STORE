import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Preloader } from "./components/Preloader/Preloader";
import { CustomCursor } from "./components/CustomCursor";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (showPreloader) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        {/* Animated dynamic noise film grain overlay across the entire SARTA showcase */}
        <div className="noise-overlay" />
        
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        
        {/* Fluid Inertial Custom Mouse Cursor */}
        <CustomCursor />
        
        <Header />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

