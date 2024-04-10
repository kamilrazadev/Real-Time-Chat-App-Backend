import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/get-all-users", protectRoute, getAllUsers);

export default router;
