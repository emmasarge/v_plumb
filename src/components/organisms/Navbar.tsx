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
  return (
    <nav className="w-full flex flex-row justify-around z-50 bg-white fixed shadow-sm ">
      <div className="w-11/12 px-3 flex flex-row items-center justify-between">
        <div className="hidden  lg:flex">
          <Link
            className="text-[#71c16a] text-[1.2em] font-medium uppercase tracking-wide hover:underline hover:underline-offset-4 transition duration-300 hover:duration-300 hover:scale-105 cursor-pointer"
            to="/products"
          >
            Products
          </Link>
        </div>
        <div onClick={handleMenu} className="flex w-8 z-40 lg:hidden">
          <BurgerMenu />
        </div>
        {menuOpen && (
          <div
            className={
              "transition delay-150 duration-300 ease-in-out translate-x-6  flex flex-col justify-center items-center w-1/2 shadow-md h-screen bg-white fixed top-0 left-0 z-30"
            }
          >
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="h-[80vh] w-8/12 pt-5 flex-col flex justify-start items-start"
            >
              <Link
                className="text-[#71c16a] text-[1.2em]  font-medium uppercase tracking-wide hover:underline hover:underline-offset-4 transition duration-300 hover:duration-300 hover:scale-105 cursor-pointer"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-[#71c16a] mt-2 text-[1.2em]  font-medium uppercase tracking-wide hover:underline hover:underline-offset-4 transition duration-300 hover:duration-300 hover:scale-105 cursor-pointer"
                to="/products"
              >
                Products
              </Link>
            </div>
          </div>
        )}

        <div>
          <Link className="font-bold" to="/">
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
