import useCart from "./modules/cart/hooks/useCart";

function App() {
  const { totalItems, items, addItem, updateQuantity, removeItem } = useCart();

  return (
    <div>
      <h1>Items: {totalItems}</h1>
      <p>
        {items.map((item) => (
          <div key={item.productId}>
            {item.product?.title} - {item.quantity}
          </div>
        ))}
      </p>
      <button
        onClick={() => {
          addItem({
            productId: 1,
            product: {
              id: 1,
              title: "Product 1",
              price: 10,
              category: "Category 1",
              description: "Description 1",
              image: "https://via.placeholder.com/150",
              rating: { rate: 4.5, count: 100 },
            },
            quantity: 1,
          });
        }}
      >
        Add
      </button>

      <button
        onClick={() => {
          const quantity = items[0] ? items[0].quantity : 0;
          if (quantity > 1) {
            updateQuantity(1, quantity - 1);
          } else {
            removeItem(1);
          }
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default App;
