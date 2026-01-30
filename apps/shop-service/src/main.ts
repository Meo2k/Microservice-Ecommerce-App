import express from 'express';
import { ENV } from '@org/shared';
import { createShopRoutes } from './api/shop.route';
import { container } from './adapter/di/container';

const host = ENV.SHOP_SERVICE_HOST ?? 'localhost';
const port = Number(ENV.SHOP_SERVICE_PORT) ?? 6004;

const app = express();

app.use("/", createShopRoutes(container.getShopController()));

app.listen(port, host, () => {
    console.log(`Shop Service is running on http://${host}:${port}`);
});
