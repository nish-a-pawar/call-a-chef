import React from "react";
import { Link } from "react-router-dom";
import LoginRegisterModal from "./LoginRegisterModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { ShoppingBag, ChefHat } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { userData } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/">
          <h1 className="text-2xl flex items-center gap-5 font-extrabold tracking-wide text-[tomato]">
            <ChefHat size={30} />
            Call-A-Chef
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-8 mr-15">
        <ul className="menu menu-horizontal gap-6 font-semibold hidden md:flex text-neutral">
          {userData?.role === "Chef" ? (
            //  Only show Chef specific pages
            <>
              <Link to="/chef-dashboard">
                <li>Dashboard</li>
              </Link>
             
            </>
          ) : (
            // ✅ Normal user pages
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/menu">
                <li>Menus</li>
              </Link>
              <Link to="/orders">
                <li>Orders</li>
              </Link>
            </>
          )}
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

    
        {isLoggedIn && userData?.role !== "Chef" && (
          <Link to="/cart">
            <ShoppingBag size={24} className="text-secondary" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
