import { memo } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export const ProductCard = memo(function ProductCard({ title, description, price, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden flex flex-col">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <div className="bg-gray-200 aspect-square rounded flex items-center justify-center mb-4">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <h4 className="font-bold text-xl mb-2">Amazing stuff</h4>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold">Price :</span>
          <span className="font-semibold">$ {price}</span>
        </div>

        <button className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded transition-colors">
          View more
        </button>
      </div>
    </div>
  );
});
