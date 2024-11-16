import Loader from "@/shared/components/Loader";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Product } from "..";

const API_ENDPOINT = "https://fakestoreapi.com/products";

export interface ProductsContextType {
  products: Product[];
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setFetched(true);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      <Loader
        loaded={fetched}
        loadingText="Cargando productos"
        errorText={error}
      >
        {children}
      </Loader>
    </ProductsContext.Provider>
  );
};
