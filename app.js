import express from 'express';

const app = express();

app.use(express.json());
// app.use('/test', testRouter);
// app.use('/user', userRouter);
app.use(logErrors);


app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});