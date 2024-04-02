import { Service } from '../service/service.js'
import express from "express";

export class CommentController {
    async getComment(req, res, next) {
        try {
            console.log(req.params)
            const service = new Service('comments');
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

    async getCommentById(req, res, next) {
        try {
            const service = new Service('comments');
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

    async addComment(req, res, next) {
        try {
            const service = new Service('comments');
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

    async updateComment(req, res, next) {
        try {
            const service = new Service('comments');
            await service.updateItem(req.body, req.params.id);
            console.log("Comment");
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

    async deleteComment(req, res, next) {
        try {
            const service = new Service('comments');
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