import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { connectDb } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { rescueRouter } from "./routes/rescue.routes.js";
import { rescueSockets } from "./sockets/rescue.socket.js"; 

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app);


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("Rescuer connected:", socket.id);

//   socket.on("joinAsRescuer", (rescuerId) => {
//     socket.join("rescuers"); // All rescuers join the same room
//     console.log(`Rescuer ${rescuerId} joined rescuers room`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Rescuer disconnected:", socket.id);
//   });
// });
rescueSockets(io);


app.get("/", (req, res) => {
  res.send("hiiii");
});

app.use("/api/auth", authRouter);
app.use("/api/rescue", rescueRouter);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on ${port}`));

export { io };
