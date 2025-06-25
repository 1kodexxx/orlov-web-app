import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      {" "}
      <Breadcrumb />
      <section className="max-w-screen-xl mx-auto px-4 py-8 text-text-secondary">
        <h1 className="text-3xl font-bold mb-4">Страница товара №{id}</h1>
      </section>
    </>
  );
};

export default ProductPage;
