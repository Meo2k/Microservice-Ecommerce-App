import express from 'express';
import { ENV } from '@org/shared';
import { container } from './infrastructure/di/container.js';
import { createUserRouter } from './infrastructure/http/routes/user.routes.js';

const host = ENV.USER_SERVICE_HOST;
const port = Number(ENV.USER_SERVICE_PORT);

const app = express();

// Middleware
app.use(express.json());

// Routes - injected with dependencies from container
const userRouter = createUserRouter(
    container.getUserController(),
    container.getCheckPermission()
);

app.use('/', userRouter);

app.listen(port, host, () => {
    console.log(`✅ [User Service] Running on http://${host}:${port}`);
    console.log(`📦 Clean Architecture applied successfully`);
});
