import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/organisms/Navbar";


export const Layout = () => {
  return (
     <div className="min-h-screen">
        <main role="main" className="w-full">
        <Navbar /> <Outlet />
        </main>
      </div>
  );
};
