import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NoPage } from "./pages/NoPage";
import { Helmet } from "react-helmet";
import './App.css';
import { ProductDetail } from "./pages/ProductDetail";
import { CartProvider } from "./context/CartProvider";

export default function App() {
  return (
    <>
      <div>
        <Helmet>
          <title>Victorian Plumbing</title>
        </Helmet>
        <CartProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetail />} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </Router>
      
        </CartProvider>
      </div>
    </>
  );
}
