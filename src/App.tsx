import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";

import ScrollToTop from "@/components/common/ScrollToTop";
import ProductPage from "@/components/shop/ProductPage";

import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Catalog from "@/pages/Catalog";
import Contacts from "@/pages/Contacts";
import Delivery from "@/pages/Delivery";
import Reviews from "@/pages/Reviews";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/catalog/:id" element={<ProductPage />} />

        {/* Обработка несуществующих маршрутов */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
