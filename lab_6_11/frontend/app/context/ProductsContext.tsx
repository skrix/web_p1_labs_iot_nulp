import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import productImage from "../assets/product.jpg";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 0,
    title: "RAYDROP Пуровер",
    description: "Пуровер ручної роботи з харчової нержавіючої сталі AISI 304 для заварювання кави методом V60. Українське виробництво",
    price: 2415,
    image: productImage,
    category: "pourover",
    brand: "vasyl-co",
  },
  {
    id: 1,
    title: "Аеропрес AeroPress Clear",
    description: "Легендарний AeroPress з прозорого пластику. Комплект з 350 фільтрами. Швидке приготування, легке очищення",
    price: 1879,
    image: productImage,
    category: "aeropress",
    brand: "aeropress",
  },
  {
    id: 2,
    title: "Кемекс Chemex Six Cup 990 мл",
    description: "Оригінальний кемекс Chemex на 6 чашок. Класичний дизайн з дерев'яною манжетою та шкіряним шнурком",
    price: 2399,
    image: productImage,
    category: "chemex",
    brand: "chemex",
  },
  {
    id: 3,
    title: "Аеропрес AeroPress Go",
    description: "Компактний аеропрес для подорожей. Легкий і зручний, ідеально підходить для використання поза домом",
    price: 1845,
    image: productImage,
    category: "aeropress",
    brand: "aeropress",
  },
  {
    id: 4,
    title: "Пуровер Дотик Dotyk Dripper Brown",
    description: "Український дриппер Dotyk Next Generation з унікальним дизайном для рівномірної екстракції кави",
    price: 1669,
    image: productImage,
    category: "pourover",
    brand: "dotyk",
  },
  {
    id: 5,
    title: "Аеропрес AeroPress XL",
    description: "Збільшена версія класичного AeroPress. Дозволяє приготувати більше кави за один раз",
    price: 2549,
    image: productImage,
    category: "aeropress",
    brand: "aeropress",
  },
  {
    id: 6,
    title: "Кемекс Chemex 3 cup 473 мл",
    description: "Компактний кемекс Chemex на 3 чашки. Ідеально для індивідуального використання",
    price: 2399,
    image: productImage,
    category: "chemex",
    brand: "chemex",
  },
  {
    id: 7,
    title: "Фільтр SIBARIST Dual Chamber Paper",
    description: "Преміум фільтри SIBARIST з подвійною камерою. 30 шт. Для найчистішого смаку кави",
    price: 1329,
    image: productImage,
    category: "filters",
    brand: "sibarist",
  },
  {
    id: 8,
    title: "Пуровер Conical 30 Single Dripper",
    description: "Компактний конічний пуровер для приготування однієї порції кави. Простий у використанні",
    price: 289,
    image: productImage,
    category: "pourover",
    brand: "hario",
  },
  {
    id: 9,
    title: "Сервер 400 мл Samadoyo",
    description: "Термостійкий скляний сервер з мірною шкалою. Універсальний для кави та чаю",
    price: 548,
    image: productImage,
    category: "servers",
    brand: "samadoyo",
  },
  {
    id: 10,
    title: "Кемекс Chemex 8 Cup",
    description: "Великий кемекс Chemex на 8 чашок. Ідеально для сім'ї або компанії друзів",
    price: 2499,
    image: productImage,
    category: "chemex",
    brand: "chemex",
  },
  {
    id: 11,
    title: "Набір Кемекс Chemex 3 cup + Фільтри",
    description: "Комплект: кемекс на 3 чашки + паперові фільтри FP-2. Все необхідне для початку",
    price: 2785,
    image: productImage,
    category: "chemex",
    brand: "hario",
  },
];

interface ProductsContextType {
  products: Product[];
  getProductById: (id: number) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const getProductById = (id: number) => {
    return PRODUCTS_DATA.find((product) => product.id === id);
  };

  return (
    <ProductsContext.Provider value={{ products: PRODUCTS_DATA, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
