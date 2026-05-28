import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  login: (email, password) => {
    if (!email || !password) return false;

    set({
      user: {
        name: "Vinicius Rocha",
        email,
      },
      token: "token-fake-tg-suplementos",
    });

    return true;
  },

  signup: (name, email, password) => {
    if (!name || !email || !password) return false;

    set({
      user: {
        name,
        email,
      },
      token: "token-fake-cadastro",
    });

    return true;
  },

  logout: () => {
    set({
      user: null,
      token: null,
    });
  },
}));