import { executeQuery } from './db.js';
import { getQuery ,getByIdQuery, deleteQuery, putQuery, postQuery } from './queryUser.js'
const tableName='users';
export class Service {
    // tableName='db_for_project.users';
    async getItem() {
        const queryUser = getQuery(tableName);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getItemById(id) {
        const query = getByIdQuery(tableName);
        const result =  await executeQuery(query, [id]);
        return result;
    }
    // async getById(id) {
    //     const query = getByIdQuery(tableName);
    //     const result =  await executeQuery(queryUser, [id]);
    //     return result;
    // }

    async addItem(Item) {
        console.log(Item);
        const query = postQuery(tableName);
        Item=Object.values(Item);
        console.log(Item);
        const result =  await executeQuery(query, Item);
        return result;
    }

    async updateItem(Item,id) {
        console.log(Item);
        const query = putQuery(tableName);
        Item=Object.values(Item);
        Item.push(id);
        const result =  await executeQuery(query, Item);
        return result;
    }

    async deleteItem(id) {
        const query = deleteQuery(tableName);
        const result =  await executeQuery(query, [id]);
        return result;
    }
}