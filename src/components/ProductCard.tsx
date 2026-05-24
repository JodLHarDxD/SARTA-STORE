import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";
import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
  layout?: "grid" | "editorial";
};

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <article
      className={`product-card product-card--${layout}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${product.slug}`} className="product-card__media">
        {product.tag && <span className="product-card__tag">{product.tag}</span>}
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            className={`product-card__img product-card__img--hover ${hover ? "is-visible" : ""}`}
            loading="lazy"
          />
        )}
      </Link>
      <div className="product-card__meta">
        <Link to={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
