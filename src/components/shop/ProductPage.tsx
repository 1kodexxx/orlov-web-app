import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  // Здесь можно получить данные о товаре по id
  // Пример: const product = products.find(p => p.id === Number(id))

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8 text-text-secondary">
      <h1 className="text-3xl font-bold mb-4">Страница товара №{id}</h1>
      {/* Здесь выведи подробности товара */}
      <p>Здесь будет информация о товаре.</p>
    </section>
  );
};

export default ProductPage;
