import express from 'express';
import cors from 'cors';
import { userRouter } from './router/userRouter.js';
import { todoRouter } from './router/todoRouter.js';
import { postRouter } from './router/postRouter.js';
import { commentRouter } from './router/commentRouter.js';
import { logErrors } from './middleWare/logError.js'
import { formsRouter } from './router/formsRouter.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/forms', formsRouter)

app.use(logErrors);
app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});