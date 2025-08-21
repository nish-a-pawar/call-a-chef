import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const MenuItemDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams(); 
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const userId = userData?._id || userData?.id;

  const incrementQuantity = () => setQuantity(quantity + 1);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    else toast.error("Quantity cannot be less than 1");
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

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please log in to add items to cart");
      navigate("/login"); // or open login modal if you have one
      return;
    }

    try {
      const res = await axiosInstance.post("/cart", {
        userId,
        productId: meal._id,
        name: meal.title,
        price: meal.price,
        image: meal.image,
        quantity,
      });

      toast.success("Item added to cart!");
      // Optionally redirect user to cart page
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  if (!meal) {
    return <p>Loading meal details...</p>;
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={meal.image} alt={meal.title} className="w-full h-[25%] object-cover"/>
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
              className="btn w-36 btn-outline btn-secondary"
            >
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
