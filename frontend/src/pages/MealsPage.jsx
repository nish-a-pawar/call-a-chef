import React, { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";
import axiosInstance from "../helpers/axiosInstance";
import { useSelector ,useDispatch } from "react-redux"
import { addToCart } from "../redux/cartSlice";


function MealsPage() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { userData } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
  async function fetchMeals() {
    try {
      setLoading(true);
      setError(null);   

      const res = await axiosInstance.get("meals/nearby");
      console.log("API response received:", res.data);

      
      if (res.data && Array.isArray(res.data.data)) {
        setMeals(res.data.data);
      } else {
        
        throw new Error("Invalid data format received from server.");
      }
      
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      setError(err.message || "Failed to fetch meals. Please try again.");
      
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

   const handleAddToCart = (meal) => {
    dispatch(addToCart(meal));
  };


  
  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
  <div className="px-4">

      <div className="mt-8 mb-6 text-center">
        {userData?.name ? (
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hello, {userData.name}!
          </h1>
        ) : (
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Hello there!
          </h1>
        )}
        <p className="text-xl sm:text-2xl text-gray-600 mt-2">
          Serving delicious meals in {userData?.city || "your city"}
        </p>
      </div>
      
      <div className="my-6 flex justify-center">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div
        className="flex flex-wrap gap-4 justify-start items-start"
  
      >
        
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            
            <div key={meal._id}>
              <MenuCard
                image={meal.image}
                title={meal.title}
                description={meal.description}
                price={meal.price}
                id={meal._id}
                meal={meal} 
                onAddToCart={handleAddToCart} 
              />
             
            </div>
          ))
        ) : (
          <p className="text-2xl text-gray-500">No meal found</p>
        )}
      </div>
    </div>
  );
}

export default MealsPage;