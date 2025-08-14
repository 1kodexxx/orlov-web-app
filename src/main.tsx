import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/features/auth/AuthContext";
import { FavoritesProvider } from "@/features/catalog/useFavorites"; // <-- NEW
import App from "./App";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            {" "}
            <CartProvider>
              <App />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
