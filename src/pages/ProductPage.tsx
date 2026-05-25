import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice, getProductBySlug, products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import "./ProductPage.css";

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCart();

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0];
    addItem({
      product,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="pdp page page-enter" style={{ backgroundColor: "#ffffff" }}>
      {/* ═══════════════════════════════════════════════════════════════
          ZARA-STYLE LANDSCAPE POSTER HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="zara-poster-hero">
        <div className="zara-poster-hero__frame">
          <img src={product.image} alt={product.name} className="zara-poster-hero__img" />
          <div className="zara-poster-hero__logo">Sarta</div>
        </div>

        <div className="zara-poster-hero__label-box">
          <h2 className="zara-poster-hero__label-title">{product.category}</h2>
          <p className="zara-poster-hero__label-subtitle">{product.tag || "LIMITED COLLECTION / DESIGN SERIES"}</p>
        </div>

        <div className="zara-poster-hero__sidebar">
          <div className="zara-poster-hero__sidebar-inner">
            <span className="zara-poster-hero__sidebar-link">BAG</span>
            <span className="zara-poster-hero__sidebar-link">LOG IN</span>
            <span className="zara-poster-hero__sidebar-link">HELP</span>
          </div>
          <div className="zara-poster-hero__sidebar-arrow">→</div>
        </div>
      </section>

      <div className="container pdp__crumb" style={{ paddingTop: '80px', color: "#000000" }}>
        <Link to="/shop" style={{ color: "#000000" }}>Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="container pdp__layout">
        <div className="pdp__gallery">
          <img
            src={product.gallery[activeImage] ?? product.image}
            alt={product.name}
            className="pdp__main-img"
          />
          <div className="pdp__thumbs">
            {product.gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                className={activeImage === index ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp__info">
          {product.tag && <span className="pdp__tag">{product.tag}</span>}
          <h1 className="display pdp__title">{product.name}</h1>
          <p className="pdp__price">{formatPrice(product.price)}</p>
          <p className="pdp__desc">{product.description}</p>

          <div className="pdp__option">
            <p className="eyebrow">Color — {color || product.colors[0]}</p>
            <div className="pdp__swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={color === c || (!color && c === product.colors[0]) ? "is-active" : ""}
                  onClick={() => setColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__option">
            <p className="eyebrow">Size</p>
            <div className="pdp__sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={size === s || (!size && s === product.sizes[0]) ? "is-active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="btn btn--primary pdp__add" onClick={handleAdd}>
            Add to bag
          </button>

          <ul className="pdp__details">
            {product.details.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container pdp__related">
          <h2 className="display">You may also like</h2>
          <div className="pdp__related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
