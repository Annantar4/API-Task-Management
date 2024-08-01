import express from "express";
import db from "./config/database.js";
// import Users from "./model/UserModel.js";
// import Tasks from "./model/TaskModel.js";
import userRoute from "./route/userRoute.js";
import taskRoute from "./route/taskRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    // await db.sync({ alter: true });
    console.log("success");
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(userRoute);
app.use(taskRoute);

app.listen(5000, () =>{
    console.log("server running");
})