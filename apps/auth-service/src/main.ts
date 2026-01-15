import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API Auth Service'});
});

app.listen(port, host, () => {
    console.log(`Auth Service is running on http://${host}:${port}`);
});
