import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import "./CartPage.css";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const isEmpty = items.length === 0;
  const shipping = subtotal >= 150 ? 0 : 12;
  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="cart-page page page-enter" style={{ backgroundColor: "#ffffff" }}>
      {/* ═══════════════════════════════════════════════════════════════
          ZARA-STYLE LANDSCAPE POSTER HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="zara-poster-hero">
        <div className="zara-poster-hero__frame">
          <img src="/media/campaign_women.png" alt="SARTA Bag Edit" className="zara-poster-hero__img" />
          <div className="zara-poster-hero__logo">Sarta</div>
        </div>

        <div className="zara-poster-hero__label-box">
          <h2 className="zara-poster-hero__label-title">{isEmpty ? "EMPTY BAG" : "THE SELECTIONS"}</h2>
          <p className="zara-poster-hero__label-subtitle">
            {isEmpty ? "DISCOVER THE LATEST CAMPAIGN EDIT / SS26" : "REFINED ARCHIVAL SILHOUETTES / MILAN"}
          </p>
        </div>

        <div className="zara-poster-hero__sidebar">
          <div className="zara-poster-hero__sidebar-inner">
            <span className="zara-poster-hero__sidebar-link">BAG [{totalCount}]</span>
            <span className="zara-poster-hero__sidebar-link">LOG IN</span>
            <span className="zara-poster-hero__sidebar-link">HELP</span>
          </div>
          <div className="zara-poster-hero__sidebar-arrow">→</div>
        </div>
      </section>

      {/* Cart Content Layout */}
      {isEmpty ? (
        <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
          <h1 className="display" style={{ color: "#000000" }}>Your bag is empty</h1>
          <p className="cart-page__empty" style={{ color: "#666666", marginBottom: "32px" }}>
            Discover the latest campaign silhouettes in our shop.
          </p>
          <Link to="/shop" className="btn btn--primary" style={{ border: "1px solid #000000", color: "#ffffff", backgroundColor: "#000000" }}>
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="container cart-page__layout" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
          <div>
            <h1 className="display cart-page__title">Bag</h1>
            <ul className="cart-page__list">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="cart-page__item"
                >
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-page__item-info">
                    <Link to={`/product/${item.product.slug}`}>
                      <strong style={{ color: "#000000" }}>{item.product.name}</strong>
                    </Link>
                    <p style={{ color: "#666666" }}>
                      {item.color} · {item.size}
                    </p>
                    <div className="cart-page__qty">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-page__remove"
                      onClick={() =>
                        removeItem(item.product.id, item.size, item.color)
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <p className="cart-page__line-price" style={{ color: "#000000" }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <button type="button" className="cart-page__clear" onClick={clearCart} style={{ color: "#000000" }}>
              Clear bag
            </button>
          </div>

          <aside className="cart-page__summary" style={{ color: "#000000" }}>
            <h2>Order summary</h2>
            <div className="cart-page__row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-page__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="cart-page__row cart-page__row--total">
              <span>Total</span>
              <strong>{formatPrice(subtotal + shipping)}</strong>
            </div>
            {subtotal < 150 && (
              <p className="cart-page__promo">
                Add {formatPrice(150 - subtotal)} more for free shipping.
              </p>
            )}
            <Link to="/checkout" className="btn btn--primary cart-page__checkout" style={{ border: "1px solid #000000", color: "#ffffff", backgroundColor: "#000000" }}>
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
