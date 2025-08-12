import { useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance";
export default function ChefDashboard() {
  const [view, setView] = useState("add");
  const [meals, setMeals] = useState([]);

  // Fetch meals from backend
  const fetchMeals = async () => {
    try {
      const res = await axiosInstance.get("/meals");
      setMeals(res.data.data || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Add a meal
  const addMeal = async (meal) => {
    try {
      const res = await axiosInstance.post("/meals", meal);
      setMeals((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  // Delete a meal
  const deleteMeal = async (id) => {
    try {
      await axiosInstance.delete(`/meals/${id}`);
      setMeals((prev) => prev.filter((meal) => meal._id !== id));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  // Update a meal
  const updateMeal = async (id, updatedMeal) => {
    try {
      const res = await axiosInstance.put(`/meals/${id}`, updatedMeal);
      setMeals((prev) =>
        prev.map((meal) => (meal._id === id ? res.data : meal))
      );
      fetchMeals();
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-base-200 p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-secondary">👨‍🍳 Chef Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setView("add")}
              className={`btn w-full ${
                view === "add" ? "btn-secondary text-white" : "btn-outline"
              }`}
            >
              Add Foods
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("viewFoods")}
              className={`btn w-full ${
                view === "viewFoods" ? "btn-secondary text-white" : "btn-outline"
              }`}
            >
              View Foods
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("orders")}
              className={`btn w-full ${
                view === "orders" ? "btn-secondary text-white" : "btn-outline"
              }`}
            >
              View Orders
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-secondary text-center">
          Chef Dashboard
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-md border border-base-200">
          {view === "add" && <AddFoodForm onAdd={addMeal} />}
          {view === "viewFoods" && (
            <ViewFoods meals={meals} onDelete={deleteMeal} onUpdate={updateMeal} />
          )}
          {view === "orders" && <ViewOrders />}
        </div>
      </main>
    </div>
  );
}

// Add Food Form
function AddFoodForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !image) return;
    await onAdd({ title, description, price, image });
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="label">
          <span className="label-text font-medium">Food Name</span>
        </label>
        <input
          type="text"
          placeholder="Eg: Pani Puri"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Food Description</span>
        </label>
        <input
          type="text"
          placeholder="Eg: Best dish of south india"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Price (₹)</span>
        </label>
        <input
          type="number"
          placeholder="Eg: 100"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Image URL</span>
        </label>
        <input
          type="text"
          placeholder="Eg: https://image.com/dosa.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-secondary w-full">
        ➕ Add Food
      </button>
    </form>
  );
}

// View Foods
function ViewFoods({ meals, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  const startEdit = (meal) => {
    setEditId(meal._id);
    setEditTitle(meal.title);
    setEditDescription(meal.description);
    setEditPrice(meal.price);
    setEditImage(meal.image);
  };

  const saveEdit = async () => {
    await onUpdate(editId, { name: editTitle, description: editDescription, price: editPrice, image: editImage });
    setEditId(null);
  };

  if (!meals.length) {
    return <p className="text-gray-500 text-center">No meals added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-secondary"> Meals Added</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="card bg-base-100 shadow-md border border-base-200">
            <figure>
              <img src={meal.image} alt={meal.title} className="h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
              {editId === meal._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="input input-bordered mb-2"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="input input-bordered mb-2"
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="input input-bordered mb-2"
                  />
                  <input
                    type="text"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className="input input-bordered mb-2"
                  />
                  <button onClick={saveEdit} className="btn btn-success btn-sm mr-2">
                    Save
                  </button>
                  <button onClick={() => setEditId(null)} className="btn btn-ghost btn-sm">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="card-title">{meal.name}</h3>
                  <p className="text-gray-600 font-bold">{meal.title}</p>
                  <p className="text-gray-600 font-medium">{meal.description}</p>
                  <p>₹{meal.price}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => startEdit(meal)}
                      className="btn btn-sm bg-pink-400 hover:bg-pink-500 text-white border-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(meal._id)}
                      className="btn btn-sm bg-pink-600 hover:bg-pink-700 text-white border-none"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// View Orders
function ViewOrders() {
  const [orders, setOrders] = useState([
    { _id: 1, mealName: "Dosa", customerName: "John Doe", qty: 2 },
    { _id: 2, mealName: "Idli", customerName: "Jane Smith", qty: 1 },
  ]);

  // useEffect(() => {
  //   axiosInstance.get("/orders").then((res) => {
  //     setOrders(res.data.data || []);
  //   });
  // }, []);

  // if (!orders.length) {
  //   return <p className="text-gray-500 text-center">No orders yet.</p>;
  // }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-base-content font-semibold">
            <th>#</th>
            <th>Meal</th>
            <th>Customer</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.mealName}</td>
              <td>{order.customerName}</td>
              <td>{order.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
