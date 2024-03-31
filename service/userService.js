import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery} from './queryUser.js'
const tableName='db_for_project.users';
export class Service {
    // tableName='db_for_project.users';
    async get() {
        const queryUser = getQuery(tableName);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getById(id) {
        const query = getByIdQuery(tableName);
        const result =  await executeQuery(query, [id]);
        return result;
    }
    // async getById(id) {
    //     const query = getByIdQuery(tableName);
    //     const result =  await executeQuery(queryUser, [id]);
    //     return result;
    // }

    async add(Item) {
        const query = postQuery(tableName);
        const result =  await executeQuery(query, Item);
        return result;
    }

    async update(id) {
        const query = putUseQurery(tableName);
        const result =  await executeQuery(query, Item);
        return result;
    }

    async delete(id) {
        const query = deleteQuery(tableName);
        const result =  await executeQuery(query, [id]);
        return result;
    }
}