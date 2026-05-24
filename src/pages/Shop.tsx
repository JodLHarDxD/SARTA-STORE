import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { categories, products } from "../data/products";
import "./Shop.css";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name A–Z" },
] as const;

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [category, sort, query]);

  return (
    <div className="shop page page-enter">
      <div className="shop-hero">
        <div className="container">
          <p className="eyebrow">Shop all</p>
          <h1 className="display shop-hero__title">
            {categories.find((c) => c.id === category)?.label ?? "All"} ·{" "}
            {filtered.length} pieces
          </h1>
        </div>
      </div>

      <div className="container shop-layout">
        <aside className="shop-filters">
          <p className="eyebrow">Category</p>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  className={category === cat.id ? "is-active" : ""}
                  onClick={() =>
                    setSearchParams(cat.id === "all" ? {} : { category: cat.id })
                  }
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>

          <label className="shop-search">
            <span className="eyebrow">Search</span>
            <input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </aside>

        <div className="shop-main">
          <div className="shop-toolbar">
            <p className="shop-count">{filtered.length} products</p>
            <label>
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as (typeof sorts)[number]["id"])
                }
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="shop-empty">No products match your filters.</p>
          ) : (
            <div className="shop-grid">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout={index % 5 === 0 ? "editorial" : "grid"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
