import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import useCart from "@/cart/hooks/useCart";
import Input from "@/shared/components/Input";
import { Modal } from "@/shared/components/Modal";
import Select from "@/shared/components/Select";
import { Product } from "..";
import useProducts from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

type SortOption = "name" | "price-asc" | "price-desc" | "rating";

export function ProductModal({
  isOpen,
  onClose,
  onSelectProduct,
}: ProductModalProps) {
  const { products } = useProducts();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        (selectedCategory === "Todos" ||
          product.category === selectedCategory) &&
        (product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });
  }, [products, search, selectedCategory, sortBy]);

  const onAddToCart = (product: Product, quantity: number) => {
    addItem({ productId: product.id, quantity, product });
    onClose();
  };

  const onSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Productos disponibles">
      <div className="space-y-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        </div>

        <div className="flex flex-wrap gap-3 pb-3">
          <div className="flex-1 min-w-[200px]">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-900">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="name" className="bg-gray-900">
                Alfabéticamente
              </option>
              <option value="price-asc" className="bg-gray-900">
                Precio: Mas baratos
              </option>
              <option value="price-desc" className="bg-gray-900">
                Precio: Mas caros
              </option>
              <option value="rating" className="bg-gray-900">
                Mejor valorado
              </option>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(80vh-12rem)]">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No se han encontrado productos que coincidan con tu búsqueda
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
