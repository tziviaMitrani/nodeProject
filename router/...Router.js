import express from "express";
import { TestController } from '../controllers/testController.js'
const testRouter = express.Router();

const testcontroller = new TestController()

testRouter.get("/:id", testcontroller.getTestById)
testRouter.get("/", testcontroller.getTest)
testRouter.post("/", testcontroller.addTest)
testRouter.delete("/:id", testcontroller.deleteTest)
testRouter.put("/:id", testcontroller.updateTest)

export {
    testRouter
}