import express from 'express';
import { ENV } from '@org/shared';

const host = ENV.SHOP_SERVICE_HOST ?? 'localhost';
const port = Number(ENV.SHOP_SERVICE_PORT) ?? 6004;

const app = express();



app.listen(port, host, () => {
    console.log(`Shop Service is running on http://${host}:${port}`);
});
