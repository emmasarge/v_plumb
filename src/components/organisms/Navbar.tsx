import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import { Cart } from "../molecules/Cart";
import VPLogo from "../../assets/images/Victorian_Plumbing.jpg";
import { ReactComponent as BurgerMenu } from "../../assets/icons/burger_menu.svg";

export const Navbar = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <nav className="navbar w-full flex flex-row justify-around z-50 bg-white fixed shadow-sm ">
      <div className="w-11/12  flex flex-row items-center justify-between">
        <div className="hidden  lg:flex">
          <Link
            className="text-[#71c16a] text-[1.2em] font-medium uppercase tracking-wide hover:underline hover:underline-offset-4 transition duration-300 hover:duration-300 hover:scale-105 cursor-pointer"
            to="/products"
            aria-label="products"
          >
            Products
          </Link>
        </div>
        <div onClick={handleMenu} className="flex w-7 sm:w-8  z-[999] lg:hidden">
          <BurgerMenu />
        </div>
        {menuOpen && (
          <div
          id="menu"
          className={`sm:hidden sm:mt-[2em] -ml-2 h-[50vh]  navbar-menu ${menuOpen ? "active" : "closing"}`}
        >
            <div
             onClick={closeMenu}
              className="h-[40vh] w-8/12 pl-5  pt-8 flex-col flex justify-start items-start"
            >
              <Link
                className="text-white text-[1.2em] sm:text-[1.5em] font-medium uppercase tracking-wide hover:underline hover:underline-offset-4 transition duration-300 hover:duration-300 hover:scale-105 cursor-pointer"
                to="/"
                aria-label="home"
              >
                Home
              </Link>
              <Link
                className="text-white mt-2 text-[1.2em] sm:text-[1.5em]  font-medium uppercase tracking-wide hover:underline hover:underline-offset-4 transition duration-300 hover:duration-300 hover:scale-105 cursor-pointer"
                to="/products"
                aria-label="products"
              >
                Products
              </Link>
            </div>
          </div>
        )}

        <div>
          <Link className="font-bold" to="/ "aria-label="home">
            <div className="flex h-[3em] md:h-[5em]">
              <img height={"1em"} src={VPLogo} alt="Victorian Plumbing" />
            </div>
          </Link>
        </div>
        <div className="cart-count">
          <Cart itemNumber={cartItems.length} />
        </div>
      </div>
    </nav>
  );
};
