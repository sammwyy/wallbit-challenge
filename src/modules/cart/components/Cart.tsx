import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { PropsWithChildren } from "react";

import useCart from "../hooks/useCart";

function CartWrapper({ children }: PropsWithChildren) {
  return (
    <div className="p-6 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
      {children}
    </div>
  );
}

export default function Cart() {
  const { items, cartDate, updateQuantity, removeItem, totalCost, totalItems } =
    useCart();

  if (items.length == 0) {
    return (
      <CartWrapper>
        <div className="flex flex-col items-center justify-center py-8">
          <ShoppingCart className="w-16 h-16 text-white/30 mb-4" />
          <p className="text-white/70">Tu carrito se encuentra vacío</p>
        </div>
      </CartWrapper>
    );
  }

  return (
    <CartWrapper>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Carrito de compras</h2>
        <p className="text-sm text-white/60">
          {cartDate
            ? `Guardado el ${cartDate.toLocaleString()}`
            : "(Carrito sin guardar)"}
        </p>
      </div>

      <div className="space-y-4 h-[40vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row gap-4 p-4 bg-white/5 rounded-lg"
          >
            <img
              src={item.product!.image}
              alt={item.product!.title}
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium break-words line-clamp-2">
                {item.product!.title || "Producto Eliminado"}
              </h3>
              <p className="text-white/70 mt-1">${item.product!.price}</p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="text-white w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => removeItem(item.productId)}
                className="p-1 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors ml-2"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex justify-between text-white/70 mb-2">
          <span>Productos:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-xl font-semibold text-white">
          <span>Subtotal:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </CartWrapper>
  );
}
