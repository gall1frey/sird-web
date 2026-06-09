import { Routes, Route } from "react-router-dom";
import Catalogue from "./src/Catalogue";
import { CategoryPage } from "./src/pages/CategoryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
}