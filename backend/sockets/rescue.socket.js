export const rescueSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinAsRescuer", (rescuerId) => {
      socket.join("rescuers");
      console.log(`Rescuer ${rescuerId} joined rescuers room`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};