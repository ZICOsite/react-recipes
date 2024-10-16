import React, { lazy } from "react";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import RecipePage from "./pages/RecipePage";
import { Route, Routes } from "react-router-dom";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
