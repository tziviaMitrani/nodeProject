import { Service } from '../service/service.js'
import express from "express";

export class TodoController {
    async getTodo(req, res, next) {
        try {
            let resultItem;
            console.log(req.query)
            if (Object.keys(req.query).length>0) {
                console.log(req.query.userId)
                const service = new Service('todos', 'userId');
                resultItem = await service.getItemByParam(req.query.userId);
            }
            else{
            const service = new Service('todos');
            resultItem = await service.getItem();
            }
            
            return res.status(200).json(resultItem);
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

    async updateTodo(req, res, next) {
        try {
            const service = new Service('todos');
            await service.updateItem(req.body, req.params.id);
            console.log("todo");
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

    async deleteTodo(req, res, next) {
        try {
            const service = new Service('todos');
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