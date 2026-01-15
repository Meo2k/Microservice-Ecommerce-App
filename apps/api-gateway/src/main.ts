import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

const host = process.env.NX_HOST ?? 'localhost';
const port = process.env.NX_PORT ? Number(process.env.NX_PORT) : 9000;

const app = express();
app.set('trust proxy', 1);

const clientUrls = process.env.NX_CLIENT_URL?.split(',') ?? [];
app.use(cors({
    origin: clientUrls,
    credentials: true
}))
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(morgan("combined"));


//middleware

app.use(cookieParser());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req: any) => req.user ? 1000: 100, 
    message: {error: "Too many requests , please try again later"},
    standardHeaders: true,
    legacyHeaders: false
})

app.use(limiter);
app.use("/", proxy("http://localhost:6001"))

app.get('/health', (req, res) => {
    res.send({ 'message': 'API Gateway is running'});
});

app.listen(port, host, () => {
    console.log(`API Gateway is running on http://${host}:${port}`);
});
