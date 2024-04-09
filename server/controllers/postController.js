import { Service } from '../service/service.js'
import express from "express";

const routTOComments = express();

export class PostController {

    async getPost(req, res, next) {
        try {
            const service = new Service('posts');
            const resultItems = await service.getItem()       
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            const service = new Service('posts');
            const resultItem = await service.getItemById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addPost(req, res, next) {
        try {
            const service = new Service('posts');
            const resultItem = await service.addItem(req.body);
            const postObject = {"id": resultItem.insertId, "title": req.body.title, "body": req.body.body, "userId": req.body.userId, "name": req.body.name, "email": req.body.email}
            res.status(200).json(postObject);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePost(req, res, next) {
        try {
            const service = new Service('posts');
            console.log(req.body);
            console.log(req.params.id);
            await service.updateItem(req.body, req.params.id);
            const postObject = {"id": req.params.id, "title": req.body.title, "body": req.body.body}
            res.status(200).json(postObject);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deletePost(req, res, next) {
        try {
            const commentService = new Service('comments', 'postId');
            await commentService.deleteItem(req.params.id);
            const postService = new Service('posts', 'id');
            await postService.deleteItem(req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }



}