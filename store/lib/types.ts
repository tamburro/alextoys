export type Category = "classicos" | "modernos" | "colecionaveis" | "pelucias";

export const CATEGORIES: Record<Category, string> = {
  classicos: "Clássicos",
  modernos: "Modernos",
  colecionaveis: "Colecionáveis",
  pelucias: "Pelúcias",
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // em centavos
  category: Category;
  image: string; // URL
  stock: number;
  featured: boolean;
  createdAt: number;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsapp: string; // somente dígitos, com DDI
  instagram: string;
}

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
