import express from "express";
import {  CommentController} from '../controllers/commentController.js'

const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.get("/:id", commentController.getCommentById)
commentRouter.get("/", commentController.getComment)
commentRouter.post("/", commentController.addComment)
commentRouter.delete("/:id", commentController.deleteComment)
commentRouter.put("/:id", commentController.updateComment)

export{
    commentRouter
}