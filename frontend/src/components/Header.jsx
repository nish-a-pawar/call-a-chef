import React from "react";
import { Link } from "react-router-dom";
import LoginRegisterModal from "./LoginRegisterModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { ShoppingBag, ChefHat } from "lucide-react";
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/">
          <h1 className="text-2xl flex items-center gap-5 font-extrabold tracking-wide text-[tomato]">
            <ChefHat size={30}></ChefHat>
            Call-A-Chef
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-8 mr-15">
        <ul className="menu menu-horizontal gap-6 font-semibold hidden md:flex text-neutral">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/menu">
            <li>Menus</li>
          </Link>
          <li>Orders</li>
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

        <LoginRegisterModal />

        {isLoggedIn && (
          <Link to="/cart">
            <ShoppingBag size={24} className="text-secondary"></ShoppingBag>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
