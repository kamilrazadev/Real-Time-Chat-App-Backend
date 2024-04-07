import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { connectToMongoDB } from "./db/connectMongo.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Server Running");
// });

app.listen(port, () => {
  connectToMongoDB()
    .then(() => {
      console.log(`Server running on port ${port}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
