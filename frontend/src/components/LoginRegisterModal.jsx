import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, User, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import socket from "../utils/socket";
import LocationModal from "./LocationModal";

const LoginRegisterModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    location: { lat: null, lng: null },
  });

  useEffect(() => {
    if (!isLogin) {
      setShowLocationModal(true);
    }
  }, [isLogin]);

 const handleLocationConfirm = (coords) => {
  if (coords) {
    setFormData((prev) => ({
      ...prev,
      location: { lat: coords.lat, lng: coords.lng }, // ✅ correct object keys
    }));
  }
  setShowLocationModal(false);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const modal = document.getElementById("login_modal");
    if (modal) modal.showModal();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      setShowLocationModal(true); // Open Leaflet modal
    }
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN
        if (!formData.email || !formData.password) {
          toast.error("Please enter email and password");
          return;
        }
        await dispatch(
          loginUser({ email: formData.email, password: formData.password })
        ).unwrap();
        document.getElementById("login_modal").close();
      } else {
        // REGISTER
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.password ||
          !formData.role ||
          !formData.location.lat
        ) {
          toast.error("Please fill all fields & confirm location");
          return;
        }
        const user = await dispatch(
          registerUser({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            location: formData.location,
          })
        ).unwrap();

        // Send location via socket after successful register
        if (user?.id) {
          socket.emit("updateLocation", {
            userId: user.id,
            latitude: formData.location.lat,
            longitude: formData.location.lng,
          });
        }
      }

      setIsLogin(true);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };
  return (
    <>
      <dialog id="login_modal" className="modal">
        <div className="modal-box bg-base-100 text-neutral relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-xl mb-2">
            {isLogin ? "Login" : "Register"}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {isLogin
              ? "Login to get your home-cooked meal!"
              : "Register to order or cook with us."}
          </p>

          <div className="space-y-4">
            {!isLogin && (
              <div className="flex items-center border input input-bordered w-full px-3">
                <User className="text-secondary mr-2" size={18} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full bg-transparent outline-none"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="flex items-center border input input-bordered w-full px-3">
              <Mail className="text-secondary mr-2" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <div className="flex items-center border input input-bordered w-full px-3">
                <Lock className="text-secondary mr-2" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full bg-transparent outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-secondary" size={18} />
                ) : (
                  <Eye className="text-secondary" size={18} />
                )}
              </div>
            </div>

            {!isLogin && (
              <div className="relative">
                <div className="flex items-center border input input-bordered w-full px-3">
                  <Users className="text-secondary mr-2" size={18} />
                  <select
                    name="role"
                    className="w-full bg-transparent outline-none"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="User">User</option>
                    <option value="Chef">Chef</option>
                  </select>
                </div>
              </div>
            )}

            <button className="btn btn-secondary w-full" onClick={handleSubmit}>
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

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
      {showLocationModal && (
        <LocationModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onConfirm={handleLocationConfirm}
        />
      )}
    </>
  );
};

export default LoginRegisterModal;


