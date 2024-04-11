import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { app, server } from "./socket/socket.js";
import { connectToMongoDB } from "./db/connectMongo.js";

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Server Running");
// });

server.listen(port, () => {
  connectToMongoDB()
    .then(() => {
      console.log(`Server running on port ${port}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
