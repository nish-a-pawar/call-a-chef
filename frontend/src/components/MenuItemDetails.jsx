import { useState, useEffect } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";

const MenuItemDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams(); // ✅ Get meal ID from URL
  const [meal, setMeal] = useState(null);
  const navigate =useNavigate();

  const incrementQuantity = () => setQuantity(quantity + 1);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    else alert("Min quantity is 1");
  };
useEffect(() => {
  async function fetchMeal() {
    try {
      const res = await axiosInstance.get(`/meals/${id}`);
      setMeal(res.data.data); 
    } catch (err) {
      console.error("Error fetching meal details", err);
    }
  }
  if (id) fetchMeal();
}, [id]);

const handleAddToCart =()=>{
 navigate("/cart")
}


  if (!meal) {
    return <p>Loading meal details...</p>;
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={meal.image} alt={meal.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {meal.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{meal.description}</p>
        <p>Price: ₹{meal.price}</p>

        <div className="card-actions justify-start flex items-center gap-40">
          <div className="flex gap-2 items-center">
            <button className="btn btn-secondary-content" onClick={decrementQuantity}>
              -
            </button>
            <span>{quantity}</span>
            <button className="btn btn-secondary-content" onClick={incrementQuantity}>
              +
            </button>
          </div>
        </div>

        <div className="card-actions justify-center">
          <div className="flex gap-4">
            <button 
            onClick={handleAddToCart}
            className="btn w-36 btn-outline btn-secondary">
              Add to Cart
            </button>
            <button className="btn w-36 btn-outline btn-secondary">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;
