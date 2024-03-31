import express from "express";
import { Controller } from '../controllers/userController.js'
const Router = express.Router();

const controller = new Controller()

Router.get("/:id", controller.getById)
Router.get("/", controller.get)
Router.post("/", controller.add)
Router.delete("/:id", controller.delete)
Router.put("/:id", controller.update)

export {
    Router
}