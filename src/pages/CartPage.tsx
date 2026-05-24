import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import "./CartPage.css";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page page page-enter container">
        <h1 className="display">Your bag is empty</h1>
        <p className="cart-page__empty">
          Discover the latest edit in our shop.
        </p>
        <Link to="/shop" className="btn btn--primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 150 ? 0 : 12;

  return (
    <div className="cart-page page page-enter">
      <div className="container cart-page__layout">
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
                    <strong>{item.product.name}</strong>
                  </Link>
                  <p>
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
                <p className="cart-page__line-price">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <button type="button" className="cart-page__clear" onClick={clearCart}>
            Clear bag
          </button>
        </div>

        <aside className="cart-page__summary">
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
          <Link to="/checkout" className="btn btn--primary cart-page__checkout">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
