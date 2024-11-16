import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { Product } from "..";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelect: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onSelect,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="relative group" onClick={() => onSelect(product)}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative p-4 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
        <div className="aspect-square mb-3 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transform group-hover:scale-110 transition duration-300"
          />
        </div>
        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white/80 text-xs">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white flex-1">
            ${product.price}
          </span>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            onClick={(e) => e.stopPropagation()}
            className="w-14 bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
            min="1"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, quantity);
            }}
            className="p-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
