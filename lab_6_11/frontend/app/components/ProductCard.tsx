import { memo } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export const ProductCard = memo(function ProductCard({ title, description, price, image }: ProductCardProps) {
  return (
    <div className="bg-white overflow-hidden flex flex-col border border-gray-300 hover:border-gray-900 transition-colors">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

        <div className="aspect-square overflow-hidden mb-4">
          <img src={image} alt={title} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" />
        </div>

        <h4 className="font-bold text-xl text-gray-900 mb-2">Amazing stuff</h4>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-gray-900">Price :</span>
          <span className="font-semibold text-gray-900">$ {price}</span>
        </div>

        <button className="w-full bg-black hover:bg-black/50 text-white py-3 font-medium transition-colors cursor-pointer">
          View more
        </button>
      </div>
    </div>
  );
});
