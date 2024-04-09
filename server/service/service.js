import { executeQuery } from './db.js';
import { getQuery, getByIdQuery, getByParamQuery, deleteQuery, putQuery, postQuery, checkPasswordQuery, limitQuery } from './query.js'


export class Service {
    constructor(_tableName, _param=null) {
        this.tableName = _tableName;
        this.param = _param;
    }

    async getItem() {
        const query = getQuery(this.tableName);
        const result = await executeQuery(query);
        return result;
    }

    async getItemById(id) {
        const query = getByIdQuery(this.tableName);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getItemByParam(value) {
        const query = getByParamQuery(this.tableName, this.param);
        const result = await executeQuery(query, [value]);
        return result;
    }

    async checkIfExist(Item) {
        const query = checkPasswordQuery(this.tableName);
        Item = Object.values(Item);
        const result = await executeQuery(query, Item);
        return result[0]["COUNT(*)"];
    }

    async addItem(Item) {
        const query = postQuery(this.tableName);
        Item = Object.values(Item);
        const result = await executeQuery(query, Item);
        return result;
    }

    async updateItem(Item, id) {
        console.log("Item", Item)
        const query = putQuery(this.tableName);
        Item = (typeof Item === 'object')? Object.values(Item): [Item];
        Item.push(id);
        console.log("Item", Item)
        const result = await executeQuery(query, Item);
        return result;
    }

    async deleteItem(id) {
        const query = deleteQuery(this.tableName, this.param);
        const result = await executeQuery(query, [id]);
        return result;
    }

    async limitGet(start){
        const query = limitQuery(this.tableName);
        const result = await executeQuery(query, [this.param, start]);
        return result;
    }
}