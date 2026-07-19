"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_PRODUCTS } from "./seed";
import { loadLS, saveLS, STORAGE_KEYS } from "./integrations";
import type { CartItem, Product, StoreSettings } from "./types";

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Alex Toys!",
  tagline: "Um mundo de brinquedos",
  whatsapp: "5521967480201",
  instagram: "aspm.toys",
};

interface StoreCtx {
  ready: boolean;
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  setCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  settings: StoreSettings;
  saveSettings: (s: StoreSettings) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setProducts(loadLS(STORAGE_KEYS.LS_PRODUCTS, SEED_PRODUCTS));
    setCart(loadLS(STORAGE_KEYS.LS_CART, [] as CartItem[]));
    setSettings(loadLS(STORAGE_KEYS.LS_SETTINGS, DEFAULT_SETTINGS));
    setReady(true);
  }, []);

  const persistProducts = useCallback((next: Product[]) => {
    setProducts(next);
    saveLS(STORAGE_KEYS.LS_PRODUCTS, next);
  }, []);

  const persistCart = useCallback((next: CartItem[]) => {
    setCart(next);
    saveLS(STORAGE_KEYS.LS_CART, next);
  }, []);

  const addProduct: StoreCtx["addProduct"] = useCallback(
    (p) => {
      const product: Product = {
        ...p,
        id: `p-${Date.now().toString(36)}`,
        createdAt: Date.now(),
      };
      persistProducts([product, ...products]);
    },
    [products, persistProducts],
  );

  const updateProduct: StoreCtx["updateProduct"] = useCallback(
    (id, patch) => {
      persistProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    },
    [products, persistProducts],
  );

  const removeProduct = useCallback(
    (id: string) => {
      persistProducts(products.filter((p) => p.id !== id));
      persistCart(cart.filter((c) => c.productId !== id));
    },
    [products, cart, persistProducts, persistCart],
  );

  const addToCart: StoreCtx["addToCart"] = useCallback(
    (productId, qty = 1) => {
      const existing = cart.find((c) => c.productId === productId);
      persistCart(
        existing
          ? cart.map((c) =>
              c.productId === productId ? { ...c, qty: c.qty + qty } : c,
            )
          : [...cart, { productId, qty }],
      );
    },
    [cart, persistCart],
  );

  const setCartQty: StoreCtx["setCartQty"] = useCallback(
    (productId, qty) => {
      persistCart(
        qty <= 0
          ? cart.filter((c) => c.productId !== productId)
          : cart.map((c) => (c.productId === productId ? { ...c, qty } : c)),
      );
    },
    [cart, persistCart],
  );

  const clearCart = useCallback(() => persistCart([]), [persistCart]);

  const saveSettings = useCallback((s: StoreSettings) => {
    setSettings(s);
    saveLS(STORAGE_KEYS.LS_SETTINGS, s);
  }, []);

  const cartCount = useMemo(() => cart.reduce((n, c) => n + c.qty, 0), [cart]);

  const value = useMemo(
    () => ({
      ready,
      products,
      addProduct,
      updateProduct,
      removeProduct,
      cart,
      addToCart,
      setCartQty,
      clearCart,
      cartCount,
      settings,
      saveSettings,
    }),
    [ready, products, addProduct, updateProduct, removeProduct, cart, addToCart, setCartQty, clearCart, cartCount, settings, saveSettings],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore fora do StoreProvider");
  return ctx;
}
