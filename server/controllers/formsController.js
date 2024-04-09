import { Service } from '../service/service.js'

export class FormController {

    async loginUser(req, res, next) {
        try {
            const service = new Service('passwords');
            const resultItem = await service.checkIfExist(req.body);
            if (resultItem == 0)
                throw new Error(404);
            else{
                const data = new Service('users', 'username');
                const resultData = await data.getItemByParam(req.body.username);
                return res.status(200).json({status: 200, data: resultData});
            }
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 404) ? 404 : 500
            err.message = ex.message;
            next(err)
        }
    }

    async signupUser(req, res, next) {
        try {
            const service = new Service('users', 'username');
            const resultItem = await service.getItemByParam(req.query.username);
            if (Object.keys(resultItem).length === 0){
                return res.status(200).json({status:200});
            }
            else
                throw new Error(409);
        }
        catch(ex) {
            const err = {};
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex.message;
            next(err)
        }
    }

    async addPassword(req, res, next) {
        try {
            const service = new Service('passwords');
            await service.addItem(req.body);
            return res.status(200).json({status:200});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async changePassword(req, res, next) {
        try {
            const service = new Service('passwords', 'username');
            const resultItem = await service.getItemByParam(req.body.username);
            if (Object.keys(resultItem).length === 0){
                throw new Error(409);
            }
            else{
                await service.updateItem(req.body.newPassword, req.body.username);
                return res.status(200).json({status:200});
            }
        } catch (ex) {
            const err = {}
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex;
            next(err)
        }
    }

}