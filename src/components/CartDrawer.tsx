import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import "./CartDrawer.css";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="cart-drawer__backdrop"
        aria-label="Close bag"
        onClick={closeCart}
      />
      <aside className="cart-drawer" aria-label="Shopping bag">
        <header className="cart-drawer__head">
          <h2>Bag ({String(items.length).padStart(2, "0")})</h2>
          <button type="button" onClick={closeCart} aria-label="Close">
            Close
          </button>
        </header>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <p className="cart-drawer__empty">
              Your bag is empty.{" "}
              <Link to="/shop" onClick={closeCart}>
                Continue shopping
              </Link>
            </p>
          ) : (
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="cart-drawer__item"
                >
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <p className="cart-drawer__name">{item.product.name}</p>
                    <p className="cart-drawer__variant">
                      {item.color} · {item.size}
                    </p>
                    <div className="cart-drawer__qty">
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
                      className="cart-drawer__remove"
                      onClick={() =>
                        removeItem(item.product.id, item.size, item.color)
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <p>{formatPrice(item.product.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="cart-drawer__foot">
          <div className="cart-drawer__row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <p className="cart-drawer__note">
            Shipping and taxes calculated at checkout.
          </p>
          <Link
            to="/checkout"
            className="btn btn--primary cart-drawer__checkout"
            onClick={closeCart}
          >
            Checkout
          </Link>
          <Link to="/cart" className="cart-drawer__view" onClick={closeCart}>
            View full bag
          </Link>
        </footer>
      </aside>
    </>
  );
}
