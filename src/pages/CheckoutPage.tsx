import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import "./CheckoutPage.css";

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) {
    return <Navigate to="/cart" replace />;
  }

  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="checkout page page-enter container checkout--success" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
        <h1 className="display" style={{ color: "#000000" }}>Thank you</h1>
        <p style={{ color: "#555555" }}>Your order is confirmed. This is a demo storefront — no payment was processed.</p>
        <Link to="/shop" className="btn btn--primary" style={{ border: "1px solid #000000", color: "#ffffff", backgroundColor: "#000000" }}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout page page-enter" style={{ backgroundColor: "#ffffff" }}>
      {/* ═══════════════════════════════════════════════════════════════
          ZARA-STYLE LANDSCAPE POSTER HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="zara-poster-hero">
        <div className="zara-poster-hero__frame">
          <img src="/media/campaign_both.png" alt="SARTA Checkout Edit" className="zara-poster-hero__img" />
          <div className="zara-poster-hero__logo">Sarta</div>
        </div>

        <div className="zara-poster-hero__label-box">
          <h2 className="zara-poster-hero__label-title">THE ORDER</h2>
          <p className="zara-poster-hero__label-subtitle">SECURE TRANSIT & TAILORED PACKAGING / SS26</p>
        </div>

        <div className="zara-poster-hero__sidebar">
          <div className="zara-poster-hero__sidebar-inner">
            <span className="zara-poster-hero__sidebar-link">BAG [{items.length}]</span>
            <span className="zara-poster-hero__sidebar-link">LOG IN</span>
            <span className="zara-poster-hero__sidebar-link">HELP</span>
          </div>
          <div className="zara-poster-hero__sidebar-arrow">→</div>
        </div>
      </section>

      {/* Checkout layout details */}
      <div className="container checkout__layout" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <form className="checkout__form" onSubmit={onSubmit}>
          <h1 className="display checkout__title" style={{ color: "#000000" }}>Checkout</h1>

          <fieldset>
            <legend className="eyebrow" style={{ color: "#000000" }}>Contact</legend>
            <input type="email" required placeholder="Email" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
          </fieldset>

          <fieldset>
            <legend className="eyebrow" style={{ color: "#000000" }}>Shipping address</legend>
            <div className="checkout__row">
              <input type="text" required placeholder="First name" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
              <input type="text" required placeholder="Last name" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
            </div>
            <input type="text" required placeholder="Address" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
            <div className="checkout__row">
              <input type="text" required placeholder="City" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
              <input type="text" required placeholder="Postal code" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
            </div>
            <input type="text" required placeholder="Country" style={{ color: "#000000", borderBottom: "1px solid #cccccc" }} />
          </fieldset>

          <fieldset>
            <legend className="eyebrow" style={{ color: "#000000" }}>Payment (demo)</legend>
            <input type="text" placeholder="Card number" disabled value="4242 4242 4242 4242" style={{ color: "#888888", borderBottom: "1px solid #eeeeee" }} />
            <p className="checkout__demo" style={{ color: "#666666" }}>
              Demo checkout only. Connect Stripe or Shopify when you go live.
            </p>
          </fieldset>

          <button type="submit" className="btn btn--primary checkout__submit" style={{ border: "1px solid #000000", color: "#ffffff", backgroundColor: "#000000" }}>
            Place order · {formatPrice(total)}
          </button>
        </form>

        <aside className="checkout__summary" style={{ color: "#000000" }}>
          <h2>Order ({items.length})</h2>
          <ul>
            {items.map((item) => (
              <li key={`${item.product.id}-${item.size}`}>
                <img src={item.product.image} alt="" />
                <div>
                  <p style={{ color: "#000000" }}>{item.product.name}</p>
                  <span style={{ color: "#666666" }}>
                    {item.color} / {item.size} × {item.quantity}
                  </span>
                </div>
                <strong>{formatPrice(item.product.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className="checkout__totals" style={{ color: "#000000" }}>
            <div>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="checkout__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
