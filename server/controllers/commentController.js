import { Service } from '../service/service.js'
import express from "express";

export class CommentController {
    async getComment(req, res, next) {
        try {
            let resultItems;
            if (Object.keys(req.query).length > 0) {
                const service = new Service('comments', 'postId');
                resultItems = await service.getItemByParam(req.query.postId);
            }
            else {
                const service = new Service('comments');
                resultItems = await service.getItem()
            }
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
            const resultItem = await service.addItem(req.body);
            const commentObject = {"id": resultItem.insertId, "postId": req.body.postId, "name": req.body.name, "email": req.body.email, "body": req.body.body}
            res.status(200).json(commentObject);
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
            const commentObject = {"id": req.params.id, "name": req.body.name, "body": req.body.body}
            res.status(200).json(commentObject);
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