import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { __dirname } from './utils/dirPath.js';
import { join } from 'path';

console.log(`Public directory: ${join(__dirname, '..', 'public')}`);

const app = express();
dotenv.config();
/**middleware */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*"); // Modify as needed
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set('Cache-Control', 'no-cache');
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(join(__dirname, '..', 'public')));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(morgan('dev'));
app.use("/api/v1", routes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
