import * as dotenv from 'dotenv';
import 'reflect-metadata';

import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { ENV, errorHandler } from '@org/shared';
import { container } from './infrastructure/di/container.js';
import { createAuthRouter } from './infrastructure/http/routes/auth.routes.js';

dotenv.config();

const host = ENV.AUTH_SERVICE_HOST;
const port: any = ENV.AUTH_SERVICE_PORT;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Routes - injected with dependencies from container
const authRouter = createAuthRouter(container.getAuthController());
app.use("/", authRouter);

// Error handler
app.use(errorHandler);

app.listen(port, host, () => {
    console.log(`✅ [Auth Service] Running on http://${host}:${port}`);
    console.log(`📦 Clean Architecture applied successfully`);
});
