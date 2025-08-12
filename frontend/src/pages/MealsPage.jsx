import React, { useState } from "react";
import MenuCard from "../components/MenuCard";

function MealsPage() {

  const [search, setSearch] = useState("");


  const meals = [
    {
      title: "Paneer Tikka",
      description: "A delicious grilled Indian appetizer with marinated paneer and veggies.",
      price: 299,
      imageUrl: "https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1.jpg",
    },
    {
      title: "Masala Dosa",
      description: "Crispy fermented rice crepe with spiced potato filling.",
      price: 195,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACh1yWbIwNiWJOZ-8lkt9oGkf5cdMK4DV8Q&s",
    },
    {
      title: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces.",
      price: 399,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9k3aQ9aF-SoTeZrZOdkv5FL9A_Pfw2ghUJQ&s",
    },
    {
      title: "Veg Biryani",
      description: "Fragrant rice dish with mixed vegetables and aromatic spices.",
      price: 150,
      imageUrl: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg",
    },
  ];

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
          imageUrl={meal.imageUrl}
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
