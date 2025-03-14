import { Service } from '../service/service.js'
import express from "express";


export class UserController {

    async getUser(req, res, next) {
        try {
            const service = new Service('users');
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

    async getUserById(req, res, next) {
        try {
            const service = new Service('users');
            const resultItem = await service.getItemById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addUser(req, res, next) {
        try {
            const service = new Service('users');
            const resultItem = await service.addItem(req.body);
            const userObject = { "id": resultItem.insertId, "name": req.body.name, "username": req.body.username,
             "email": req.body.email, "phone":req.body.phone }
             const passwordService = new Service('passwords');
             await passwordService.addItem(req.body);
            res.status(200).json({ status: 200, data: userObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            const service = new Service('users');
            await service.updateItem(req.body, req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userService = new Service('users', 'id');
            await userService.deleteItem(req.params.id);
            const postService = new Service('posts', 'userId');
            await postService.deleteItem(req.params.id);
            const todoService = new Service('todos', 'userId');
            await todoService.deleteItem(req.params.id);
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