import Order from "../models/orderSchema.js";

export const createOrderRepo = async (orderData) => {
    try {
        const newOrder = new Order(orderData);
        await newOrder.save();
        return newOrder;
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
};


export const findOrderByIdRepo = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate("userId", "name email city");
        return order;
    } catch (error) {
        throw new Error(`Error finding order: ${error.message}`);
    }
};

// Update an order's status by ID
export const updateOrderStatusRepo = async (orderId, status) => {
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        );
        return order;
    } catch (error) {
        throw new Error(`Error updating order status: ${error.message}`);
    }
};

export const findOrdersByUserIdRepo = async (userId) => {
    try {
        // Find orders by userId and sort by creation date (newest first)
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        throw new Error(`Error finding orders for user: ${error.message}`);
    }
};

export const getOrdersByChef = async (chefId) => {
  return await Order.find({ chef: chefId }).populate("user", "name email");
};