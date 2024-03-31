import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery, postQuery, putUseQurery} from './queryUser.js'

export class Service {

    async get() {
        const query = getQuery(tebleName);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getById(id) {
        const query = getByIdQuery(tableName);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async add(Item) {
        const query = postQuery(tableName);
        const result =  await executeQuery(queryUser, Item);
        return result;
    }

    async update(id) {
        const query = putUseQurery(tableName);
        const result =  await executeQuery(queryUser, Item);
        return result;
    }

    async delete(id) {
        const query = deleteQuery(tableName);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }
}