import Meal from "../Schemas/productSchema.js";

export async function createMealRepo (meal) {
    try {
        const res = await Meal.create(meal)
        if(!res) {
            throw new Error("Couldn't find meal")
        }
        return res;
    } catch (error) {
        console.log(error)
    }
}

