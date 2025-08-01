import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="text-center max-w-lg flex flex-col items-center">
        <h1 className="text-7xl sm:text-9xl font-extrabold text-primary mb-6">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Страница не найдена
        </h2>
        <p className="text-text-secondary mb-8">
          К сожалению, страница, которую вы ищете, не существует или была
          перемещена.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            initialText="На главную "
            onClick={() => navigate("/")}
            variant="light"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
