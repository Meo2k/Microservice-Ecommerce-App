import express from 'express';
import { productRouter } from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use('/', productRouter);

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
