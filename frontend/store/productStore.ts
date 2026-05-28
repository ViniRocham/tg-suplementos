import { create } from "zustand";
import { Product } from "../types/product";
import { products as initialProducts } from "../data/mockData";

type ProductStore = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,

  addProduct: (product) => {
    const newProduct: Product = {
      id: Date.now(),
      ...product,
    };

    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  updateProduct: (id, product) => {
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? { id, ...product } : item
      ),
    }));
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    }));
  },

  getProductById: (id) => {
    return get().products.find((item) => item.id === id);
  },
}));