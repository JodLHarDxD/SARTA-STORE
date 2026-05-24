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
      <div className="checkout page page-enter container checkout--success">
        <h1 className="display">Thank you</h1>
        <p>Your order is confirmed. This is a demo storefront — no payment was processed.</p>
        <Link to="/shop" className="btn btn--primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout page page-enter">
      <div className="container checkout__layout">
        <form className="checkout__form" onSubmit={onSubmit}>
          <h1 className="display checkout__title">Checkout</h1>

          <fieldset>
            <legend className="eyebrow">Contact</legend>
            <input type="email" required placeholder="Email" />
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Shipping address</legend>
            <div className="checkout__row">
              <input type="text" required placeholder="First name" />
              <input type="text" required placeholder="Last name" />
            </div>
            <input type="text" required placeholder="Address" />
            <div className="checkout__row">
              <input type="text" required placeholder="City" />
              <input type="text" required placeholder="Postal code" />
            </div>
            <input type="text" required placeholder="Country" />
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Payment (demo)</legend>
            <input type="text" placeholder="Card number" disabled value="4242 4242 4242 4242" />
            <p className="checkout__demo">
              Demo checkout only. Connect Stripe or Shopify when you go live.
            </p>
          </fieldset>

          <button type="submit" className="btn btn--primary checkout__submit">
            Place order · {formatPrice(total)}
          </button>
        </form>

        <aside className="checkout__summary">
          <h2>Order ({items.length})</h2>
          <ul>
            {items.map((item) => (
              <li key={`${item.product.id}-${item.size}`}>
                <img src={item.product.image} alt="" />
                <div>
                  <p>{item.product.name}</p>
                  <span>
                    {item.color} / {item.size} × {item.quantity}
                  </span>
                </div>
                <strong>{formatPrice(item.product.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className="checkout__totals">
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
