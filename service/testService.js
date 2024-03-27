import { executeQuery } from './db.js';
import { getTetsQuery ,getTetsByIdQuery} from './queryTest.js'

export class TestService {

    async getTest() {
        const queryTest = getTetsQuery();
        const result = await executeQuery(queryTest);
        return result;
    }

    async getTestById(id) {
        const queryTest = getTetsByIdQuery();
        const result =  await executeQuery(queryTest, [id]);
        return result;
    }

    async addTest(testItem) {
        // call db add item

    }
}