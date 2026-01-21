import * as dotenv from 'dotenv';
import 'reflect-metadata';

import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { ENV, errorHandler } from '@org/shared';
import { authRouter } from './routes';


dotenv.config();

const host = ENV.AUTH_SERVICE_HOST;
const port: any = ENV.AUTH_SERVICE_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use("/", authRouter)

app.use(errorHandler)

app.listen(port, host, () => {
    console.log(`Auth Service is running on http://${host}:${port}`);
});
