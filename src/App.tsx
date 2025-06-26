import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/common/";
import ProductPage from "@/components/shop/productPage/ProductPage";
import { Footer, NavBar } from "@/components/layout";

import {
  Home,
  Catalog,
  Cart,
  AboutUs,
  Contacts,
  Delivery,
  Reviews,
  NotFound,
} from "@/pages";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <NavBar />
      <main className="flex-1">
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
