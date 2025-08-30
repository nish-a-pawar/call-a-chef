import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegisterModal from "./LoginRegisterModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { ShoppingBag, ChefHat, Menu, X } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      {/* Left side logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat size={30} className="text-[tomato]" />
          <h1 className="text-2xl font-extrabold tracking-wide text-[tomato]">
            Call-A-Chef
          </h1>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="menu menu-horizontal gap-6 font-semibold text-neutral">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/menu">
            <li>Menus</li>
          </Link>
          <Link to="/orders">
            <li>Orders</li>
          </Link>
        </ul>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("login_modal").showModal()}
          >
            Login
          </button>
        )}

        {isLoggedIn && (
          <Link to="/cart" className="relative">
            <ShoppingBag size={24} className="text-secondary" />
            {/* Example badge, update count dynamically */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
        )}
      </div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md md:hidden flex flex-col items-center gap-6 py-6 z-40">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>
            Menus
          </Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="btn btn-secondary"
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() =>
                document.getElementById("login_modal").showModal()
              }
            >
              Login
            </button>
          )}

          {isLoggedIn && (
            <Link
              to="/cart"
              className="relative"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingBag size={24} className="text-secondary" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
          )}
        </div>
      )}

      <LoginRegisterModal />
    </div>
  );
};

export default Header;
