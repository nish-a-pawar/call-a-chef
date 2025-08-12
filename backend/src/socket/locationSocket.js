import User from "../models/userSchema.js";

export const setupLocationSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("updateLocation", async ({ userId, latitude, longitude }) => {
      try {
        console.log(`Updating location for user ${userId}`);

        await User.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        });
      } catch (err) {
        console.error("Error updating location:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
