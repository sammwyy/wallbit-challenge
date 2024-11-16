import { Product } from "@/products";
import useProducts from "@/products/hooks/useProducts";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { CartItem } from "..";

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalItems: number;
  totalCost: number;
  cartDate: Date | null;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

function saveCart(items: CartItem[], date: Date) {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(
      items.map((i) => {
        const { product, ...rest } = i;
        return rest;
      })
    )
  );
  localStorage.setItem("cartDate", date.toISOString());
}

function loadCart(products: Product[]): CartItem[] {
  const rawCartItems = localStorage.getItem("cartItems");
  const cartItems = rawCartItems ? JSON.parse(rawCartItems) : [];

  cartItems.forEach((item: CartItem) => {
    item.product = products.find((p) => p.id === item.productId);
  });

  return cartItems;
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { products } = useProducts();

  const [items, setItems] = useState<CartItem[]>(() => loadCart(products));
  const [cartDate, setCartDate] = useState(() => {
    const savedDate = localStorage.getItem("cartDate");
    return savedDate ? new Date(savedDate) : null;
  });

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = items.reduce(
    (acc, item) => acc + item.quantity * item.product!.price,
    0
  );

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
    });
  };

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productId === item.productId
      );

      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevItems, { ...item }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.productId !== id);
    });
  };

  useEffect(() => {
    let date = cartDate || new Date();
    if (!cartDate) {
      setCartDate(date);
    }
    saveCart(items, date);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        totalCost,
        cartDate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
