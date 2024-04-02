import { Service } from '../service/service.js'
import express from "express";

const routTOComments = express();

export class PostController {

    async getPost(req, res, next) {
        try {
            console.log(req.params)
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
            await service.addItem(req.body);
            res.status(200).json({ status: 200 });
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
            await service.updateItem(req.body, req.params.id);
            console.log("Post");
            console.log(req.params.id);
            console.log(req.body);
            res.status(200).json({ status: 200, data: req.params.id });
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
            const service = new Service('posts');
            await service.deleteItem(req.params.id);
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