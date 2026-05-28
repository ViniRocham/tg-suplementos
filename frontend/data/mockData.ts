import { Category, Product } from "../types/product";

export const categories: Category[] = [
  { id: 1, name: "Proteínas" },
  { id: 2, name: "Creatinas" },
  { id: 3, name: "Pré-treinos" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Whey Protein",
    description: "Suplemento proteico para ganho de massa muscular.",
    price: 129.9,
    stock: 15,
    imageUrl: "https://via.placeholder.com/300",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    description: "Auxilia no aumento de força e desempenho físico.",
    price: 89.9,
    stock: 20,
    imageUrl: "https://via.placeholder.com/300",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Pré-Treino Extreme",
    description: "Energia e foco para treinos intensos.",
    price: 99.9,
    stock: 10,
    imageUrl: "https://via.placeholder.com/300",
    categoryId: 3,
  },
];