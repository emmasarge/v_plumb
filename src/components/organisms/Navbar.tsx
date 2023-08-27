import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";


export const Navbar=() =>{
  return (
    <nav className="w-full flex flex-row">
        <div className="w-full flex flex-row">
        <div className="text-red">
          <Link className="font-bold" to="/">Home</Link>
        </div>
        <div>
          <Link to="/products">Products</Link>
        </div>
  </div>
    </nav>
  );
}
