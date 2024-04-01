import express from "express";
import {  UserController } from '../controllers/userController.js'
const userRouter = express.Router();

const controller = new UserController()

userRouter.get("/:id", controller.getUserById)
userRouter.get("/", controller.getUser)
userRouter.post("/", controller.addUser)
userRouter.delete("/:id", controller.deleteUser)
userRouter.put("/:id", controller.updateUser)

export {
    userRouter
}