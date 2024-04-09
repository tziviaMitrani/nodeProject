import { Service } from '../service/service.js'
import express from "express";

export class TodoController {
    async getTodo(req, res, next) {
        try {
            let resultItems;
            if (Object.keys(req.query).length>0) {
                const service = new Service('todos', 'userId');
                resultItems = await service.getItemByParam(req.query.userId);
            }
            else{
            const service = new Service('todos');
            resultItems = await service.getItem();
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

    async getTodoById(req, res, next) {
        try {
            const service = new Service('todos');
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

    async getTodoByUserId(req, res, next) {
        try {
            const service = new Service('todos', 'userId');
            const resultItem = await service.getItemByParam(req.query.userId);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addTodo(req, res, next) {
        try {
            const service = new Service('todos');
            const resultItem = await service.addItem(req.body);
            const todoObject = {"id": resultItem.insertId, "title": req.body.title, "completed": req.body.completed, "userId": req.body.userId}
            res.status(200).json( todoObject );
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res, next) {
        try {
            const service = new Service('todos');
            await service.updateItem(req.body, req.params.id);
            const todoObject = {"id":req.params.id, "title": req.body.title, "completed": req.body.completed};
            res.status(200).json( todoObject );
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const service = new Service('todos', 'id');
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