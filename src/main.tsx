import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CartProvider } from "@/cart/contexts/cart.context";
import { ProductsProvider } from "@/products/contexts/products.context";

import App from "./App";

import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
);
