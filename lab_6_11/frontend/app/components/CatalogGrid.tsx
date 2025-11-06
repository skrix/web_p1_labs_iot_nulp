import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import productImage from "../assets/product.jpg";

const PRODUCTS_DATA = [
  {
    title: "RAYDROP Пуровер",
    description: "Пуровер ручної роботи з харчової нержавіючої сталі AISI 304 для заварювання кави методом V60. Українське виробництво",
    price: 2415,
    image: productImage,
  },
  {
    title: "Аеропрес AeroPress Clear",
    description: "Легендарний AeroPress з прозорого пластику. Комплект з 350 фільтрами. Швидке приготування, легке очищення",
    price: 1879,
    image: productImage,
  },
  {
    title: "Кемекс Chemex Six Cup 990 мл",
    description: "Оригінальний кемекс Chemex на 6 чашок. Класичний дизайн з дерев'яною манжетою та шкіряним шнурком",
    price: 2399,
    image: productImage,
  },
  {
    title: "Аеропрес AeroPress Go",
    description: "Компактний аеропрес для подорожей. Легкий і зручний, ідеально підходить для використання поза домом",
    price: 1845,
    image: productImage,
  },
  {
    title: "Пуровер Дотик Dotyk Dripper Brown",
    description: "Український дриппер Dotyk Next Generation з унікальним дизайном для рівномірної екстракції кави",
    price: 1669,
    image: productImage,
  },
  {
    title: "Аеропрес AeroPress XL",
    description: "Збільшена версія класичного AeroPress. Дозволяє приготувати більше кави за один раз",
    price: 2549,
    image: productImage,
  },
  {
    title: "Кемекс Chemex 3 cup 473 мл",
    description: "Компактний кемекс Chemex на 3 чашки. Ідеально для індивідуального використання",
    price: 2399,
    image: productImage,
  },
  {
    title: "Фільтр SIBARIST Dual Chamber Paper",
    description: "Преміум фільтри SIBARIST з подвійною камерою. 30 шт. Для найчистішого смаку кави",
    price: 1329,
    image: productImage,
  },
  {
    title: "Пуровер Conical 30 Single Dripper",
    description: "Компактний конічний пуровер для приготування однієї порції кави. Простий у використанні",
    price: 289,
    image: productImage,
  },
  {
    title: "Сервер 400 мл Samadoyo",
    description: "Термостійкий скляний сервер з мірною шкалою. Універсальний для кави та чаю",
    price: 548,
    image: productImage,
  },
  {
    title: "Кемекс Chemex 8 Cup",
    description: "Великий кемекс Chemex на 8 чашок. Ідеально для сім'ї або компанії друзів",
    price: 2499,
    image: productImage,
  },
  {
    title: "Набір Кемекс Chemex 3 cup + Фільтри",
    description: "Комплект: кемекс на 3 чашки + паперові фільтри FP-2. Все необхідне для початку",
    price: 2785,
    image: productImage,
  },
] as const;

export function CatalogGrid() {
  const products = useMemo(
    () =>
      PRODUCTS_DATA.map((product, index) => (
        <ProductCard
          key={index}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      )),
    []
  );

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products}
      </div>
    </div>
  );
}
