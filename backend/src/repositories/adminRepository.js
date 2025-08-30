import Meal from "../models/mealSchema.js";
import User from "../models/userSchema.js"

export const countAllMeals = async () => {
    try {
        const allMeals = await Meal.countDocuments();
        console.log("meal couts", allMeals)
        return allMeals;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const countUsers = async () => {
    try {
        const users = await User.countDocuments();
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllMeals = async () => {
    try {
        const allMeals = await Meal.find();
        return allMeals;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}