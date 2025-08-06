import React, { useState } from 'react';

const LoginRegisterModal = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box bg-base-100 text-neutral relative">

        {/* ❌ Close Button */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* 🔁 Form Title */}
        <h3 className="font-bold text-xl mb-2">
          {isLogin ? "Login" : "Register"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {isLogin
            ? "Login to get your home-cooked meal!"
            : "Register to order or cook with us."}
        </p>

        {/* 📄 FORM */}
        <div className="space-y-4">

          {/* Register Fields */}
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
            </>
          )}

          {/* Shared Fields */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />

          {/* Role (only in Register) */}
          {!isLogin && (
            <select className="select select-bordered w-full">
              <option disabled selected>Select Role</option>
              <option>User</option>
              <option>Chef</option>
            </select>
          )}

          {/* Submit Button */}
          <button
            className="btn btn-secondary w-full"
            onClick={() => {
              // TODO: Add logic for register or login
              document.getElementById('login_modal').close();
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>

        {/* 🔁 Switch Link */}
        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <span
            className="text-secondary font-bold ml-1 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </dialog>
  );
};

export default LoginRegisterModal;
