import { create } from "zustand";
import { api } from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      set({
        user,
        token,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await api.post("/signup", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      set({
        user,
        token,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
    });
  },
}));