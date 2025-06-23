import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="text-center max-w-lg">
        <p className="text-sm font-medium text-primary mb-2">404 ошибка</p>
        <h1 className="text-3xl font-bold text-white mb-4">
          Мы не можем найти эту страницу
        </h1>
        <p className="text-text-secondary mb-6">
          К сожалению, страница, которую вы ищете, не существует или была
          перемещена.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-6 py-2 text-sm text-white transition-colors duration-200 border border-white rounded-lg hover:bg-white hover:text-background">
            ← Назад
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 text-sm tracking-wide text-background bg-primary rounded-lg hover:bg-white">
            На главную
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
