import useProducts from "@/products/hooks/useProducts";
import { useEffect, useState } from "react";
import { CartItem } from "..";
import useCart from "../hooks/useCart";

export function AddToCartForm() {
  const { addItem } = useCart();
  const { products } = useProducts();

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const disabled = productId === "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;

    const id = parseInt(productId, 10);
    const product = products.find((p) => p.id === id);

    if (!product) {
      setError("Producto no encontrado");
      return;
    }

    const item: CartItem = { productId: id, quantity, product };

    addItem(item);
    setProductId("");
    setQuantity(1);
  };

  const onBrowseProducts = () => {};

  useEffect(() => {
    if (error != "") {
      setError("");
    }
  }, [productId]);

  return (
    <div className="p-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 items-start">
          <div className="flex gap-3 items-end w-full">
            <div className="flex-1">
              <label
                htmlFor="productId"
                className="block text-sm text-white/70 mb-1"
              >
                ID del producto
              </label>
              <input
                type="number"
                id="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="w-24">
              <label
                htmlFor="quantity"
                className="block text-sm text-white/70 mb-1"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white h-10 px-6 rounded-lg transition-colors"
              disabled={disabled}
            >
              Añadir
            </button>
          </div>

          <button
            type="button"
            onClick={onBrowseProducts}
            className="text-sm text-purple-400 hover:text-purple-300 mt-1"
          >
            Ver productos disponibles
          </button>
        </div>
      </form>
    </div>
  );
}
