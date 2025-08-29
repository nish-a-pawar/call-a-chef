import React, { useEffect, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const [mealCount, setMealCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [meals, setMeals] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const { name } = useSelector((state) => state.auth.userData);

  // Fetch counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const mealsRes = await axiosInstance.get("/admin/countMeals");
        const usersRes = await axiosInstance.get("/admin/countUsers");
        setMealCount(mealsRes.data.data);
        setUserCount(usersRes.data.data);
      } catch (err) {
        console.error("Error fetching counts", err);
      }
    };
    fetchCounts();
  }, []);

  // Fetch meals & users
  const fetchMeals = async () => {
    try {
      const res = await axiosInstance.get("/admin/fetchMeals");
      setMeals(res.data.data || []);
    } catch (err) {
      console.error("Error fetching meals", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/fetchUsers");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // Render
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">👨‍💻 Admin Panel</h2>
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-md text-left ${
            activeTab === "overview" ? "bg-pink-500 text-white" : "bg-gray-100"
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => { setActiveTab("meals"); fetchMeals(); }}
          className={`px-4 py-2 rounded-md text-left ${
            activeTab === "meals" ? "bg-pink-500 text-white" : "bg-gray-100"
          }`}
        >
          View Meals
        </button>
        <button 
          onClick={() => { setActiveTab("users"); fetchUsers(); }}
          className={`px-4 py-2 rounded-md text-left ${
            activeTab === "users" ? "bg-pink-500 text-white" : "bg-gray-100"
          }`}
        >
          View Users
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-pink-600 mb-6">Welcome, {name}</h1>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold">Total Meals</h2>
                <p className="text-3xl font-bold text-pink-600">{mealCount}</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-3xl font-bold text-pink-600">{userCount}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "meals" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Meals</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Description</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, idx) => (
                  <tr key={meal._id} className="text-center">
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{meal.title}</td>
                    <td className="p-2 border">₹{meal.price}</td>
                    <td className="p-2 border">{meal.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id} className="text-center">
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
