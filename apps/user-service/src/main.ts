import express from 'express';
import { ENV, errorHandler } from '@org/shared';
import { container } from './adapter/di/container.js';
import { createUserRouter } from './api/user.route.js';

const host = ENV.USER_SERVICE_HOST;
const port = Number(ENV.USER_SERVICE_PORT);

const app = express();

// Middleware
app.use(express.json());

const userRouter = createUserRouter(
    container.getUserController(),
    container.getCheckPermission()
);

app.use('/', userRouter);

app.use(errorHandler);

app.listen(port, host, () => {
    console.log(`✅ [User Service] Running on http://${host}:${port}`);
});
