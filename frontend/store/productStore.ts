import { create } from "zustand";
import { api } from "../services/api";
import { Product } from "../types/product";
import { useAuthStore } from "./authStore";

type ProductStore = {
  products: Product[];

  fetchProducts: () => Promise<void>;

  addProduct: (product: Omit<Product, "id">) => Promise<void>;

  updateProduct: (
    id: number,
    product: Omit<Product, "id">
  ) => Promise<void>;

  deleteProduct: (id: number) => Promise<void>;

  getProductById: (
    id: number
  ) => Product | undefined;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const token = useAuthStore.getState().token;

      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        products: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  addProduct: async (product) => {
    try {
      const token = useAuthStore.getState().token;

      await api.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await get().fetchProducts();
    } catch (error) {
      console.log(error);
    }
  },

  updateProduct: async (id, product) => {
    try {
      const token = useAuthStore.getState().token;

      await api.put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await get().fetchProducts();
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (id) => {
    try {
      const token = useAuthStore.getState().token;

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await get().fetchProducts();
    } catch (error) {
      console.log(error);
    }
  },

  getProductById: (id) => {
    return get().products.find(
      (item) => item.id === id
    );
  },
}));