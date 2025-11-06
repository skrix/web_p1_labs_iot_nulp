import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import materialsImage from "../assets/materials.jpg";
import productImage from "../assets/product.jpg";

const PRODUCTS_DATA = [
  {
    title: "Item 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui",
    price: 2415,
    image: materialsImage,
  },
  {
    title: "Item 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui",
    price: 2415,
    image: productImage,
  },
  {
    title: "Item 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui",
    price: 2415,
    image: materialsImage,
  },
  {
    title: "Item 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui",
    price: 2415,
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
