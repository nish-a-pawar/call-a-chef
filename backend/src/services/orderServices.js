import { createOrderRepo } from "../repositories/orderRepository.js";

// Main service function to create an order
export const createOrderServ = async (orderData) => {
    const order = await createOrderRepo(orderData);
    if (!order) {
        throw new Error("Could not create order");
    }
    return order;
};

export const findOrdersByUserIdServ = async (userId) => {
    const orders = await findOrdersByUserIdRepo(userId);
    return orders;
};