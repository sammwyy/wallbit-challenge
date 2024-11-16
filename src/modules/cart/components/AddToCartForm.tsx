import { ProductModal } from "@/products/components/ProductModal";
import useProducts from "@/products/hooks/useProducts";
import Button from "@/shared/components/Button";
import Container from "@/shared/components/Container";
import Input from "@/shared/components/Input";
import useDisclosure from "@/shared/hooks/useDisclosure";
import { useEffect, useState } from "react";
import { CartItem } from "..";
import useCart from "../hooks/useCart";

export function AddToCartForm() {
  const { addItem } = useCart();
  const { products } = useProducts();
  const modalHandler = useDisclosure();

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

  useEffect(() => {
    if (error != "") {
      setError("");
    }
  }, [productId]);

  return (
    <>
      {/* Modal */}
      <ProductModal
        isOpen={modalHandler.isOpen}
        onClose={modalHandler.onClose}
        onSelectProduct={(p) => {
          setProductId(p.id.toString());
        }}
      />

      {/* Form */}
      <Container className="mb-6">
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
                <Input
                  type="number"
                  id="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
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
                <Input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>
              <Button type="submit" disabled={disabled}>
                Añadir
              </Button>
            </div>

            <button
              type="button"
              onClick={modalHandler.onOpen}
              className="text-sm text-purple-400 hover:text-purple-300 mt-1"
            >
              Ver productos disponibles
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
