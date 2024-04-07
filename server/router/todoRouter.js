import express from "express";
import { TodoController } from '../controllers/todoController.js'

const todoRouter = express.Router();

const todoController = new TodoController();

todoRouter.get("/:id", todoController.getTodoById)
todoRouter.get("/", todoController.getTodo)
todoRouter.post("/", todoController.addTodo)
todoRouter.delete("/:id", todoController.deleteTodo)
todoRouter.put("/:id", todoController.updateTodo)

export {
    todoRouter
}