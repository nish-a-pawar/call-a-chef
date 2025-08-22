import {
    createMealServ,
    getMealsServ,
    getMealByIdServ, 
    updateMealServ,
    deleteMealServ,
    getMealsByChefServ
} from "../services/mealService.js";
import User from "../models/userSchema.js";
import Meal from "../models/mealSchema.js";
// Create meal
export async function createMeal(req, res) {
    try {
        const mealData = { 
      ...req.body, 
      chefId: req.user._id  
    };

    const meal = await createMealServ(mealData);

        res.status(201).json({ success: true, message: "Meal created", data: meal });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

// Get all meals
export async function getMeals(req, res) {
    try {
        const meals = await getMealsServ();
        res.status(200).json({ success: true, data: meals });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
}

// Get meal by ID
export async function getMealById(req, res) {
    try {
        const meal = await getMealByIdServ(req.params.id);
        res.status(200).json({ success: true, data: meal });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
}

// Update meal
export async function updateMeal(req, res) {
    try {
        const meal = await updateMealServ(req.params.id, req.body);
        res.status(200).json({ success: true, message: "Meal updated", data: meal });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

// Delete meal
export async function deleteMeal(req, res) {
    try {
        await deleteMealServ(req.params.id);
        res.status(200).json({ success: true, message: "Meal deleted" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
//getmealbychef
export async function getMyMeals(req, res) {
  try {
    const meals = await getMealsByChefServ(req.user._id);

    if (!meals || meals.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No meals found for this chef",
        data: []
      });
    }

    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


export const getMealsByLocation = async (req, res) => {
  try {
    // ✅ user will come from auth middleware
    const user = req.user;

    if (!user || !user.city) {
      return res.status(400).json({
        success: false,
        message: "User city not found, please update your profile",
      });
    }

    // find all chefs in same city
    const chefs = await User.find({ role: "Chef", city: user.city }).select("_id");

    if (!chefs.length) {
      return res.status(404).json({
        success: false,
        message: `No chefs found in ${user.city}`,
      });
    }

    // ✅ FIX: Change 'chef' to 'chefId' to match the schema
    const meals = await Meal.find({ chefId: { $in: chefs.map(c => c._id) } });

    if (!meals.length) {
      return res.status(404).json({
        success: false,
        message: `No meals available in ${user.city}`,
      });
    }

    res.json({ success: true, city: user.city, data: meals });
  } catch (error) {
    console.error("🔥 Error in getMealsByLocation:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};