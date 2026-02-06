import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import { ENV, errorHandler } from '@org/shared/server';
import { createAuthMiddleware } from '@org/shared/server';
import { prisma } from '@org/database';
import { redis } from '@org/redis';

// Swagger UI imports
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument, registerAllSchemas } from '@org/shared/server';



const host = ENV.API_GATEWAY_HOST ?? 'localhost';
const port = ENV.API_GATEWAY_PORT ? Number(ENV.API_GATEWAY_PORT) : 9000;


const app = express();
app.set('trust proxy', 1);

const clientUrls = ENV.API_GATEWAY_CLIENT_URL?.split(',') ?? [];
app.use(cors({
    origin: clientUrls,
    credentials: true
}))


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("combined"));


// --- Swagger Documentation Setup ---
try {
    registerAllSchemas(); // Register Zod schemas to registry
    const openApiDoc = generateOpenApiDocument(); // Generate OpenAPI JSON
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));
    app.get('/docs-json', (req, res) => { res.json(openApiDoc); }); // Expose raw JSON for code generators
    console.log(`📄 API Documentation available at http://${host}:${port}/docs`);
} catch (error) {
    console.error("Failed to generate API Docs:", error);
}


//middleware

app.use(cookieParser());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req: any) => req.user ? 1000 : 100,
    message: { error: "Too many requests , please try again later" },
    standardHeaders: true,
    legacyHeaders: false
})

app.use(limiter);

app.use(createAuthMiddleware(prisma, redis));

app.use("/auth", proxy(`http://${ENV.AUTH_SERVICE_HOST}:${ENV.AUTH_SERVICE_PORT}`))
app.use("/user", proxy(`http://${ENV.USER_SERVICE_HOST}:${ENV.USER_SERVICE_PORT}`))
app.use("/product", proxy(`http://${ENV.PRODUCT_SERVICE_HOST}:${ENV.PRODUCT_SERVICE_PORT}`))
app.use("/shop", proxy(`http://${ENV.SHOP_SERVICE_HOST}:${ENV.SHOP_SERVICE_PORT}`))


app.get('/health', (req, res) => {
    res.send({ 'message': 'API Gateway is running' });
});




app.use(errorHandler)

app.listen(port, host, () => {
    console.log(`API Gateway is running on http://${host}:${port}`);
});

