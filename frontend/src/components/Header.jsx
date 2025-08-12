import React from "react";
import { Link } from "react-router-dom";
import LoginRegisterModal from "./LoginRegisterModal";
const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold tracking-wide text-neutral">
          Call-A-Chef
        </h1>
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

        <button
          className="btn btn-secondary font-semibold"
          onClick={() => document.getElementById("login_modal").showModal()}
        >
          Login
        </button>

        <LoginRegisterModal />
      </div>
    </div>
  );
};

export default Header;
