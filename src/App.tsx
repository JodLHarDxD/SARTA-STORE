import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";

// ── Providers ──────────────────────────────────────────────────────────────────
import { CartProvider } from "@/features/cart/CartContext";

// ── Layout ─────────────────────────────────────────────────────────────────────
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// ── UI (site-wide) ─────────────────────────────────────────────────────────────
import { CartDrawer } from "@/features/cart/CartDrawer";
import { Preloader } from "@/components/ui/Preloader/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor/CustomCursor";

// ── Pages / Features ───────────────────────────────────────────────────────────
import { Home } from "@/features/home/Home";
import { Shop } from "@/features/shop/Shop";
import { ProductPage } from "@/features/product/ProductPage";
import { CartPage } from "@/features/cart/CartPage";
import { CheckoutPage } from "@/features/checkout/CheckoutPage";
import { AboutPage } from "@/features/about/AboutPage";

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
