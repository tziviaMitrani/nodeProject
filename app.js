import express from 'express';
import { userRouter } from './router/userRouter.js';
import {logErrors} from './middleWare/logError.js'

const app = express();

app.use(express.json());
app.use('/user', userRouter);
// app.use('/user', userRouter);
app.use(logErrors);
// console.log("hi😊iii");
// const query= `SELECT * FROM tz&e.user where id=1`
app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});