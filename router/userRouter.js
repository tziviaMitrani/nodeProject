import express from "express";
import { Controller } from '../controllers/userController.js'
const userRouter = express.Router();

const controller = new Controller()

userRouter.get("/:id", controller.getById)
userRouter.get("/", controller.get)
userRouter.post("/", controller.add)
userRouter.delete("/:id", controller.delete)
userRouter.put("/:id", controller.update)

export {
    userRouter
}