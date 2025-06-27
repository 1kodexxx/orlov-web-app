import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // объявляем один раз

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-background py-4 flex items-center">
      <div className="max-w-screen-lg mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:py-3 xl:mb-20 w-full">
        <div className="mx-auto w-full">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Ваша корзина
            </h1>
          </header>

          <div>
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={item.slug} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="text-base sm:text-lg text-primary">
                      {item.name}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Количество: {item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-3">
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="text-text-secondary hover:text-red-600 text-xl">
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
