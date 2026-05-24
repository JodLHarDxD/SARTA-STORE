import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function itemKey(id: string, size: string, color: string) {
  return `${id}-${size}-${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const key = itemKey(item.product.id, item.size, item.color);
        const existing = prev.find(
          (entry) =>
            itemKey(entry.product.id, entry.size, entry.color) === key,
        );
        if (existing) {
          return prev.map((entry) =>
            itemKey(entry.product.id, entry.size, entry.color) === key
              ? { ...entry, quantity: entry.quantity + quantity }
              : entry,
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((id: string, size: string, color: string) => {
    const key = itemKey(id, size, color);
    setItems((prev) =>
      prev.filter(
        (entry) => itemKey(entry.product.id, entry.size, entry.color) !== key,
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string, color: string, quantity: number) => {
      const key = itemKey(id, size, color);
      if (quantity <= 0) {
        removeItem(id, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((entry) =>
          itemKey(entry.product.id, entry.size, entry.color) === key
            ? { ...entry, quantity }
            : entry,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, count, subtotal, isOpen, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
