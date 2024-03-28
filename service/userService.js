import { executeQuery } from './db.js';
import { getUserQuery ,getUserByIdQuery} from './queryUser.js'

export class UserService {

    async getUser() {
        const queryUser = getUserQuery();
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getUserByIdQuery();
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(UserItem) {
        // call db add item
        
    }
}