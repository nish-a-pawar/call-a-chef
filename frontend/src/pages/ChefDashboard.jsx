
// import { useState } from "react";

// export default function ChefDashboard() {
//   const [view, setView] = useState("add");
//   const [meals, setMeals] = useState([]);

//   const addMeal = (meal) => {
//     setMeals((prev) => [...prev, meal]);
//   };

//   return (
//     <div className="flex min-h-screen bg-base-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-base-200 p-6 shadow-md">
//         <h2 className="text-2xl font-bold mb-8 text-secondary">👨‍🍳 Chef Panel</h2>
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => setView("add")}
//               className={`btn w-full ${
//                 view === "add" ? "btn-secondary text-white" : "btn-outline"
//               }`}
//             >
//                Add Foods
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setView("orders")}
//               className={`btn w-full ${
//                 view === "orders" ? "btn-secondary text-white" : "btn-outline"
//               }`}
//             >
//                View Orders
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-4xl font-bold mb-8 text-secondary text-center">
//           Chef Dashboard
//         </h1>
//         <div className="bg-white p-6 rounded-xl shadow-md border border-base-200">
//           {view === "add" ? (
//             <AddFoodForm onAdd={addMeal} meals={meals} />
//           ) : (
//             <ViewOrders />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function AddFoodForm({ onAdd, meals }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !price || !image) return;
//     onAdd({ name, price, image });
//     setName("");
//     setPrice("");
//     setImage("");
//   };

//   return (
//     <>
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <label className="label">
//             <span className="label-text text-base-content font-medium">
//               Food Name
//             </span>
//           </label>
//           <input
//             type="text"
//             placeholder="Eg: Pani Puri"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text text-base-content font-medium">
//               Price (₹)
//             </span>
//           </label>
//           <input
//             type="number"
//             placeholder="Eg: 100"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div>
//           <label className="label">
//             <span className="label-text text-base-content font-medium">
//               Image URL
//             </span>
//           </label>
//           <input
//             type="text"
//             placeholder="Eg: https://image.com/dosa.jpg"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <button type="submit" className="btn btn-secondary w-full">
//           ➕ Add Food
//         </button>
//       </form>

//       {/* Meal List */}
//       {meals.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold mb-4 text-secondary">📋 Meals Added</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {meals.map((meal, index) => (
//               <div
//                 key={index}
//                 className="card bg-base-100 shadow-md border border-base-200"
//               >
//                 <figure>
//                   <img
//                     src={meal.image}
//                     alt={meal.name}
//                     className="h-40 w-full object-cover"
//                   />
//                 </figure>
//                 <div className="card-body">
//                   <h3 className="card-title">{meal.name}</h3>
//                   <p>₹{meal.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function ViewOrders() {
//   const orders = [
//     { id: 1, item: "Idli", customer: "Amit", qty: 2 },
//     { id: 2, item: "Samosa", customer: "Sita", qty: 4 },
//   ];

//   return (
//     <div className="overflow-x-auto">
//       <table className="table table-zebra w-full">
//         <thead>
//           <tr className="text-base-content font-semibold">
//             <th>#</th>
//             <th>Meal</th>
//             <th>Customer</th>
//             <th>Qty</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr key={order.id}>
//               <td>{index + 1}</td>
//               <td>{order.item}</td>
//               <td>{order.customer}</td>
//               <td>{order.qty}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useState } from "react";

export default function ChefDashboard() {
  const [view, setView] = useState("add");
  const [meals, setMeals] = useState([]);

  const addMeal = (meal) => {
    setMeals((prev) => [...prev, meal]);
  };

  const deleteMeal = (index) => {
    setMeals((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMeal = (index, updatedMeal) => {
    setMeals((prev) => prev.map((meal, i) => (i === index ? updatedMeal : meal)));
  };

  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-base-200 p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-secondary">👨‍🍳 Chef Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setView("add")}
              className={`btn w-full ${view === "add" ? "btn-secondary text-white" : "btn-outline"}`}
            >
              Add Foods
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("viewFoods")}
              className={`btn w-full ${view === "viewFoods" ? "btn-secondary text-white" : "btn-outline"}`}
            >
              View Foods
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("orders")}
              className={`btn w-full ${view === "orders" ? "btn-secondary text-white" : "btn-outline"}`}
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

function AddFoodForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image) return;
    onAdd({ name, price, image });
    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="label">
          <span className="label-text text-base-content font-medium">Food Name</span>
        </label>
        <input
          type="text"
          placeholder="Eg: Pani Puri"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text text-base-content font-medium">Price (₹)</span>
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
          <span className="label-text text-base-content font-medium">Image URL</span>
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

function ViewFoods({ meals, onDelete, onUpdate }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  const startEdit = (index) => {
    setEditIndex(index);
    setEditName(meals[index].name);
    setEditPrice(meals[index].price);
    setEditImage(meals[index].image);
  };

  const saveEdit = () => {
    onUpdate(editIndex, { name: editName, price: editPrice, image: editImage });
    setEditIndex(null);
  };

  if (meals.length === 0) {
    return <p className="text-gray-500 text-center">No meals added yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-secondary"> Meals Added</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal, index) => (
          <div key={index} className="card bg-base-100 shadow-md border border-base-200">
            <figure>
              <img src={meal.image} alt={meal.name} className="h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
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
                  <button onClick={() => setEditIndex(null)} className="btn btn-ghost btn-sm">
                     Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="card-title">{meal.name}</h3>
                  <p>₹{meal.price}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => startEdit(index)}
                      className="btn  btn-sm bg-pink-400 hover:bg-pink-500 text-white border-none"
                    >
                       Edit
                    </button>
                    <button
                      onClick={() => onDelete(index)}
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

function ViewOrders() {
  const orders = [
    { id: 1, item: "Idli", customer: "Amit", qty: 2 },
    { id: 2, item: "Samosa", customer: "Sita", qty: 4 },
  ];

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
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.item}</td>
              <td>{order.customer}</td>
              <td>{order.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

