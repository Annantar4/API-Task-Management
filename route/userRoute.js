import express from "express";
import { getUsers, register, login, logout } from "../controller/userController.js";
import { auth } from "../middleware/login.js";


const userRoute = express.Router();

userRoute.get("/user", auth ,getUsers);
userRoute.post("/user", register);
userRoute.post("/login", login);
userRoute.delete("/logout", auth, logout);


export default userRoute;