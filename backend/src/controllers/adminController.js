import { countAllUsers, countMeals, getMeals, getUsers } from "../services/adminService.js"

export const countMealsController = async(req, res) => {
    try {
        const meals  = await countMeals();

        res.status(200).json({
            success: true,
            message: "Successfully fetched all the meals",
            data: meals,
            error: {}
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: true,
            message: "Error fetching the meals",
            data: {},
            error: error
        })
    }
}

export const countUsersController = async(req, res) => {
    try {
        const users  = await countAllUsers();

        res.status(200).json({
            success: true,
            message: "Successfully fetched all the meals",
            data: users,
            error: {}
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: true,
            message: "Error fetching the meals",
            data: {},
            error: error
        })
    }
}

export const fetchMealsController = async(req, res) => {
    try {
        const meals  = await getMeals();

        res.status(200).json({
            success: true,
            message: "Successfully fetched all the meals",
            data: meals,
            error: {}
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: true,
            message: "Error fetching the meals",
            data: {},
            error: error
        })
    }
}

export const fetchAUsersController = async(req, res) => {
    try {
        const users  = await getUsers();

        res.status(200).json({
            success: true,
            message: "Successfully fetched all the meals",
            data: users,
            error: {}
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: true,
            message: "Error fetching the meals",
            data: {},
            error: error
        })
    }
}