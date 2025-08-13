// src/App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop, ScrollToTopButton, Loader } from "@/components/common/";
import { Footer, CatalogLayout } from "@/components/layout";
import { NavBar } from "@/components/layout/navBar";
import { Suspense, lazy } from "react";

// pages
const Home = lazy(() => import("@/pages/Home"));
const Catalog = lazy(() => import("@/pages/Catalog"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Delivery = lazy(() => import("@/pages/Delivery"));
const Reviews = lazy(() => import("@/pages/Reviews"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// user
const Account = lazy(() => import("@/components/user/account/AccountPage"));
const LoginForm = lazy(() => import("@/components/user/LoginForm"));
const RegisterForm = lazy(() => import("@/components/user/RegisterForm"));
const ChangePassword = lazy(() => import("@/components/user/ChangePassword"));

// ⬇️ защищённый роутер
import ProtectedRoute from "@/features/auth/ProtectedRoute";

const App = () => {
  const location = useLocation();

  // пути, где не показываем NavBar и Footer
  const hideLayoutPaths = ["/login", "/register", "/change-password"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      {!hideLayout && <NavBar />}
      <main className="flex-1">
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
              <Loader />
            </div>
          }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Каталог */}
            <Route path="/catalog" element={<CatalogLayout />}>
              <Route index element={<Catalog />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>

            {/* Пользователь */}
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* ⬇️ Смена пароля ТОЛЬКО для авторизованных */}
            <Route element={<ProtectedRoute />}>
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!hideLayout && <Footer />}
      <ScrollToTopButton />
    </div>
  );
};

export default App;
