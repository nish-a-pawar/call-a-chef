import Meal from "../models/mealSchema.js";


export const createMealRepo = async (meal) => {
    try {
        return await Meal.create(meal);
    } catch (error) {
        throw new Error(`Error creating meal: ${error.message}`);
    }
};


export const getMealsByLocationRepo = async (city) => {
  try {
    return await Meal.find()
      .populate({
        path: "chefId",
        match: { city: city }, // filter chefs by city
        select: "name city"    // only return chef name + city
      })
      .lean();
  } catch (error) {
    throw new Error(`Error fetching meals by location: ${error.message}`);
  }
};


export const getMealsRepo = async () => {
    try {
        return await Meal.find().lean();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Get a single meal by ID
export const findMealByIdRepo = async (id) => { // FIX: consistent naming
    try {
        return await Meal.findById(id).lean();
    } catch (error) {
        throw new Error(`Error fetching meal: ${error.message}`);
    }
};

// Update a meal
export const updateMealRepo = async (id, data) => {
    try {
        return await Meal.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        }).lean();
    } catch (error) {
        throw new Error(`Error updating meal: ${error.message}`);
    }
};

// Delete a meal
export const deleteMealRepo = async (id) => {
    try {
        return await Meal.findByIdAndDelete(id).lean();
    } catch (error) {
        throw new Error(`Error deleting meal: ${error.message}`);
    }
};

// mealRepo.js
export const getMealsByChefRepo = async (chefId) => {
    try {
        return await Meal.find({ chefId: chefId }).lean(); 
    } catch (error) {
        throw new Error(`Error fetching meals: ${error.message}`);
    }
};
