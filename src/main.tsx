import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CartProvider } from "@/cart/contexts/cart.context";

import App from "./App";

import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
