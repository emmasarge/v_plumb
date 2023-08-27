import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NoPage } from "./pages/NoPage";
import { Helmet } from "react-helmet";
import './App.css';

export default function App() {
  return (
    <>
      <div>
        <Helmet>
          <title>Victorian Plumbing</title>
          {/* Other head elements */}
        </Helmet>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
