import express from 'express';
import { ENV } from '@org/shared';

const host = ENV.USER_SERVICE_HOST 
const port = Number(ENV.USER_SERVICE_PORT)

const app = express();

app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API'});
});

app.listen(port, host, () => {
    console.log(`User Service is running on http://${host}:${port}`);
});
