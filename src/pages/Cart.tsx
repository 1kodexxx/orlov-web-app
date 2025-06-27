import React from "react";

const Cart: React.FC = () => {
  return (
    <section className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      <div className="max-w-[1250px] w-full mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Cart Items */}
        <div className="flex-1 bg-background-paper rounded-3xl p-6 lg:p-12 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-primary">Корзина</h1>
            <h6 className="text-text-secondary text-lg">3 товара</h6>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col md:flex-row justify-between items-center bg-secondary rounded-2xl p-4">
                <div className="w-32 mb-4 md:mb-0">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                    alt="Товар"
                    className="rounded-lg"
                  />
                </div>
                <div className="text-center md:text-left md:w-1/4">
                  <h6 className="text-text-secondary text-sm">Футболка</h6>
                  <h6 className="font-medium text-primary text-lg">
                    Хлопковая футболка
                  </h6>
                </div>
                <div className="flex items-center md:w-1/4 mt-4 md:mt-0 gap-4">
                  <button
                    className="text-xl text-primary border border-primary rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={(e) => {
                      const input = e.currentTarget.parentNode?.querySelector(
                        "input"
                      ) as HTMLInputElement;
                      if (input && Number(input.value) > 0) input.stepDown();
                    }}>
                    -
                  </button>
                  <input
                    min="0"
                    name="quantity"
                    defaultValue={1}
                    type="number"
                    className="w-16 text-center border border-gray-700 bg-background text-primary rounded-lg"
                  />
                  <button
                    className="text-xl text-primary border border-primary rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={(e) => {
                      const input = e.currentTarget.parentNode?.querySelector(
                        "input"
                      ) as HTMLInputElement;
                      if (input) input.stepUp();
                    }}>
                    +
                  </button>
                </div>
                <div className="font-medium md:w-1/6 mt-4 md:mt-0 text-center text-primary text-lg">
                  € 44.00
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="text-text-secondary hover:text-red-600 text-xl">
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <a
              href="/"
              className="text-text-secondary hover:underline flex items-center">
              <span className="mr-2">←</span> Вернуться в магазин
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3 bg-background-paper rounded-3xl p-6 lg:p-12 h-fit">
          <h3 className="text-2xl font-bold mb-6 text-primary">Итог</h3>
          <div className="space-y-6">
            <div className="flex justify-between text-primary">
              <h5 className="uppercase">Товары (3)</h5>
              <h5>€ 132.00</h5>
            </div>

            <div>
              <h5 className="uppercase mb-2 text-primary">Доставка</h5>
              <select className="w-full p-3 border border-gray-700 rounded-lg bg-background text-primary">
                <option value="1">Стандартная доставка - €5.00</option>
                <option value="2">Ускоренная доставка</option>
                <option value="3">Самовывоз</option>
                <option value="4">Курьерская доставка</option>
              </select>
            </div>

            <div>
              <h5 className="uppercase mb-2 text-primary">Промокод</h5>
              <input
                type="text"
                placeholder="Введите код"
                className="w-full p-3 border border-gray-700 rounded-lg bg-background text-primary"
              />
            </div>

            <div className="flex justify-between text-primary pt-2">
              <h5 className="uppercase">Итого</h5>
              <h5>€ 137.00</h5>
            </div>

            <button className="w-full bg-primary text-contrast py-3 rounded-xl hover:opacity-90 transition text-lg">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
