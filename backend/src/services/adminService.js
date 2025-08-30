import { countAllMeals, countUsers, getAllMeals, getAllUsers } from "../repositories/adminRepository.js"

export const countMeals = async() => {
    return await countAllMeals();
}

export const countAllUsers = async() => {
    return await countUsers();
}

export const getMeals = async() => {
    return await getAllMeals();
}

export const getUsers = async() => {
    return await getAllUsers();
}