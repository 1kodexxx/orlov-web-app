// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/features/auth/AuthContext"; // ⬅️ добавлено
import App from "./App";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          {" "}
          {/* ⬅️ обёртка провайдера авторизации */}
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
