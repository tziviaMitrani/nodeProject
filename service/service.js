import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, deleteQuery, putQuery, postQuery } from './queryUser.js'


export class Service {
    constructor(_tableName) {
        this.tableName = _tableName
    }

    async getItem() {
        const queryUser = getQuery(this.tableName);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getItemById(id) {
        const query = getByIdQuery(this.tableName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async addItem(Item) {
        console.log(Item);
        const query = postQuery(this.tableName);
        Item = Object.values(Item);
        console.log(Item);
        const result = await executeQuery(query, Item);
        return result;
    }

    async updateItem(Item, id) {
        console.log(Item);
        const query = putQuery(this.tableName);
        Item = Object.values(Item);
        Item.push(id);
        const result = await executeQuery(query, Item);
        return result;
    }

    async deleteItem(id) {
        const query = deleteQuery(this.tableName);
        const result = await executeQuery(query, [id]);
        return result;
    }
}