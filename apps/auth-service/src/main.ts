import express from 'express';
import { ENV } from '@org/shared';
import router from './routes';

const host = ENV.AUTH_SERVICE_HOST;
const port: any = ENV.AUTH_SERVICE_PORT;

const app = express();
app.use(express.json());


router(app)

app.listen(port, host, () => {
    console.log(`Auth Service is running on http://${host}:${port}`);
});
