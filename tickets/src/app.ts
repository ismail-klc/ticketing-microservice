import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: '../.env' });
import { errorHandler, NotFoundError } from '@isotickets/common';

// imports

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
    })
);

const corsOptions = {
    origin: 'http://localhost:5000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// use routes


app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };