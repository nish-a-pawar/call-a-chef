import React, { useState } from "react";
import MenuCard from "../components/MenuCard";
import axiosInstance from "../helpers/axiosInstance";
import { useEffect } from "react";

function MealsPage() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);

  async function fetchMeals() {
    try {
      const res = await axiosInstance.get("/meals");
      console.log(res);
      console.log(res.data);
      setMeals(res.data.data);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching meals");
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4">
      <div className="my-6 flex justify-center">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-start items-start">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal, idx) => (
            <MenuCard
              key={idx}
              image={meal.image}
              title={meal.title}
              description={meal.description}
              price={meal.price}
            />
          ))
        ) : (
          <p className="text-2xl text-gray-500">No meal found</p>
        )}
      </div>
    </div>
  );
}

export default MealsPage;
