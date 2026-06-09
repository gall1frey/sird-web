import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./src/context/CartContext";
import Catalogue from "./src/pages/Catalogue";
import { CategoryPage } from "./src/pages/CategoryPage";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </CartProvider>
  );
}