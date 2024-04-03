import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, deleteQuery, putQuery, postQuery } from './queryUser.js'


export class Service {
    constructor(_tableName, _param=null) {
        this.tableName = _tableName;
        this.param = _param;
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

    async getItemByParam() {
        const query = getByParamQuery(this.tableName, this.param);
        const result = await executeQuery(query);
        return result;
    }

    async addItem(Item) {
        const query = postQuery(this.tableName);
        Item = Object.values(Item);
        const result = await executeQuery(query, Item);
        return result;
    }

    async updateItem(Item, id) {
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