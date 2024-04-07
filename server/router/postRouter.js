import express from "express";
import { PostController } from '../controllers/postController.js'

const postRouter = express.Router();

const todoController = new PostController();

postRouter.get("/:id", todoController.getPostById)
postRouter.get("/", todoController.getPost)
postRouter.post("/", todoController.addPost)
postRouter.delete("/:id", todoController.deletePost)
postRouter.put("/:id", todoController.updatePost)

export {
    postRouter
}