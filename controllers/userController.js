// import { Service } from '../service/userService.js'
import { Service } from "../service/userService";
import express from "express";
export class Controller {

    async get(req, res, next) {
        try {

            const Service = new Service();
            const resultItems = await Service.get()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            express.next(err);C
        }
    }

    async getById(req, res) {
        try {
            const Service = new Service();
            const resultItem = await Service.getById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async add(req, res) {
        try {
            const Service = new Service();
             await Service.add(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async delete(req, res) {
        try {
            console.log("user");
            console.log(req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async update(req, res) {
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