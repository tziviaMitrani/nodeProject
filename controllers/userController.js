import {Service} from '../service/userService.js'
import express from "express";


export class Controller {

    async get(req, res, next) {
        try {
            const service = new Service();
            const resultItems = await service.get()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const service = new Service();
            const resultItem = await service.getById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }


    async add(req, res, next) {
        try {
            const service= new Service();
             await service.add(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async delete(req, res, next) {
        try {
            // console.log("user");
            // console.log(req.params.id);
            const service= new Service();
             await service.delete(req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            console.log("user");
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

}