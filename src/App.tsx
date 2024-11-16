import Cart from "@/cart/components/Cart";
import { CartProvider } from "@/cart/contexts/cart.context";
import { ProductsProvider } from "@/products/contexts/products.context";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center">
      <ProductsProvider>
        <CartProvider>
          <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
            <Cart />
          </div>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
