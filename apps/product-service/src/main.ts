import express from 'express';
import { ENV } from '@org/shared';
import { createProductRoute } from './infrastructure/http/route';
import { container } from './infrastructure/di/container';

const host = ENV.PRODUCT_SERVICE_HOST;
const port = Number(ENV.PRODUCT_SERVICE_PORT);

const app = express();

app.use(express.json({limit: '50mb'}), express.urlencoded({ extended: true, limit: '50mb' }));

createProductRoute(container.getProductController());

app.listen(port, host, () => {
    console.log(`Product Service is running on http://${host}:${port}`);
});
