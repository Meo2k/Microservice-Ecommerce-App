import express from 'express';
import { ENV } from '@org/shared';
import { userRouter } from './routes';

const host = ENV.USER_SERVICE_HOST 
const port = Number(ENV.USER_SERVICE_PORT)

const app = express();

app.use('/', userRouter);

app.listen(port, host, () => {
    console.log(`User Service is running on http://${host}:${port}`);
});
