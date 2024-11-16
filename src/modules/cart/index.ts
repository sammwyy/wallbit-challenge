import { Product } from "@/products";

export interface CartItem {
  productId: number;
  product?: Product;
  quantity: number;
}
