import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Catalog from "./pages/Catalog";
import Contacts from "./pages/Contacts";
import Delivery from "./pages/Delivery";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

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

        {/* Обработка несуществующих маршрутов */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
